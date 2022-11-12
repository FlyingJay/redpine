import moment from 'moment'

import { RP_Campaign } from 'Models'

import appActions from 'Containers/App/actions'
import constants from './constants'

const actions = {
  loadBand: (id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.actLoading())
      api.ready.then(() => {
        api.bands.get(id, { expand: 'genres,reviews_by_bands,reviews_by_venues,subscribers,organizations.organization' }).then((act) => {
          dispatch(actions.actLoaded(act))
        })
      })
    }
  },

  loadCampaigns: (id) => {
    return (dispatch, getState, api) => {
      api.campaigns.query({
        accepted_band: id,
        is_venue_approved: 'True',
        ordering: 'funding_end',
        expand: 'timeslot.venue,bands,bands.band,purchase_options'
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

  loadRelatedBands: (id) => {
    return (dispatch, getState, api) => {
      api.pledgeFact.related_bands(id,{core:true}).then((res) => {
        dispatch(actions.relatedActsLoaded(res))
      })
    }
  },

  actLoading: () => {
    return {
      type: constants.ACT_LOADING
    }
  },

  actLoaded: (act) => {
    return {
      type: constants.ACT_LOADED,
      act
    }
  },

  campaignsLoaded: (campaigns) => {
    return {
      type: constants.CAMPAIGNS_LOADED,
      campaigns
    }
  },

  relatedActsLoaded: (acts) => {
    return {
      type: constants.RELATED_ACTS_LOADED,
      acts
    }
  }

}

export default actions