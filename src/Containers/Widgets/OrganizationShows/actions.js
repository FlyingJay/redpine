import { RP_Campaign } from 'Models'

import appActions from 'Containers/App/actions'
import constants from './constants'

const actions = {
  loadOrganization: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.organizations.get(id, {
          expand: 'city,city.province,city.province.country'
        }).then((organization) => {
          dispatch(actions.organizationLoaded(organization))
        })
      })
    }
  },

  loadCampaigns: (id) => {
    return (dispatch, getState, api) => {
      api.campaigns.query({
        organizations: id,
        ordering: '-funding_end',
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

  organizationLoaded: (organization) => {
    return {
      type: constants.ORGANIZATION_LOADED,
      organization
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