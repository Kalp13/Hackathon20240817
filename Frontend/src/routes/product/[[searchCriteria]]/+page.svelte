<script lang="ts">
  import { page } from "$app/stores";
  import productService from "$lib/services/productService";
  import {afterNavigate, goto} from '$app/navigation'
  import { onMount } from "svelte";

  let products: IProductResponse[] = [];
  let tags: ITagResponse[] = [];

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

    productService.tags.subscribe((value) => {
      if(!value){
        return;
      }
      else{
        tags = value;
        console.log(tags);
      }
    });

    await productService.getProductList(productListRequest);
    await productService.getTagsList();
  });

  afterNavigate(async () => {
    let searchCriteria = $page.params.searchCriteria;
    let searchTags = tags.filter(x => x.name.toLowerCase() === searchCriteria.toLowerCase())
            .map(x => x.name.toLowerCase());

    if(searchTags.length != 0) {
      searchCriteria = ""
    }

    console.log(searchTags);

    let productListRequest: IProductListRequest =  {
      page : 0,
      pageSize : 200,
      search : searchCriteria,
      tags : searchTags,
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
    await productService.getTagsList();
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
      <div
        class=" rounded-2xl w-72 bg-[#ffffff] shadow-xl p-4 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <button class="h-full flex flex-col justify-between" on:click={() => viewProduct(product.id)}>
          <figure class="flex justify-center items-center rounded-2xl">
            <img
              src={product.primaryImage}
              alt="Card Preview"
              class="w-full aspect-square "
            /> 
          </figure>
          <div class="text-base flex justify-start pt-5 font-bold pb-6">{product.name}</div>
          <div class="flex justify-start flex- pt-6 text-xl text-sky-600">
            <p>R{product.price}</p>
          </div>
        </button>
      </div>
    {/each}
  </div>
{/if}
