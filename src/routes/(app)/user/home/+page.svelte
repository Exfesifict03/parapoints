<script lang="ts">
  import { onMount } from "svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import { QrCode, Coins } from "lucide-svelte";

  let points: number = 0; 
  let transactionHistory = [
    { date: '2025-01-10', points: 50 },
    { date: '2025-01-09', points: 100 },
    { date: '2025-01-08', points: 50 }
  ];


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
        points = parseFloat(data.data.user.points); // Set points as a float
      } else {
        console.error('Failed to fetch points:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  }
  onMount(() => {
    fetchUserPoints();
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
          <p class="text-5xl font-bold text-green-600">{points.toFixed(2)}</p> <!-- Ensure points display as float -->
        </div>
      </div>
    </section>
    <section class="text-center text-white space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-6">
      <a href="/user/scanner">
          <Button variant="outline" class="bg-gray-900 hover:bg-gray-300">
            <QrCode class="mr-2" /> Scan Ticket
          </Button>
      </a>
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
