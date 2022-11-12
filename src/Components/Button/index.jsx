import React from 'react'
import styled, {keyframes} from 'styled-components'
import { RP_FONT, RP_BLUE, RP_DARKBLUE, RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_GREY, RP_RED, RP_PINK, FACEBOOK, FACEBOOK_DEFAULT } from 'Components' // GLOBALS

export const BaseButton = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-family: ${ RP_FONT };
  font-size: 2vmin;
  text-align: center;
  outline: none;

  @media (max-width: 1024px) {
    font-size: 2vmin;
  }

  @media (max-width: 512px) {
    font-size: 2.5vmin;
  }
`
export const FormButton = styled(BaseButton)`
  padding: 1vmin 3vmin;
  border-radius: 0.5vmin;
  color: ${props => props.color || RP_WHITE};
  width: auto;
  min-width: 1.8vmin;
  min-height: 1.8vmin;
  background-color: ${props => props.background || RP_PINK };
  transition: background ease 0.25s;
  line-height: 1.5;

  &:hover {
	 background-color: ${props => props.hoverBackground || RP_RED };
  }
`
export const NavBarUserButton = styled(BaseButton)`
  padding: 1.5vmin 3vmin;
  padding-left: 1vmin;
  vertical-align: top;
  background: ${props => props.background || 'transparent' };
  color: ${RP_GREY};
  font-size: 1.6vmin;
  line-height: normal;
  transition: 0.5s ease;
  
  &:hover {
    color: ${RP_WHITE};
  }
`
export const NavBarUserButtonMobile = styled(BaseButton)`
  padding: 1.5vmin 3vmin;
  padding-left: 1vmin;
  vertical-align: top;
  background: ${props => props.background || 'transparent' };
  color: ${RP_GREY};
  font-size: 1.6vmin;
  line-height: normal;
  transition: 0.5s ease;
  highlight: none;
`
export const SexyButton = styled(BaseButton)`
  margin: 0;
  padding: 1.5vmin 3vmin;
  transition: 0.5s ease;
  font-size: 1.6vmin;
  color: ${props => props.textColor || '#FFF' };
  background: ${props => props.background || RP_BLACK };
  
  &:hover{
    background: ${props => props.hoverBackground || "#191919" };
  }
`
const WideButtonOuter = styled(FormButton)`
  cursor: pointer;
  display: block;
  position: relative;
  width: 50vmin;
  height: auto;
  padding: 2vmin 0;
  margin: 0.5vmin auto;
  font-family: 'Open Sans',sans-serif;
  font-size: 2.1vmin;
  font-weight: normal;
  text-align: center;
  transition: all 0.5s ease;
  border-radius: 0.5vmin;

  &:hover {
    background: ${FACEBOOK}
  }
`
const WideButtonIcon = styled.i`
  font-size: 15px;
  margin-right: 10px;
  position: relative;
  top: 1px;
`

export class WideButton extends React.PureComponent {
  render() {
    return (
      <WideButtonOuter {...this.props}>
        {this.props.icon ? <WideButtonIcon className={'fa fa-' + this.props.icon} /> : null}
        <span>{this.props.text}</span>
      </WideButtonOuter>
    )
  }
}

export const RoundButton = styled(SexyButton)`
  width: ${props => props.width || 'auto' };
  height: ${props => props.height || 'auto' };
  border-radius: 100%;
  margin: 0 auto;
  padding: 0;
  transition: all 0.5s ease;
`
const RoundImageButton = styled(RoundButton)`
	background: url('${props => props.image}');
	background-size: cover;
	background-repeat: no-repeat !important;
	background-position: center;
`
export const SocialMediaButton = styled(RoundButton)`
  float: right;
  margin: 1.1vmin 1vmin 0 0;
  color: ${RP_BLACK};
  background: rgb(249,249,249);
  line-height: 5vmin;
  transition: 05.s ease;

  &:hover {
    color: ${RP_WHITE};
  }
