<script lang="ts">
    import {goto} from '$app/navigation'

    let value = '';
    let submittedValue = null;

    var search = function(){
        goto(`/product/${value}`);
    }
</script>

<form on:submit|preventDefault={() => submittedValue = value}>
    <input bind:value class="px-3 py-3 text-sm rounded-lg border bg-[#ffffff] text-[#444444] border-[#cccccc]" placeholder="Search...">
    
    <button on:click={() => search()} style="display: none">GO</button>
</form>