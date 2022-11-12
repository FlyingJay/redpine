import React from 'react'
import styled from 'styled-components'


export class LockOrientation extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
    }

    this.updateOrientation = () => {
      this.props.only_landscape && this.state.orientation == 'portrait'
      ? this.updateState({ orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape' })
      : null
    }
  }

  render() {
    return this.props.only_landscape && this.state.orientation == 'portrait'
           ? <RotateYourDevice>
              <i className="fa fa-repeat"/>
              <br/><br/>
              Please rotate your device..
             </RotateYourDevice>
           : this.props.children
  }

  componentDidMount(){
    window.addEventListener("resize", this.updateOrientation, false);
    window.addEventListener("orientationchange", this.updateOrientation, false);
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const RotateYourDevice = styled.div`
  position: absolute;
  width: 100%;
  top: 40vh;
  text-align: center;
  font-size: 4vmin;

  i {
    font-size: 5vmin;
  }
`