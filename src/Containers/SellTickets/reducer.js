import { fromJS } from 'immutable'

import constants from './constants'

export const initialState = fromJS({
  acts: null,
	acts_loading: false,
  search_acts: [],
  search_acts_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SEARCH_ACTS_LOADING:
      return state
        .set('search_acts', [])
        .set('search_acts_loading', true)

    case constants.SEARCH_ACTS_LOADED:
      return state
        .set('search_acts', action.acts)
        .set('search_acts_loading', false)

    case constants.ACTS_LOADING:
      return state
        .set('acts_loading', true)

    case constants.ACTS_LOADED:
      return state
        .set('acts', action.acts)
        .set('acts_loading', false)

    default:
      return state
  }
}

export default reducer