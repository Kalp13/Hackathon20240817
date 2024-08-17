<script lang="ts">
  import { page } from "$app/stores";
  import productService from "$lib/services/productService";
  import {afterNavigate, goto} from '$app/navigation';
  
  let products: IProductResponse[] = [];
  let pageNumber: number = 0;
  let y: number;

  afterNavigate(async () => {
    productService.productList.subscribe((value) => {
      if(value == undefined){
        return;
      }

      value.forEach(el =>{
        products.push(el);
      });
      products = products;
      console.log(products);
    });

    await fetchProducts();
  });

  async function fetchProducts(pageNumber:number = 0){
    let productListRequest: IProductListRequest =  {
      page : pageNumber,
      pageSize : 10,
      search : searchCriteria,
      tags : []
    }

    await productService.getProductList(productListRequest); 
  }

  function viewProduct(id: number){
    goto(`/product/productDetail/${id}`);
  }

  async function loadMore(){
    pageNumber++;
    await fetchProducts(pageNumber);
  }

  async function checkScrollPosition(){
    const scrolledTo = window.scrollY + window.innerHeight
    const isReachBottom = document.body.scrollHeight === scrolledTo

    if (isReachBottom) 
      await loadMore();
  }

  $: searchCriteria = $page.params.searchCriteria;
</script>

<svelte:head>
  <title>About</title>
  <meta name="description" content="About this app" />
</svelte:head>

<svelte:window on:scroll={checkScrollPosition} bind:scrollY={y} />

  <div class="grid grid-cols-1 xl:grid-cols-4 gap-4 px-1 py-4">
    {#each products as product, index}
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