<script lang="ts">
    import {goto} from '$app/navigation'
    import { page } from '$app/stores'

    let value = '';
    let submittedValue = null;

    var search = function(){
        goto(`/product/${value}`);
    }
</script>

<form on:submit|preventDefault={() => submittedValue = value}>
    <label>
        <input bind:value class="px-3 py-3 text-lg font-bold rounded-lg border focus:outline focus:outline-2 focus:outline-offset-2 bg-[#ffffff] text-[#444444] focus:outline-[#aaaaaa] border-[#cccccc]" placeholder="Search...">
    </label>
    
    <button on:click={() => search()} style="display: none">GO</button>
</form>