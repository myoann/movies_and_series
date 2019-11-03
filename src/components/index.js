import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import LeftColumn from "./LeftColumn";
import Results from "./Results";
import DetailedMovie from "./DetailedMovie";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <LeftColumn />
          <Results />
        </Route>
        <Route path="/search" component={DetailedMovie} />
      </Switch>
    </Router>
  );
}

export default App;
