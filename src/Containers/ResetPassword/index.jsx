import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { App } from 'Containers'
import { paths, getQueryParams } from 'globals'

import { FormButton, WideButton, SexyButton, ThickPanel, FACEBOOK, FormSeparator, TextButton, FormError, WorkingButton, BackgroundPanel, LoginPanel, LoginPanelText,  Clear, RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_RED, FormNotice, PrevButton } from 'Components'
import { Input } from 'Components'
import { Link } from 'Components'

import actions from './actions'
import selectors from './selectors'


export class ResetPassword extends React.PureComponent {
  constructor(props) {
    super(props)
    
    const params = getQueryParams()

    this.state = {
      token: params.token ? params.token : '',
      email: params.email ? params.email : '',
      password: '', 
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
          Your password was successfully reset!
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
        <FormError error={error.detail} />
        <Input data-test-key="email-field" error={error.email} value={this.state.email} background="blue" name="email" type="text" placeholder="Email" onUpdate={(e) => this.updateState({ email: e.target.value })} image={"email"} focusImage={"email-focus"} required />
        <Input data-test-key="token-field" error={error.token} value={this.state.token} background="blue" name="token" type="text" placeholder="Security Token" onUpdate={(e) => this.updateState({ token: e.target.value })} image={"shield"} focusImage={"shield-focus"} required />
        <Input data-test-key="password-field" error={error.password} background="blue" name="email" type="password" placeholder="New Password" onUpdate={(e) => this.updateState({ password: e.target.value })} image={"password"} focusImage={"password-focus"} required />
        
        <div style={{padding: '1vmin 0', fontSize: '1.8vmin'}}>
          <Link href={paths.forgotPassword()}>Don't have a token? Submit a password change request.</Link>
        </div>

        <Bottom>
          <Link href={paths.login()}>
            <LoginBtn data-test-key="reset-password-login-btn" name='login'>
              <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;back to Login
            </LoginBtn>
          </Link>
          <RecoverBtn data-test-key="submit-btn" onClick={() => this.props.submit(this.state)}>Update Password</RecoverBtn>
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
    submit: (data) => {
      dispatch(actions.submit(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)


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
