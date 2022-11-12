import React from 'react'
import styled from 'styled-components'

import { RP_WHITE, RP_BLACK } from 'Components' // GLOBALS
import { PageErrorImage } from 'Components' // IMAGE
import { Notification } from 'Components' // NOTIFICATION

//TURN THIS INTO 2 COMPONENTS (FormError, PageError)

export class FormError extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: props.error,
      show: false
    }
  }

  render() {
    return (
      <FormErrorDiv show={this.state.show} onClick={() => this.hide()}>
        {
          this.state.show 
          ?
            <Notification
                sectional={true}
                notifIcon="info"
                notifText={this.props.error}>
            </Notification>
          : null
        }
      </FormErrorDiv>
    )
  }

  hide() {
    this.setState(Object.assign(this.state, {
      show: false,
      error: null
    }))
    this.forceUpdate()
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.error !== nextProps.error) {
      this.setState(Object.assign(this.state, {
        show: true,
        error: nextProps.error
      }))
      this.forceUpdate()
    }
  }
}

export const FormErrorDiv = styled.div`
  cursor: pointer;
  display: ${props => props.show ? 'block' : 'none'};
  position: relative;
  width: auto;
  height: auto;
  transition: all 0.25s ease;
`

export class PageError extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: props.error,
      show: false
    }
  }

  render() {
    return (
      <PageErrorDiv>
        <PageErrorWrapper>  
          <PageErrorHeading>{this.props.errorHeading}</PageErrorHeading>
          <PageErrorSummary>{this.props.errorSummary}</PageErrorSummary>
          <PageErrorImage image="/Assets/images/background/errorbg.png" />          
        </PageErrorWrapper>
      </PageErrorDiv>
    )
  }

  hide() {
    this.setState(Object.assign(this.state, {
      show: false,
      error: null
    }))
    this.forceUpdate()
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.error !== nextProps.error) {
      this.setState(Object.assign(this.state, {
        show: true,
        error: nextProps.error
      }))
      this.forceUpdate()
    }
  }
}

export const PageErrorDiv = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto;
  padding: 0;
  background: rgb(141, 223, 234);
`
export const PageErrorWrapper = styled.div`
  display: block;
  position: relative;
  width: 80vmin;
  height: auto;
  margin: auto;
  padding: 0;
  top: 50%;
  transform: translateY(-50%);
`
export const PageErrorHeading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: auto;
  padding: 3vmin 0;
  color: #222a4b;
  font-size: 3.3vmin;
  font-weight: 700;
  text-align: center;
`
export const PageErrorSummary = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto 3vmin auto;
  padding: 0;
  color: ${RP_BLACK};
  font-size: 2.3vmin;
  font-weight: 100;
  text-align: center;
`