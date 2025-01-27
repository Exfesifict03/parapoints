<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { QrCode, Coins } from "lucide-svelte";

  let points: number = 0; 
  let transactionHistory: { date: string, points: number }[] = [];

  // Fetch user points
  async function fetchUserPoints() {
    try {
      const response = await fetch('/points/fetch', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

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
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === 'success' && Array.isArray(data.data)) {
        transactionHistory = data.data.map((item: { createdAt: string | number | Date; amount: any; }) => ({
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
          <p class="text-4xl font-bold text-green-600">{points.toFixed(2)}</p> 
        </div>
      </div>
    </section>
    <section class="text-center text-white space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-6">
      <a href="/user/redeem">
        <Button variant="outline" class="bg-gray-900 hover:bg-gray-300">
          <QrCode class="mr-2" /> Scan Ticket
        </Button>
      </a>
      <a href="/user/pay">
        <Button variant="outline" class="bg-gray-900 hover:bg-gray-300">
          <Coins class="mr-2" /> Pay Fare
        </Button>
      </a>
    </section>
    <section class="bg-white shadow-md rounded-lg p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-4 text-center">Transaction History</h3>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <span class="text-black font-medium">Date</span>
        <span class="text-black font-medium text-right">Points</span>
      </div>
      <ul class="divide-y divide-gray-200">
        {#each transactionHistory as transaction}
          <li class="py-4 flex justify-between items-center">
            <span class="text-gray-600">{transaction.date}</span>
            <span class="text-green-600 font-medium text-right">+{transaction.points} Points</span>
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
