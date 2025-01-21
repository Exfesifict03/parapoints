<script lang="ts">
  import { onMount } from "svelte";

  let isLandingPage = false;

  // Check the current URL to determine if it's the landing page
  onMount(() => {
    isLandingPage = window.location.pathname === "/landing";
  });

  function navigateToProfile() {
    window.location.href = "/auth/profile";
  }
</script>

<header class="bg-green-100 text-gray-800 shadow-lg">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/landing" class="flex items-center space-x-2">
  <img
    src="/src/image/logo.png"
    alt="EcoFare Logo"
    class="w-10 h-10"
  />
  <span class="text-2xl font-bold text-green-800 transition duration-300">
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
          class="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 sm:px-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.298.534 6.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm7-1a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="hidden sm:inline">Profile</span>
        </button>
      </nav>
    {/if}
  </div>
</header>
