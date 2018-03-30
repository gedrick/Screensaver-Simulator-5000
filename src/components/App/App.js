import React, { Component } from 'react'
import Config from '../Config/Config'
import './styles/App.css'

class App extends Component {
  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Screensaver Simulator 5000</h1>
        </header>
        <Config />
      </div>
    )
  }
}

export default App
