import React, { useEffect } from "react";
import "./App.css";
import { StoreProvider } from "./Stores/StoreProvider";
import { RootStore } from "./Stores/RootStore";
import { fetchMovies } from "./Services/MoviesService";
import MoviesDashboard from "./components/MoviesDashboard";

const App = () => {
  const store = new RootStore();

  useEffect(() => fetchMovies(store));
  return (
    <StoreProvider store={store}>
      <div className="App">
        <MoviesDashboard />
      </div>
    </StoreProvider>
  );
};

export default App;
