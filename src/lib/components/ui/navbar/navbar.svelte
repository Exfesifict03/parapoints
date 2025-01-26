<script lang="ts">
  import { onMount } from "svelte";
  import { CircleUserIcon } from "lucide-svelte";
  import LifeBuoy from "lucide-svelte/icons/life-buoy";
  import LogOut from "lucide-svelte/icons/log-out";
  import Settings from "lucide-svelte/icons/settings";
  import User from "lucide-svelte/icons/user";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { page } from "$app/stores";

  let isLandingPage = false;
  let isLoggedIn = false;
  $: $page.data.user && (isLoggedIn = true);

  onMount(() => {
    isLandingPage = window.location.pathname === "/landing";
  });

  function navigateToProfile() {
    window.location.href = "/auth/profile";
  }
</script>

<header class="bg-transparent text-gray-800 shadow-lg border-b-2 border-gray-100">
  <div class="x-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    <a href="/landing" class="flex items-center space-x-2">
      <img src="/image/logo.png" alt="EcoFare Logo" class="w-10 h-10 rounded-full" />
      <span class="text-2xl font-bold text-sky-400 font-sans transition duration-300">
        ECOFARE
      </span>  
    </a>

    {#if !isLandingPage && isLoggedIn}
      <nav class="flex items-center space-x-4 sm:space-x-8">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button class="flex items-center space-x-2 bg-transparent text-white font-medium py-2 px-4 rounded-lg transition duration-300 sm:px-6" builders={[builder]} variant="outline">
              <CircleUserIcon class="text-black w-6 h-6" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-56">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Item>
              <LifeBuoy class="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <form action="/logout" method="POST">
              <DropdownMenu.Item>
                <LogOut class="mr-2 h-4 w-4" />
                <button>Log out</button>
              </DropdownMenu.Item>
            </form>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </nav>
    {/if}
  </div>
</header>
