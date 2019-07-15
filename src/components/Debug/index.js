import React from "react";

import "./index.css";

export const Debug = ({ state, disable = true }) =>
  disable ? null : (
    <pre className="Debug">{JSON.stringify(state, null, 2)}</pre>
  );
