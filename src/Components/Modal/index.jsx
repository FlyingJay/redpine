import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_RED, RP_PINK, RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_DARKGREY, RP_SUPER_LIGHT, RP_BLUE, RP_DARKBLUE } from 'Components'
import { ModalPromptLike, ModalPromptHeader, ModalPromptDesc, DescTotalWarn, DescConsequences, ModalPromptActions, ConfirmAction, CancelAction } from 'Components'  // MODAL AND MODALOTHERS
import { RedLink, Bold } from 'Components' // LINK


export class Modal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.keydown = this.handleKeyDown.bind(this)
    this.checkProps(props)
  }

  render() {
    const nested_modals = this.props.nested_modals || 0

    return (
      this.props.show
      ? <ModalContainer 
          data-test-key="container" 
          show={this.props.show}
          type={this.props.type}
          transparent={this.props.transparent} 
          printable={this.props.printable}>
          {
            this.props.type == "PROMPT" 
            ? null
            : <CloseButtonArea 
                show={this.props.show}
                type={this.props.type}
                transparent={this.props.transparent}
                data-test-key="close-btn" onClick={() => this.close()}>
                ESC
              </CloseButtonArea>
          }
          {this.props.children}
        </ModalContainer>
      : null
    )
  }

  checkProps(props) {
    if (props.show) {
      window.addEventListener('keydown', this.keydown)
    } else {
      window.removeEventListener('keydown', this.keydown)
    }
  }

  close() {
    window.removeEventListener('keydown', this.keydown)
    this.props.onClose()
  }

  handleKeyDown (event) {
    const keyName = event.key;
    if (keyName == 'Escape') {
      this.close()
    }
  }

  componentDidMount() {
    if (this.props.onLoadedCallback) {
      this.props.onLoadedCallback()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkProps(nextProps)
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

export class SearchModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.keydown = this.handleKeyDown.bind(this)
    this.checkProps(props)
  }

  render() {
    return (
      this.props.show
      ? <SearchModalContainer show={this.props.show}>
          <SearchModalCloseButtonArea show={this.props.show} data-test-key="close-btn" onClick={() => this.close()}>
            {this.props.ESCLettering == "NONE" ? "" : "ESC"}
          </SearchModalCloseButtonArea>
          <SearchModalInner>{this.props.children}</SearchModalInner>
        </SearchModalContainer>
      : null 
    )
  }

  checkProps(props) {
    if (props.show) {
      window.addEventListener('keydown', this.keydown)
    } else {
      window.removeEventListener('keydown', this.keydown)
    }
  }

  close() {
    window.removeEventListener('keydown', this.keydown)
    this.props.onClose()
  }

  handleKeyDown (event) {
    const keyName = event.key;
    if (keyName == 'Escape') {
      this.close()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.checkProps(nextProps)
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}


export class WarningModal extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render () {
    const description   = this.props.description
    const nested_modals = this.props.nested_modals || 0

    return (
      this.props.show
      ? <Modal show type="PROMPT" transparent={true} onClose={() => this.props.onClose()} nested_modals={nested_modals}>
          <ModalPromptLike>
            <ModalPromptHeader/>
            <ModalPromptDesc style={{fontSize:'2vmin',textAlign:'left'}}>
              { !this.props.light_warning
                ? <DescTotalWarn>Are you sure? This action cannot be undone.</DescTotalWarn> 
                : null }
              <DescConsequences>
                {description}
                <br/>
                If you have any questions or concerns you can contact us via
                &nbsp;<RedLink href={paths.redpineFacebook()} target="_blank">facebook</RedLink>,
                &nbsp;<RedLink href={paths.redpineTwitter()} target="_blank">twitter</RedLink> or
                &nbsp;<RedLink href={paths.supportMail()} target="_blank">email</RedLink>.
              </DescConsequences>
            </ModalPromptDesc>
            <ModalPromptActions>
              <CancelAction onClick={() => this.props.onClose()}>
                <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Cancel
              </CancelAction>
              <ConfirmAction onClick={() => this.continue()}>
                Continue
              </ConfirmAction>
            </ModalPromptActions>
          </ModalPromptLike>
         </Modal>
      : null
    )
  }

  continue(){
    this.props.onContinue()
    this.props.onClose()
  }
}

const ModalContainer = styled.div`
  position: fixed;
  z-index: ${props => props.type == "PROMPT" || props.type == "BUYREDPINE" ? 110 : 100};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.transparent ? 'rgba(0,0,0,0.75)' : '#FFF'};
  transition: all .3s ease .15s;
  overflow-y: auto;

  &::-webkit-scrollbar {cursor: pointer;width: 1.5vmin;}
  &::-webkit-scrollbar-track {background: ${RP_SUPER_LIGHT};border-radius:5vmin;}
  &::-webkit-scrollbar-thumb {background: ${RP_DARKGREY};border-radius:5vmin;}
  &::-webkit-scrollbar-thumb:hover {}

  @media print {
    display: block;
    position: static;
    overflow-y: visible;
  }
`
const CloseButtonArea = styled.div`
  z-index: ${props => props.type == "PROMPT" || props.type == "BUYREDPINE" ? 111 : 101};
  cursor: pointer;
  display: ${(props) => props.show ? 'block' : 'none'};
  position: fixed;
  width: 4vmin;
  height: auto;
  top: 1vmin;
  right: 2vmin;
  margin: 3vmin 3vmin 0 0;
  padding: 4.5vmin 0 0 0;
  background: url(/Assets/images/buttons/cancel.png);
  background-size: 3vmin;
  background-position: center 1vmin;
  background-repeat: no-repeat;
  color: ${RP_DARK_GREY};
  font-size: 2vmin;
  font-weight: bold;
  text-align: center;
  transition: all 0.5s ease;

  &:hover {
    background: url(/Assets/images/buttons/cancel-hover.png);
    background-size: 3vmin;
    background-position: center 1vmin;
    background-repeat: no-repeat;
    color: ${RP_BLACK};
  }

  @media print {
    visibility: hidden;
  }
`
const SearchModalContainer = styled.div`
  z-index: 11;
  opacity: ${(props) => props.show ? '1' : '0'};
  visibility: ${(props) => props.show ? 'visible' : 'hidden'};
  position: absolute;
  width: auto;
  height: auto;
  padding: 5vmin 0 0 0;
  margin-top: -1px;
  background: #FFF;
  border-radius: 0 0 3xp 3px;
  box-shadow: 3px 3px 3px -3px #999, 3px 3px 3px -3px #999, -3px 3px 3px -3px #999;
  overflow: hidden;
  transition: all .3s ease .15s;
`
const SearchModalCloseButtonArea = styled(CloseButtonArea)`
  display: block;
  position: absolute;
  top: 0;
  right: 0vmin;
  margin-top: 2.5vmin;
  padding: 3.5vmin 0 1.5vmin 0;
  background-color: transparent;
  background-size: 2vmin;
  font-size: 1.7vmin;
  transition: none;

  &:hover {
    background-size: 2vmin;
  }
`
const SearchModalInner = styled.div`
  padding: 3vmin;
`