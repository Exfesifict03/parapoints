
<script lang="ts">
        import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  let fullName = "";
  let email = "";
  let password = "";
  let agreeToTerms = false;

  const handleSignUp = (event) => {
    event.preventDefault();
    if (!agreeToTerms) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    console.log({ fullName, email, password });
    // Add sign-up logic here
  };
</script>

<Navbar />

<main class="min-h-screen bg-gray-50 flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>

    <form on:submit|preventDefault={handleSignUp}>
      <!-- Full Name Input -->
      <div class="mb-4">
        <label for="fullName" class="block text-gray-700 font-medium mb-2">Full Name</label>
        <input
          type="text"
          id="fullName"
          bind:value={fullName}
          class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your full name"
          required
        />
      </div>

      <!-- Email Input -->
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter your email"
          required
        />
      </div>

      <!-- Password Input -->
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

      <!-- Terms and Conditions Checkbox -->
      <div class="mb-6">
        <label class="flex items-center">
          <input
            type="checkbox"
            bind:checked={agreeToTerms}
            class="form-checkbox text-blue-600 focus:ring-blue-500"
            required
          />
          <span class="ml-2 text-gray-700">
            I agree to the <a href="/terms" class="text-blue-600 hover:underline">Terms and Conditions</a>
          </span>
        </label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Sign Up
      </button>
    </form>

    <p class="text-center text-gray-600 text-sm mt-4">
      Already have an account? <a href="/auth/login" class="text-blue-600 hover:underline">Login</a>
    </p>
  </div>
</main>
