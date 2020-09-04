import React from "react";
import CodeMirror from "@uiw/react-codemirror";

// themes
import "codemirror/theme/darcula.css";
import "codemirror/theme/base16-light.css";
// keymap
import "codemirror/keymap/sublime";
// modes
import "codemirror/mode/markdown/markdown"; // question
import "codemirror/mode/javascript/javascript"; // inouts, info, javascript, typescript
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike"; // c++, java, c#
//addons
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";

export default function Codebox(props) {
  return (
    <div className={props.className}>
      <CodeMirror
        value={props.code}
        width="100%"
        height="100%"
        options={{
          theme: props.theme === "dark" ? "darcula" : "base16-light",
          keyMap: "sublime",
          mode: props.mode,
          autoCloseBrackets: true,
        }}
      />
    </div>
  );
}
