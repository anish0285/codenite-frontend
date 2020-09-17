import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// codemirror
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/darcula.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/python/python.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/closebrackets";

// dropdown
import Select from "react-select";

// styles
import "./CodeBox.css";
import colors from "../colors";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

class CodeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langinfo: { value: "js", label: "JavaScript", mode: "text/javascript" },
    };
  }
  handleModeChange = (selected) => {
    this.setState({ langinfo: selected });
    this.props.onModeChange(selected);
  };

  execute = (id) => {};

  customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: colors[this.props.theme].primary,
      color: colors[this.props.theme].secondary,
      fontSize: "12px",
      "&:hover": {
        color: colors[this.props.theme].primary,
        backgroundColor: colors[this.props.theme].secondary,
        cursor: "pointer",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: colors[this.props.theme].primary,
      boxShadow: "0 0 5px black !important",
      transform: "translateY(-240px)",
    }),
    control: (provided) => ({
      ...provided,
      border: "0 !important",
      backgroundColor: colors[this.props.theme].primary,
      boxShadow: "0 0 5px black !important",
      fontSize: "12px",
      "&:hover": {
        cursor: "pointer",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: colors[this.props.theme].secondary,
    }),
    container: (provided) => ({
      ...provided,
      width: 120,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: colors[this.props.theme].secondary,
      transform: "rotate(180deg)",
      "&:hover": {
        color: colors[this.props.theme].secondary,
      },
    }),
  };

  render() {
    const {
      theme,
      data,
      loading,
      onRunClick,
      onCodeChange,
      executing,
    } = this.props;
    const options = [
      { value: "py", label: "Python", mode: "text/x-python" },
      { value: "cpp", label: "C++", mode: "text/x-c++src" },
      { value: "cs", label: "C#", mode: "text/x-csharp" },
      { value: "ts", label: "TypeScript", mode: "application/typescript" },
      { value: "java", label: "Java", mode: "text/x-java" },
      { value: "js", label: "JavaScript", mode: "text/javascript" },
    ];
    return (
      <div className="codewrap">
        <CodeMirror
          className="codebox"
          value={
            loading
              ? ""
              : new Buffer(data[this.state.langinfo.value], "base64").toString(
                  "ascii"
                )
          }
          onChange={onCodeChange}
          options={{
            theme: theme === "dark" ? "darcula" : "eclipse",
            keyMap: "sublime",
            mode: this.state.langinfo.mode,
            tabSize: 8,
          }}
        />
        <div className="topline">
          <span>
            <Select
              options={options}
              defaultValue={options[5]}
              onChange={this.handleModeChange}
              styles={this.customStyles}
              components={{
                IndicatorSeparator: () => null,
              }}
              isSearchable={false}
            />
          </span>
          <span onClick={onRunClick}>
            <button className="runButton">
              {executing ? (
                <div className="loader"></div>
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default CodeBox;
