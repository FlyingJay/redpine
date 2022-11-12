import React from 'react'
import styled from 'styled-components'

import { Link } from 'Components'


export class Apply extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    return (
      <Link onClick={() => this.props.onClick()}>
        <Image>
          { this.props.is_open_mic
            ? <span>Join this Open Mic!</span>
            : <span>Want to play this event?</span> }
          <div>
            Apply Now!&nbsp;&nbsp;<i className="fa fa-arrow-right"/>
          </div>
        </Image>
      </Link>
    )
  }
}
export default Apply

const Image = styled.div`
  display: block;
  position: relative;
  margin: 2vmin 0 0 0;
  border-radius: 0.5vmin;

  background: url('/Assets/images/background/bg8.jpg');
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