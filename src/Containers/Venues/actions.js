import moment from 'moment'
import constants from './constants'
import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

const actions = {

  loadData: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        if(api.user){
          dispatch(actions.loadDataStart())
          api.venues.query({
            managers__id__in: api.user,
            expand:'venue.city,city.province,province.country,country,stats,genres'
          }).then((res) => {
            dispatch(actions.venuesLoaded(res.results))
          })

          api.campaigns.query({
            timeslot__venue__managers__id: api.user,
            status: 2,
            is_venue_approved: 'null',
            ordering: 'funding_end',
            expand: 'bands,bands.band,timeslot,timeslot.venue,purchase_options'
          }).then((res) => {
            dispatch(actions.pendingCampaignsLoaded(res.results))
          })

          api.campaigns.query({
            timeslot__venue__managers__id__in: api.user,
            status: 3,
            ordering: 'funding_end',
            expand: 'bands,bands.band,timeslot,timeslot.venue,purchase_options'
          }).then((res) => {
            dispatch(actions.activeCampaignsLoaded(res.results))
          })
        }
      })
    }
  },

  updateVenue: (venue) => {
    return (dispatch,getState,api) => {
      api.venues.update(venue.id, venue).then((res) => {
        dispatch(actions.venueUpdated(venue))
        dispatch(actions.venueError(null))
        dispatch(actions.loadData())
        dispatch(appActions.success_message(constants.VENUE_UPDATED_SUCCESS))
      }).catch((err) => {
        dispatch(actions.venueError(err))
        //dispatch(appActions.error_message(constants.VENUE_UPDATED_ERROR))
        dispatch(errorMessage(err))
      })
    }
  },

  loadDataStart: () => {
    return {
      type: constants.LOAD_DATA_START
    }
  },

  venuesLoaded: (venues) => {
    return {
      type: constants.VENUES_LOADED,
      venues
    }
  },

  pendingCampaignsLoaded: (campaigns) => {
    return {
      type: constants.PENDING_CAMPAIGNS_LOADED,
      campaigns
    }
  },

  activeCampaignsLoaded: (campaigns) => {
    return {
      type: constants.ACTIVE_CAMPAIGNS_LOADED,
      campaigns
    }
  },

  venueUpdated: (venue) => {
    return {
      type: constants.VENUE_UPDATED,
      venue
    }
  },

  venueError: (error) => {
    return {
      type: constants.VENUE_ERROR,
      error
    }
  }
}

export default actions