<script> 
  import { goto } from '$app/navigation';
  export let productId;
  import productService from '$lib/services/productService';
  
	let active = false;
</script>

<div class="flex gap-12">
  <div class="relative">
    <button on:click={()=> active = !active}>
      <i class="fa-solid fa-cart-shopping"></i>
    </button>
    {#if productId?.length >= 1}
    <div
      class="absolute px-1 bg-red-400 -top-1 -right-1 rounded-full border-2 border-white text-white"
      id="cart"
      style="font-size: 10px"
    >
      {productId?.length}
    </div>
    {/if}
  </div>
</div>


<aside class:active>
	<a class="w-96" href="/checkout">Checkout</a>
</aside>

<style>
	aside {
		position: absolute;
		right: -500px;
		transition: all .5s;
		height: 500px;
		width: 300px;
		padding: 20px;
		border: 1px solid #ddd;
		background-color: #efefef;
	}
	.active {
		right: 0px
	}

</style>

