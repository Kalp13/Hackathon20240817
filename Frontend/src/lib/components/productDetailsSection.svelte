<script lang="ts">

	const images:string[] = getImages()

	
	function getImages():string[]{//Replace with call to api
		return ['https://th.bing.com/th/id/R.e95c538294b6b75f713c050ce475ed3d?rik=OaCLgLeDFQnDEg&pid=ImgRaw&r=0','https://th.bing.com/th/id/R.62325205054ee42cbd441c7036a7e3ec?rik=RHdJrVUP%2b%2b8klA&pid=ImgRaw&r=0','https://th.bing.com/th/id/R.2e428e8ae830e4015f0df533b8f006e1?rik=zskWlzdQaXpE1g&riu=http%3a%2f%2fwww.dumpaday.com%2fwp-content%2fuploads%2f2016%2f02%2frandom-pictures-1.jpg&ehk=xuubRylr%2bQ819mR1Fmu%2bbeB0Nbh5KEQ37YIe0L0JaK4%3d&risl=&pid=ImgRaw&r=0','https://i.imgur.com/PrSylav.jpg']
	}


	function handleClick(e:Event){
		//console.log(e)
		const mainImage = document.getElementById('mainImage') as HTMLImageElement
		mainImage.src = e.target.src;
	}

	
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="grid grid-cols-2 gap-4 mt-14">
	<div class="...">
		<div class="col-span-12 max-w-96 mx-1 justify-center">
			<img id="mainImage" class="w-96 h-80" src="{images[0]}" alt="Random Image" />
		</div>
	
		<div class="col-span-12 flex flex-row">
		{#each getImages().map((image, index) => ({ image, index })) as { image, index }}
			<div class="col-span-2 max-w-20 mx-1 my-1" >
				<img id={index.toString()} class="w-20 h-20" src={image} on:click={handleClick} alt="Random Image" />
			</div>
		{/each}
		</div>
	</div>
	<div class="...">
		<h1 class="text-2xl font-bold">{}</h1>
		<!-- <p class="text-lg">{description}</p>
		<p class="text-lg">{price}</p> -->
	</div>
</div>