`
export const FineAssCTAButton = styled(BaseButton)`
  display: inline-block;
  width: 30vmin;
  height: auto;
  background: ${RP_WHITE};
  color: ${RP_DARK_GREY};
  margin: 0 auto;
  padding: 2vmin 3vmin;
  border-radius: 0.5vmin;
  transition: 0.25s ease all;
  font-weight: 400;
  box-shadow:3px 2px 3px rgba(0, 0, 0, 0.15);
  transition: all 0.25s ease;

  &:hover {
    color: ${FACEBOOK};
  }
`
export const TextButton = styled.div`
  cursor: pointer;
  width: auto;
  font-size: 1.8vmin;
  transition: all 0.25s ease;
  color: #555;
  font-weight:400;

  &:hover {
    color: rgb(255,19,18);
  }
`
const bounceKeyframes = keyframes`
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`
const Bounce = styled.div`
  width: 18px;
  height: 18px;
  background-color: white;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: ${bounceKeyframes} 1.4s infinite ease-in-out both;
  animation: ${bounceKeyframes} 1.4s infinite ease-in-out both;
  -webkit-animation-delay: ${props => props.delay};
  animation-delay: ${props => props.delay};
`

export class Button extends React.PureComponent {
  render() {
    if (this.props.loading) {
      return (
        <FormButton>
          <Bounce delay={'-0.32s'} />
          <Bounce delay={'-0.16s'} />
          <Bounce delay={'0s'} />
        </FormButton>
      )
    }
    return (<FormButton {...this.props}>{this.props.children}</FormButton>)
  }
}

export default Button

const A = styled.a`
  transition: all 0.25s ease;
  color: #555;
  text-decoration: none;

  &:hover {
    color: rgb(255,19,18);
  }
`

export class Anchor extends React.PureComponent {
  onClick(e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.onClick()
  }

  render() {
    return (<A {...this.props} onClick={this.onClick.bind(this)}>{this.props.children}</A>)
  }
}

export const PledgeButton = styled(BaseButton)`
  height: 4.5vmin; 
  width: 4.5vmin;
  margin: 0.5vmin 0 0 0.5vmin;
  line-height: 4.5vmin;
  transition: 0.5s ease;
  border-radius: 1vmin;
  color: ${props => props.textColor || RP_BLACK };
  background: ${props => props.background || '#FFF' };
  
  &:hover{
    color: ${(props) => props.hoverColor || RP_BLACK};
    background: ${props => props.hoverBackground || RP_SUPER_LIGHT };
  }
`
export const ListTile = styled.div`
  display: inline-block;
  width: CALC(${props => props.width || '100%'} - 6vmin);
  text-align: ${props => props.left ? 'left' : 'center'};
  padding: ${props => props.thin ? '2vmin' : '7.5vmin'} 2vmin;
  color: #FFF;
  background-color: ${props => props.background || RP_BLUE};
  border-radius: 1vmin;
  margin: 1vmin;
  box-shadow: 2px 2px 3px ${RP_GREY};

  &:hover {
    background-color: ${props => props.hoverBackground || RP_DARKBLUE};
    cursor: pointer;
  }

  i {
    font-size: ${props => props.thin ? '4vmin' : '5vmin'};
    margin-bottom: ${props => props.thin ? '0' : '1vmin'};
  }

  div {
    display: ${props => props.thin ? 'inline-block' : 'block'};
    padding-left: ${props => props.thin ? '1vmin' : '0'};
    font-size: 4vmin;
    line-height: 5vmin;
    font-weight: 200;
  }

  @media (max-width: 768px) {
    display: block;
    width: CALC(100% - 2vmin);
    padding: 2vmin;

    div {
      display: inline-block;
      font-size: 4vmin;
      padding-left: 2vmin;
    }

    i {
      font-size: 5vmin;
      margin-bottom: 0;
    }
  }
`