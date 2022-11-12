import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'

import { App } from 'Containers'
import { BackgroundPanel, LoginPanel, WideButton, RP_DARKGREY, RP_BLACK, RP_RED, FormSeparator, FACEBOOK, FACEBOOK_DEFAULT, TextButton } from 'Components'
import { Link } from 'Components'



export class Register extends React.PureComponent {
  render() {
    return <App forbidAuth>
            <BackgroundPanel background="happi.png">
              <LoginPanel>
                {
                  /*
                    FACEBOOK SIGNUP REMOVED FOR NOW - 8/30/2018 (Jason)
                    <FacebookBtn icon='facebook' text='Register using Facebook' onClick={() => this.props.facebook()} data-test-key='facebook-btn' />
                    <FormSeparator text="or" />
                  */
                }
                <Link href={paths.registerEmail()}>
                  <EmailBtn name='register-email' icon='envelope' text='Register with Email' />
                </Link>
                <Bottom>
                  <Link href={paths.login()}>
                    <TextButton name='login'>Already a member? Click here to log in!</TextButton>
                  </Link>
                </Bottom>
              </LoginPanel>
            </BackgroundPanel>
          </App>
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    facebook: () => {
      window.location.assign(paths.facebookRegistrationOAuth())
    } 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)


const Bottom = styled.div`
  text-align: center
  margin-top: 20px
`
const FacebookBtn = styled(WideButton)`
  color: #FFF;
  background: ${FACEBOOK_DEFAULT};
`
const EmailBtn = styled(WideButton)`
  border: 1px solid ${RP_DARKGREY};
  color: ${RP_BLACK}; 
  background: #FFF;

  &:hover {
  border: 1px solid ${RP_RED};
    color: ${RP_RED}
    background: #FFF;
  }
`
  