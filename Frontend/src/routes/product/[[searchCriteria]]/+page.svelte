<script lang="ts">
  import { page } from "$app/stores";
  import productService from "$lib/services/productService";
  import {afterNavigate, goto} from '$app/navigation'
    import { onMount } from "svelte";
  
  let products: IProductResponse[] = [];

  onMount(async () => {
    let searchCriteria = null;

    $: searchCriteria = $page.params.searchCriteria;

    let productListRequest: IProductListRequest =  {
      page : 0,
      pageSize : 200,
      search : searchCriteria,
      tags : [],
    }

    productService.productList.subscribe((value) => {
      if(!value){
        return;
      }
      else{
        products = value;
      }
    });

    await productService.getProductList(productListRequest); 
  });

  afterNavigate(async () => {
    let searchCriteria = null;

    $: searchCriteria = $page.params.searchCriteria;

    let productListRequest: IProductListRequest =  {
      page : 0,
      pageSize : 200,
      search : searchCriteria,
      tags : [],
    }

    productService.productList.subscribe((value) => {
      if(!value){
        return;
      }
      else{
        products = value;
      }
    });

    await productService.getProductList(productListRequest);  
  });

  function viewProduct(id: number){
    goto(`/product/productDetail/${id}`);
  }

  $: searchCriteria = $page.params.searchCriteria;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

  {#if !products}
    <div class="w-full justify-center">
      <p>Loading...</p>
    </div>
  {:else}
  <div class="grid grid-cols-1 xl:grid-cols-4 gap-4 px-1 py-4">
    {#each products as product}
    <div class="flex flex-col rounded-2xl w-72 bg-[#ffffff] shadow-xl p-4 h-96">
        <button class="h-full" on:click={()=> viewProduct(product.id)}>
        <figure class="flex justify-center items-center rounded-2xl">
          <img
            src="{product.primaryImage}"
            alt="Card Preview"
            class="size-32"
          />
        </figure>
        <div class="flex flex-col pt-5">
          <div class="text-base font-bold pb-6">{product.name}</div>
          <div class="flex justify-start pt-6 text-xl text-sky-600">
            <p>R{product.price}</p>
          </div>
        </div>
      </button>
    </div>
  {/each}
  </div>
  {/if}

  