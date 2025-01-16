<script lang="ts">
    import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  let email = "";
  let password = "";
</script>
<Navbar />
<main class="min-h-screen bg-gray-50 flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
    <form>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your email"
          required
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
        <input
          type="password"
          id="password"
          bind:value={password}
          class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
    </form>

    <p class="text-center text-gray-600 text-sm mt-4">
      Don't have an account? <a href="/auth/register" class="text-blue-600 hover:underline">Sign up</a>
    </p>
  </div>
</main>
