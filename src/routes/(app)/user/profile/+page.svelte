<script lang="ts">
  import { onMount } from 'svelte';

  let user = {
    firstname: "",
    lastname: "",
    email: "",
    points: 0,
    joinedDate: "",
  };
  let loading = true;
  let errorMessage = "";

  function formatDate(isoString: string): string {
    if (!isoString) return "N/A"; // Handle missing date
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      weekday: "long", // e.g., Monday
      year: "numeric", // e.g., 2023
      month: "long", // e.g., August
      day: "numeric" // e.g., 15
    });
  }

  async function fetchUserData() {
    loading = true;
    errorMessage = "";

    try {
      const response = await fetch("/user");
      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid JSON response from server.");
      }

      const result = await response.json();
      user = result.data;

      // Format joinedDate
      if (user.joinedDate) {
        user.joinedDate = formatDate(user.joinedDate);
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      errorMessage = err.message || "Something went wrong.";
    } finally {
      loading = false;
    }
  }

  onMount(fetchUserData);
</script>

{#if loading}
  <div class="flex justify-center items-center min-h-screen">
    <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
  </div>
{:else}
  <div class="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl mt-24 mb-10 border border-gray-200">
    <div class="flex flex-col items-center">
      <!-- Profile Picture with Initials -->
      <div class="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
        {user.firstname[0]}{user.lastname[0]}
      </div>

      <!-- User Details -->
      <h2 class="text-2xl font-semibold mt-3 text-gray-800">{user.firstname} {user.lastname}</h2>
      <p class="text-sm text-gray-500">{user.email}</p>


      <!-- Additional Info -->
      <p class="mt-2 text-xs text-gray-400">Joined: {new Date(user.joinedDate).toLocaleDateString()}</p>

      <!-- Error Message -->
      {#if errorMessage}
        <div class="mt-4 text-red-600 text-sm">{errorMessage}</div>
      {/if}

      <!-- Buttons Section -->
      <div class="mt-6 flex gap-4">
        <button class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  </div>
{/if}
