import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'


export { Slider }

export class PrevArrow extends React.PureComponent{
  render() {
    return <LeftArrow type="button" className="slick-prev" onClick={this.props.onClick}/>
  }
}

export class NextArrow extends React.PureComponent {
  render() {
    return <RightArrow type="button" className="slick-next" onClick={this.props.onClick}/>
  }
}

export const DataContainerizer = styled.div`
  display: block;
  position: relative;
  height: auto;
  margin: 0 auto;
  width: 80vw;
`
const Arrow = styled.div`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 5vmin;
  height: 5vmin;
  top: calc(50% -2.5vmin);
  margin: auto 0;
  border-radius: 100%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.3), 0 0 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
`
const LeftArrow = styled(Arrow)`
  background: #FFF url(/Assets/images/buttons/leftArrow.png);
  background-size: 2.5vmin;
  background-position: center;
  background-repeat: no-repeat;

  &:hover {
    background: #FFF url(/Assets/images/buttons/leftArrowHover.png);
    background-size: 2.5vmin;
    background-position: center;
    background-repeat: no-repeat;
  }
`
const RightArrow = styled(Arrow)`
  background: #FFF url(/Assets/images/buttons/rightArrow.png);
  background-size: 2.5vmin;
  background-position: center;
  background-repeat: no-repeat;

  &:hover {
    background: #FFF url(/Assets/images/buttons/rightArrowHover.png);
    background-size: 2.5vmin;
    background-position: center;
    background-repeat: no-repeat;
  }
`