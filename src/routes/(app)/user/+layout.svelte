<script>
	import Navbar from "$lib/components/ui/navbar/navbar.svelte";
	import Footer from "$lib/components/ui/footer/footer.svelte";
	let { children } = $props();
</script>
<Navbar/>
{@render children()}
<Footer/>