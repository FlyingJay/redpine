import constants from './constants'

const actions = {
  submit: (email) => {
    return (dispatch, getState, api) => {
      api.forgotPassword.create({ email }).then((res) => {
        dispatch(actions.submitSuccess())
      }).catch((err) => {
        dispatch(actions.submitError(err))
      })
    }
  },  

  submitSuccess: () => {
    return {
      type: constants.SUBMIT_SUCCESS
    }
  },

  submitError: (error) => {
    return {
      type: constants.SUBMIT_ERROR,
      error
    }
  }
}

export default actions