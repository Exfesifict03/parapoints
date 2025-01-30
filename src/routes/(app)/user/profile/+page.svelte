<script>
    let user = {
      name: "John Doe",
      email: "johndoe@example.com",
      points: 250,
      transactions: [
        { date: "2025-01-28", amount: "+50" },
        { date: "2025-01-27", amount: "+30" },
        { date: "2025-01-26", amount: "+20" }
      ]
    };
  </script>
  
  <div class="max-w-md mx-auto p-6 bg-blue-50 shadow-lg rounded-2xl mt-28 mb-10">
    <div class="flex flex-col items-center">
      <div class="w-24 h-24 bg-blue-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
        {user.name[0]}
      </div>
      <h2 class="text-xl font-semibold mt-3 text-blue-900">{user.name}</h2>
      <p class="text-sm text-gray-600">{user.email}</p>
      <div class="mt-4 bg-blue-200 text-blue-900 px-4 py-2 rounded-lg text-lg font-semibold">
        Points: {user.points}
      </div>
    </div>
  
    <div class="mt-6">
      <h3 class="text-lg font-semibold text-blue-900">Recent Transactions</h3>
      <ul class="mt-2 space-y-2">
        {#each user.transactions as txn}
          <li class="flex justify-between bg-blue-100 p-2 rounded-lg text-blue-900">
            <span>{txn.date}</span>
            <span class="font-semibold">{txn.amount}</span>
          </li>
        {/each}
      </ul>
    </div>
  
    <div class="mt-6 text-center">
      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Edit Profile</button>
    </div>
  </div>
  