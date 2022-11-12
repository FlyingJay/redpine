import constants from './constants'

const actions = {
  submit: (data) => {
    return (dispatch, getState, api) => {
      api.resetPassword.create(data).then((res) => {
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