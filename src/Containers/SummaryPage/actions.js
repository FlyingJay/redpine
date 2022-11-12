import constants from './constants'
import appActions from 'Containers/App/actions'

const actions = {
  loadSummary: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadSummaryStart())
      api.ready.then(() => {
        api.campaignFact.query({expand:'venue,band'}).then((res) => {
          dispatch(actions.campaignsLoaded(res.results))
        })
        api.timeslotFact.query().then((res) => {
          dispatch(actions.timeslotsLoaded(res.results))
        })
        api.pledgeFact.query().then((res) => {
          dispatch(actions.pledgesLoaded(res.results))
        })
      }).then(() => {
      	dispatch(actions.loadSummarySuccess())
      })
    }
  },

  loadSummaryStart: () => {
    return {
      type: constants.LOAD_SUMMARY_START
    }
  },

  loadSummarySuccess: () => {
    return {
      type: constants.LOAD_SUMMARY_SUCCESS
    }
  },

  campaignsLoaded: (campaigns) => {
    return {
      type: constants.CAMPAIGNS_LOADED,
      campaigns
    }
  },

  timeslotsLoaded: (timeslots) => {
    return {
      type: constants.TIMESLOTS_LOADED,
      timeslots
    }
  },

  pledgesLoaded: (pledges) => {
    return {
      type: constants.PLEDGES_LOADED,
      pledges
    }
  },

  getBand: (id,core_id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bands.get(core_id,{expand:'owner'}).then((res) => {
          dispatch(actions.bandLoaded(res))
        })
        api.pledgeFact.related_bands(id).then((res) => {
          dispatch(actions.relatedBandsLoaded(res))
        })
      }).catch((err) => {
        dispatch(appActions.error_message(constants.GET_BAND_ERROR))
      })
    }
  },

  getVenue: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venues.get(id,{expand:'managers,managers.manager'}).then((res) => {
          dispatch(actions.venueLoaded(res))
        })
      }).catch((err) => {
        dispatch(appActions.error_message(constants.GET_VENUE_ERROR))
      })
    }
  },

  bandLoaded: (band) => {
    return {
      type: constants.BAND_LOADED,
      band
    }
  },

  venueLoaded: (venue) => {
    return {
      type: constants.VENUE_LOADED,
      venue
    }
  },

  relatedBandsLoaded: (bands) => {
    return {
      type: constants.RELATED_BANDS_LOADED,
      bands
    }
  },
}

export default actions