<script lang="ts">
  import type {TrafficLightState} from "$lib/intersectionModel";

  interface TrafficLightProps {
    state: TrafficLightState
  }

  let {state}: TrafficLightProps = $props();
</script>
    
<div class="flex gap-1">
    <div class="w-4 h-4 bg-{state}-500 rounded-full"></div>
</div>
