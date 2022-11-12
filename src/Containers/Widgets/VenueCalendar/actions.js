import moment from 'moment'

import { RP_Campaign } from 'Models'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'


const actions = {
  loadVenue: (id,date) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venues.get(id, {
          expand: 'city,city.province,city.province.country,events'
        }).then((venue) => {
          dispatch(actions.venueLoaded(venue))
        })

        dispatch(actions.datesLoading())
        api.openings.query({
          timeslot__venue: id,
          timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
          timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
          expand: 'timeslot,timeslot.venue'
        }).then((res) => {
          dispatch(actions.openingsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
        api.campaigns.query({
          timeslot__venue: id,
          timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
          timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
          is_successful: true,
          expand: 'timeslot,bands.band,purchase_options'
        }).then((res) => {
          dispatch(actions.bookedShowsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  venueLoaded: (venue) => {
    return {
      type: constants.VENUE_LOADED,
      venue
    }
  },

  datesLoading: () => {
    return {
      type: constants.DATES_LOADING
    }
  },

  openingsLoaded: (openings) => {
    return {
      type: constants.OPENINGS_LOADED,
      openings
    }
  },

  bookedShowsLoaded: (shows) => {
    return {
      type: constants.SHOWS_LOADED,
      shows
    }
  }
}

export default actions