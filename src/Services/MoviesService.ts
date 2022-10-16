import Axios from 'axios';
import { RootStore } from '../Stores/RootStore';
import  {API_ROOT_URL} from '../Utils/constants';

async function getMovies() {
  return Axios.get(`${API_ROOT_URL}/shows`, {
  });

}
export const fetchMovies = (store: RootStore) => {
  getMovies()
    .then((response) => store.moviesStore.setMovies(response.data))
    .catch(() =>
      console.log('error')
    );
};

 

 export const searchMovie = (movie: string) => {
  let link = `${API_ROOT_URL}/singlesearch/shows?q=:${movie}`
   return Axios.get(link).then((response: any) => {return response.data})
    .catch(() =>
      console.log('error')
    );
};
