import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  bands: null,
  venues: null,
  band: null,
  venue: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.BANDS_LOADED:
      return state
        .set('bands', action.bands)

    case constants.VENUES_LOADED:
      return state
        .set('venues', action.venues)

    case constants.REVIEW_BAND_LOADED:
      return state
        .set('band', action.band)

    case constants.REVIEW_VENUE_LOADED:
      return state
        .set('venue', action.venue)

    case constants.REVIEW_SUBMITTED:
    case constants.REVIEW_RESPONDED:
      return state

    default:
      return state
  }
}

export default reducer