import React from "react";

export default function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map((p) => (
        <>
          <div key={p.id}>{p.id}</div>
          <div key={p.name}>{p.name}</div>
          <div key={p.height}>{p.height}</div>
          <img src={p.sprites.front_default} alt=""/>
        </>
      ))}
    </div>
  );
}
