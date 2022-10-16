import { useContext } from "react";
import { StoreContext } from "./StoreProvider";

import { MoviesStore } from "./moviesStore";

export class RootStore {
  moviesStore: MoviesStore;

  constructor() {
    this.moviesStore = new MoviesStore(this);
  }
}

export const useStores = () => useContext(StoreContext);
