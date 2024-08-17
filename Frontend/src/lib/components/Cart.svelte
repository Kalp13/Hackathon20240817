<script lang="ts"> 
  import { goto } from '$app/navigation';
	import { onMount } from "svelte";
	// import productService from '$lib/services/productService';
  import cartService from '$lib/services/cartService';
  
	let active = false;
	let cartItems: IProductResponse[] = [];
  let total = 0;
  
  function showHideCart() {
    active = !active;
  }

	onMount(async () => {
    // cartService.cart.subscribe((value) => {
	  // console.log(value);
	  // cartItems = value;

    // if (cartItems?.length > 0)
    // {
    //   total = cartItems?.reduce((acc, item) => {
    //     return acc + item.price;
    //   }, 0)
    // }
    // });
  });
</script>

<div class="flex gap-11">
  <div class="relative">
    <button on:click={showHideCart}>
      <i class="fa-solid fa-cart-shopping"></i>
    </button>
    {#if cartItems?.length >= 1}
    <div
      class="absolute px-1 bg-red-400 -top-1 -right-1 rounded-full border-2 border-white text-white"
      id="cart"
      style="font-size: 10px">
      {cartItems?.length}
    </div>
    {/if}
  </div>
</div>

{#if active}
<aside>
	<div>
    <p>There are {cartItems?.length} items in your cart</p>
    <div class="cart-list">
      {#if cartItems?.length > 0}
        {#each cartItems as item }
        <div class="cart-item">
          <img width="50" src="https://e7.pngegg.com/pngimages/1021/795/png-clipart-a-small-drop-of-water-blue-water-droplets-thumbnail.png" alt={item.name}/>
          <div>{item.quantity}
            <button on:click={() => cartService.addToCart(item)}>+</button>
            <button on:click={() => cartService.removeFromCart(item)}>-</button>
          </div>
          <p>R{item.price}</p>
        </div>
        {/each}
        <div class="total">
          <h4>Total: R {total}</h4>
        </div>
        <a href="/checkout" class="px-5 py-3 bg-green-700 text-white cursor-pointer rounded-full hover:bg-green-500 hover:text-yellow active:bg-amber-500">Checkout</a>
      {/if}
      {#if cartItems?.length <= 0}
        <p>Your cart is empty</p>
      {/if}
    </div>
  </div>
</aside>
{/if}

<style>
	aside {
		position: absolute;
    height: 100vh;
    right: 0px;
    visibility: visible;
    transition: width 2s;
    transition-property: all;
		transition-duration: 2s;
		width: 300px;
		padding: 20px;
		border: 1px solid #ddd;
		background-color: #fff;
    z-index: 1000;
	}
	.total {
		text-align: right;
	}
	
	.cart-list {
		border: 2px solid;
		padding: 10px;
	}

</style>

