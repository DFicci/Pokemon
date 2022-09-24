import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
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
        getPokemon(res.data.results)
      })
    return () => cancel();

  }, [currentPageUrl]);

  const getPokemon=async(res) => {
    res.map(async(item)=>{
      const result = await axios.get(item.url)
      setPokemon(state =>{
        state=[...state,result.data]
        return state;
      })
    })
  }
  console.log(pokemon);
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
