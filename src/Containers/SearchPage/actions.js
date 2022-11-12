import moment from 'moment'
import { push } from 'react-router-redux'

import { paths, analytics } from 'globals'
import { SEARCH_CATEGORIES } from 'enums'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'

const actions = {
  loadUserActs: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.actsLoading())
      if(api.user){
        api.bands.query({owner: api.user}).then((res) => {
          dispatch(actions.actsLoaded(res.results))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      }
    }
  },
  
  joinOpenShow: (campaign,act) => {
    return (dispatch, getState, api) => {
      const campaign_id = Number.isInteger(campaign) ? campaign : campaign.id

      const campaign_band = {
        band: act.id,
        campaign: campaign_id,
        is_headliner: false,
        is_accepted: true,
        is_application: null
      }

      api.campaignBands.create(campaign_band).then(() => {
        dispatch(appActions.success_message(constants.OPPORTUNITY_APPLIED_SUCCESS))
        dispatch(push(paths.showHub(campaign_id)))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },
  
  createActThenJoinOpenShow: (campaign,act) => {
    return (dispatch, getState, api) => {
      Object.assign(act, { owner:api.user })
      api.bands.create(act).then((act) => {
        dispatch(actions.joinOpenShow(campaign,act))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  registerThenCreateAct: (user_details,campaign,act_details) => {
    return (dispatch, getState, api) => {
      api.register.create(user_details).then((user) => {
        analytics.userSignup()

        api.logIn(user_details.email, user_details.password).then((res) => {
          dispatch(appActions.setAuth(true))
          dispatch(actions.createActThenJoinOpenShow(campaign,act_details))
        }).catch((err) => {
          dispatch(errorMessage(err))
          dispatch(push(paths.login()))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  actsLoading: () => {
    return {
      type: constants.USER_ACTS_LOADING
    }
  },  

  actsLoaded: (acts) => {
    return {
      type: constants.USER_ACTS_LOADED,
      acts
    }
  },

  campaignResultsLoading: () => {
    return {
      type: constants.CAMPAIGN_RESULTS_LOADING
    }
  },

  artistResultsLoading: () => {
    return {
      type: constants.ARTIST_RESULTS_LOADING
    }
  },

  venueResultsLoading: () => {
    return {
      type: constants.VENUE_RESULTS_LOADING
    }
  },

  opportunityResultsLoading: () => {
    return {
      type: constants.OPPORTUNITY_RESULTS_LOADING
    }
  },

  openShowResultsLoading: () => {
    return {
      type: constants.OPEN_SHOW_RESULTS_LOADING
    }
  },

  openMicResultsLoading: () => {
    return {
      type: constants.OPEN_MIC_RESULTS_LOADING
    }
  },

  bandResultsLoaded: (bands,page,results_count) => {
    return {
      type: constants.BAND_RESULTS_LOADED,
      bands,
      page,
      results_count
    }
  },

  campaignResultsLoaded: (campaigns,page,results_count) => {
    return {
      type: constants.CAMPAIGN_RESULTS_LOADED,
      campaigns,
      page,
      results_count
    }
  },

  venueResultsLoaded: (venues,page,results_count) => {
    return {
      type: constants.VENUE_RESULTS_LOADED,
      venues,
      page,
      results_count
    }
  },

  opportunityResultsLoaded: (opportunities,page,results_count) => {
    return {
      type: constants.OPPORTUNITY_RESULTS_LOADED,
      opportunities,
      page,
      results_count
    }
  },

  openShowResultsLoaded: (campaigns,page,results_count) => {
    return {
      type: constants.OPEN_SHOW_RESULTS_LOADED,
      campaigns,
      page,
      results_count
    }
  },

  openMicResultsLoaded: (campaigns,page,results_count) => {
    return {
      type: constants.OPEN_MIC_RESULTS_LOADED,
      campaigns,
      page,
      results_count
    }
  },

  performSearch: (search,page) => {
    const today = moment().toISOString()

    search.price = search.price ? search.price : 0
    search.capacity = search.capacity ? search.capacity : 0

    //PRICE CONSTRAINTS - ['ANY', '< $10', '$10 - $20', '$20 - $50', '> $50']
    let price_lower_bound = 0
    let price_upper_bound = 0
    switch(search.price){
      case 0:
        price_lower_bound = 0
        price_upper_bound = 1000000
        break
      case 1:
        price_lower_bound = 0
        price_upper_bound = 10
        break
      case 2:
        price_lower_bound = 10
        price_upper_bound = 20
        break
      case 3:
        price_lower_bound = 20
        price_upper_bound = 50
      break
      case 4:
        price_lower_bound = 50
        price_upper_bound = ''
        break
    }

    //CAPACITY CONSTRAINTS - ['ANY', '< 50', '50 - 200', '200 - 500', '500+']
    let capacity_lower_bound = 0
    let capacity_upper_bound = 0
    switch(search.capacity){
      case 0:
        capacity_lower_bound = 0
        capacity_upper_bound = 1000000
        break
      case 1:
        capacity_lower_bound = 0
        capacity_upper_bound = 50
        break
      case 2:
        capacity_lower_bound = 50
        capacity_upper_bound = 200
        break
      case 3:
          capacity_lower_bound = 200
          capacity_upper_bound = 500
        break
      case 4:
        capacity_lower_bound = 500
        capacity_upper_bound = ''
        break
    }

    let search_params = {}
    return (dispatch, getState, api) => {
      switch(search.category){
        case SEARCH_CATEGORIES.CONCERTS:
          Object.assign(search_params, search.query && { title__icontains: search.query },
                    search.province && !search.city && { timeslot__venue__city__province: search.province },
 search.country && !search.province && !search.city && { timeslot__venue__city__province__country: search.country },
                                  price_lower_bound && { min_ticket_price__gte: price_lower_bound },
                                  price_upper_bound && { min_ticket_price__lte: price_upper_bound },
                                       search.genre && { bands__genres__like: search.genre },

                                                       { timeslot__start_time__gte: today },
                                                       { is_open_mic: false },
                                                       { is_venue_approved: 'True' },
                                        search.city && { center: search.city },
                                        search.city && { radius: search.radius },
                                                       { ordering: 'funding_end' },
                                                       { expand: 'bands.band.genres,purchase_options,timeslot.venue' },
                                                       { page: page },
                                                       { page_size: 20 }
          )
          dispatch(actions.campaignResultsLoading())
          api.campaigns.query(search_params).then((res) => {
            dispatch(actions.campaignResultsLoaded(res.results,page,res.count))
          })
          break;

        case SEARCH_CATEGORIES.ARTISTS:
          Object.assign(search_params, search.query && { name__icontains: search.query },
                    search.province && !search.city && { hometown__province: search.province },
 search.country && !search.province && !search.city && { hometown__province__country: search.country },
                                       search.genre && { genres__like: search.genre },

                                                       { is_redpine: true },
                                        search.city && { center: search.city },
                                        search.city && { radius: search.radius },
                                                       { ordering: 'name' },
                                                       { expand: 'genres,hometown.province' },
                                                       { page: page },
                                                       { page_size: 50 }
          )
          dispatch(actions.artistResultsLoading())
          api.bands.query(search_params).then((res) => {
            dispatch(actions.bandResultsLoaded(res.results,page,res.count))
          })
          break;

        case SEARCH_CATEGORIES.VENUES:
          Object.assign(search_params, search.query && { title__icontains: search.query },
                    search.province && !search.city && { city__province: search.province },
 search.country && !search.province && !search.city && { city__province__country: search.country },
                                       search.genre && { genres__like: search.genre },
                               capacity_lower_bound && { capacity__gte: capacity_lower_bound },
                               capacity_upper_bound && { capacity__lte: capacity_upper_bound },
                                    search.has_wifi && { has_wifi: true },
                    search.is_accessible_by_transit && { is_accessible_by_transit: true },
                              search.has_atm_nearby && { has_atm_nearby: true },
                     search.has_free_parking_nearby && { has_free_parking_nearby: true },
                     search.has_paid_parking_nearby && { has_paid_parking_nearby: true },
                      search.is_wheelchair_friendly && { is_wheelchair_friendly: true },
                              search.allows_smoking && { allows_smoking: true },
                             search.allows_all_ages && { allows_all_ages: true },
                                   search.has_stage && { has_stage: true },
                             search.has_microphones && { has_microphones: true },
                                search.has_drum_kit && { has_drum_kit: true },
                                   search.has_piano && { has_piano: true },
                        search.has_wires_and_cables && { has_wires_and_cables: true },
                               search.has_soundtech && { has_soundtech: true },
                                search.has_lighting && { has_lighting: true },
                           search.has_drink_tickets && { has_drink_tickets: true },
                           search.has_meal_vouchers && { has_meal_vouchers: true },
                             search.has_merch_space && { has_merch_space: true },
                                search.has_cash_box && { has_cash_box: true },
                              search.has_float_cash && { has_float_cash: true },
                              search.has_fast_reply && { has_fast_reply: true },

                                                       { is_hidden: false },
                                        search.city && { center: search.city },
                                        search.city && { radius: search.radius },
                                                       { ordering: '-has_fast_reply, -capacity' },
                                                       { expand: 'city,city.province,city.province.country,genres' },
                                                       { page: page },
                                                       { page_size: 10 }
          )
          dispatch(actions.venueResultsLoading())
          api.venues.query(search_params).then((res) => {
            dispatch(actions.venueResultsLoaded(res.results,page,res.count))
          })
          break;

        case SEARCH_CATEGORIES.OPPORTUNITIES:
          Object.assign(search_params, search.query && { title__icontains: search.query },
                    search.province && !search.city && { timeslot__venue__city__province: search.province },
 search.country && !search.province && !search.city && { timeslot__venue__city__province__country: search.country },
                                       search.genre && { timeslot__venue__genres__like: search.genre },

                                                       { timeslot__start_time__gte: today },
                                                       { is_open: true },
                                                       { open_mic: false },
                                        search.city && { center: search.city },
                                        search.city && { radius: search.radius },
                                                       { ordering: 'funding_end' },
                                                       { expand: 'timeslot.venue' },
                                                       { page: page },
                                                       { page_size: 20 }
          )
          dispatch(actions.opportunityResultsLoading())
          api.openings.query(search_params).then((res) => {
            dispatch(actions.opportunityResultsLoaded(res.results,page,res.count))
          })
          break;

        case SEARCH_CATEGORIES.OPEN_SHOWS:
          Object.assign(search_params, search.query && { title__icontains: search.query },
                    search.province && !search.city && { timeslot__venue__city__province: search.province },
 search.country && !search.province && !search.city && { timeslot__venue__city__province__country: search.country },
                                  price_lower_bound && { min_ticket_price__gte: price_lower_bound },
                                  price_upper_bound && { min_ticket_price__lte: price_upper_bound },
                                       search.genre && { bands__genres__like: search.genre },

                                                       { timeslot__start_time__gte: today },
                                                       { is_open: true },
                                                       { is_open_mic: false },
                                                       { is_venue_approved: 'True' },
                                        search.city && { center: search.city },
                                        search.city && { radius: search.radius },
                                                       { ordering: 'funding_end' },
                                                       { expand: 'bands.band.genres,purchase_options,timeslot.venue' },
                                                       { page: page },
                                                       { page_size: 20 }
          )
          dispatch(actions.openShowResultsLoading())
          api.campaigns.query(search_params).then((res) => {
            dispatch(actions.openShowResultsLoaded(res.results,page,res.count))
          })
          break;

        case SEARCH_CATEGORIES.OPEN_MICS:
          Object.assign( search_params, search.query && { title__icontains: search.query },
                     search.province && !search.city && { timeslot__venue__city__province: search.province },
  search.country && !search.province && !search.city && { timeslot__venue__city__province__country: search.country },
                                        search.genre && { timeslot__venue__genres__like: search.genre },
                                                       
                                                        { timeslot__start_time__gte: today },
                                                        { is_open: true },
                                                        { is_open_mic: true },
                                                        { is_venue_approved: 'True' },
                                         search.city && { center: search.city },
                                         search.city && { radius: search.radius },
                                                        { ordering: 'funding_end' },
                                                        { expand: 'timeslot.venue' },
                                                        { page: page },
                                                        { page_size: 20 }
          )
          dispatch(actions.openMicResultsLoading())
          api.campaigns.query(search_params).then((res) => {
            dispatch(actions.openMicResultsLoaded(res.results,page,res.count))
          })
          break;
      }
    }
  },

  searchError: (error) => {
    return {
      type: constants.SEARCH_ERROR,
      error
    }
  }
}

export default actions