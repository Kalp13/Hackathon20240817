<script lang="ts">
    import type { NullValue } from "rollup";



	// let searchCriteria: string;
    // $: searchCriteria = $page.params.searchCriteria;
	// import ProductService from '$lib/services/productService';
	// let productService = ProductService.getProductSingle(1);


	export let product: IProductResponse;
	product = {
	description : "",
	price : 0,
	id : 0,
	name : "",
	images:[],
	tags : []
}
	
	const images:string[] = getImages();


	function getImages():string[]{//Replace with call to api
		return ['https://th.bing.com/th/id/R.e95c538294b6b75f713c050ce475ed3d?rik=OaCLgLeDFQnDEg&pid=ImgRaw&r=0','https://th.bing.com/th/id/R.62325205054ee42cbd441c7036a7e3ec?rik=RHdJrVUP%2b%2b8klA&pid=ImgRaw&r=0','https://th.bing.com/th/id/R.2e428e8ae830e4015f0df533b8f006e1?rik=zskWlzdQaXpE1g&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2016%2f02%2frandom-pictures-1.jpg&ehk=xuubRylr%2bQ819mR1Fmu%2bbeB0Nbh5KEQ37YIe0L0JaK4%3d&risl=&pid=ImgRaw&r=0','https://i.imgur.com/PrSylav.jpg']
	}


	function handleClick(e:Event){
		//console.log(e)
		const mainImage = document.getElementById('mainImage') as HTMLImageElement
		mainImage.src = e.target.src;
		mainImage.classList.add('transition-opacity');
		mainImage.classList.add('duration-700');
		mainImage.classList.add('ease-in');
		mainImage.classList.add('opacity-0');
		mainImage.classList.add('hover:opacity-100');


		mainImage.style.transform = 'translateX(-2000%)';
		mainImage.style.transition = 'transform 5s ease-in';
		setTimeout(() => {
			mainImage.style.transform = 'translateX(0)';
		}, 100);

		setTimeout(() => {
			mainImage.classList.remove('transition-opacity');
			mainImage.classList.remove('duration-700');
			mainImage.classList.remove('ease-in');
			mainImage.classList.remove('opacity-0');
			mainImage.classList.remove('hover:opacity-100');
		}, 50);

		mainImage.translate(0,5);
	}

	
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>
{ #if product.id == 0}
<div class="w-full justify-center">
	<h1>Loading...</h1>
</div>


{ :else }
	<div class="grid grid-cols-12 gap-4 mt-14 mx-20">
		<div class="col-span-6 bg-white p-12 rounded-lg">
			<div class="col-span-12 max-w-96 mx-1 justify-center">
				<img id="mainImage" class="w-96 h-80 transition-transform" src="{product.images[0]}" alt="Random Image" />
			</div>
		
			<div class="col-span-12 flex flex-row">
			{#each product.images.map((image, index) => ({ image, index })) as { image, index }}
				<div class="col-span-2 max-w-20 mx-1 my-1" >
					<img id={index.toString()} class="w-20 h-20 transition hover:scale-125" src={image} on:mouseover={handleClick} alt="Random Image" />
				</div>
			{/each}
			</div>
		</div>
		<div class="col-span-6 bg-white p-12 rounded-lg">
			<h1 class="text-2xl font-bold">{product.name}</h1>
			<p class="text-lg">{product.description}</p>
			<div class="flex flex-wrap">
				{#each product.tags.map((tag)=>({tag})) as {tag}}
					<p class="fancy-tag">{tag}</p>
					
				{/each}
			</div>
			<p class="text-lg">ZAR {product.price}</p>

			<button class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
				Add to Cart</button>
		</div>
	</div>

	<style>
		.fancy-tag{
			background-color: #a3a2a2;
			width: 6rem;
			border-radius: 5px;
			color: white;
			padding: 5px;
			margin: 5px;
			display: inline-block;
		}
	</style>
{/if}
