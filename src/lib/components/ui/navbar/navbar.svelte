<script lang="ts">
  import { onMount } from "svelte";
  import { CircleUserIcon } from "lucide-svelte";
  let isLandingPage = false;

  // Check the current URL to determine if it's the landing page
  onMount(() => {
    isLandingPage = window.location.pathname === "/landing";
  });

  function navigateToProfile() {
    window.location.href = "/auth/profile";
  }
</script>

<header class="bg-blue-900/95 text-gray-800 shadow-lg shadow-sky-700/30">
  <div class="container x-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/landing" class="flex items-center space-x-2">
  <img
    src="image/logo.png"
    alt="EcoFare Logo"
    class="w-10 h-10 rounded-full"
  />
  <span class="text-2xl font-bold text-cyan-100 font-sans transition duration-300">
    ECOFARE
  </span>  
</a>

    <!-- Navigation Links (conditionally hidden on the landing page) -->
    {#if !isLandingPage}
      <nav class="flex items-center space-x-4 sm:space-x-8">
        <ul class="hidden sm:flex items-center space-x-4 sm:space-x-8">
          <li>
            <a
              href="#features"
              class="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#about"
              class="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              class="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
            >
              Contact
            </a>
          </li>
        </ul>

        <!-- Profile Button -->
        <button
          on:click={navigateToProfile}
          class="flex items-center space-x-2 bg-transparent  text-white font-medium py-2 px-4 rounded-lg transition duration-300 sm:px-6"
        >
        <CircleUserIcon class="text-black w-6 h-6" />
        </button>
      </nav>
    {/if}
  </div>
</header>
