import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./GlobalStyle";
//pages
import add from "./pages/add";
import playground from "./pages/playground";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={{ mode: "dark" }}>
      <>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/" component={playground} />
            <Route exact path="/playground" component={playground} />
            <Route exact path="/add" component={add} />
          </Switch>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default App;
