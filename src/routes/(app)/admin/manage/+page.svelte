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
	let searchQuery: string = "";
	let currentPage: number = 1;
	const pageSize: number = 10;

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
		return users.filter(user =>
			[user.firstname, user.lastname, user.email]
				.some(field => field.toLowerCase().includes(searchQuery.toLowerCase()))
		);
	}

	// Pagination logic
	function paginatedUsers() {
		const start = (currentPage - 1) * pageSize;
		return filteredUsers().slice(start, start + pageSize);
	}

	function nextPage() {
		if (currentPage < Math.ceil(filteredUsers().length / pageSize)) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	onMount(fetchUsers);
</script>

<div class="p-6">
	<h1 class="text-2xl font-bold mb-4">User Management</h1>
	<input 
		type="text" 
		bind:value={searchQuery} 
		placeholder="Search user..." 
		class="p-2 border rounded w-full mb-4"
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
						<th class="border p-3">ID</th>
						<th class="border p-3">First Name</th>
						<th class="border p-3">Middle Name</th>
						<th class="border p-3">Last Name</th>
						<th class="border p-3">Email</th>
						<th class="border p-3">Points</th>
						<th class="border p-3">Column</th>
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
							<td class="p-3 border text-center font-semibold">N/A</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="flex justify-between items-center mt-4">
			<button on:click={prevPage} class="px-4 py-2 bg-gray-300 rounded" disabled={currentPage === 1}>Previous</button>
			<span>Page {currentPage} of {Math.ceil(filteredUsers().length / pageSize)}</span>
			<button on:click={nextPage} class="px-4 py-2 bg-gray-300 rounded" disabled={currentPage >= Math.ceil(filteredUsers().length / pageSize)}>Next</button>
		</div>
	{/if}
	<UserActivityLogs />
</div>
