import moment from 'moment'
import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'


const actions = {

  loadData: (venue_id,date) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venues.get(venue_id, {
          expand: 'city,city.province,city.province.country,reviews_by_bands,events'
        }).then((venue) => {
          dispatch(actions.venueLoaded(venue))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
        
        dispatch(actions.datesLoading())
        api.campaigns.query({
          timeslot__venue: venue_id,
          timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
          timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
          ordering: 'funding_end',
          expand: 'timeslot,timeslot.venue,bands,bands.band,purchase_options',
          page_size: 100
        }).then((res) => {
          dispatch(actions.campaignsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
        
        api.openings.query({
          timeslot__venue: venue_id,
          timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
          timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
          expand: 'timeslot,timeslot.venue',
          page_size: 100
        }).then((res) => {
          dispatch(actions.openingsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  createShow: (show) => {
    return (dispatch,getState,api) => {
      api.campaigns.create(show).then((res) => {
        dispatch(appActions.success_message(constants.SHOW_CREATED_SUCCESS))
        dispatch(actions.loadData(show.venue))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  createOpening: (timeslot,opening) => {
    return (dispatch,getState,api) => {
      api.timeslots.create(timeslot).then(new_timeslot => {
        opening['timeslot'] = new_timeslot.id

        api.openings.create(opening).then((res) => {
          dispatch(appActions.success_message(constants.OPENING_CREATED_SUCCESS))
          dispatch(actions.loadData(timeslot.venue))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  updateOpening: (timeslot,opening) => {
    return (dispatch,getState,api) => {
      api.timeslots.update(timeslot.id,timeslot).then((res) => {
        api.openings.update(opening.id,opening).then((res) => {
          dispatch(appActions.success_message(constants.OPENING_UPDATED_SUCCESS))
          dispatch(actions.loadData(timeslot.venue))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  deleteOpening: (opening) => {
    return (dispatch,getState,api) => {
      api.openings.delete(opening.id).then((res) => {
        dispatch(appActions.success_message(constants.OPENING_REMOVED_SUCCESS))
        dispatch(actions.loadData(opening.venue))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  createEvent: (event) => {
    return (dispatch,getState,api) => {
      api.events.create(event).then((res) => {
        dispatch(appActions.success_message(constants.EVENT_CREATED_SUCCESS))
        dispatch(actions.loadData(event.venue))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  updateEvent: (event) => {
    return (dispatch,getState,api) => {
      api.events.update(event.id,event).then((res) => {
        dispatch(appActions.success_message(constants.EVENT_UPDATED_SUCCESS))
        dispatch(actions.loadData(event.venue))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  deleteEvent: (event) => {
    return (dispatch,getState,api) => {
      api.events.delete(event.id).then((res) => {
        dispatch(appActions.success_message(constants.EVENT_REMOVED_SUCCESS))
        dispatch(actions.loadData(event.venue))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  datesLoading: () => {
    return {
      type: constants.DATES_LOADING
    }
  },

  campaignsLoaded: (campaigns) => {
    return {
      type: constants.CAMPAIGNS_LOADED,
      campaigns
    }
  },

  openingsLoaded: (openings) => {
    return {
      type: constants.OPENINGS_LOADED,
      openings
    }
  },

  venueLoaded: (venue) => {
    return {
      type: constants.VENUE_LOADED,
      venue
    }
  }
}

export default actions