import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import { Tab } from './components/Tab'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Tab />
      </div>
    );
  }
}

export default App;