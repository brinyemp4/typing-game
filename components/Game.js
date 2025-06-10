import { useReducer } from "react";
import Header from "@components/Header";
import pokemonArray from "@components/pokemon";
import PokemonGrid from "./PokemonGrid";

export default function Game() {
  let initialState = {
    gameState: "NOT_STARTED",
    score: 0,
    currentPokemon: "",
    guessedPokemon: [],
  };

  let [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "START_GAME": {
        return { ...state, gameState: "STARTED" };
      }
      case "END_GAME": {
        return { ...state, gameState: "FINISHED", currentPokemon: "" };
      }
      case "RESTART_GAME": {
        return { ...state, gameState: "STARTED", score: 0, guessedPokemon: [] };
      }
      case "TYPE_POKEMON": {
        return { ...state, currentPokemon: action.pokemon };
      }
      case "SUBMIT_POKEMON": {
        let newScore = state.score;
        let guessedPokemon = [...state.guessedPokemon];
        // Normalize input for comparison
        const inputName = action.pokemon.trim().toLowerCase();
        // Find the actual pokemon name in the array (case-insensitive)
        const matchedName = pokemonArray.find(
          (name) => name.toLowerCase() === inputName
        );
        if (matchedName) {
          newScore += 1;
          if (!guessedPokemon.includes(matchedName)) {
            guessedPokemon.push(matchedName);
          }
        } else {
          newScore -= 1;
        }
        return { ...state, currentPokemon: "", score: newScore, guessedPokemon };
      }
      default: {
        throw new Error("Unrecognized state");
      }
    }
  }, initialState);

  let { gameState, score, currentPokemon, guessedPokemon } = state;

  return (
    <div className="game-container">
      <Header text="get typin', loser" />
      {gameState === "NOT_STARTED" && (
        <button className="main-btn"
          onClick={() => {
            dispatch({ type: "START_GAME" });
          }}
        >
          Start Game
        </button>
      )}
      {gameState === "STARTED" && (
        <>
          <div className="input-container">
            <input
              type="text"
              name="pokemon"
              placeholder="Name Pokemon"
              value={currentPokemon}
              onChange={(e) => {
                dispatch({ type: "TYPE_POKEMON", pokemon: e.target.value });
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  dispatch({
                    type: "SUBMIT_POKEMON",
                    pokemon: e.target.value.trim(),
                  });
                }
              }}
              autoFocus
            />
          </div>
          <button className="main-btn"
            onClick={() => {
              dispatch({ type: "END_GAME" });
            }}
          >
            Give up
          </button>
          <PokemonGrid
            pokemonArray={pokemonArray}
            guessedPokemon={guessedPokemon}
          />
        </>
      )}
      {gameState === "FINISHED" && (
        <>
          <div className="score">Score: {score}</div>
          <button className="main-btn"
            onClick={() => {
              dispatch({ type: "RESTART_GAME" });
            }}
          >
            Try again
          </button>
        </>
      )}
      <style jsx>{`
        .game-container {
          max-width: 1100px;
          margin: 40px auto;
          padding: 32px 32px 40px 32px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        h1, h2, h3 {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          text-align: center;
        }
        .score {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 24px;
          color: #2d3748;
        }
        .input-container {
          display: flex;
          width: 100%;
          justify-content: center;
          margin-bottom: 24px;
        }
        input[type="text"] {
          height: 44px;
          font-size: 1.5rem;
          padding: 0 18px;
          border: 1.5px solid #cbd5e1;
          border-radius: 8px;
          outline: none;
          transition: border 0.2s;
          background: #f7fafc;
          color: #2d3748;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        input[type="text"]:focus {
          border: 1.5px solid #3182ce;
          background: #fff;
        }
        .main-btn {
          background: #3182ce;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 32px;
          font-size: 1.2rem;
          font-weight: 600;
          margin: 12px 0 24px 0;
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(49,130,206,0.08);
        }
        .main-btn:hover, .main-btn:focus {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}
