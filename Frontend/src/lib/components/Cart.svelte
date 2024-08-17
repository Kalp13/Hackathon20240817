<script> 
  import { goto } from '$app/navigation';
  export let productId;
  import productService from '$lib/services/productService';
  
	let active = false;

  let cart = [];
	let products = [
		{id: 1, name: "Apple", image: "https://www.applesfromny.com/wp-content/uploads/2020/05/Jonagold_NYAS-Apples2.png", price: 10, quantity: 1},
		{id: 2, name: "Orange", image: "https://5.imimg.com/data5/VN/YP/MY-33296037/orange-600x600-500x500.jpg", price: 11, quantity: 1},
		{id: 3, name: "Grapes", image: "https://www.aicr.org/wp-content/uploads/2020/01/shutterstock_533487490-640x462.jpg", price: 12, quantity: 1},
	]
	
	const addToCart = (product) => {
		for(let item of cart) {
				if(item.id === product.id) {
					product.quantity += 1
					cart = cart;
					return;
				}
		}
		cart = [...cart, product]
	}
	
	const minusItem = (product) => {
		for(let item of cart) {
				if(item.id === product.id) {
					if(product.quantity > 1 ) {
							product.quantity -= 1
							cart = cart
					} else {
							cart = cart.filter((cartItem) => cartItem != product)
					}
					return;
				}
		}
	}
	
	const plusItem = (product) => {
		for(let item of cart) {
			if(item.id === product.id) {
				item.quantity += 1
				cart = cart;
				return;
			}
		}
	}

	$: total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
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
    <p>There are {cart.length} items in your cart</p>
    <div class="cart-list">
      {#each cart as item }
        {#if item.quantity > 0}
        <div class="cart-item">
          <img width="50" src={item.image} alt={item.name}/>
          <div>{item.quantity}
            <button on:click={() => plusItem(item)}>+</button>
            <button on:click={() => minusItem(item)}>-</button>
          </div>
          <p>R{item.price * item.quantity}</p>
        </div>
        {/if}
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

  .product-list, .cart-item {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
	}
	
	.image {
		height: 150px;
		width: 150px;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}
	.total {
		text-align: right;
	}
	
	.cart-list {
		border: 2px solid;
		padding: 10px;
	}

</style>

