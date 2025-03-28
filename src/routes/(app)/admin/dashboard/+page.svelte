<script lang="ts">
  import Dashboard from '$lib/components/ui/dashboard/Dashboard.svelte';

  let data = [
    { title: 'Active Users', value: '0', icon: '3', color: 'blue' },
    { title: 'Total Points Earned', value: '0', icon: '1', color: 'yellow' },
    { title: 'Completed Transactions', value: '0', icon: '2', color: 'blue' },
    { title: 'Pending Transactions', value: '0', icon: '4', color: 'blue' },
    { title: 'EcoFare Revenue', value: '₱0', icon: '8', color: 'yellow' },
  ];
</script>

<div class="container mx-auto p-8">
  <h1 class="text-3xl font-bold text-sky-400 mb-6">EcoFare Dashboard</h1>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {#each data as { title, value, icon, color }}
      <Dashboard {title} {value} {icon} {color} />
    {/each}
  </div>
</div>
