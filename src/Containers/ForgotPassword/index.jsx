import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'

import { App } from 'Containers'

import { Input, FormButton, FormNotice, WideButton, SexyButton, ThickPanel, FACEBOOK, FormSeparator, TextButton, FormError, WorkingButton, 
  BackgroundPanel, LoginPanel, LoginPanelText, Anchor, Clear, Bold, 
  RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_RED } from 'Components'
import { Link } from 'Components'

import selectors from './selectors'
import actions from './actions'


export class ForgotPassword extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: ''
    }
  }

  render() {
    return (
      <App forbidAuth>
        <BackgroundPanel background="happi.png">
          {this.props.success ? this.renderSuccessContent() : this.renderForm()}
        </BackgroundPanel>
      </App>
    )
  }

  renderSuccessContent() {
    return (
      <LoginPanel>
        <FormNotice>
          We've sent a recovery link to your email.
          <br/><br/>
          <Bold>It may take up to 5 minutes for the email to appear in your inbox.</Bold>
          <br/><br/>
          If you do not see it in your inbox, please check your spam/junk folders.
          <br/><br/>
          <br/><br/>
          <Link href={paths.login()}>
            <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;back to Login
          </Link>
        </FormNotice>
      </LoginPanel>
    )
  }

  renderForm() {
    const error = this.props.error || {}
    return (
      <LoginPanel>
        <LoginPanelText>
          If you've forgotten your username or password, provide the email associated with your account and we will email you a link to change your password.
        </LoginPanelText>
        <LoginPanelText style={{paddingBottom: '3vmin'}}>
          If you do not receive an email in your inbox, check your spam/trash folders.
        </LoginPanelText>
        <Input data-test-key="email-field" error={error.email} background="blue" name="email" type="text" placeholder="Email" onUpdate={(e) => this.updateState({ email: e.target.value })} image={"email"} focusImage={"email-focus"} required />
        
        {/*<div style={{padding: '1vmin 0', fontSize: '1.8vmin'}}>
          <Anchor data-test-key="already-have-token-btn" href={paths.resetPassword()} onClick={() => this.props.viewResetPassword()}>I already have a token... Set a new password!</Anchor>
        </div>*/}

        <Bottom>
          <Link href={paths.login()}>
            <LoginBtn name='login'><i className="fa fa-arrow-left"></i>&nbsp;&nbsp;back to Login</LoginBtn>
          </Link>
          <RecoverBtn data-test-key="submit-btn" onClick={() => this.props.submit(this.state.email)}>Recover</RecoverBtn>
          <Clear></Clear>
        </Bottom>
      </LoginPanel>
    )
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: selectors.selectError(state, props),
    success: selectors.selectSuccess(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (email) => {
      dispatch(actions.submit(email))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)


const Bottom = styled.div`
  margin-top: 3vmin;
  position: relative;
  height: auto;
`
const LoginBtn = styled(FormButton)`
  display: block;
  position: relative;
  float:left;
  padding-left: 0;
  padding-right: 0;
  background: ${RP_WHITE};
  color: ${RP_DARK_GREY};
  text-align: left;

  &:hover {
    background: ${RP_WHITE};
    color: ${RP_BLACK};
  }
`
const RecoverBtn = styled(FormButton)`
  display: block;
  position: relative;
  float: right;
`