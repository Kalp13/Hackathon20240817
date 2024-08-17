<script lang="ts">
  import { page } from "$app/stores";
  import productService from "$lib/services/productService";
  import { onMount } from "svelte";
  

  let productListRequest: IProductListRequest =  {
    page : 0,
    pageSize : 200,
    search : "",
    tags : [],
  }

  let products: IProductResponse[] = [];


  onMount(async () => {
    productService.productList.subscribe((value) => {
	  console.log(value);
    products = value;
    });

    await productService.getProductList(productListRequest);  
  });

  $: searchCriteria = $page.params.searchCriteria;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
  {#if searchCriteria}
    <p>
      {searchCriteria}
    </p>
  {:else}
    <p>Loading...</p>
  {/if}
</div>

  <div class="grid grid-cols-1 xl:grid-cols-4 gap-4 px-1 py-4">
    {#each Array(products) as product, index}
      <div class="flex flex-col rounded-2xl w-72 bg-[#ffffff] shadow-xl">
        <figure class="flex justify-center items-center rounded-2xl">
          <img
            src="https://tailwind-generator.b-cdn.net/images/card-generator/tailwind-card-generator-card-preview.png"
            alt="Card Preview"
            class="rounded-t-2xl"
          />
        </figure>
        <div class="flex flex-col p-8">
          <div class="text-2xl font-bold text-[#374151] pb-6">{product}</div>
          <div class="flex justify-start pt-6">
            <p>Price</p>
          </div>
        </div>
      </div>
    {/each}
  </div>

