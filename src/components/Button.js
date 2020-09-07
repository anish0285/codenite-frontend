import React from "react";

import colors from "../colors";
import "./Button.css";

export default function Button(props) {
  const { theme, text } = props;
  return (
    <button
      className="buttonclass"
      style={{
        backgroundColor: colors[theme].primary,
        color: colors[theme].secondary,
        border: `1px solid ${colors[theme].primary}`,
        borderRadius: "5px",
      }}
    >
      {text}
    </button>
  );
}
