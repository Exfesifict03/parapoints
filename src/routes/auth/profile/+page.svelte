<script lang="ts">
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
    import Footer from "$lib/components/ui/footer/footer.svelte";
    let user = {
      name: "John Doe",
      email: "johndoe@example.com",
      points: 1200,
      credits: 15.75,
      joined: "January 2023",
      avatar: "https://via.placeholder.com/150", // Placeholder image for the profile
      history: [
        { date: "2025-01-10", description: "Recycled 5 bottles", points: 50 },
        { date: "2025-01-08", description: "Recycled 3 cans", points: 30 },
        { date: "2025-01-05", description: "Recycled 10 bottles", points: 100 },
      ],
    };
  </script>
  
  <Navbar />
  <main class="bg-gray-100 min-h-screen py-10">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="text-center">
          <!-- svelte-ignore a11y_img_redundant_alt -->
          <img
            src={user.avatar}
            alt="Profile Picture"
            class="w-20 h-20 mx-auto rounded-full border-2 border-blue-600"
          />
          <h1 class="mt-4 text-xl font-semibold text-gray-800">{user.name}</h1>
          <p class="text-gray-500 text-sm">{user.email}</p>
          <p class="text-gray-400 text-xs">Joined: {user.joined}</p>
        </div>
  
        <div class="mt-6 grid grid-cols-2 gap-4 text-center">
          <div class="bg-blue-100 rounded-lg p-4">
            <p class="text-sm text-gray-600">Total Points</p>
            <p class="text-2xl font-bold text-blue-600">{user.points}</p>
          </div>
          <div class="bg-green-100 rounded-lg p-4">
            <p class="text-sm text-gray-600">Credits</p>
            <p class="text-2xl font-bold text-green-600">₱{user.credits.toFixed(2)}</p>
          </div>
        </div>
  
        <div class="mt-8">
          <h2 class="text-lg font-medium text-gray-800 mb-4">Recycling History</h2>
          <div class="bg-gray-50 rounded-lg shadow-sm p-4">
            {#if user.history.length > 0}
              <ul class="divide-y divide-gray-200">
                {#each user.history as item}
                  <li class="py-3 flex justify-between items-center">
                    <div>
                      <p class="text-gray-800 font-medium">{item.description}</p>
                      <p class="text-sm text-gray-500">{item.date}</p>
                    </div>
                    <p class="text-blue-600 font-bold">+{item.points} pts</p>
                  </li>
                {/each}
              </ul>
            {:else}
              <p class="text-sm text-gray-500 text-center">No history available.</p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  
    <Footer />
  </main>
  