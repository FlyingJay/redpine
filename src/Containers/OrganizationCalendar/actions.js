import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'
import moment from 'moment'

const actions = {
  loadData: (organization_id,date=moment()) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.organizations.get(organization_id).then((organization) => {
          dispatch(actions.organizationLoaded(organization))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
        api.campaigns.query({
          organizations: organization_id,
          timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
          timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
          expand: 'timeslot,timeslot.venue,bands,bands.band,purchase_options',
          page_size: 100
        }).then((res) => {
          dispatch(actions.campaignsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
        if(api.user){
          api.openings.query({
            timeslot__venue__managers: api.user,
            timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
            timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
            expand: 'timeslot,timeslot.venue',
            page_size: 100
          }).then((res) => {
            dispatch(actions.openingsLoaded(res.results))
          }).catch(err => {
            dispatch(errorMessage(err))
          })
        }
      })
    }
  },

  loadVenues: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        dispatch(actions.venuesLoading())
        if(api.user){
          api.venues.query({
            managers__id__in: api.user
          }).then((res) => {
            dispatch(actions.venuesLoaded(res.results))
          })
        }
      })
    }
  },

  searchVenues: (query) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        dispatch(actions.searchVenuesLoading())
        api.venues.query({
          title__icontains: query
        }).then((res) => {
          dispatch(actions.searchVenuesLoaded(res.results))
        })
      })
    }
  },

  createShow: (show,organization_id) => {
    return (dispatch,getState,api) => {
      api.campaigns.create(show).then((res) => {
        dispatch(appActions.success_message(constants.SHOW_CREATED_SUCCESS))
        dispatch(actions.loadData(organization_id))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  createOpening: (timeslot,opening,organization_id) => {
    return (dispatch,getState,api) => {
      api.timeslots.create(timeslot).then(new_timeslot => {
        opening['timeslot'] = new_timeslot.id

        api.openings.create(opening).then((res) => {
          dispatch(appActions.success_message(constants.OPENING_CREATED_SUCCESS))
          dispatch(actions.loadData(organization_id))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  updateOpening: (timeslot,opening,organization_id) => {
    return (dispatch,getState,api) => {
      api.timeslots.update(timeslot.id,timeslot).then((res) => {
        api.openings.update(opening.id,opening).then((res) => {
          dispatch(appActions.success_message(constants.OPENING_UPDATED_SUCCESS))
          dispatch(actions.loadData(organization_id))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  deleteOpening: (opening,organization_id) => {
    return (dispatch,getState,api) => {
      api.openings.delete(opening.id).then((res) => {
        dispatch(appActions.success_message(constants.OPENING_REMOVED_SUCCESS))
        dispatch(actions.loadData(organization_id))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  venuesLoading: () => {
    return {
      type: constants.VENUES_LOADING
    }
  },

  venuesLoaded: (venues) => {
    return {
      type: constants.VENUES_LOADED,
      venues
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
  },

  campaignsLoaded: (campaigns) => {
    return {
      type: constants.CAMPAIGNS_LOADED,
      campaigns
    }
  },

  organizationLoaded: (organization) => {
    return {
      type: constants.ORGANIZATION_LOADED,
      organization
    }
  },

  openingsLoaded: (openings) => {
    return {
      type: constants.OPENINGS_LOADED,
      openings
    }
  }
}

export default actions