import React from 'react'
import styled from 'styled-components'

import { RP_RED } from 'Components'


export class InputSetting extends React.PureComponent {
  constructor(props) {
    super(props) 

    this.state = {
      editing: false
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }

  render() {
    return (
      <Container>
        <Label>{this.props.label}</Label>
        <Value show={!this.state.editing}>{this.props.value}</Value>
        {
          this.state.editing
            ?(
              [
                <Input show={this.state.editing} value={this.props.value} />,
                <EditBtn onClick={() => this.updateState({editing: true})}>Update</EditBtn>, 
                <EditBtn onClick={() => this.updateState({editing: false})}>Cancel</EditBtn>
              ]
            )
            :(
              this.props.editable === "true"
              ? <EditBtn onClick={() => this.updateState({editing: true})}>Edit</EditBtn> 
              : ''
            )
        }
      </Container>
    )
  }
}
export default InputSetting


const Container = styled.div`
    display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0;
  padding: .75vmin 0;

  @media (max-width: 767px) and (orientation: portrait) {
    padding: 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    padding: 1vmin 0;
  }
`
const Label = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 15vw;
  height: auto;
  margin: 0;
  padding: 0 5vmin 0 0;
  font-size: 1.8vmin;
  font-weight: bold;  
  text-align: right;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 20vw;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: 20vw;
  }
`
const Value = styled.div`
  display: ${(props) => props.show ? 'inline-block' : 'none'};
  vertical-align: middle;
  position: relative;
  width: auto;
  max-width: 30vw;
  height: auto;
  margin: 0;
  padding: 0;
  font-size: 1.8vmin;
  font-weight: 100; 
`
const Input = styled.input`
  display: ${(props) => props.show ? 'inline-block' : 'none'};

`
const EditBtn = styled.button`
  cursor: pointer;
  display: 'inline-block';
  vertical-align: bottom;
  width: auto;
  height: auto;
  padding: 0 1vmin;
  background: transparent;
  border: none;
  highlight: none;
  color: ${RP_RED};
  text-decoration: none;
  font-size: 1.6vmin;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`
