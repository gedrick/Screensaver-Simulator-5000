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

const logoParams = {
  width: 50,
  height: 43
}

class Screensaver extends React.Component {
  constructor(props) {
    console.log('Screensaver:constructor')
    super(props)
    this.state = this.defaultState(props)
  }

  componentWillReceiveProps = props => {
    // Halt animation.
    this.stopAnimation()
    this.setState(this.defaultState(props))
    this.startAnimation()
  }

  defaultState = props => {
    return {
      xChange: props.xChange,
      yChange: props.yChange,
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

  tick = () => {
    console.log('tick!')
    // Check that we're supposed to start...
    if (!this.props.inMotion) {
      this.stopAnimation()
      return false
    }

    // Check for a wall collision.
    // if (checkCollision !== false) {

    // }

    // Otherwise, go ahead and animate.
    this.setState((prevState, props) => {
      return {
        xStatus: prevState.xStatus + this.state.xChange,
        yStatus: prevState.yStatus + this.state.yChange,
        logoStyles: {
          top: (prevState.xStatus + this.state.xChange) + 'px',
          left: (prevState.yStatus + this.state.yChange) + 'px'
        }
      }
    })
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