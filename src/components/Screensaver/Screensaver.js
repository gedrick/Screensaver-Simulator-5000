import React from 'react'
import logo from './images/react-logo.png'
import PropTypes from 'prop-types'
import './styles/Screensaver.css'

/*
  state keys:
    xStatus
    yStatus

    setInterval (pulled from logoSpeed key) ->
      update position of logo by painting top/bottom

  prop keys, updated only by Config:
    xChange
    yChange
    logoSpeed (milliseconds)
    inMotion
*/

class Screensaver extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.defaultState(props)
  }

  defaultState = props => {
    return {
      xStatus: 0,
      yStatus: 0,
      logoStyles: {
        top: 0,
        left: 0
      },
      containerStyles: {
        width: props.containerWidth || 500,
        height: props.containerHeight || 150
      }
    }
  }

  componentWillReceiveProps = props => {
    // Halt animation.
    this.stopAnimation()
    this.setState(this.defaultState(props))
    this.startAnimation()
  }

  tick = () => {
    console.log('tick!')
    // Check that we're supposed to start...
    if (!this.props.inMotion) {
      this.stopAnimation()
      return false
    }

    // Otherwise, go ahead and animate.
    this.setState((prevState, props) => {
      return {
        xStatus: prevState.xStatus + props.xChange,
        yStatus: prevState.yStatus + props.yChange,
        logoStyles: {
          top: (prevState.xStatus + props.xChange) + 'px',
          left: (prevState.yStatus + props.yChange) + 'px'
        }
      }
    })

    // This is where we would check for a wall collision.
  }

  // Initial load process.
  componentDidMount = () => {
    if (this.props.inMotion) {
      this.startAnimation()
    }
  }

  // When it gets reset.
  componentWillUnmount = () => {
    this.stopAnimation()
  }

  startAnimation = () => {
    this.logoTimer = setInterval(this.tick, this.props.logoSpeed)
  }

  stopAnimation = () => {
    clearInterval(this.logoTimer)
  }

  render = () => {
    return (
      <div id="Screensaver" style={this.state.containerStyles} className="Screensaver">
        <img src={logo} style={this.state.logoStyles} className="ScreensaverLogo" alt="react-logo" />
      </div>
    )
  }
}

Screensaver.propTypes = {
  xChange: PropTypes.number,
  yChange: PropTypes.number,
  logoSpeed: PropTypes.number,
}

export default Screensaver