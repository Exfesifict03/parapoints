<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button';

  let user = {
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    points: 0,
    joinedDate: "",
  };

  let loading = true;
  let errorMessage = "";

  async function fetchUserData() {
    loading = true;
    errorMessage = "";

    try {
      const response = await fetch("/user");
      const result = await response.json();

      if (result.status !== "success") {
        throw new Error(result.message || "Failed to fetch user data.");
      }

      Object.assign(user, result.data);
      user.joinedDate = new Date(user.joinedDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });

    } catch (err: any) {
      console.error("Fetch Error:", err);
      errorMessage = err.message || "Something went wrong.";
    } finally {
      loading = false;
    }
  }

  async function updateUserProfile() {
    errorMessage = "";

    try {
      const response = await fetch("/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: user.firstname,
          middlename: user.middlename,
          lastname: user.lastname,
          email: user.email
        })
      });

      const result = await response.json();

      if (result.status !== "success") {
        throw new Error(result.message || "Failed to update profile.");
      }

    } catch (err: any) {
      console.error("Update Error:", err);
      errorMessage = err.message || "Something went wrong.";
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
      <h2 class="text-2xl font-semibold mt-3 text-gray-800">{user.firstname} {user.middlename} {user.lastname}</h2>
      <p class="text-sm text-gray-500">{user.email}</p>
      <p class="mt-2 text-xs text-gray-400">Joined: {user.joinedDate}</p>
    </div>

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="block text-gray-700 text-sm font-bold mb-1 mt-5">First Name</label>
    <input type="text" bind:value={user.firstname} class="w-full border px-3 py-2 rounded-lg mb-2" />

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="block text-gray-700 text-sm font-bold mb-1">Middle Name</label>
    <input type="text" bind:value={user.middlename} class="w-full border px-3 py-2 rounded-lg mb-2" />

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="block text-gray-700 text-sm font-bold mb-1">Last Name</label>
    <input type="text" bind:value={user.lastname} class="w-full border px-3 py-2 rounded-lg mb-2" />

    <div class="flex justify-end mt-4">
      <Button on:click={updateUserProfile} class="bg-white border-2 border-blue-700 hover:bg-blue-700 text-black hover:text-white py-2 px-4 md:px-6 rounded-full text-sm md:text-lg 
      font-semibold shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
         Save Changes
      </Button>
    </div>

    <!-- Error Message -->
    {#if errorMessage}
      <div class="mt-4 text-red-600 text-sm">{errorMessage}</div>
    {/if}
  </div>
{/if}
