import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
// components
import Button from "../components/Button";
import Content from "../components/Content";

// icons
import { faRandom, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// styles
import "./playground.css";
import colors from "../colors";
import CodeBox from "../components/CodeBox";
import logo from "../assets/logo.svg";
import Result from "../components/Result";

class playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      theme: "dark",
      tab: "question",
      data: null,
      err: false,
      executing: false,
      outputs: null,
      code: "",
      currentMode: "js",
    };
  }

  componentDidMount = () => {
    this.getRandomQuestion();
  };

  handleRunClick = () => {
    if (!this.state.executing) {
      this.setState({ ...this.state, executing: true, tab: "result" });
      let sendobj = {
        data: this.state.code,
        extension: this.state.currentMode,
      };
      axios
        .post(
          `http://http://35.183.61.213:5000/question/run/${this.state.data._id}`,
          sendobj
        )
        .then((response) => {
          this.setState({
            ...this.state,
            executing: false,
            outputs: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ ...this.state, err: true, executing: false });
        });
    }
  };

  handleCodeChange = (e) => {
    this.setState({ code: e.getValue() });
  };

  handleModeChange = (selected) => {
    this.setState({ currentMode: selected.value, executing: false });
  };

  getRandomQuestion = () => {
    this.setState({
      ...this.state,
      loading: true,
      tab: "question",
      data: null,
      err: false,
      executing: false,
      outputs: null,
      code: "",
    });
    let sendobj = {};
    sendobj.avoidids = [];
    console.log(sendobj);
    axios
      .post("http://http://35.183.61.213:5000/question/random", sendobj)
      .then((response) => {
        this.setState({
          ...this.state,
          loading: false,
          data: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ ...this.state, err: true, loading: false });
      });
  };

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
          scrollbarColor: colors[theme].accent + " " + colors[theme].primary,
        }}
      >
        <div className="innerwrapper leftpart">
          <div className="firstline">
            <div
              className="brandname"
              onClick={this.getRandomQuestion}
              style={{ cursor: "pointer" }}
            >
              <img src={logo} style={{ height: "30px" }} alt="logo" />
              <span>odenite</span>
            </div>
            <div className="buttons">
              <span onClick={this.themeSwitch} style={{ marginLeft: "1rem" }}>
                <Button
                  tooltip="Switch"
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
              <span
                onClick={this.getRandomQuestion}
                style={{ marginLeft: "1rem" }}
              >
                <Button
                  tooltip="Shuffle"
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
          <div className="content">
            {this.state.tab === "question" ? (
              this.state.loading ? (
                <div>loading</div>
              ) : this.state.err ? (
                <Content err={true} />
              ) : (
                <Content
                  question={new Buffer(
                    this.state.data.question,
                    "base64"
                  ).toString("ascii")}
                />
              )
            ) : (
              <Result outputs={this.state.outputs} />
            )}
          </div>
        </div>

        <div className="innerwrapper rightpart">
          <CodeBox
            theme={theme}
            data={this.state.data}
            loading={this.state.loading}
            executing={this.state.executing}
            onRunClick={this.handleRunClick}
            onCodeChange={this.handleCodeChange}
            onModeChange={this.handleModeChange}
          />
        </div>
        <div
          className="trademark"
          onClick={() => window.open("http://www.anishkumar.me", "_blank")}
        >
          Developed by Anish
        </div>
      </div>
    );
  }
}

export default playground;
