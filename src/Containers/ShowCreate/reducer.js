import { fromJS } from 'immutable'
import { helpers } from 'globals'
import constants from './constants'

export const initialState = fromJS({
  acts: [],
	acts_loading: false,
  available_acts: [],
  search_acts: [],
  search_acts_loading: false,
  search_venues: [],
  search_venues_loading: false,
  venue: null,
  opening: null,
  venue_events: [],
  venue_shows: []
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.VENUE_LOADED:
      return state
        .set('venue', action.venue)

    case constants.OPENING_LOADED:
      return state
        .set('opening', action.opening)

    case constants.AVAILABLE_ACTS_LOADED:
      return state
        .set('available_acts', action.acts)

    case constants.SEARCH_ACTS_LOADING:
      return state
        .set('search_acts', [])
        .set('search_acts_loading', true)

    case constants.SEARCH_ACTS_LOADED:
      return state
        .set('search_acts', action.acts)
        .set('search_acts_loading', false)

    case constants.SEARCH_VENUES_LOADING:
      return state
        .set('search_venues', [])
        .set('search_venues_loading', true)

    case constants.SEARCH_VENUES_LOADED:
      let venues = helpers.fast_reply_first(action.venues || []).filter(venue => !venue.is_non_redpine_default)
      venues = helpers.is_promotion_first(venues)
      return state
        .set('search_venues', venues)
        .set('search_venues_loading', false)

    case constants.VENUE_EVENTS_LOADED:
      return state
        .set('venue_events', action.events)

    case constants.VENUE_SHOWS_LOADED:
      const shows = (action.shows || []).filter(show => show.is_venue_approved)
      return state
        .set('venue_shows', shows)

    case constants.ACTS_LOADING:
      return state
        .set('acts_loading', true)

    case constants.ACTS_LOADED:
      return state
        .set('acts', action.acts)
        .set('acts_loading', false)

    case constants.RESET_STATE:
      return state
        .set('venue', null)
        .set('opening', null)

    default:
      return state
  }
}

export default reducer