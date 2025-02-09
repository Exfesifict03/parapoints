<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Loading from '$lib/components/ui/loadingspinner/Loading.svelte';
	import Navbar from "$lib/components/ui/navbar/navbar.svelte";
	import Footer from "$lib/components/ui/footer/footer.svelte";
  
	let loading = true;
  
	async function startLoading() {
	  loading = true;
	  await new Promise(resolve => setTimeout(resolve, 1000)); 
	  loading = false;
	}
  
	onMount(startLoading);
  
	afterNavigate(() => {
	  loading = false;
	});
  </script>
<Navbar/>
  {#if loading}
	<Loading {loading} />
  {:else}
	<slot />
  {/if}

<Footer/>

  