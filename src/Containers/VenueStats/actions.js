import constants from './constants'
import appActions from 'Containers/App/actions'

const actions = {
  loadStats: (venue_id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadStatsStart())
      api.ready.then(() => {
        api.venues.get(venue_id).then((res) => {
          dispatch(actions.venueLoaded(res))
        })
	      api.campaigns.query({
	      	timeslot__venue: venue_id,
          is_successful: true,
          expand: 'bands,bands.band'
	      }).then((res) => {
	        dispatch(actions.campaignsLoaded(res.results))
	      })
      }).then(() => {
      	dispatch(actions.loadStatsSuccess())
      })
    }
  },

  loadStatsStart: () => {
    return {
      type: constants.LOAD_STATS_START
    }
  },

  loadStatsSuccess: () => {
    return {
      type: constants.LOAD_STATS_SUCCESS
    }
  },

  venueLoaded: (venue) => {
    return {
      type: constants.VENUE_LOADED,
      venue
    }
  },

  campaignsLoaded: (campaigns) => {
    return {
      type: constants.CAMPAIGNS_LOADED,
      campaigns
    }
  }
}

export default actions