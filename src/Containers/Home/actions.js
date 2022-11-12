import moment from 'moment'
import constants from './constants'

const actions = {
  loadData: (page) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        dispatch(actions.loadDataStart())

        const today = moment().toISOString()
        
        /*FEATURED CAMPAIGNS
        api.campaigns.query({
          is_featured: true,
          funding_end__gte: today,
          ordering: 'funding_end',
          expand: 'bands.band,timeslot.venue,purchase_options'
        }).then((res) => {

          ((campaigns) => {
            campaigns = campaigns.filter(campaign => (campaign.picture != null && campaign.tickets_sold > 5))
            const random_campaign = campaigns[Math.floor(Math.random() * campaigns.length)]
            dispatch(actions.campaignLoaded(random_campaign))
          })(res.results)

          dispatch(actions.featuredCampaignsLoaded(res.results))
        }).catch((err) => {
          dispatch(actions.featuredCampaignsLoaded([]))
        })*/

        //FEATURED ACTS
        api.bands.query({
          is_featured: true,
          page_size: 30,
          page: page
        }).then((res) => {
          dispatch(actions.featuredBandsLoaded(res.results,page,res.count))
        }).catch((err) => {
          dispatch(actions.featuredBandsLoaded([],page,0))
        })

        //FEATURED VENUES
        api.venues.query({
          is_featured: true,
          expand: 'city.province.country',
          page_size: 15,
          page: page
        }).then((res) => {
          const venues = res.results
          const random_venue = venues[Math.floor(Math.random() * venues.length)]
          dispatch(actions.venueLoaded(random_venue))
          dispatch(actions.featuredVenuesLoaded(venues,page,res.count))
        }).catch((err) => {
          dispatch(actions.featuredVenuesLoaded([],page,0))
        })

        //OPENINGS
        api.openings.query({
          is_open: true,
          timeslot__start_time__gt: today,
          timeslot__venue__is_featured: true,
          expand: 'timeslot.venue.city.province.country',
          page_size: 10,
          page: page
        }).then((res) => {
          dispatch(actions.openingsLoaded(res.results,page,res.count))
        }).catch((err) => {
          dispatch(actions.openingsLoaded([],page,0))
        })

        /* PAST SHOWS
        api.campaigns.query({
          is_featured: true,
          funding_end__lt: today,
          ordering: '-funding_end',
          expand: 'bands.band,timeslot.venue,purchase_options'
        }).then((res) => {
          dispatch(actions.previouslySuccessfulLoaded(res.results))
        })
        */

        /*
        api.campaigns.query({
          funding_end__gt: today,
          expand: 'bands.band,timeslot.venue,purchase_options'
        }).then((res) => {
          let campaigns = res.results
          campaigns = campaigns.filter(campaign => (campaign.picture != null && campaign.tickets_sold > 5))
          const random_campaign = campaigns[Math.floor(Math.random() * campaigns.length)]
          dispatch(actions.campaignLoaded(random_campaign))
        })
        */
      })
    }
  },

  loadDataStart: (campaigns) => {
    return {
      type: constants.LOAD_DATA_START
    }
  },

  venueLoaded: (venue) => {
    return {
      type: constants.VENUE_LOADED,
      venue
    }
  },

  campaignLoaded: (campaign) => {
    return {
      type: constants.CAMPAIGN_LOADED,
      campaign
    }
  },

  featuredBandsLoaded: (bands,page,results_count) => {
    return {
      type: constants.FEATURED_BANDS_LOADED,
      bands,
      page,
      results_count
    }
  },

  openingsLoaded: (openings,page,results_count) => {
    return {
      type: constants.OPENINGS_LOADED,
      openings,
      page,
      results_count
    }
  },


  featuredCampaignsLoaded: (campaigns) => {
    return {
      type: constants.FEATURED_CAMPAIGNS_LOADED,
      campaigns
    }
  },

  featuredVenuesLoaded: (venues,page,results_count) => {
    return {
      type: constants.FEATURED_VENUES_LOADED,
      venues,
      page,
      results_count
    }
  },

  previouslySuccessfulLoaded: (campaigns) => {
    return {
      type: constants.PREVIOUSLY_SUCCESSFUL_LOADED,
      campaigns
    }
  }
}

export default actions