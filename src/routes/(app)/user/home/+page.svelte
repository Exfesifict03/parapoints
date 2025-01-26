<script lang="ts">
  import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  import Footer from "$lib/components/ui/footer/footer.svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  let points = 250;
  let credits = 150;
  let transactionHistory = [
    { date: '2025-01-10', points: 50 },
    { date: '2025-01-09', points: 100 },
    { date: '2025-01-08', points: 25 }
  ];
</script>

<Navbar />
<main class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
  <div class="container mx-auto px-6 py-10 space-y-10">
    <!-- Dashboard Header -->
    <section class="text-center">
      <h1 class="text-3xl font-extrabold text-gray-800 sm:text-4xl">EcoPoints</h1>
      <p class="text-gray-600 mt-2">Manage your points and credits with ease</p>
    </section>

    <!-- Points and Credits Section -->
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

    <!-- Action Buttons Section -->
    <section class="text-center space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-6">
      <Button variant="secondary" class="bg-gray-200 hover:bg-gray-300">Scan Ticket</Button>
      <Button variant="secondary" class="bg-gray-200 hover:bg-gray-300">Pay Points</Button>
    </section>

    <!-- Transaction History Section -->
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
  <Footer />
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
