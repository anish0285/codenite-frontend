import React, { Component } from "react";

// components
import Button from "../components/Button";

// styles
import "./playground.css";
import colors from "../colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

class playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
      tab: "question",
    };
  }
  themeSwitch = () => {
    this.state.theme === "dark"
      ? this.setState({ theme: "light" })
      : this.setState({ theme: "dark" });
  };
  tabSwitch = (name) => {
    if (name !== this.state.tab) this.setState({ ...this.state, tab: name });
  };
  render() {
    const { theme } = this.state;
    return (
      <div
        className="wrapper"
        style={{
          backgroundColor: colors[theme].primary,
          color: colors[theme].secondary,
        }}
      >
        <div className="innerwrapper leftpart">
          <div className="firstline">
            <div className="brandname">Codenite</div>
            <div className="buttons">
              <span onClick={this.themeSwitch}>
                <Button
                  theme={theme}
                  text={
                    theme === "dark" ? (
                      <FontAwesomeIcon icon={faMoon} />
                    ) : (
                      <FontAwesomeIcon icon={faSun} />
                    )
                  }
                />
              </span>
              <span>
                <Button
                  theme={theme}
                  text={<FontAwesomeIcon icon={faRandom} />}
                />
              </span>
            </div>
          </div>
          <div className="secondline">
            <div
              className="tab"
              style={{
                textDecoration:
                  this.state.tab === "question" ? "underline" : "none",
              }}
              onClick={() => this.tabSwitch("question")}
            >
              Question
            </div>
            <div
              className="tab"
              style={{
                textDecoration:
                  this.state.tab === "result" ? "underline" : "none",
              }}
              onClick={() => this.tabSwitch("result")}
            >
              Result
            </div>
          </div>
        </div>

        <div className="innerwrapper"></div>
      </div>
    );
  }
}

export default playground;
