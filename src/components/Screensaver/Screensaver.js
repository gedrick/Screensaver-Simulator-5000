import React from 'react'
import logo from './images/react-logo.png'
import PropTypes from 'prop-types'
import './styles/Screensaver.css'

/*
  state keys:
    xPosition
    yPosition

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
      wallsHit: 0,
      cornersHit: 0,
      xChange: props.xChange,
      yChange: props.yChange,
      xPosition: 0,
      yPosition: 0,
      logoStyles: {
        top: 0,
        left: 0
      },
      containerStyles: {
        width: props.containerWidth || 500,
        height: props.containerHeight || 150
      },
      boundaries: {
        top: 0,
        left: 0,
        right: props.containerWidth - logoParams.width,
        bottom: props.containerHeight - logoParams.height
      }
    }
  }

  checkCollision = () => {

  }

  tick = () => {
    // Check that we're supposed to start...
    if (!this.props.inMotion) {
      this.stopAnimation()
      return false
    }

    // Otherwise, go ahead and animate.
    this.setState((prevState, props) => {
      // let xAdjuster = this.state.xChange
      let xAdjuster = prevState.xChange
      let yAdjuster = prevState.yChange
      let wallsHit = 0

      // Check for bottom collision.
      if ((prevState.logoStyles.top + prevState.yChange) >= prevState.boundaries.bottom) {
        // Get difference
        yAdjuster *= -1
        wallsHit++
      }

      // Check for top collision.
      if ((prevState.logoStyles.top + prevState.yChange) <= prevState.boundaries.top) {
        yAdjuster *= -1
        wallsHit++
      }

      // Check for right collision.
      if ((prevState.logoStyles.left + prevState.xChange) >= prevState.boundaries.right) {
        xAdjuster *= -1
        wallsHit++
      }

      // Check for left collision.
      if ((prevState.logoStyles.left + prevState.xChange) <= prevState.boundaries.left) {
        xAdjuster *= -1
        wallsHit++
      }

      return {
        wallsHit: prevState.wallsHit + wallsHit,
        cornersHit: prevState.cornersHit + (wallsHit === 2 ? 1 : 0),
        xChange: xAdjuster,
        yChange: yAdjuster,
        xPosition: prevState.xPosition + xAdjuster,
        yPosition: prevState.yPosition + yAdjuster,
        logoStyles: {
          top: prevState.yPosition + yAdjuster,
          left: prevState.xPosition + xAdjuster,
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
    this.logoTimer = setInterval(this.tick.bind(this), this.props.logoSpeed)
  }

  stopAnimation = () => {
    clearInterval(this.logoTimer)
  }

  render = () => {
    return (
      <div className="ScreenSaver">
        <div id="ScreensaverContainer" style={this.state.containerStyles} className="ScreensaverContainer">
          <img src={logo} style={this.state.logoStyles} className="ScreensaverLogo" alt="react-logo" />
        </div>
        <div className="ScreenSaverCounters">
          Bounces: <input type="text" value={this.state.wallsHit} />&nbsp;
          Corners Hit: <input type="text" value={this.state.cornersHit} />
        </div>
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