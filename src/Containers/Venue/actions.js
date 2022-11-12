import moment from 'moment'

import { RP_Campaign } from 'Models'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'


const actions = {
  loadVenue: (id,date) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venues.get(id, {
          expand: 'city,city.province,city.province.country,reviews_by_bands,events,genres'
        }).then((venue) => {
          dispatch(actions.venueLoaded(venue))
        })
        dispatch(actions.datesLoading())
        api.openings.query({
          timeslot__venue: id,
          timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
          timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
          expand: 'timeslot,timeslot.venue'
        }).then((res) => {
          dispatch(actions.openingsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
        api.campaigns.query({
          timeslot__venue: id,
          timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
          timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
          is_venue_approved: 'True',
          expand: 'timeslot,bands.band,purchase_options'
        }).then((res) => {
          dispatch(actions.bookedShowsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  loadCampaigns: (id) => {
    return (dispatch, getState, api) => {
      api.campaigns.query({
        timeslot__venue: id,
        timeslot__start_time__gte: moment().toISOString(),
        is_venue_approved: 'True',
        ordering: 'funding_end',
        expand: 'timeslot,timeslot.venue,bands,bands.band,purchase_options'
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
        dispatch(actions.bandsLoaded(uniqueBands))
      })
    }
  },

  venueLoaded: (venue) => {
    return {
      type: constants.VENUE_LOADED,
      venue
    }
  },

  datesLoading: () => {
    return {
      type: constants.DATES_LOADING
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
  },

  openingsLoaded: (openings) => {
    return {
      type: constants.OPENINGS_LOADED,
      openings
    }
  },

  bookedShowsLoaded: (shows) => {
    return {
      type: constants.SHOWS_LOADED,
      shows
    }
  }
}

export default actions