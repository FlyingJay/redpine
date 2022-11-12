import React from 'react'
import styled from 'styled-components'

import { RP_BLACK, RP_WHITE, RP_SUPER_LIGHT, Toggle } from 'Components'


export class ToggleSetting extends React.PureComponent {
  render() {
    return (
      <Container>
        <Label>{this.props.label}</Label>
        <SubLabel>{this.props.sublabel}</SubLabel>
        <TogglePosition>
        	<Toggler enabled={this.props.enabled} onChange={this.props.onChange} />
        </TogglePosition>
      </Container>
    )
  }
}

export default ToggleSetting


const Container = styled.div`
	padding: 3vmin;
	color: inherit;
  	background: inherit;
  	border-radius: inherit;
`
const Label = styled.div`
	display: block;
	position: relative;
	color: inherit;
	font-size: 1.8vmin;
	font-weight: bold;

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
	padding-top: 3vmin;
	color: inherit;
	font-size: 1.6vmin;

	@media (max-width: 767px) and (orientation: portrait) { 
		font-size: 1.4vmin;
		font-weight: 100;
	}

	@media (min-width: 768px) and (max-width: 1024px) { 
		font-size: 1.4vmin;
		font-weight: 100;
	}
`
const TogglePosition = styled.div`
	display: block;
	position: absolute;
	right: 3vmin;
	bottom: 3vmin;

	@media (max-width: 767px) and (orientation: portrait) { 
		right: 1vmin;
		bottom: 1vmin;
	}

	@media (min-width: 768px) and (max-width: 1024px) { 
		right: 2vmin;
		bottom: 2vmin;
	}
`
const Toggler = styled(Toggle)`
`
