import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  venue: null,
  bands: null,
  campaigns: null,
  openings: [],
  bookedShows: [],
  dates_loading: false
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {

    case consts.VENUE_LOADED:
      const events = action.venue && action.venue.events || []
      return state
        .set('venue', action.venue)
        .set('events', events)

    case consts.DATES_LOADING:
      return state
        .set('dates_loading', true)

    case consts.BANDS_LOADED:
      return state
        .set('bands', action.bands)

    case consts.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)

    case consts.OPENINGS_LOADED:
      return state
        .set('openings', action.openings)

    case consts.SHOWS_LOADED:
      return state
        .set('bookedShows', action.shows)
        .set('dates_loading', false)

    default:
      return state
  }
}

export default reducer