<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { toast, Toaster } from 'svelte-sonner';
	import QrScanner from 'qr-scanner';
	import { onMount, onDestroy } from 'svelte';
	
	let videoElem: HTMLVideoElement | null = null;
	let qrScanner: QrScanner | null = null;
	let lastScanTime = 0;
	
	// async function handleScanResult(qrCode: string) {
	//   const now = Date.now();
	//   if (now - lastScanTime < 3000) return; 
	//   lastScanTime = now;
	
	//   if (qrCode) {
	// 	console.log('Scanned QR Code:', qrCode);
	// 	try {
	// 	  const parsedQRCode = JSON.parse(qrCode);
		  
	// 	  const response = await fetch('/qrscan', {
	// 		method: 'POST',
	// 		headers: {
	// 		  'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ qr_code: qrCode }),
	// 	  });
	
	// 	  const result = await response.json();
		  
	// 	  if (response.ok && result.status === 'success') {
	// 		toast.success('Points redeemed successfully');
	// 	  } else {
	// 		toast.error(result.message || 'Failed to redeem points');
	// 	  }
	// 	} catch (error) {
	// 	  console.error('API Error:', error);
		  
	// 	  if (error instanceof SyntaxError) {
	// 		toast.error('Invalid QR code format');
	// 	  } else {
	// 		toast.error('Failed to redeem points. Please try again.');
	// 	  }
	// 	}
	//   }
	// }
	
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
			const scanResult = typeof result === 'string' ? result : result?.data;
			if (scanResult) {
			//   handleScanResult(scanResult);
			} else {
			  toast.error('Invalid QR code data');
			}
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
	
	<Toaster />
	<div class="flex flex-col gap-4 mt-28 mb-5 px-4">
	  <div class="flex justify-start">
		<a href="/user/home">
		  <Button
			variant="outline"
			class="px-4 py-2 mb-4 text-sm font-semibold text-black bg-transparent rounded-lg" 
		  >
			← Back
		  </Button>
		</a>
	  </div>
	  <div class="flex flex-col items-center gap-4">
		<div class="text-xl font-bold md:text-2xl">Scan Qr Code to Pay</div>
		<div class="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-primary sm:w-[320px] md:w-[480px] lg:w-[640px]">
		  <!-- svelte-ignore a11y_media_has_caption -->
		  <video bind:this={videoElem} class="w-full rounded-lg" playsinline></video>
		</div>
	  </div>
	</div>