<script>
    import Road from "$lib/components/Road.svelte";
    import {intersectionModelStore} from '$lib/stores/intersectionModelStore';

    function handleClick() {
        intersectionModelStore.updateTicks(1);
    }
    function handle30Click() {
        intersectionModelStore.updateTicks(30);
    }

    function handleResetClick() {
        intersectionModelStore.resetTicks();
    }

</script>

<h1>Intersection Model</h1>
<div class="flex gap-4">

    <button
            class="px-4 py-2 bg-blue-500 text-white rounded"
            onclick={handleClick}
    >
        Add 1 Tick
    </button>

    <button
            class="px-4 py-2 bg-blue-500 text-white rounded"
            onclick={handle30Click}
    >
        Add 30 Ticks
    </button>

    <button
            class="px-4 py-2 bg-blue-500 text-white rounded"
            onclick={handleResetClick}
    >
        Reset
    </button>
</div>
<p>
    Tick: {$intersectionModelStore.model.tick}
</p>


<div class="h-screen w-screen flex items-center justify-center">
    <div class="relative w-64 h-64">
        <div class="w-full h-full bg-gray-200 rounded-lg"></div>

        <div class="absolute -top-24 left-1/2 -translate-x-1/2 flex gap-4">
            <Road roadState={$intersectionModelStore.model.northRoad} direction="north"/>
        </div>

        <div class="absolute -bottom-24 left-1/2 -translate-x-1/2 flex gap-4">
            <Road roadState={$intersectionModelStore.model.southRoad} direction="south"/>
        </div>

        <div class="absolute -left-24 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <Road roadState={$intersectionModelStore.model.westRoad} direction="west"/>
        </div>

        <!--{/* Right column */}-->
        <div class="absolute -right-24 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <Road roadState={$intersectionModelStore.model.eastRoad} direction="east"/>
        </div>
    </div>
</div>