import { makeObservable, observable } from 'mobx';
import { RootStore } from './RootStore';

export interface IMovie {
  name? :string;
  image? : any;
  id? : number;
  url?: string;
  rating? :any;
  genres? : [];

}

export class MoviesStore {
  rootStore: RootStore;
  movies?:  IMovie[];;


  setMovies = (movies: IMovie[]) => {
    this.movies = movies;
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      movies: observable
    });
  }
}
