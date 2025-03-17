<script lang="ts">
	import { onMount } from 'svelte';
	import * as Collapsible from "$lib/components/ui/collapsible/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { LogOut,  Settings, Landmark, Dock, User, Package, MapPin, PhilippinePeso } from 'lucide-svelte'; 
	import { toast, Toaster } from 'svelte-sonner';
  
	let userData = {
        fullName: '',
    };
	let open = false;
    onMount(async () => {
        try {
            const response = await fetch('/api/user_fetch');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const userInfo = await response.json();
            console.log("Fetched user info:", userInfo); 

            if (userInfo) {
                userData.fullName = userInfo.fullname || ''; 
            } else {
                console.error("User info is undefined or null");
            }
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        }
    });
	let sidebarOpen = false;
	let sidebarRef: HTMLElement;
  
	
	function toggleSidebar() {
	  sidebarOpen = !sidebarOpen;
	}
  
	
	function handleClickOutside(event: MouseEvent) {
	  if (sidebarRef && !sidebarRef.contains(event.target as Node)) {
		sidebarOpen = false;
	  }
	}
  
	
	onMount(() => {
	  document.addEventListener('mousedown', handleClickOutside);
	  
	  return () => {
		document.removeEventListener('mousedown', handleClickOutside);
	  };
	});
  </script>
  
  <div class="flex h-screen bg-white z-100 mt-8">
	
	<!-- Sidebar -->
	<aside bind:this={sidebarRef} class={`fixed top-0 left-0 h-screen w-64 bg-white border-r transition-transform pt-16 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-0 mt-10`}>
	  <div class="flex flex-col h-full space-y-5 p-5 pb-12">
		<div class="flex gap-x-3 px-1 mb-6">
		  <User class="h-10 w-10 rounded-full bg-gray-200 p-2 text-gray-600" />
		  <div class="flex-1 overflow-hidden text-center">
			<span>WELCOME</span>
			<div class="text-start truncate text-sm font-semibold text-gray-900">{userData.fullName}</div>
		  </div>
		</div>
		<nav class="overflow-y-auto">
		  <ul class="space-y-2 text-sm">
			<li>
			  <a href="/admin/dashboard" class="flex items-center space-x-3 rounded-md p-3 hover:bg-gray-100 transition">
				<Dock class="h-5 w-5 text-gray-600" />
				<span class="text-gray-700">Dashboard</span>
			  </a>
			</li>
  
			<!-- Collapsible Stores Section -->
			<Collapsible.Root class="overflow-y-auto">
			  <Collapsible.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="sm" class="w-full p-3 flex space-x-3 rounded-md hover:bg-gray-100 transition">
				  <Landmark class="h-5 w-5 text-gray-600" />
				  <span class="text-gray-700 text-start flex w-full">Manage User</span>
				</Button>
			  </Collapsible.Trigger>
			  <Collapsible.Content class="space-y-2 mt-2 pl-6">
				<a href="/admin/manage" class="block text-sm rounded-md p-2 hover:bg-gray-50 text-gray-600 transition"> > Manage Passenger</a>
				<a href="/admin/manage" class="block text-sm rounded-md p-2 hover:bg-gray-50 text-gray-600 transition"> > Manage Driver</a>
			  </Collapsible.Content>
			</Collapsible.Root>
			<Collapsible.Root class="overflow-y-auto">
				<Collapsible.Trigger asChild let:builder>
				  <Button builders={[builder]} variant="ghost" size="sm" class="w-full p-3 flex space-x-3 rounded-md hover:bg-gray-100 transition">
					<PhilippinePeso class="h-5 w-5 text-gray-600" />
					<span class="text-gray-700 text-start flex w-full">Donation</span>
				  </Button>
				</Collapsible.Trigger>
				<Collapsible.Content class="space-y-2 mt-2 pl-6">
				  <a href="/admin/donation/history" class="block text-sm rounded-md p-2 hover:bg-gray-50 text-gray-600 transition"> > History</a>
				</Collapsible.Content>
			  </Collapsible.Root>
			<Collapsible.Root class="overflow-y-auto">
			  <Collapsible.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="sm" class="w-full p-3 flex space-x-3 rounded-md hover:bg-gray-100 transition">
				  <MapPin class="h-5 w-5 text-gray-600" />
				  <span class="text-gray-700 text-start flex w-full">Tours</span>
				</Button>
			  </Collapsible.Trigger>
			  <Collapsible.Content class="space-y-2 mt-2 pl-6">
				<a href="/admin/tour/tour_packages" class="block text-sm rounded-md p-2 hover:bg-gray-50 text-gray-600 transition"> > Manage Tour Package</a>
				<a href="/admin/tour/manage_tour" class="block text-sm rounded-md p-2 hover:bg-gray-50 text-gray-600 transition"> > Manage Tours</a>
				<a href="/admin/tour/scanner" class="block text-sm rounded-md p-2 hover:bg-gray-50 text-gray-600 transition"> > Scanner</a>
				<a href="/admin/tour/history" class="block text-sm rounded-md p-2 hover:bg-gray-50 text-gray-600 transition"> > Tour History</a>
			  </Collapsible.Content>
			</Collapsible.Root>
			<!-- Collapsible Settings Section -->
			<Collapsible.Root class="overflow-y-auto">
			  <Collapsible.Trigger asChild let:builder>
				<Button builders={[builder]} variant="ghost" size="sm" class="w-full p-3 flex space-x-3 rounded-md hover:bg-gray-100 transition">
				  <Settings class="h-5 w-5 text-gray-600" />
				  <span class="text-gray-700 text-start flex w-full">Settings</span>
				</Button>
			  </Collapsible.Trigger>
			  <Collapsible.Content class="space-y-2 mt-2 pl-6">
				<a href="/landmark/sub2" class="block text-sm rounded-md p-2 hover:bg-gray-50 text-gray-600 transition"> > Update Profile</a>
				<form action="/logout" method="POST">
					<button type="submit" class="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-100 transition">
						<LogOut class="mr-2 h-4 w-4" />
						<span>Log out</span>
					</button>
				</form>
			  </Collapsible.Content>
			</Collapsible.Root>
		  </ul>
		</nav>
	  </div>
	</aside>
  
	<!-- Main Content Area -->
	<div class={`flex-1 p-6 transition-all ${sidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64 pt-14`}>
	  
	  <!-- Mobile Sidebar Toggle Button -->
	  <div class="container flex items-center justify-between p-4 md:hidden">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<button class="rounded border" on:click={toggleSidebar}>
		  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="h-6 w-6 text">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
		  </svg>
		</button>
	  </div>
  
	  <!-- Main Content -->
	  <main class="flex-1">
		<Toaster richColors position="top-center" />
		<slot />
	  </main>
	</div>
  </div>
  
  <style>
	/* Mobile Styles */
	@media (max-width: 768px) {
	  aside {
		transition: transform 0.3s ease;
	  }
	  aside.translate-x-0 {
		transform: translateX(0);
	  }
  
	  .flex-1 {
		padding-left: 0;
		padding-right: 0;
	  }
  
	  .ml-0 {
		margin-left: 0;
	  }
  
	  .ml-64 {
		margin-left: 0;
	  }
	}
  
	/* Larger Screens (Sidebar in place) */
	@media (min-width: 768px) {
	  .md\:ml-64 {
		margin-left: 16rem; /* Sidebar width */
	  }
  
	  .flex-1 {
		padding-left: 2rem;
		padding-right: 2rem;
	  }
	}
  </style>
  