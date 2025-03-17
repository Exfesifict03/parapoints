<script lang="ts">
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";

    type ActivityLog = {
        user_id: string;
        name: string;
        amount: number;
        created_at: string;
    };

    let logs: ActivityLog[] = [];
    let loading: boolean = true;
    let error: string = "";
    let currentPage: number = 1;
    let logsPerPage: number = 10; // Show 10 logs per page

    async function fetchActivityLogs() {
        loading = true;
        const { data, error: fetchError } = await supabase
            .from("history")
            .select(`
                user_id,
                amount,
                created_at,
                user: user_id!inner (firstname, lastname)
            `) 
            .order("created_at", { ascending: false });

        if (fetchError) {
            console.error("Error fetching logs:", fetchError.message);
            error = "Failed to load activity logs.";
        } else {
            logs = data.map(log => ({
                user_id: log.user_id,
                name: log.user ? `${log.user.firstname} ${log.user.lastname}` : "Unknown",
                amount: log.amount,
                created_at: new Date(log.created_at).toLocaleString()
            }));
        }
        loading = false;
    }

    // Get logs for the current page
    function paginatedLogs() {
        const start = (currentPage - 1) * logsPerPage;
        const end = start + logsPerPage;
        return logs.slice(start, end);
    }

    // Total number of pages
    function totalPages() {
        return Math.ceil(logs.length / logsPerPage);
    }

    // Change page
    function changePage(page: number) {
        if (page > 0 && page <= totalPages()) {
            currentPage = page;
        }
    }

    onMount(fetchActivityLogs);
</script>

<div class="p-6">
    <h1 class="text-2xl font-bold mb-4">User Activity Log</h1>

    {#if loading}
        <p>Loading activity logs...</p>
    {:else if error}
        <p class="text-red-500">{error}</p>
    {:else}
        <div class="overflow-x-auto border rounded-lg shadow-md">
            <table class="w-full border-collapse border border-gray-300 min-w-[600px]">
                <thead class="bg-gray-200 text-gray-700">
                    <tr>
                        <th class="border p-3 text-left">User ID</th>
                        <th class="border p-3 text-left">Name</th>
                        <th class="border p-3 text-left">Amount</th>
                        <th class="border p-3 text-left">Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {#each paginatedLogs() as log}
                        <tr class="hover:bg-gray-100">
                            <td class="p-3 border">{log.user_id}</td>
                            <td class="p-3 border">{log.name || 'N/A'}</td>
                            <td class="p-3 border font-semibold text-center" class:text-black={log.amount > 0} class:text-red-600={log.amount < 0}>
                                {log.amount > 0 ? `+${log.amount}` : log.amount}
                            </td>
                            <td class="p-3 border">{log.created_at}</td>
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
</div>
