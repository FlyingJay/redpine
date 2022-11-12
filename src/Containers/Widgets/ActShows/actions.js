import { RP_Campaign } from 'Models'

import appActions from 'Containers/App/actions'
import constants from './constants'

const actions = {
  loadBand: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bands.get(id, { expand: 'genres,owner,reviews_by_bands,reviews_by_venues' }).then((act) => {
          dispatch(actions.actLoaded(act))
        })
      })
    }
  },

  loadCampaigns: (id) => {
    return (dispatch, getState, api) => {
      api.campaigns.query({
        bands__id: id,
        ordering: '-funding_end',
        expand: 'purchase_options'
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
  }
}

export default actions