import { push, replace } from 'react-router-redux'

import { paths } from 'globals'
import appActions from 'Containers/App/actions'

import constants from './constants'

const actions = {
  submitForm: (email, password) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loginStart())
      api.logIn(email, password).then((res) => {
        dispatch(appActions.getUser())
        dispatch(appActions.setAuth(true))
      }).catch((err) => {
        if (err.status === 418) {
          dispatch(actions.alphaUser(true))
        } else {
          dispatch(actions.loginError('Invalid username/password.'))
        }
      })
    }
  },

  validateFacebookToken: (token) => {
    return (dispatch, getState, api) => {
      dispatch(actions.validateFacebookTokenStart())
      api.facebookLogIn({ code: token, redirect_uri: paths.facebookLoginRedirectURI() }).then((res) => {
        dispatch(actions.validateFacebookTokenSuccess())
        dispatch(appActions.setAuth(true))
        dispatch(push(paths.home()))
      }).catch((err) => {
        dispatch(actions.validateFacebookTokenError())
      })
    }
  },

  loginError: (error) => {
    return {
      type: constants.LOGIN_ERROR,
      error
    }
  },

  loginStart: () => {
    return {
      type: constants.SUBMIT,
    }
  },

  alphaUser: (show) => {
    return {
      type: constants.ALPHA_USER,
      show
    }
  },

  updateForm: (update) => {
    return {
      type: constants.UPDATE_FORM,
      update
    }
  },

  startFacebookLogin: () => {
    window.location.assign(paths.facebookLoginOAuth())
    return {
      type: constants.START_FACEBOOK_LOGIN
    }
  },

  validateFacebookTokenStart: () => {
    return {
      type: constants.VALIDATE_FACEBOOK_TOKEN_START
    }
  },

  validateFacebookTokenSuccess: () => {
    return {
      type: constants.VALIDATE_FACEBOOK_TOKEN_SUCCESS
    }
  },

  validateFacebookTokenError: () => {
    return {
      type: constants.VALIDATE_FACEBOOK_TOKEN_ERROR,
      error: 'We were unable to log you in with Facebook.  Please try again.'
    }
  },

  closeAlphaModal: () => {
    return {
      type: constants.ALPHA_USER,
      show: false
    }
  }
}

export default actions
