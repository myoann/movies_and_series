import React, { Component } from "react";

import Header from "./Header";
import LeftColumn from "./LeftColumn";
import MainContent from "./MainContent";
import "./index.scss";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <LeftColumn />
        <MainContent />
      </div>
    );
  }
}

export default App;
