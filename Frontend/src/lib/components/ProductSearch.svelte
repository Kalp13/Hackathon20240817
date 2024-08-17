<div>
    
</div>

<script>
    let value = '';
    let submittedValue = null;

    var search = function(){
        console.log('button clicked');
    }
</script>

<form on:submit|preventDefault={() => submittedValue = value}>
    <label>
        Search
        <input bind:value class="px-3 py-3 text-lg font-bold rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-[#ffffff] text-[#444444] focus:outline-[#aaaaaa] border-[#cccccc]" placeholder="Type your name..">
    </label>
    
    <button on:click={() => search()}>GO</button>
</form>

{#if submittedValue != null}
    <p>Submitted: {submittedValue}</p>
{/if}