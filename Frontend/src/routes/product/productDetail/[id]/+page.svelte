<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
	import ProductDetailSection from '$lib/components/productDetailsSection.svelte';
	import productService from '$lib/services/productService';
	import { page } from '$app/stores';

	let searchCriteria: string;
    $: id = $page.params.id;
	console.log(id);
	let product: any;
	productService.getProductSingle(parseInt(id)).then((res) => {
		product = productService.productSingle;
	});
</script>

<div class="flex">
	<ProductDetailSection {product} ></ProductDetailSection>
	
</div>