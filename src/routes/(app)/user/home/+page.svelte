<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { QrCode, Coins } from "lucide-svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import QrScanner from 'qr-scanner';
  import { toast } from 'svelte-sonner';
  import { onMount, onDestroy } from 'svelte';

  let points = 250;
  let credits = 150;
  let transactionHistory = [
    { date: '2025-01-10', points: 50 },
    { date: '2025-01-09', points: 100 },
    { date: '2025-01-08', points: 25 }
  ];

  let videoElem: HTMLVideoElement | null = null;
  let qrScanner: QrScanner | null = null;
  let lastScanTime = 0;
  let scanResult = '';
  
  async function handleScanResult(qrCode: string) {
    const now = Date.now();
    if (now - lastScanTime < 3000) return; 

    lastScanTime = now;
    scanResult = qrCode;

    if (qrCode) {
      try {
        const res = await fetch('', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            qr_code: qrCode,
            scan_time: new Date().toISOString(),
          }),
        });
        const data = await res.json();

        if (res.ok && data.status === 'success') {
          toast.success('Points redeemed successfully');
        } else {
          toast.error(data.message || 'Error processing points');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Network error. Unable to process scan');
      }
    }
  }

  function onPermissionError() {
    toast.error('Camera permission rejected');
    location.reload();
  }

  onMount(async () => {
    if (!videoElem) return;

    try {
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        toast.error('No camera found');
        return;
      }
      qrScanner = new QrScanner(
        videoElem,
        (result) => {
          const scannedData = typeof result === 'string' ? result : result?.data;
          if (scannedData) handleScanResult(scannedData);
          else toast.error('Invalid QR code data');
        },
        {
          returnDetailedScanResult: true,
          preferredCamera: 'environment',
          maxScansPerSecond: 10,
          onDecodeError: (error) => console.error('QR Scan Decode Error:', error),
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      await qrScanner.start();
    } catch (error) {
      console.error('QR Scanner Setup Error:', error);
      toast.error('Failed to initialize QR scanner');
      onPermissionError();
    }
  });

  onDestroy(() => {
    qrScanner?.stop();
    qrScanner?.destroy();
  });
</script>

<main class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
  <div class="container mx-auto px-6 py-10 space-y-10">
    <section class="text-center">
      <h1 class="text-3xl font-extrabold text-gray-800 sm:text-4xl">EcoPoints</h1>
      <p class="text-gray-600 mt-2">Manage your points and credits with ease</p>
    </section>
    <section class="flex flex-col sm:flex-row items-center justify-center gap-6">
      <div class="relative flex items-center justify-center bg-white shadow-md rounded-full w-40 h-40 sm:w-48 sm:h-48 overflow-hidden">
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 to-green-600 blur-md animate-pulse"></div>
        <div class="absolute inset-0 rounded-full border-2 border-green-400 animate-ripple"></div>
        <div class="relative z-10 text-center">
          <h2 class="text-lg font-medium text-gray-700">Points</h2>
          <p class="text-5xl font-bold text-green-600">{points}</p>
        </div>
      </div>
    </section>
    <section class="text-center text-white space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-6">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button variant="outline" class="bg-gray-900 hover:bg-gray-300">
            <QrCode class="mr-2" /> Scan Ticket
          </Button>
        </Dialog.Trigger>
        <Dialog.Content class="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>Scan EcoTicket</Dialog.Title>
            <Dialog.Description>
              Scan the QR code to retrieve your points
            </Dialog.Description>
          </Dialog.Header>
              <video bind:this={videoElem} class="w-full h-auto" playsinline></video>
          <Dialog.Footer>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      <Button variant="outline" class="bg-gray-900 hover:bg-gray-300">
        <Coins class="mr-2" /> Pay Fare
      </Button>
    </section>
    <section class="bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Transaction History</h3>
      <ul class="divide-y divide-gray-200">
        {#each transactionHistory as transaction}
          <li class="py-4 flex justify-between items-center">
            <span class="text-gray-600">{transaction.date}</span>
            <span class="text-gray-800 font-medium">+{transaction.points} Points</span>
          </li>
        {/each}
      </ul>
    </section>
  </div>
</main>

<style>
  @keyframes ripple {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  .animate-ripple {
    animation: ripple 1.5s infinite;
  }
</style>
