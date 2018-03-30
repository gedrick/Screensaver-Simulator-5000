import React from 'react'
import Screensaver from '../Screensaver/Screensaver'
import './styles/Config.css'

class Config extends React.Component {
  constructor() {
    super()
    this.state = {
      xChange: 5,
      yChange: 8,
      containerWidth: 800,
      containerHeight: 220,
      inMotion: true,
      logoSpeed: 500
    }
  }

  onFieldChange = event => {
    const val = event.target.value

    this.setState({
      [event.target.id]: Number(val) || this.state[event.target.id]
    })

    // force a re-render so that Screensaver gets kicked back 
    // off with the new state objects, which become properties.
  }

  playPauseControl = () => {
    this.setState((prevState) => {
      return {
        inMotion: !prevState.inMotion
      }
    })
  }

  applyNewSettings = event => {
    console.log('applyNewSettings:', event)
  }

  render = () => {
    const s = this.state
    return (
      <div className="Config">
        <div className="ConfigOptions">
          <div className="ConfigContainerOptions ConfigOptionBlock">
            <label htmlFor="containerWidth">Container Width: </label>
            <input id="containerWidth" 
                   type="text" 
                   onChange={this.onFieldChange.bind(this)} 
                   defaultValue={s.containerWidth} />&nbsp;
            <label htmlFor="containerHeight">Container Height: </label>
            <input id="containerHeight"
                   type="text" 
                   onChange={this.onFieldChange.bind(this)} 
                   defaultValue={s.containerHeight} />
          </div>
          <div className="ConfigMovementOptions ConfigOptionBlock">
            <label htmlFor="logoSpeed">Logo Speed: </label>
            <input id="logoSpeed" 
                   type="text" 
                   onChange={this.onFieldChange.bind(this)} 
                   defaultValue={s.logoSpeed} />&nbsp;
            
            <label htmlFor="xChange">X Change: </label>
            <input id="xChange" 
                   type="text" 
                   onChange={this.onFieldChange.bind(this)} 
                   defaultValue={s.xChange} />&nbsp;
            
            <label htmlFor="yChange">Y Change: </label>
            <input id="yChange" 
                   type="text" 
                   onChange={this.onFieldChange.bind(this)} 
                   defaultValue={s.yChange} />&nbsp;
          </div>
          <div className="ConfigController ConfigOptionBlock">
            <button onClick={this.playPauseControl}>Play/pause</button>
            <button onClick={this.applyNewSettings}>Apply New Settings</button>
          </div>
        </div>
        <Screensaver xChange={s.xChange} 
                     yChange={s.yChange} 
                     containerWidth={s.containerWidth}
                     containerHeight={s.containerHeight}
                     inMotion={s.inMotion} 
                     logoSpeed={s.logoSpeed} />
      </div>
    )
  }
}

export default Config