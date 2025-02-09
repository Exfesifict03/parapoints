<script>
    import { writable } from 'svelte/store';
    import { toast, Toaster } from 'svelte-sonner';
    import { Button } from '$lib/components/ui/button';
  
    const amount = writable('');
    const qrCodeUrl = writable('');
    const isLoading = writable(false);
  
    const generateQRCode = async () => {
      const enteredAmount = parseFloat($amount);
      if (isNaN(enteredAmount) || enteredAmount <= 0) {
        toast.error('Please enter a valid amount.');
        return;
      }
  
      isLoading.set(true);
  
      try {
        const response = await fetch('/qrgen', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: enteredAmount })
        });
  
        const result = await response.json();
  
        if (response.ok) {
          qrCodeUrl.set(result.point.qrUrl);
          toast.success('QR code generated successfully!');
        } else {
          throw new Error(result.error || 'Failed to generate QR code.');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      } finally {
        isLoading.set(false);
      }
    };
  </script>
  <Toaster />
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-200">
    <div class="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-2xl font-bold mb-4 text-center">Generate QR Code for Points</h1>
  
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700">Enter Amount</label>
        <input
          id="amount"
          type="number"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
          placeholder="Enter amount"
          bind:value={$amount}
        />
      </div>
      <div class="flex justify-center mb-4">
        <Button
          variant="outline"
          class="bg-gray-900 text-white hover:bg-gray-700 hover:text-white"
          onclick={generateQRCode}
          disabled={$isLoading}
        >
          {$isLoading ? 'Generating...' : 'Generate QR Code'}
        </Button>
      </div>
  
      {#if $qrCodeUrl}
        <div class="mt-6 text-center">
          <h2 class="text-lg font-semibold">Your Ticket:</h2>
          <img src="{$qrCodeUrl}" alt="Generated QR Code" class="mt-4 mx-auto border border-gray-300 rounded-lg" />
          <a href="{$qrCodeUrl}" target="_blank" class="text-indigo-500 underline mt-2 block">
            Open in new tab
          </a>
        </div>
      {/if}
    </div>
  </div>