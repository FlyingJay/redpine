import React from 'react'
import styled from 'styled-components'

import { RP_RED } from 'Components' // GLOBALS


export class Badge extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

	render(){
		return this.props.count > 0
           ? <RedCircle {...this.props}>{this.props.count > 99 ? '...' : this.props.count}</RedCircle>
           : this.props.text
             ? <RedCircle {...this.props}>{this.props.text}</RedCircle>
             : null
	}
}

const RedCircle = styled.div`
  display: inline-block;
  position: absolute;
  top: ${props => props.shift && props.shift.top ? props.shift.top : '0'};
  right: ${props => props.shift && props.shift.right ? props.shift.right : '0'};
  border-radius: 20px;
  background: ${props => props.background || RP_RED};
  color: #FFF;
  font-size: ${props => props.fontSize ? props.fontSize : '1.5vmin'};
  font-weight: bold;
  text-align: center;
  line-height: ${props => props.fontSize ? props.fontSize : '1.5vmin'};
  padding: calc(${props => props.fontSize ? props.fontSize : '1.5vmin'}/3);
`

export default Badge