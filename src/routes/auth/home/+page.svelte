// src/routes/home/+page.svelte
<script>
  let points = 250;
  let credits = 150;
  let transactionHistory = [
    { date: '2025-01-10', points: 50 },
    { date: '2025-01-09', points: 100 },
    { date: '2025-01-08', points: 25 }
  ];
</script>

<main class="min-h-screen bg-gray-50">
  <div class="container mx-auto px-6 py-8">
    <!-- Points and Credits Section -->
    <section class="flex justify-center items-center mb-8">
      <div class="bg-white shadow-lg rounded-lg p-6 text-center w-full max-w-sm">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">EcoFare Dashboard</h2>
        <div class="flex justify-between items-center mb-6">
          <div>
            <p class="text-gray-600">Points</p>
            <p class="text-4xl font-extrabold text-blue-600">{points}</p>
          </div>
          <div>
            <p class="text-gray-600">Credits</p>
            <p class="text-4xl font-extrabold text-green-600">{credits}</p>
          </div>
        </div>
        <button
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Generate QR Code
        </button>
      </div>
    </section>

    <!-- Buttons Section -->
    <section class="flex justify-center gap-4 mb-8">
      <button
        class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Transaction History
      </button>
      <button
        class="bg-green-500 text-white py-2 px-6 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        View QR Code
      </button>
    </section>

    <!-- Transaction History Section -->
    <section class="bg-white shadow-lg rounded-lg p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4">Transaction History</h3>
      <ul class="divide-y divide-gray-200">
        {#each transactionHistory as transaction}
          <li class="py-3 flex justify-between items-center">
            <span class="text-gray-600">{transaction.date}</span>
            <span class="text-gray-800 font-semibold">+{transaction.points} Points</span>
          </li>
        {/each}
      </ul>
    </section>
  </div>
</main>
