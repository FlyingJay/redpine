import { analytics } from 'globals'
import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {

  submitRegistration: (params) => {
    return (dispatch, getState, api) => {
      api.venueListingsRegister.create(params).then((user) => {
        analytics.userSignup()

        api.logIn(params.email, params.password).then((user) => {
          dispatch(appActions.setAuth(true))
          dispatch(appActions.success_message('Registered, and signed in! You may now view venue listings.'))
          dispatch(actions.registrationSuccess())
        }).catch((err) => {
          dispatch(errorMessage(err))
          dispatch(appActions.error_message('There was a problem signing in. Please let us know if you keep getting this error.'))
          dispatch(actions.registrationFailure(err))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(actions.registrationFailure(err))
      })
    }
  },

  registrationSuccess: () => {
    return {
      type: constants.REGISTRATION_SUCCESS
    }
  },

  registrationFailure: (error) => {
    return {
      type: constants.REGISTRATION_FAILURE,
      error
    }
  },

  viewListings: () => {
    return {
      type: constants.VIEW_LISTINGS
    }
  },

  showSquare: () => {
    return {
      type: constants.SHOW_SQUARE_CHECKOUT
    }
  },

  hideSquare: () => {
    return {
      type: constants.HIDE_SQUARE_CHECKOUT
    }
  }
}

export default actions
