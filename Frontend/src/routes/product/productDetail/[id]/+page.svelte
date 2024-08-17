<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
	import ProductDetailSection from '$lib/components/productDetailsSection.svelte';
	import productService from '$lib/services/productService';
	import { page } from '$app/stores';
	import { onMount } from "svelte";
	import {goto,afterNavigate} from '$app/navigation'
  
	function viewProduct(id: number){
		goto(`/product/productDetail/${id}`);
	}

	let productListRequest: IProductListRequest =  {
		page : 0,
		pageSize : 5,
		search : "",
		tags : [],
	}

	let products: IProductResponse[] = [];
	let randomProducts: IProductResponse[] = [];


	// let searchCriteria: string;
    $: id = $page.params.id;
	console.log(id);
	let product: any;

	onMount(async () => {
		productService.productSingle.subscribe((value) => {
			console.log(value);
			product = value;
		});
		await productService.getProductSingle(parseInt(id));  

		//big list:
		productService.productList.subscribe((value) => {
		if(!value){
			return;
		}
		else{
			products = value;
		}
		});
		await productService.getProductList(productListRequest);  

		//randomList:
		productService.productListRandom.subscribe((value) => {
		if(!value){
			return;
		}
		else{
			randomProducts = value;
		}
		});
		
		setInterval(async () => {
			await productService.getProductListRandom(); 
			console.log("stuff");
		}, 20000);
		
  	});
	
  afterNavigate(async () => {
	// productService.productSingle.subscribe((value) => {
	// 	console.log(value);
	// 	product = value;
	// });
	await productService.getProductSingle(parseInt(id));  

	//big list:
	// productService.productList.subscribe((value) => {
	// if(!value){
	// 	return;
	// }
	// else{
	// 	randomProducts = value;
	// }
	// });

	await productService.getProductList(productListRequest);  
});


</script>

<div class="flex flex-row justify-center">
	<ProductDetailSection {product} ></ProductDetailSection>
</div>

<hr class="my-4 border-gray-300" />
<div class="flex flex-row flex-wrap mx-20 mt-2 justify-center">
	{#if !product}
		<div class="w-full justify-center">
			<p>Loading...</p>
		</div>
	{:else}
		{#each randomProducts as rndProduct}
		<div class="flex flex-col mx-1 mt-2 rounded-2xl w-72 bg-[#ffffff] shadow-xl p-4 h-96">
			<button class="h-full" on:click={()=> viewProduct(rndProduct.id)}>
			<figure class="flex justify-center items-center rounded-2xl">
			<img
				src="{rndProduct.primaryImage}"
				alt="Card Preview"
				class="size-32"
			/>
			</figure>
			<div class="flex flex-col pt-5">
			<div class="text-base font-bold pb-6">{rndProduct.name}</div>
			<div class="flex justify-start pt-6 text-xl text-sky-600">
				<p>R{rndProduct.price}</p>
			</div>
			</div>
		</button>
		</div>
	{/each}
	{/if}
</div>