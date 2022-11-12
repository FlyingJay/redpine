import React from 'react'
import styled from 'styled-components'
import ReactSelect from 'react-select'

import { RP_FONT, RP_SUPER_LIGHT, RP_DARKGREY, RP_DARK_GREY, RP_PINK, RP_RED } from 'Components' // GLOBALS


export class Input extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  render() {
    let error = null
    if (this.props.error) {
      if (Array.isArray(this.props.error)) {
        error = this.props.error[0]
      } else {
        error = this.props.error
      }
    }
    const hasError = (error != null)

    return (
      <InputContainer inline={this.props.inline} width={this.props.width}>
        <InputError data-has-error={hasError} show={hasError} data-test-key="input-error">{error}</InputError>
        { this.props.value || this.state.value
          ? <Title show={!hasError}>{this.props.placeholder}</Title>
          : null }
        <FormInput 
          value={this.props.value ? this.props.value : this.state.value} 
          data-test-key="input" 
          data-has-error={hasError} 
          error={hasError} 
          onChange={this.handleChange} 
          onKeyPress={this.handleKeyPress}
          {...this.props}/>
      </InputContainer>
    )
  }

  handleChange(e){
    if(this.props.validate){
      if(this.props.validate[0].test(e.target.value)){
        this.updateState({value:e.target.value})
        this.props.onValidate(this.state.value)
      }else{
        //UPDATE ERROR NOTIF
      }
    }else{
      this.updateState({value:e.target.value})
      this.props.onUpdate ? this.props.onUpdate(e) : null
    }
  }

  handleKeyPress(e){
    if(this.props.onEnter){
      if (e.key === 'Enter') {
        this.props.onEnter()
      }
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

export class Select extends React.PureComponent {
  render() {
    return <SelectWrapper width={this.props.width} inline={this.props.inline}>
            <ReactSelect {...this.props} />
           </SelectWrapper>
  }
}

const SelectWrapper = styled.div`
  display: ${props => props.inline ? 'inline-block' : 'block'};
  width: ${props => props.width || 'auto'}; 
  font-size: 2.25vmin;

  .Select {
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }

    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }

    * {
      &:focus {
        outline: none !important;
        box-shadow: none !important;
      }
    }
  }

  .Select-control {
    text-align: left !important;
    border-radius: 0 !important;
    border-color: #DDD !important;
    padding: 1vmin !important;
    box-shadow: none !important;
  }

  .Select-placeholder {
    transition: line-height ease-in-out 0.2s !important;
    line-height: 55px !important;
    padding-left: 20px !important;
  }

  .Select--single>.Select-control .Select-value, .Select-placeholder {
    line-height: 49px !important;
    border: none;
    background: none;
    padding-left: 20px !important;
  }

  .Select--multi .Select-value {
    color: white !important;
    border: 1px solid ${RP_RED};
    background-color: ${RP_PINK};
  }

  .Select-value-icon {
    border-right-color: ${RP_RED};

    &:hover {
      color: white !important;
      background-color: ${RP_PINK} !important;
    }
  }

  .Select-input {
    input {
      position: relative;
      top: -3px;
    }
  }
  
  .Select-option {
    text-align: left;
    background: white;

    &.is-focused {
      background: #eee;
    }
  }
`
const BaseInput = styled.input`
  position: relative;
  padding: 2vmin 3vmin 2vmin 6vmin;
  margin: 0 auto 1vmin auto;
  border: 0.2vmin solid #DDD;
  outline: none;
  transition: border 0.25s ease;
  font-family: ${ RP_FONT };
  font-size: 2vmin;
  font-weight: normal;
  box-sizing: border-box

  &:hover {
    border-color: ${(props) => props.disabled ? '#DDD' : RP_DARK_GREY};
  }

  &:focus {
    border-color: ${(props) => props.disabled ? '#DDD' : 'rgb(255,19,18) !important'};
    box-shadow: 0 0 0.5vmin rgba(255,19,18,0.2) !important;
  } 
`
export const FormInput = styled(BaseInput)`
  display: inline-block;
  width: 100%;
  padding: ${props => props.error ? '3vmin 3vmin 1vmin 6vmin' : '2vmin 3vmin 2vmin 6vmin'};
  background: #FFF ${(props) => props.image ? 'url(/Assets/images/image-input/' + props.image + '.png) !important' : ''};
  background-size: 3vmin !important;
  background-repeat: no-repeat !important;
  background-position: 12px center !important;
  position: relative;
  background: #FFF;
  border: 1px solid #DDD;
  border-color: ${props => props.error ? 'rgb(255,19,18)' : '#DDD'};
  outline: none;
  transition: border 0.5s ease, padding 0.2s ease;
  font-family: 'Open Sans',sans-serif;
  font-size: 16px;
  font-weight: normal;
  box-sizing: border-box;

  &:focus {
    background: #FFF ${(props) => props.focusImage ? 'url(/Assets/images/image-input/' + props.focusImage + '.png) !important' : ''};
    background-size: 3vmin !important;
    background-repeat: no-repeat !important;
    background-position: 12px center !important;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    padding: ${props => props.error ? '3vmin 2vmin 1vmin 7vmin' : '2vmin 2vmin 2vmin 7vmin'};
    font-size: 2.5vmin;
    background-size: 3vmin !important;
    background-position: 9px center !important;

    &:focus {
      background-size: 3vmin !important;
      background-position: 9px center !important;
    } 
  }

  @media (max-width: 767px) and (orientation: landscape) {
    background-size: 2.5vmin !important;
    background-position: 7px center !important;

    &:focus {
      background-size: 2.5vmin !important;
      background-position: 7px center !important;
    } 
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    background-size: 2.5vmin !important;

    &:focus {
      background-size: 2.5vmin !important;
    } 
  }
`
export const BigSearchInput = styled(BaseInput)`
  width: 70%;
  display: block;
`
const InputContainer = styled.div`
  display: ${props => props.inline ? 'inline-block' : 'block'};
  position: relative;
  width: ${props => props.width || 'auto'};
`
const InputError = styled.div`
  color: red;
  position: absolute;
  top: 1.2vmin;
  opacity: ${props => props.show ? '1' : '0'};
  z-index: 20;
  font-size: 1.8vmin;
  left: 6vmin;
  transition: opacity 0.2s ease;
  pointer-events: none;
`
const Title = styled.div`
  color: ${RP_DARK_GREY};
  position: absolute;
  top: 0.5vmin;
  display: ${props => props.show ? 'block' : 'none'};
  opacity: 0.8;
  z-index: 20;
  font-size: 1.8vmin;
  left: 6vmin;
  transition: opacity 1s ease;
  pointer-events: none;
`
export const TextBox = styled.textarea`
  display: block;
  position: relative;
  width: ${props => props.width || '100%'};
  min-height: 15vmin;
  padding: ${props => props.error ? '3vmin 3vmin 1vmin 6vmin' : '1.5vmin 3vmin 2vmin 6vmin'};
  margin: 1vmin 0;
  background: #FFF ${(props) => props.image ? 'url(/Assets/images/image-input/' + props.image + '.png) !important' : ''};
  background-size: 3vmin !important;
  background-repeat: no-repeat !important;
  background-position: 12px 12px !important;
  border-color: ${props => props.error ? 'rgb(255,19,18)' : '#DDD'};
  font-family: 'Open Sans',sans-serif;
  font-size: 2vmin;
  font-weight: normal;
  outline: none;
  box-sizing: border-box;
  transition: border 0.5s ease, padding 0.2s ease;

  &::-webkit-scrollbar {cursor: pointer;width: 0.75vmin;}
  &::-webkit-scrollbar-track {background: ${RP_SUPER_LIGHT};border-radius:0.75vmin;}
  &::-webkit-scrollbar-thumb {background: ${RP_DARKGREY};border-radius:0.75vmin;}
  &::-webkit-scrollbar-thumb:hover {}

  &:focus {
    background: #FFF ${(props) => props.image ? 'url(/Assets/images/image-input/' + props.focusImage + '.png) !important' : ''};
    background-size: 3vmin !important;
    background-repeat: no-repeat !important;
    background-position: 12px 12px !important;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 2.5vmin;
  }
`
