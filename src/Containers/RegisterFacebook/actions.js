import { push } from 'react-router-redux'
import { paths } from 'globals'
import appActions from 'Containers/App/actions'
import constants from './constants'


const actions = {
  submitRegistration: (params) => {
    return (dispatch, getState, api) => {
      dispatch(actions.startRegistration())
      api.facebookRegister.create(params).then((res) => {
        dispatch(actions.registrationSuccess())
        window.location.assign(paths.facebookLoginOAuth())
      }).catch((err) => {
        dispatch(actions.registrationFailure(err))
      })
    }
  },  

  startRegistration: () => {
    return {
      type: constants.START_REGISTRATION
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
  }
}

export default actions