import { push } from 'react-router-redux'
import moment from 'moment'

import { paths, analytics } from 'globals'
import { EVENT_TYPE } from 'enums'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'

const actions = {
  loadData: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        if(api.user){
          dispatch(actions.actsLoading())
          api.bands.query({owner: api.user}).then((res) => {
            dispatch(actions.actsLoaded(res.results))
          }).catch((err) => {
            dispatch(errorMessage(err))
          })
        }
      })
    }
  },

  getEventDates: (id) => {
    const today = moment().toISOString()

    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.events.query({
          venue: id,
          event_type: EVENT_TYPE.EVENT,
          start_time__gte: today
        }).then((res) => {
          dispatch(actions.venueEventsLoaded(res.results))
        })
      })
      api.campaigns.query({
        timeslot__venue: id,
        is_successful: true,
        expand: 'timeslot'
      }).then((res) => {
        dispatch(actions.venueShowsLoaded(res.results))
      }).catch(err => {
        dispatch(errorMessage(err))
      })
    }
  },

  loadVenue: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venues.get(id, {
          expand: 'city.province.country,genres'
        }).then((venue) => {
          dispatch(actions.venueLoaded(venue))
        })
      })
    }
  },

  loadOpening: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.openings.get(id, {
          expand: 'timeslot.venue.city.province.country,timeslot.venue.genres'
        }).then((venue) => {
          dispatch(actions.openingLoaded(venue))
        })
      })
    }
  },

  requestShow: (user,data,redirect) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.showRequests.create(data).then(() => {
          dispatch(appActions.success_message(constants.SHOW_REQUEST_SUCCESS))
          dispatch(push(redirect))

          dispatch(appActions.tutorialEventCompleted(user,{welcome_submit_booking_request:true}))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  searchAvailableActs: (city_id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bands.query({
          current_city: city_id,
          expand: 'genre'
        }).then((res) => {
          dispatch(actions.availableActsLoaded(res.results))
        })
      })
    }
  },

  searchVenues: (query,capacity,headcount,fee,city) => {
    return (dispatch, getState, api) => {
      dispatch(actions.searchVenuesLoading())
      api.ready.then(() => {
        api.venues.query({
          expand: 'city.province.country,genres',
          venue__title__icontains: query,
          city: city.id,
          is_hidden: false,
          capacity__lte: capacity,
          page_size: 50
        }).then((res) => {
          dispatch(actions.searchVenuesLoaded(res.results))
        })
      })
    }
  },

  searchActs: (act_query) => {
    return (dispatch, getState, api) => {
      dispatch(actions.searchActsLoading())
      api.ready.then(() => {
        api.bands.query({
          name__icontains: act_query,
          is_redpine: true,
          ordering:'name',
          expand: 'genres,hometown.province'
        }).then((res) => {
          dispatch(actions.searchActsLoaded(res.results))
        })
      })
    }
  },

  submitRegistration: (user_details,data,redirect) => {
    return (dispatch, getState, api) => {
      api.register.create(user_details).then((user) => {
        
        analytics.userSignup()

        api.logIn(user_details.email, user_details.password).then((res) => {
          dispatch(appActions.setAuth(true))
          dispatch(actions.requestShow(user,data,redirect))
        }).catch((err) => {
          dispatch(push(paths.login()))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  resetState: () => {
    return {
      type: constants.RESET_STATE
    }
  },

  venueLoaded: (venue) => {
    return {
      type: constants.VENUE_LOADED,
      venue
    }
  },

  openingLoaded: (opening) => {
    return {
      type: constants.OPENING_LOADED,
      opening
    }
  },

  venueEventsLoaded: (events) => {
    return {
      type: constants.VENUE_EVENTS_LOADED,
      events
    }
  },

  venueShowsLoaded: (shows) => {
    return {
      type: constants.VENUE_SHOWS_LOADED,
      shows
    }
  },

  actsLoading: () => {
    return {
      type: constants.ACTS_LOADING
    }
  },

  actsLoaded: (acts) => {
    return {
      type: constants.ACTS_LOADED,
      acts
    }
  },

  availableActsLoaded: (acts) => {
    return {
      type: constants.AVAILABLE_ACTS_LOADED,
      acts
    }
  },
  
  searchActsLoaded: (acts) => {
    return {
      type: constants.SEARCH_ACTS_LOADED,
      acts
    }
  },  

  searchActsLoading: () => {
    return {
      type: constants.SEARCH_ACTS_LOADING
    }
  },

  searchVenuesLoading: () => {
    return {
      type: constants.SEARCH_VENUES_LOADING
    }
  },

  searchVenuesLoaded: (venues) => {
    return {
      type: constants.SEARCH_VENUES_LOADED,
      venues
    }
  }
}

export default actions