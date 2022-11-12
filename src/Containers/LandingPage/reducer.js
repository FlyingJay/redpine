import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  landingpage_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LANDINGPAGE_LOADING:
      return state
        .set('landingpage_loading', true)

    case constants.LANDINGPAGE_LOADED:
      return state
        .set('landingpage_loading', false)

    default:
      return state
  }
}

export default reducer

