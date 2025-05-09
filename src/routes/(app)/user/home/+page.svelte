<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { QrCode, Coins } from "lucide-svelte";

  let points: number = 0;
  let transactionHistory: { date: string, points: number }[] = [];

  async function fetchUserPoints() {
    try {
      const response = await fetch('/points/fetch', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      if (data.status === 'success' && data.data?.user?.points) {
        points = parseFloat(data.data.user.points);
      } else {
        console.error('Failed to fetch points:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  }

  async function fetchTransactionHistory() {
    try {
      const response = await fetch('/transaction', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      if (data.status === 'success' && Array.isArray(data.data)) {
        transactionHistory = data.data.map((item: { createdAt: string | number | Date; amount: any }) => ({
          date: new Date(item.createdAt).toLocaleDateString(),
          points: item.amount,
        }));
      } else {
        console.error('Failed to fetch transaction history:', data.message);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  }

  onMount(() => {
    fetchUserPoints();
    fetchTransactionHistory();
  });
</script>

<main class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 mt-10">
  <div class="container mx-auto px-6 space-y-10">
    <section class="text-center">
      <h1 class="text-5xl font-bold text-gray-800">EcoPoints</h1>
      <p class="text-gray-600 mt-3 text-lg">Manage your points and credits effortlessly</p>
    </section>

    <section class="flex justify-center">
      <div class="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 bg-white shadow-xl rounded-full overflow-hidden">
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-green-400 to-green-600 blur-lg animate-pulse"></div>
        <div class="absolute inset-0 rounded-full border-4 border-green-500 animate-ripple"></div>
        <div class="relative z-10 text-center">
          <p class="text-6xl font-bold text-green-600">{points.toFixed(2)}</p>
          <p class="text-sm text-gray-500">Available Points</p>
        </div>
      </div>
    </section>

    <section class="flex flex-col sm:flex-row items-center justify-center gap-6">
      <a href="/user/redeem">
        <Button class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105">
          <QrCode class="w-6 h-6" /> Scan Ticket
        </Button>
      </a>
      <a href="/user/location">
        <Button class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105">
          <Coins class="w-6 h-6" /> Pay Fare
        </Button>
      </a>
    </section>

    <section class="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg mx-auto">
      <h3 class="text-2xl font-semibold text-gray-800 text-center mb-4">Transaction History</h3>
      <div class="bg-gray-100 rounded-lg p-4">
        <div class="grid grid-cols-2 gap-4 py-3 border-b border-gray-300 font-semibold text-gray-700">
          <span>Date</span>
          <span class="text-right">Points</span>
        </div>
        <ul class="divide-y divide-gray-300 max-h-72 overflow-y-auto">
          {#each transactionHistory as transaction}
            <li class="flex justify-between items-center py-4 px-3 rounded-lg bg-white shadow-sm hover:bg-gray-100 transition">
              <span class="text-gray-600">{transaction.date}</span>
              <span class="text-green-600 font-semibold text-right">+{transaction.points} pts</span>
            </li>
          {/each}
        </ul>
      </div>
    </section>
  </div>
</main>

<style>
  @keyframes ripple {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  .animate-ripple { animation: ripple 1.8s infinite; }
</style>
