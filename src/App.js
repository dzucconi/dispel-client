import React, { useEffect, useReducer } from "react";
import { random, uniq } from "lodash";
import parameters from "queryparams";

import { Speech } from "./components/Speech";
import { Debug } from "./components/Debug";

import { KNOWINGS } from "./data";

import "./App.css";

const [car, ...cdr] = KNOWINGS;

const move = (from, to, ...a) => (a.splice(to, 0, ...a.splice(from, 1)), a);

const step = token => {
  const chars = token.split("");

  // Should extract punctuation and place it back
  return move(
    random(0, chars.length + 1),
    random(0, chars.length + 1),
    ...chars
  ).join("");
};

const { iterations: ITERATIONS } = parameters({
  iterations: 4
});

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

  // Build output array
  useEffect(() => {
    const initialMessage = state.car.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

    const times = new Array(ITERATIONS - 1).fill(undefined);
    const messages = uniq(
      times.reduce(
        (acc, msg) => {
          const tail = acc[acc.length - 1] || msg;
          const tokens = tail.split(" ");

          return [...acc, tokens.map(step).join(" ")];
        },
        [initialMessage]
      )
    );

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
