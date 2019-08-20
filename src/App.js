import React, { useEffect, useReducer } from "react";
import { shuffle } from "lodash";
import parameters from "queryparams";

import { Speech } from "./components/Speech";
import { Debug } from "./components/Debug";

import { KNOWINGS, UNDERSTANDINGS } from "./data";

import "./App.css";
import { buildGradient } from "./lib/buildGradient";

const { iterations, mode } = parameters({
  iterations: 10,
  mode: "KNOWINGS" // || 'UNDERSTANDINGS'
});

const [car, ...cdr] = shuffle(
  {
    KNOWINGS,
    UNDERSTANDINGS
  }[mode]
);

const reducer = (state, action) => {
  switch (action.type) {
    case "NEXT":
      if (state.cursor + 1 > state.messages.length - 1) {
        // We've reached the end
        const [nextCar, ...nextCdr] = state.cdr;
        return {
          ...state,
          cursor: 0,
          car: nextCar,
          cdr: nextCdr
        };
      }

      return {
        ...state,
        cursor: state.cursor + 1
      };

    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.messages,
        cursor: 0
      };
    default:
      throw new Error(`Invalid action <${action.type}>`);
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    cursor: 0,
    messages: [],
    car,
    cdr
  });

  // Builds outputs
  useEffect(() => {
    const messages = buildGradient({
      input: state.car,
      iterations
    });

    dispatch({ type: "SET_MESSAGES", messages });
  }, [state.car]);

  return (
    <div className="App">
      <Debug state={state} />

      <Speech message={state.messages[state.cursor]} dispatch={dispatch} />
    </div>
  );
}

export default App;
