<script lang="ts">
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabaseClient";
	import UserActivityLogs from "$lib/components/UserActivityLogs/UserActivityLogs.svelte";

	type User = {
		id: string;
		firstname: string;
		middlename?: string | null;
		lastname: string;
		email: string;
		points: number;
	};

	let users: User[] = [];
	let loading: boolean = true;
	let error: string = "";
	let currentPage: number = 1;
	let usersPerPage: number = 10; // Show 10 users per page
	let searchQuery: string = ""; // Search input

	// Fetch users from Supabase (excluding admins)
	async function fetchUsers() {
		loading = true;
		const { data, error: fetchError } = await supabase
			.from("user")
			.select("id, firstname, middlename, lastname, email, points")
			.neq("role", "admin");

		if (fetchError) {
			console.error("Error fetching users:", fetchError.message);
			error = "Failed to load users.";
		} else {
			users = data as User[];
		}
		loading = false;
	}

	// Filter users based on search query
	function filteredUsers() {
		if (!searchQuery.trim()) return users; // If search is empty, return all users
		const lowerQuery = searchQuery.toLowerCase();

		return users.filter(user =>
			user.firstname.toLowerCase().includes(lowerQuery) ||
			user.lastname.toLowerCase().includes(lowerQuery) ||
			user.email.toLowerCase().includes(lowerQuery)
		);
	}

	// Get paginated users after filtering
	function paginatedUsers() {
		const filtered = filteredUsers();
		const start = (currentPage - 1) * usersPerPage;
		const end = start + usersPerPage;
		return filtered.slice(start, end);
	}

	// Total number of pages (based on search results)
	function totalPages() {
		return Math.ceil(filteredUsers().length / usersPerPage);
	}

	// Change page
	function changePage(page: number) {
		if (page > 0 && page <= totalPages()) {
			currentPage = page;
		}
	}

	// Reset to first page when searching
	$: if (searchQuery) {
		currentPage = 1;
	}

	onMount(fetchUsers);
</script>

<div class="p-6">
	<h1 class="text-2xl font-bold mb-4">User Management</h1>

	<!-- Search Input -->
	<input 
		type="text" 
		bind:value={searchQuery} 
		placeholder="Search by name or email..." 
		class="border p-2 rounded w-full mb-4"
	/>

	{#if loading}
		<p>Loading users...</p>
	{:else if error}
		<p class="text-red-500">{error}</p>
	{:else}
		<div class="overflow-x-auto border rounded-lg shadow-md">
			<table class="w-full border-collapse border border-gray-300 min-w-[900px]">
				<thead class="bg-gray-200 text-gray-700 sticky top-0">
					<tr>
						<th class="border p-3 text-left">ID</th>
						<th class="border p-3 text-left">First Name</th>
						<th class="border p-3 text-left">Middle Name</th>
						<th class="border p-3 text-left">Last Name</th>
						<th class="border p-3 text-left">Email</th>
						<th class="border p-3 text-left">Points</th>
					</tr>
				</thead>
				<tbody>
					{#each paginatedUsers() as user}
						<tr class="hover:bg-gray-100">
							<td class="p-3 border truncate max-w-[120px]">{user.id}</td>
							<td class="p-3 border truncate max-w-[120px]">{user.firstname}</td>
							<td class="p-3 border truncate max-w-[120px]">{user.middlename || 'N/A'}</td>
							<td class="p-3 border truncate max-w-[120px]">{user.lastname}</td>
							<td class="p-3 border truncate max-w-[180px]">{user.email}</td>
							<td class="p-3 border text-center font-semibold">{user.points}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination Controls -->
		<div class="flex justify-center items-center space-x-2 mt-4">
			<button 
				class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
				on:click={() => changePage(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</button>

			<span class="px-4">Page {currentPage} of {totalPages()}</span>

			<button 
				class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
				on:click={() => changePage(currentPage + 1)}
				disabled={currentPage === totalPages()}
			>
				Next
			</button>
		</div>
	{/if}

	<UserActivityLogs />
</div>
