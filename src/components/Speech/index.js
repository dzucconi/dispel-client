import React, { useEffect, useState, useCallback } from "react";
import parameters from "queryparams";

import "./index.css";

import { useSpeech } from "../../lib/useSpeech";
import { Fade } from "../Fade";

const { color } = parameters({ color: "white" });

export const Speech = ({ message, dispatch, ...rest }) => {
  const [audio, state] = useSpeech({ input: message });
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (state.time > 0 && state.duration > 0 && state.time === state.duration) {
      setFade(false); // Fades out; triggers NEXT dispatch
    }
  }, [state.time, state.duration, dispatch]);

  useEffect(() => {
    setFade(true); // Message changes; fades in
  }, [message]);

  const handleExited = useCallback(() => dispatch({ type: "NEXT" }), [
    dispatch
  ]);

  return (
    <>
      {audio}

      <Fade in={fade} onExited={handleExited} {...rest}>
        <div className="Message" style={{ color }}>
          {message}
        </div>
      </Fade>
    </>
  );
};
