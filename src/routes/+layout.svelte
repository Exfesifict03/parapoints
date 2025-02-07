<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Loading from '$lib/components/ui/loadingspinner/Loading.svelte';
  
	let loading = true;
  
	async function startLoading() {
	  loading = true;
	  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
	  loading = false;
	}
  
	onMount(startLoading);
  
	// Cancel loading once navigation is complete
	afterNavigate(() => {
	  loading = false;
	});
  </script>
  
  {#if loading}
	<Loading {loading} />
  {:else}
	<slot />
  {/if}
  