import useAudio from "react-use/lib/useAudio";
import parameters from "queryparams";

const ENDPOINT = "http://dispel.services.damonzucconi.com";

const { voice: VOICE } = parameters({
  voice: "Aditi"
});

const src = ({ input }) =>
  `${ENDPOINT}/?redirect=true&voice=${VOICE}&input=${encodeURIComponent(
    input
  )}`;

export const useSpeech = ({ input }) => {
  const [audio, state, controls, ref] = useAudio({
    src: src({ input }),
    autoPlay: true
  });

  return [audio, state, controls, ref];
};
