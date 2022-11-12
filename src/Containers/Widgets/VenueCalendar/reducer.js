import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  venue: null,
  openings: [],
  events: [],
  shows: [],
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

    case consts.OPENINGS_LOADED:
      return state
        .set('openings', action.openings)

    case consts.SHOWS_LOADED:
      return state
        .set('shows', action.shows)
        .set('dates_loading', false)

    default:
      return state
  }
}

export default reducer