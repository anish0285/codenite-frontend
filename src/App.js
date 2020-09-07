import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
//pages
import playground from "./pages/playground";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={{ mode: "dark" }}>
      <Router>
        <Switch>
          <Route exact path="/" component={playground} />
          <Route exact path="/playground" component={playground} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
