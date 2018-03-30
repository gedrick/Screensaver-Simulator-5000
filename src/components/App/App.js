import React, { Component } from 'react'
import Screensaver from '../Screensaver/Screensaver'
import Config from '../Config/Config'
import logo from './images/logo.svg'
import './styles/App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Screensaver Simulator 5000</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <Config />
        </header>
        <Screensaver />
      </div>
    )
  }
}

export default App
