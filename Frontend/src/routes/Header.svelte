<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';

	import Cart from '$lib/components/Cart.svelte'
	import ProductSearch from '$lib/components/ProductSearch.svelte'
    import { goto } from '$app/navigation';

	function navigateToLogin(){
		goto('login')
	}
</script>

<header>
	<nav>
		<div class="nav">
			<ul>
				<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
					<a href="/">Home</a>
				</li>
				<li aria-current={$page.url.pathname.startsWith('/product') ? 'page' : undefined}>
					<a href="/product">Products</a>
				</li>
			</ul>
		</div>
		<div class="search">
			<ProductSearch />
		</div>
		<div class="right-elements">
			<div class="cart">
				<Cart />
			</div>
			<div class="signIn">
				<button on:click={navigateToLogin}>
					<i class="fa-solid fa-user"></i>
				  </button>
			</div>
		</div>
	</nav>
</header>

<style>

	.nav{
		float:left; 

	}

	.right-elements{
		float: right;
		justify-content: right;
		align-items: center;
	}

	.signIn {
		padding: 5px;
	}

	.cart {
		padding: 5px;
	}

	nav {
		--background: rgba(255, 255, 255, 0.7);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--background);
		background-size: contain;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	.search{
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
		height: 3em;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav li a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
