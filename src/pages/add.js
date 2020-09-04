import React from "react";

import Codebox from "../components/Codebox";

import "./add.css";

class add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "dark",
    };
  }
  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <Codebox
            code="[comment]: <> (question.md)"
            mode="markdown"
            theme={this.state.theme}
            className="codebox"
          />

          <Codebox
            code="// inouts.json"
            mode="javascript"
            theme={this.state.theme}
            className="codebox"
          />
          <Codebox
            code="// info.json"
            mode="javascript"
            theme={this.state.theme}
            className="codebox"
          />
          <Codebox
            code="// javascript"
            mode="javascript"
            theme={this.state.theme}
            className="codebox"
          />
          <Codebox
            code="# python"
            mode="python"
            theme={this.state.theme}
            className="codebox"
          />
          <Codebox
            code="// c++"
            mode="clike"
            theme={this.state.theme}
            className="codebox"
          />
          <Codebox
            code="// java"
            mode="clike"
            theme={this.state.theme}
            className="codebox"
          />
          <Codebox
            code="// c#"
            mode="clike"
            theme={this.state.theme}
            className="codebox"
          />
          <Codebox
            code="// typescript"
            mode="javascript"
            theme={this.state.theme}
            className="codebox"
          />
        </div>
        <input className="password" placeholder="password" />
        <button className="add">Add</button>
      </div>
    );
  }
}

export default add;
