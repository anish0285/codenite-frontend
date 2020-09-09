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
import { Link } from "react-router-dom";

class playground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      theme: "dark",
      tab: "question",
      data: null,
      err: false,
    };
  }

  componentDidMount = () => {
    this.getRandomQuestion();
  };

  getRandomQuestion = () => {
    console.log("hello");
    let sendobj = {};
    sendobj.avoidids = [];
    console.log(sendobj);
    this.setState({ ...this.state, loading: true });
    axios
      .post("http://192.168.0.65:5000/question/random", sendobj)
      .then((response) => {
        this.setState({
          ...this.state,
          loading: false,
          data: response.data,
        });
        console.log(); // remember this line
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
              Codenite
            </div>
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
              <span onClick={this.getRandomQuestion}>
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
              <div>results hello</div>
            )}
          </div>
        </div>

        <div className="innerwrapper rightpart">
          <CodeBox theme={theme} />
        </div>
      </div>
    );
  }
}

export default playground;
