<script lang="ts">
import  {receive, send} from '$lib/utilities/transition';

export let exploded = false;
</script>

<h2 class:exploded in:receive={{key: 'potato'}} out:send={{key: 'potato'}}> {exploded ? '💥' :'🥔'}</h2>


<style>
  h2 {
    position: absolute;
  top: 0;
  transition: scale 0.5s ease-in-out;
  }

</style>