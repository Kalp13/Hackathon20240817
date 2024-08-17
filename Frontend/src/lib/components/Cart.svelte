<script lang="ts"> 
	import productService from '$lib/services/productService';
  import { goto } from '$app/navigation';
  export let productId;
	import { onMount } from "svelte";
  
	let active = false;
	let cartItems: IProductResponse[] = [];
  let total = 0;

	onMount(async () => {
    productService.cart.subscribe((value) => {
	  console.log(value);
	  cartItems = value;

    total = cartItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    });
  });
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
      style="font-size: 10px">
      {productId?.length}
    </div>
    {/if}
  </div>
</div>


<aside class:active>
	<div>
    <p>There are {cartItems.length} items in your cart</p>
    <div class="cart-list">
      {#each cartItems as item }
      <div class="cart-item">
        <img width="50" src={item.primaryImage} alt={item.name}/>
        <div>{item.quantity}
          <button on:click={() => productService.addToCart(item)}>+</button>
          <button on:click={() => productService.removeFromCart(item)}>-</button>
        </div>
        <p>R{item.price}</p>
      </div>
      {/each}
      <div class="total">
        <h4>Total: R {total}</h4>
      </div>
    </div>
    <a href="/checkout" class="px-5 py-3 bg-green-700 text-white cursor-pointer rounded-full hover:bg-green-500 hover:text-yellow active:bg-amber-500">Checkout</a>
  </div>
</aside>

<style>
	aside {
		position: absolute;
    height: 100vh;
    right: 0px;
    transition: width 2s;
    visibility: collapse;
    transition-property: all;
		transition-duration: 2s;
		width: 300px;
		padding: 20px;
		border: 1px solid #ddd;
		background-color: #fff;
    z-index: 1000;
	}
	.active {
    visibility: visible;
	}
	.total {
		text-align: right;
	}
	
	.cart-list {
		border: 2px solid;
		padding: 10px;
	}

</style>

