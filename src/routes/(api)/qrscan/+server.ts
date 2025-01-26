import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { points } from '$lib/server/db/schema';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import archiver from 'archiver';
import { PassThrough } from 'stream';

async function generateQRCode(qrCodeUrl: string, retries = 3, delay = 1000): Promise<Buffer> {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(qrCodeUrl, {
                responseType: 'arraybuffer',
                timeout: 10000,
            });
            return Buffer.from(response.data);
        } catch (error) {
            if (attempt === retries) throw error;
            await new Promise((resolve) => setTimeout(resolve, delay * attempt));
        }
    }
    throw new Error('Failed to generate QR code after retries');
}

export const GET: RequestHandler = async ({ url }) => {
    const passThrough = new PassThrough();
    const archive = archiver('zip', { zlib: { level: 6 } });

    try {
        const size = url.searchParams.get('size') || '200x200';
        archive.pipe(passThrough);

        const pointsData = await db.select().from(points);
        if (pointsData.length === 0) {
            return new Response(JSON.stringify({ error: 'No points data found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        for (const point of pointsData) {
            const qrContent = JSON.stringify({
                id: point.id,
                amount: point.amount,
                scanTime: point.scanTime,
            });
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(qrContent)}`;
            const buffer = await generateQRCode(qrCodeUrl);
            archive.append(buffer, { name: `${point.id}.png` });
        }

        await archive.finalize();
        const readableStream = new ReadableStream({
            start(controller) {
                passThrough.on('data', (chunk) => controller.enqueue(chunk));
                passThrough.on('end', () => controller.close());
                passThrough.on('error', (err) => controller.error(err));
            },
            cancel() {
                passThrough.destroy();
            },
        });

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename=points_qr_codes.zip',
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        passThrough.destroy();
        console.error('Error generating QR codes:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate QR codes', message: error.message || 'Unknown error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { amount } = await request.json() as { amount: number };
        if (!amount || amount <= 0) {
            return new Response(JSON.stringify({ error: 'Invalid amount provided' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const newId = uuidv4();
        const currentTime = new Date();

        await db.insert(points).values({
            id: newId,
            amount,
            scanTime: currentTime,
        });

        const qrContent = JSON.stringify({ id: newId, amount, scanTime: currentTime.toISOString() });
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrContent)}`;
        const qrCodeBuffer = await generateQRCode(qrCodeUrl);

        return new Response(qrCodeBuffer, {
            headers: {
                'Content-Type': 'image/png',
                'Content-Disposition': `attachment; filename=${newId}.png`,
            },
        });
    } catch (error) {
        console.error('Error generating QR code:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate QR code', message: error.message || 'Unknown error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
