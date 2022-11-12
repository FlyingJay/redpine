import React from 'react'
import styled from 'styled-components'

import { Link } from 'Components'


export class ImageLink extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    return (
      <Link onClick={() => this.props.onClick()}>
        <Image image={this.props.image}>
          <span>
            { this.props.icon ? <span><i className={this.props.icon}/>&nbsp;&nbsp;</span> : null }
            { this.props.text }
          </span>
          { this.props.action_text
          	? <div>
	              { this.props.action_text }&nbsp;&nbsp;<i className="fa fa-arrow-right"/>
	            </div>
	          : null }
        </Image>
      </Link>
    )
  }
}
export default ImageLink

const Image = styled.div`
  display: block;
  position: relative;
  margin: 2vmin 0 0 0;
  border-radius: 0.5vmin;

  background: url('${props => props.image || '/Assets/images/background/bg8.jpg'}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  height: 10vmin;

  padding: 2vmin;

  span {
    width: 100%;
    text-align: center;
    font-size: 3vmin;
    color: #FFF;    
  }

  div {
    font-size: 3vmin;
    opacity: 0;
    color: #FFF;

    position: absolute;
    bottom: 2vmin;
    right: 2vmin;
  }

  &:hover {
    cursor: pointer;
    opacity: 0.8;

    div {
      opacity: 1;
    }
  }
`