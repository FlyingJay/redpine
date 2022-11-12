import React from 'react' 
import styled from 'styled-components'

import { RP_BLUE, RP_DARKGREY } from 'Components'

                
export class Range extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
                    
  render() {
    return <RangeSlider type="range" 
    		disabled={this.props.disabled}
    		defaultValue={this.props.default}  
    		onChange={(e) => this.props.onChange(e.target.value)}/>
  }
}
export default Range

const RangeSlider = styled.input`
	-webkit-appearance: none;
	margin: 10px 0;
	width: 100%;

	&:focus {
	  outline: none;
	}
	&::-webkit-slider-runnable-track {
	  width: 100%;
	  height: 8.4px;
	  cursor: pointer;
	  animate: 0.2s;
	  background: ${props => props.disabled ? RP_DARKGREY : RP_BLUE};
	  border-radius: 8.4px;
	  border: 0.2px solid #010101;
	}
	&::-webkit-slider-thumb {
	  border: 1px solid #000000;
	  height: 16px;
	  width: 16px;
	  border-radius: 16px;
	  background: #ffffff;
	  cursor: pointer;
	  -webkit-appearance: none;
	  margin-top: -4px;
	}
	&:focus::-webkit-slider-runnable-track {
	  background: #367ebd;
	}
	&::-moz-range-track {
	  width: 100%;
	  height: 8.4px;
	  cursor: pointer;
	  animate: 0.2s;
	  background: ${props => props.disabled ? RP_DARKGREY : RP_BLUE};
	  border-radius: 8.4px;
	  border: 0.2px solid #010101;
	}
	&::-moz-range-thumb {
	  border: 1px solid #000000;
	  height: 16px;
	  width: 16px;
	  border-radius: 16px;
	  background: #ffffff;
	  cursor: pointer;
	}
	&::-ms-track {
	  width: 100%;
	  height: 8.4px;
	  cursor: pointer;
	  animate: 0.2s;
	  background: transparent;
	  border-color: transparent;
	  border-width: 16px 0;
	  border-radius: 8.4px;
	  color: transparent;
	}
	&::-ms-fill-lower {
	  background: #2a6495;
	  border: 0.2px solid #010101;
	  border-radius: 2.6px;
	}
	&::-ms-fill-upper {
	  background: ${props => props.disabled ? RP_DARKGREY : RP_BLUE};
	  border: 0.2px solid #010101;
	  border-radius: 2.6px;
	}
	&::-ms-thumb {
	  border: 1px solid #000000;
	  height: 16px;
	  width: 16px;
	  border-radius: 16px;
	  background: #ffffff;
	  cursor: pointer;
	}
	&:focus::-ms-fill-lower {
	  background: ${props => props.disabled ? RP_DARKGREY : RP_BLUE};
	}
	&:focus::-ms-fill-upper {
	  background: #367ebd;
	}
`