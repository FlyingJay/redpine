// ***** IMPORTS *****
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { getQueryParams, paths } from 'globals'

import { App } from 'Containers'
import { Input, FormButton, WideButton, ThickPanel, FACEBOOK, FACEBOOK_DEFAULT, FormSeparator, TextButton, FormError, WorkingButton, BackgroundPanel, LoginPanel, Clear, 
  RP_BLACK, RP_WHITE, RP_DARK_GREY, RP_RED, FormNotice, PrevButton, Link } from 'Components'

import selectors from './selectors'
import actions from './actions'


export class Login extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <App forbidAuth>
        <BackgroundPanel background="happi.png">
          {
            this.props.alphaUser 
            ? <LoginPanel>
                <FormNotice>
                  Hey!  We're migrating from alpha to beta.  We've updated our password storage mechanism and so you'll need to reset your password.
                  Please check your email for instructions!
                </FormNotice>
                <PrevButton onClick={() => this.props.closeAlphaModal()}>
                  <i className="fa fa-arrow-left" />&nbsp;&nbsp;Return
                </PrevButton>
              </LoginPanel>
           : <LoginPanel>
              <FormError name="facebook-error" error={this.props.facebookError} />
              <FacebookBtn name='facebook-login' icon='facebook' text='Log in with Facebook' onClick={() => this.props.startFacebookLogin()} />
              <FormSeparator text='or' />
              <FormError name="error" error={this.props.error} />
              <form onSubmit={(e) => {
                e.preventDefault()
                this.props.submit(this.state.email, this.state.password)
              }}>
                <Input background="blue" name="email" type="text" placeholder="Username/Email" onUpdate={(e) => this.setEmail(e.target.value)} image={"username"} focusImage={"username-focus"} required />
                <Input name="password" type="password" placeholder="Password" onUpdate={(e) => this.setPassword(e.target.value)} image={'password'} focusImage={'password-focus'} required />
                <button type="submit" style={{display: 'none'}} data-comment="i am here to make form submit by enter btn <3" />
              </form>
              <Link href={paths.forgotPassword()}>
                <ForgotPassword data-test-key="forgot-password-btn">Forgot your Password? Recover</ForgotPassword>
              </Link>
              <Bottom>
                <Link href={paths.register()}>
                  <SignupBtn name='register'>Signup</SignupBtn>
                </Link>
                <LoginBtn name="login" onClick={() => this.props.submit(this.state.email, this.state.password)}>Log in</LoginBtn>
                <Clear></Clear>
              </Bottom>
            </LoginPanel>
          }
        </BackgroundPanel>
      </App>
    )
  }

  setEmail(email) {
    this.setState(Object.assign(this.state, {
      email
    }))
  }

  setPassword(password) {
    this.setState(Object.assign(this.state, {
      password
    }))
  }

  componentDidMount() {
    const params = getQueryParams()
    if (params.facebookCallback !== undefined) {
      this.props.validateFacebookToken(params.code)
    }
  }
}

const mapStateToProps = (state, props) => {
  return {
    submitted: selectors.selectSubmitted(state),
    form: selectors.selectForm(state),
    error: selectors.selectError(state),
    facebookError: selectors.selectFacebookError(state),
    alphaUser: selectors.selectAlphaUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submit: (email, password) => {
      return dispatch(actions.submitForm(email, password))
    },

    updateForm: (update) => {
      return dispatch(actions.updateForm(update))
    },

    startFacebookLogin: () => {
      return dispatch(actions.startFacebookLogin())
    },

    validateFacebookToken: (token) => {
      return dispatch(actions.validateFacebookToken(token))
    },

    closeAlphaModal: () => {
      return dispatch(actions.closeAlphaModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const ForgotPassword = styled(TextButton)`
  display: block;
  position: relative;
  width: auto;
  text-align: right;
  margin-top: 3vmin;
  font-weight: 400;
`
const Bottom = styled.div`
  margin-top: 3vmin;
  position: relative;
  height: auto;
`
const SignupBtn = styled(FormButton)`
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
const LoginBtn = styled(FormButton)`
  display: block;
  position: relative;
  float: right;
`
const FacebookBtn = styled(WideButton)`
  color: #FFF;
  background: ${FACEBOOK_DEFAULT};
`

const AlphaBackButton = styled(FormButton)`
  margin-top: 20px;
`