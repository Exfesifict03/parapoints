<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { CircleUserIcon, HomeIcon } from "lucide-svelte";
  import LifeBuoy from "lucide-svelte/icons/life-buoy";
  import LogOut from "lucide-svelte/icons/log-out";
  import Settings from "lucide-svelte/icons/settings";
  import User from "lucide-svelte/icons/user";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { page } from "$app/stores";

  let isLandingPage = false;
  let isLoggedIn = false;
  let lastScrollY = 0;
  let isNavbarVisible = true;

  // Check if user is logged in
  $: $page.data.user && (isLoggedIn = true);

  onMount(() => {
    isLandingPage = window.location.pathname === "/landing";

    const handleScroll = () => {
      isNavbarVisible = window.scrollY < lastScrollY;
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    onDestroy(() => {
      window.removeEventListener("scroll", handleScroll);
    });
  });
</script>

<header
  class="bg-white text-gray-800 shadow-lg border-b-2 border-gray-100 fixed top-0 left-0 w-full transition-transform duration-300 ease-in-out z-10"
  style="transform: translateY({isNavbarVisible ? '0' : '-100%'})"
>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    <!-- Logo -->
    <a href="/landing" class="flex items-center space-x-2">
      <img src="/image/logo.png" alt="EcoFare Logo" class="w-10 h-10 rounded-full" />
      <span class="text-2xl font-bold text-sky-400 font-sans transition duration-300">
        ECOFARE
      </span>  
    </a>

    <!-- User Dropdown (Only if logged in) -->
    {#if !isLandingPage && isLoggedIn}
      <nav class="flex items-center space-x-4 sm:space-x-8">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button class="flex items-center space-x-2 bg-transparent text-white font-medium py-2 px-4 rounded-lg transition duration-300 sm:px-6" builders={[builder]} variant="outline">
              <CircleUserIcon class="text-black w-6 h-6" />
            </Button>
          </DropdownMenu.Trigger>
          
          <DropdownMenu.Content class="w-56 bg-white shadow-lg rounded-lg">
            <DropdownMenu.Label class="px-4 py-2 font-semibold text-gray-700">My Account</DropdownMenu.Label>
            <DropdownMenu.Separator class="border-gray-200" />

            <!-- Home -->
            <DropdownMenu.Item>
              <a href="/user/home" class="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition">
                <HomeIcon class="mr-2 h-4 w-4 text-gray-700" />
                <span>Home</span>
              </a>
            </DropdownMenu.Item>

            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <a href="/user/profile" class="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition">
                  <User class="mr-2 h-4 w-4 text-gray-700" />
                  <span>Profile</span>
                </a>
              </DropdownMenu.Item>

              <DropdownMenu.Item>
                <a href="/user/settings" class="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition">
                  <Settings class="mr-2 h-4 w-4 text-gray-700" />
                  <span>Settings</span>
                </a>
              </DropdownMenu.Item>
            </DropdownMenu.Group>

            <DropdownMenu.Item>
              <a href="/su" class="flex items-center w-full px-4 py-2 hover:bg-gray-100 transition">
                <LifeBuoy class="mr-2 h-4 w-4 text-gray-700" />
                <span>Support</span>
              </a>
            </DropdownMenu.Item>

            <DropdownMenu.Separator class="border-gray-200" />

            <!-- Logout Form -->
            <form action="/logout" method="POST">
              <DropdownMenu.Item>
                <button type="submit" class="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-100 transition">
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenu.Item>
            </form>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </nav>
    {/if}
  </div>
</header>
