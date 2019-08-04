import { random, uniq, sortBy } from "lodash";
import levenshtein from "js-levenshtein";

// eslint-disable-next-line no-sequences
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

export const buildGradient = ({ input, iterations }) => {
  const initialMessage = input.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
  const times = new Array(iterations - 1).fill(undefined);

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

  // Iterative random mutations sometimes leads to mutating *back* to originals.
  // So we take the levenshtein distance of each message...
  const scored = messages.reduce(
    (memo, message) => [
      ...memo,
      {
        message,
        distance: levenshtein(input, message)
      }
    ],
    []
  );

  // ...And then rank them in ascending order to create our gradient.
  return sortBy(scored, ({ distance }) => distance).map(
    ({ message }) => message
  );
};
