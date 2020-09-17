import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import "./Result.css";

function Block(props) {
  return (
    <div
      style={{
        borderRadius: "10px",
        boxShadow: "0 0 10px black",
        margin: "15px 0",
      }}
    >
      <div className="block-line">
        <span>Input</span>
        <span>{props.input}</span>
      </div>
      <div className="block-line">
        <span>Expected</span>
        <span>{props.expected}</span>
      </div>
      <div
        className="block-line"
        style={{ color: props.correct ? "#528448" : "red" }}
      >
        <span>Output</span>
        <span>{String(props.output)}</span>
      </div>
    </div>
  );
}

export default function Result(props) {
  const { outputs } = props;
  if (outputs) {
    if (outputs.stderr) {
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "left",
          }}
        >
          <div style={{ display: "inline", color: "red", marginRight: "5px" }}>
            Error:{" "}
          </div>
          {outputs.stderr}
        </div>
      );
    } else {
      return (
        <div>
          {outputs.inputs.map((e, i) => (
            <Block
              input={e}
              expected={outputs.expected[i]}
              output={outputs.stdout[i]}
              correct={outputs.correct[i]}
            />
          ))}
        </div>
      );
    }
  } else {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Press{" "}
        <FontAwesomeIcon
          icon={faPlay}
          style={{ margin: "0 10px", color: "#528448" }}
        />
        to execute.
      </div>
    );
  }
}
