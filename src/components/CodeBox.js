import React, { Component } from "react";

// codemirror
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/darcula.css";
import "codemirror/theme/eclipse.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";

// dropdown
import Select from "react-select";

// styles
import "./CodeBox.css";
import colors from "../colors";

class CodeBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langmode: "js",
      theme: props.theme,
    };
  }
  handleModeChange = (selected) => {
    this.setState({ langmode: selected.mode });
  };

  customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? colors[this.props.theme].secondary
        : colors[this.props.theme].primary,
      color: state.isSelected
        ? colors[this.props.theme].primary
        : colors[this.props.theme].secondary,
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
    const { theme } = this.props;
    const options = [
      { value: "py", label: "Python", mode: "python" },
      { value: "cpp", label: "C++", mode: "clike" },
      { value: "cs", label: "C#", mode: "clike" },
      { value: "ts", label: "TypeScript", mode: "javascript" },
      { value: "java", label: "Java", mode: "clike" },
      { value: "js", label: "JavaScript", mode: "javascript" },
    ];
    return (
      <div className="codewrap">
        <CodeMirror
          className="codebox"
          value={"hello"}
          options={{
            theme: theme === "dark" ? "darcula" : "eclipse",
            keyMap: "sublime",
            mode: this.state.langmode,
            tabSize: 4,
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
          <span>
            <button>Run</button>
          </span>
        </div>
      </div>
    );
  }
}

export default CodeBox;
