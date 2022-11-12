import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  saving: false,
  creationError: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.IS_SAVING:
      return state
        .set('saving', action.saving)

    case constants.CREATION_ERROR:
      return state
        .set('creationError', action.error)

    default:
      return state
  }
}

export default reducer