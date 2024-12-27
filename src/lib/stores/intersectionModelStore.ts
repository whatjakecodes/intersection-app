import {writable} from 'svelte/store';
import {IntersectionModel} from "$lib/intersectionModel";

type IntersectionModelStore = {
  model: IntersectionModel;
}

const createIntersectionModelStore = () => {
  const {subscribe, set, update} = writable<IntersectionModelStore>({
    model: new IntersectionModel(),
  });
  
  return {
    subscribe,
    updateTicks: (num: number) => update((store) => {
      store.model.updateTicks(num);
      return store;
    }),
    resetTicks: () => update((store) => {
      store.model.resetTicks();
      return store;
    })
  };
}

export const intersectionModelStore = createIntersectionModelStore();
