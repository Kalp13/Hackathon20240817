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
  <div class="grid grid-cols-1 xl:grid-cols-4 gap-4 px-1 py-4">
    {#each products as product, index}
      <div class="flex flex-col rounded-2xl w-72 bg-[#ffffff] shadow-xl">
        <figure class="flex justify-center items-center rounded-2xl">
          <img
            src="{product.primaryImage}"
            alt="Card Preview"
            class="rounded-t-2xl"
          />
        </figure>
        <div class="flex flex-col p-8">
          <div class="text-2xl font-bold text-[#374151] pb-6">{product.name}</div>
          <div class="flex justify-start pt-6">
            <p>R{product.price}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>

