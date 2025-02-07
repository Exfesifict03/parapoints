<!-- src/lib/components/Loading.svelte -->
<script lang="ts">
    export let loading: boolean = true;
  </script>
  
  {#if loading}
    <div class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
    </div>
  {/if}