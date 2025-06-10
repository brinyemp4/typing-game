import React from "react";

export default function PokemonGrid({ pokemonArray, guessedPokemon }) {
  return (
    console.log("Rendering PokemonGrid with guessedPokemon:", guessedPokemon),
    <div className="pokemon-grid">
      {pokemonArray.map((name) => (
        <div key={name} className="pokemon-cell">
          {guessedPokemon.includes(name) ? (
            <img
              src={`/pokemons/${name}.png`}
              alt={name}
              className="pokemon-img revealed"
            />
          ) : (
            <div className="pokemon-placeholder">&nbsp;</div>
          )}
        </div>
      ))}
      <style jsx>{`
        .pokemon-grid {
          display: grid;
          grid-template-columns: repeat(8, 60px); /* more columns for wider grid */
          gap: 16px;
          margin: 32px 0;
          justify-content: center;
        }
        .pokemon-cell {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pokemon-img {
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.3s, transform 0.3s;
          transform: perspective(300px) rotateY(30deg) scale(0.9);
        }
        .pokemon-img.revealed {
          opacity: 1;
          transform: perspective(600px) rotateY(0deg) scale(1.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
        }
        .pokemon-placeholder {
          width: 100%;
          height: 100%;
          background: #eee;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}