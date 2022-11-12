import moment from 'moment'

import { RP_Campaign } from 'Models'

import appActions from 'Containers/App/actions'
import constants from './constants'

const actions = {
  loadVenue: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venues.get(id, {
          expand: 'city,city.province,city.province.country'
        }).then((venue) => {
          dispatch(actions.venueLoaded(venue))
        })
      })
    }
  },

  loadCampaigns: (id) => {
    return (dispatch, getState, api) => {
      api.campaigns.query({
        timeslot__venue: id,
        timeslot__start_time__gte: moment().toISOString(),
        ordering: 'funding_end',
        expand: 'timeslot,bands,bands.band,purchase_options'
      }).then((campaigns) => {
        const campaigns_list = campaigns.results.filter((campaign) => {
          let _Campaign   = RP_Campaign(campaign)
          const isOngoing = (_Campaign.timeRemaining() != 'Completed')
          
          return (campaign.is_successful || (campaign.is_venue_approved && isOngoing))
        })
        dispatch(actions.campaignsLoaded(campaigns_list))
      })
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