import React, { Component } from "react";

import Header from "./Header";
import LeftColumn from "./LeftColumn";
import Results from "./Results";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <LeftColumn />
        <Results />
      </div>
    );
  }
}

export default App;
