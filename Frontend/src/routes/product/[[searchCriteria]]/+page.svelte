<script lang="ts">
  import { ProductService } from "$lib/services/productService";

	ProductService
  let counter = 20;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let searchCriteria: string;

    $: searchCriteria = $page.params.searchCriteria;
</script>

<div class="grid grid-cols-1 xl:grid-cols-4 gap-4 px-1 py-4">
  {#each Array(counter) as _, index}
  <div class="flex flex-col rounded-2xl w-72 bg-[#ffffff] shadow-xl">
    <figure class="flex justify-center items-center rounded-2xl">
        <img src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png" alt="Card Preview" class="rounded-t-2xl">
    </figure>
    <div class="flex flex-col p-8">
        <div class="text-2xl font-bold   text-[#374151] pb-6">Product Name</div>
        <div class="flex justify-start pt-6">
            <p>Price</p>
        </div>
    </div>
</div>
  {/each}
<div class="text-column">
    {#if searchCriteria}
        <p>
            {searchCriteria}
        </p>
    {:else}
    <p>Loading...</p>
    {/if}

	<h1>About this app</h1>

	<p>
		This is a <a href="https://kit.svelte.dev">SvelteKit</a> app. You can make your own by typing the
		following into your command line and following the prompts:
	</p>

	<pre>npm create svelte@latest</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.
	</p>

	<p>
		The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling. Try
		using it with JavaScript disabled!
	</p>
</div>

</div>