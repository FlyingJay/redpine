import React from 'react'
import styled from 'styled-components'

import { RP_DARK_GREY, RP_GREEN, RP_PURPLE, RP_ORANGE, RP_PINK, RP_DDD } from 'Components' //GLOBALS

const colors = [RP_GREEN, RP_PURPLE, RP_ORANGE, RP_PINK]

export class Heading extends React.PureComponent {
  constructor(props) {
    super(props)  
  }

  render() {
    const text = this.props.text || ''
    const icon = this.props.icon || 'fa fa-bars'

    return (
      <Panel {...this.props}>
        <Title>
          <i className={icon} style={{lineHeight:'3vmin'}}/>
          <span>{text}</span>
          {this.props.children}
        </Title>
      </Panel>
    )
  }
}

const Panel = styled.div`
  position: relative;
  width: CALC(100% - 5vmin);
  padding: 2.5vmin 2.5vmin 1vmin 2.5vmin;
  background: #FFF;
  text-align: left;
  border-bottom: 1px solid ${RP_DDD};
`
const Title = styled.div`
  display: inline-block;
  position: relative;
  height: auto;
  padding-bottom: 0.75vmin; 

  i {
    padding-right: 2vmin;
    color: ${(props) => props.color ? props.color : colors[Math.floor(Math.random()*4)]};
    font-size: 1.5em;
    font-weight: 400;
    text-align: left;
  }

  span {
    color: ${RP_DARK_GREY};
    font-size: 1.5em;
    font-weight: 200;
    text-align: left;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    margin-bottom: 1vmin;

    i {
      font-size: 3vmin;
    }

    span {
      font-size: 3vmin;
    }
  }

  @media (max-width: 500px) and (orientation: portrait) {
    i {
      font-size: 3.5vmin;
    }

    span {
      font-size: 3.5vmin;
    }
  }
`
