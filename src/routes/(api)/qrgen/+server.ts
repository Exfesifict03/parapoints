import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { points } from '$lib/server/db/schema';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import axios from 'axios';

if (!env.SUPABASE_SERVICE_KEY) {
	throw new Error('SUPABASE_SERVICE_KEY is not defined');
}
const supabase = createClient(env.SUPABASE_URL!, env.SUPABASE_SERVICE_KEY);

export async function POST({ request }) {
	try {
		
		const { amount } = await request.json();

		
		if (!amount || amount <= 0) {
			return json({ error: 'Invalid amount entered.' }, { status: 400 });
		}

		const id = uuidv4();
		const createdAt = new Date();

		
		const qrContent = JSON.stringify({ id, amount, createdAt });
		const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrContent)}`;

		
		const qrResponse = await axios.get(qrCodeUrl, { responseType: 'arraybuffer' });
		if (!qrResponse || qrResponse.status !== 200) {
			throw new Error('Failed to generate QR code.');
		}

		
		const qrFileName = `point-${id}.png`;
		const uploadResult = await supabase.storage
			.from('PARAPOINTS')
			.upload(`qr-codes/${qrFileName}`, new Uint8Array(qrResponse.data), {
				contentType: 'image/png',
				cacheControl: '3600',
			});

		if (uploadResult.error) {
			throw new Error(`Failed to upload QR code to Supabase: ${uploadResult.error.message}`);
		}

		
		const { data: publicUrlData } = supabase.storage
			.from('PARAPOINTS')
			.getPublicUrl(`qr-codes/${qrFileName}`);

		if (!publicUrlData || !publicUrlData.publicUrl) {
			throw new Error('Failed to get public URL of the uploaded QR code.');
		}

		
		const newPoint = {
			id,
			amount,
			qrUrl: publicUrlData.publicUrl,
            status: 'unscan' as const,
			createdAt,
		};
		await db.insert(points).values(newPoint);

		
		return json({
			success: true,
			message: 'QR code generated and point created successfully.',
			point: newPoint,
		});
	} catch (error) {
		console.error('Error creating point:', error);
		return json({ error: 'Failed to create point. Please try again.' }, { status: 500 });
	}
}
