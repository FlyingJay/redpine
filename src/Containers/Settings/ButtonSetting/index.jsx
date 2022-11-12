import React from 'react'
import styled from 'styled-components'

import { RP_LIGHTGREY, RP_PINK, RP_RED } from 'Components' //GLOBALS
import { Button } from 'Components' // BUTTON


export class ButtonSetting extends React.PureComponent {
  render() {
    return (
      <Container>
        <Label>{this.props.label}</Label>
        <SubLabel>{this.props.sublabel}</SubLabel>
        <Button 
        	background={this.props.disabled ? RP_LIGHTGREY : RP_PINK }
        	hoverBackground={this.props.disabled ? RP_LIGHTGREY : RP_RED }
        	style={{cursor:(this.props.disabled ? 'default' : 'pointer')}}
        	onClick={this.props.disabled ? null : this.props.submitFunction}>
        	{this.props.buttonText}
        </Button>
      </Container>
    )
  }
}
export default ButtonSetting


const Container = styled.div`
	padding: 3vmin;
	color: inherit;
	background: inherit;
	border-radius: inherit;
	text-align:right;
`
const Label = styled.div`
	display: block;
	position: relative;
	color: inherit;
	font-size: 1.8vmin;
	font-weight: bold;
	text-align: left;

	@media (max-width: 767px) and (orientation: portrait) { 
		font-size: 1.6vmin;
		font-weight: bold;
	}

	@media (min-width: 768px) and (max-width: 1024px) { 
		font-size: 1.6vmin;
		font-weight: bold;
	}
`
const SubLabel = styled.div`
	display: block;
	position: relative;
	padding-top: 1.5vmin;
	padding-bottom: 2.5vmin;
	color: inherit;
	font-size: 1.6vmin;
	text-align: left;

	@media (max-width: 767px) and (orientation: portrait) { 
		font-size: 1.4vmin;
		font-weight: 100;
	}

	@media (min-width: 768px) and (max-width: 1024px) { 
		font-size: 1.4vmin;
		font-weight: 100;
	}
`