import constants from './constants'


const selectLogin = (state) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectSubmitted: (state) => {
    return selectLogin(state).get('submitted')
  },
  selectForm: (state) => {
    return selectLogin(state).get('form')
  },
  selectError: (state) => {
    return selectLogin(state).get('error')
  },
  selectFacebookError: (state) => {
    return selectLogin(state).get('facebookError')
  },
  selectAlphaUser: (state) => {
    return selectLogin(state).get('alphaUser')
  }
}

export default selectors