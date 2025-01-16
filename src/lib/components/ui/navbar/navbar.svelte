<script lang="ts">
  import { onMount } from "svelte";

  let isLandingPage = false;

  // Check the current URL to determine if it's the landing page
  onMount(() => {
    isLandingPage = window.location.pathname === "/landing";
  });
</script>

<header class="bg-white shadow-md">
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/landing" class="text-2xl font-bold text-blue-600 hover:text-blue-700">
      ECOFARE
    </a>

    <!-- Navigation Links (conditionally hidden on the landing page) -->
    {#if !isLandingPage}
      <nav>
        <ul class="flex items-center space-x-8">
          <li>
            <a
              href="#features"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Features
            </a>
          </li>
          <li>
            <a
              href="#about"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    {/if}
  </div>
</header>
