import React from 'react'
import styled from 'styled-components'
import { RP_WHITE, RP_DDD, RP_BLUE, RP_GREY, RP_FONT } from 'Components' // GLOBALS

/*** STYLE DEFINITIONS ***/
const Container = styled.div`
  cursor: pointer;
  position: relative;
  display: ${props => props.inline ? 'inline-block' : 'block'};
  width: ${props => props.width || 'auto'};
  margin: ${props => props.margin || '1vmin auto'};
  padding: ${props => props.padding || '1.8vmin 3vmin'};
  background: ${props => props.background || '#FFF'};
  background-size: 3vmin !important;
  background-repeat: no-repeat !important;
  background-position: 45vmin center !important;
  border: 1px solid ${RP_DDD};
  border-radius: ${props => props.borderRadius || 0};
  color: #555
  font-family: ${RP_FONT};
  font-size: 2vmin;
  font-weight: normal;
  text-align: left;
  outline: none;
  box-sizing: border-box;
  user-select: none;
  transition: border 0.5s ease;
  -webkit-transition: border 0.5s ease;
`

const Box = styled.div`
  cursor: inherit;
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 2vmin;
  height: 2vmin;
  margin-right: 15px;
  border: ${RP_GREY} solid 1px;
  top: 1px;
  cursor: pointer;
`

const Label = styled.label`
  cursor: inherit;
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: ${props => props.fontSize || '2vmin'};
`

const Checkmark = styled.i`
  cursor: inherit;
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  color: ${RP_BLUE};
  font-size: 2vmin;
`

export class Checkbox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      checked: props.checked === true ? true : false
    }
  }

  click() {
    const nextVal = !this.state.checked
    this.setState(Object.assign({
      checked: nextVal
    }))

    if (this.props.onChange) {
      this.props.onChange(nextVal)
    }

    this.forceUpdate()
  }

  render() {
    return (
      <Container 
        name={this.props.name} 
        inline={this.props.inline} 
        width={this.props.width}
        background={this.props.background}
        margin={this.props.margin}
        padding={this.props.padding}
        onClick={() => this.click()}>
        <Box>
          <Checkmark 
            show={this.state.checked} 
            className='fa fa-check' />
        </Box>
        <Label fontSize={this.props.fontSize}>{this.props.label}</Label>
      </Container>
    )
  }

  componentWillReceiveProps(props) {
    if(props.checked === false){
      this.setState({checked:false})
    }
  }
}
export default Checkbox