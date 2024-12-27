import {writable} from 'svelte/store';
import {type Direction, IntersectionModel} from "$lib/intersectionModel";

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
    }),
    addCar: (direction: Direction) => update((store) => {
      store.model.addCar(direction);
      return store;
    })  };
}

export const intersectionModelStore = createIntersectionModelStore();
