import moment from 'moment'
import { RP_Campaign } from 'Models'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

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
        timeslot__start_time__gte: moment().toISOString(),
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
        
        //EXTRACT UNIQUE BANDS FROM CAMPAIGNS 
        //SAVED AN API CALL AND EXTRA CODE WITH A SWEET O(n) ALGO :D
        //**SHOULD BE DONE IN THE REDUCER** :(
        var bandResults = {}
        campaigns_list.forEach((campaign) => {
          campaign.bands.forEach((campaignBand) => {
            var band = campaignBand.band
            bandResults[band.id] = band
          })
        })
        var i = 0;
        var uniqueBands = [];    
        for(var band in bandResults) {
          uniqueBands[i++] = bandResults[band];
        }

        //DONE GETTING BANDS
        dispatch(actions.bandsLoaded(uniqueBands))
      })
    }
  },

  organizationLoaded: (organization) => {
    return {
      type: constants.ORGANIZATION_LOADED,
      organization
    }
  },

  bandsLoaded: (bands) => {
    return {
      type: constants.BANDS_LOADED,
      bands
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