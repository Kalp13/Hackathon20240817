<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
	import ProductDetailSection from '$lib/components/productDetailsSection.svelte';
	import productService from '$lib/services/productService';
	import { page } from '$app/stores';
	import { onMount } from "svelte";
	let searchCriteria: string;
    $: id = $page.params.id;
	console.log(id);
	let product: any;

	onMount(async () => {
    productService.productSingle.subscribe((value) => {
	  console.log(value);
	  product = value;
    });
    await productService.getProductSingle(parseInt(id));  
  });

//   $: searchCriteria = $page.params.searchCriteria;
// 	productService.getProductSingle(parseInt(id)).then((res) => {
// 		product = productService.productSingle;
// 	});
</script>

<div class="flex">
	<ProductDetailSection {product} ></ProductDetailSection>
	
</div>