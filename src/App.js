import React, { Component } from 'react';
import {Provider} from "react-redux";
import store from "./store";
import Index from "./components/Index";
import "./css/index.css"

class App extends Component {
  render() {
    return (
      <div className="App">
      <Provider store={store}><Index/></Provider>
      </div>
    );
  }
}

export default App;
