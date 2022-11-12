import { fromJS } from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  acts_loading: false,
  bands: null,
  active_act: null,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_BANDS_START:
      return state
        .set('acts_loading', true)

    case constants.BANDS_LOADED:
      return state
        .set('bands', action.bands)
        .set('acts_loading', false)

    case constants.SET_ACTIVE_ACT:
      return state
        .set('active_act', action.act)

    case constants.BAND_ERROR:
      return state
        .set('error', action.error) 

    default:
      return state

  }
}

export default reducer
