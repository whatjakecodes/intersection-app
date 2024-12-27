<script lang="ts">
  import TrafficLight from "$lib/components/TrafficLight.svelte";
  import type {Direction, Road} from "$lib/intersectionModel";
  import {intersectionModelStore} from "$lib/stores/intersectionModelStore";

  interface RoadProps {
    direction: 'north' | 'south' | 'east' | 'west';
    roadState: Road;
  }

  let {direction, roadState}: RoadProps = $props();

  const directionClasses = {
    north: "bottom-full left-1/2 -translate-x-1/2 ",
    south: "top-full left-1/2 -translate-x-1/2 ",
    east: "left-full top-1/2 -translate-y-1/2 flex-col",
    west: "right-full top-1/2 -translate-y-1/2 flex-col"
  };

  const laneOrientation = {
    north: " flex-col",
    south: " flex-col-reverse",
    east: " flex-row-reverse",
    west: ""
  }
  const middleLaneOrientation = {
    north: "",
    south: "flex-row-reverse",
    east: "flex-col",
    west: "flex-col-reverse"
  }


</script>

<div class="absolute flex {directionClasses[direction]} gap-2">
    <div class="flex {laneOrientation[direction]}">
        <div class="w-16 h-16 bg-gray-400"></div>
        <TrafficLight state={roadState.leftTrafficLight}/>
    </div>

    <div class="flex gap-1 {middleLaneOrientation[direction]}">
        <div class="flex {laneOrientation[direction]}">
            <div class="w-16 h-16 bg-gray-400">{roadState.outgoingLane.cars} cars</div>
            <TrafficLight state={roadState.middleTrafficLight}/>
        </div>

        <div class="flex {laneOrientation[direction]}">
            <div class="w-16 h-16 bg-gray-400">{roadState.incomingLane.cars} cars</div>
            <TrafficLight state={'gray'}/>
        </div>
    </div>

    <div class="flex {laneOrientation[direction]}">
        <div class="w-16 h-16 bg-gray-400"></div>
        <TrafficLight state={roadState.rightTrafficLight}/>
    </div>

</div>
