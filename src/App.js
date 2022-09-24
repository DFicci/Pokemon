import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonL, setPokemonL] = useState([]);
  const [savePokemonL, setSavedPokemonL] = useState([]);
  const [currentPageUrl, SetCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
        setPokemonL(res.data.results.map((p)=>p.url))
      })
    return () => cancel();

  }, [currentPageUrl]);

 
  useEffect(()=>{
    for (let i = 0; i < pokemon.length; i++) {
      axios.all("https://pokeapi.co/api/v2/pokemon/"+pokemon[i])
      .then(r=>{
        setPokemonL(r)
      })
    }
  })
  console.log(pokemonL);

  function goToNextPage() {
    SetCurrentPageUrl(nextPageUrl);
  }
  function goToPrevPage() {
    SetCurrentPageUrl(prevPageUrl);
  }

  if (loading) return "loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? goToNextPage : null}
        gotoPrevPage={prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
