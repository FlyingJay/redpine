import React from 'react' 
import styled from 'styled-components'

import { RP_GREEN, RP_SUPER_LIGHT } from 'Components' //GLOBALS
                

class BasicCheckbox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
                    
  render() {
    return <Container check={this.props.check} onClick={this.props.onClick}>
			 			{ this.props.check
			 				? <i className="fa fa-check"/>
			 				: null }
		   		 </Container>
  }
}
export default BasicCheckbox


const Container = styled.div`
  display: inline-block;
  border: 1px solid ${RP_SUPER_LIGHT};
  padding: 0.25vmin;
  text-align: center;
  line-height: 4vmin;
  vertical-align: middle;

  min-width: 4vmin;
  min-height: 4vmin;

  i {
  	color: ${RP_GREEN};
  	font-size: 3vmin;
  }

  &:hover {
  	cursor: pointer;
  }

`