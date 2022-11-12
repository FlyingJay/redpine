import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths, getQueryParams } from 'globals'
import { App } from 'Containers'

import { Link, BackgroundPanel, LoginPanel, TextButton, Input, FormButton, RP_PINK, RP_RED, Checkbox, FormError } from 'Components'

import actions from './actions'
import selectors from './selectors'

export class RegisterFacebook extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      is_artist: false,
      is_venue: false,
      code: null,
      redirect_uri: paths.facebookRegistrationRedirectURI()
    }

    const params = getQueryParams()
    let update = {}

    if (params.code) {
      update.code = params.code
    } else {
      this.props.getCode()
    }

    this.updateState(update)
  }

  render() {
    const error = this.props.error || {}

    return (
      <App forbidAuth>
        <BackgroundPanel background='happi.png'>
          <LoginPanel>
            <Link href={paths.register()}>
              <TextButton name="register">
                <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;
                <span>Sign up with Email</span>
              </TextButton>
            </Link>
            <Spacer />
            <FormError error={error.detail} />
            <Input error={error.first_name} name='first-name' type='text' placeholder='First Name' image='first-name' focusImage='first-name-focus' onUpdate={(e) => this.updateState({first_name: e.target.value})} />
            <Input error={error.last_name} name='last-name' type='text' placeholder='Last Name' image='last-name' focusImage='last-name-focus' onUpdate={(e) => this.updateState({last_name: e.target.value })} />
            <Input error={error.username} name='username' type='text' placeholder='Username, make it something cool!' image='username' focusImage='username-focus' onUpdate={(e) => this.updateState({username: e.target.value})} />
            <Checkbox name='is-artist' label="I am an artist" onChange={(val) => this.updateState({is_artist: val})} />
            <Checkbox name='is-venue' label="I operate a venue" onChange={(val) => this.updateState({is_venue: val})} />
            <Terms>
              By registering you agree to our <Link href={paths.privacyPolicy()}>Privacy Policy</Link> and <Link href={paths.termsOfUse()}>Terms of Use</Link>.
            </Terms>
            <Bottom>
              <Link href={paths.login()}><TextButton name='login'>Login</TextButton></Link>
              <RegisterBtn
                name='submit-registration' 
                onClick={() => {
                  this.props.submitRegistration(this.state)
                }}>Sign Up</RegisterBtn>
            </Bottom>
          </LoginPanel>
        </BackgroundPanel>
      </App>
    )
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    error: selectors.selectError(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitRegistration: (state) => {
      dispatch(actions.submitRegistration(state))
    },

    getCode: () => {
      window.location = paths.facebookRegistrationOAuth()
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFacebook)


const Spacer = styled.div`
  width: 100%
  height: 15px
`
const Terms = styled.div`  
  font-size: 1.7vmin;
  margin-top: 15px
`
const RegisterBtn = styled(FormButton)`
  position: absolute;
  right: 0;
  bottom: 0;
`
const Bottom = styled.div`
  position: relative;
  margin-top: 25px;
  height: 24px;
`