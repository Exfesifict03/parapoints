<script lang="ts">
    import Dashboard from '$lib/components/ui/dashboard/Dashboard.svelte';
  
    let data = [
      { title: 'Active Users', value: '0', icon: '3', color: 'yellow' },
      { title: 'Productsasdasds', value: '0', icon: '7', color: 'yellow' },
      { title: 'Stores', value: '0', icon: '1', color: 'blue' },
      { title: 'Store Owners', value: '0', icon: '2', color: 'green' },
      { title: 'Donations', value: '0', icon: '4', color: 'yellow' },
      { title: 'Completed Orders', value: '0', icon: '6', color: 'red' },
      { title: 'Completed Tours', value: '0', icon: '5', color: 'red' },
      { title: 'Total Store Revenue', value: '0', icon: '8', color: '' },
    ];
  </script>
  
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each data as { title, value, icon, color }}
        <Dashboard {title} {value} {icon} {color} />
      {/each}
    </div>
  </div>