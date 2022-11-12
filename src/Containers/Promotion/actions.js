import moment from 'moment'
import { push } from 'react-router-redux'

import { paths, analytics } from 'globals'
import { SEARCH_CATEGORIES } from 'enums'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'

const actions = {
  campaignResultsLoading: () => {
    return {
      type: constants.CAMPAIGN_RESULTS_LOADING
    }
  },

  openShowResultsLoading: () => {
    return {
      type: constants.OPEN_SHOW_RESULTS_LOADING
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

  openShowResultsLoaded: (campaigns,page,results_count) => {
    return {
      type: constants.OPEN_SHOW_RESULTS_LOADED,
      campaigns,
      page,
      results_count
    }
  },

  performSearch: (search,page) => {
    const today = moment().toISOString()

    search.price = search.price ? search.price : 0
    search.capacity = search.capacity ? search.capacity : 0

    //PRICE CONSTRAINTS - ['ANY', '< $5', '$5 - $10', '$10 - $25', '> $25']
    let price_lower_bound = 0
    let price_upper_bound = 0
    switch(search.price){
      case 0:
        price_lower_bound = 0
        price_upper_bound = 1000000
        break
      case 1:
        price_lower_bound = 0
        price_upper_bound = 5
        break
      case 2:
        price_lower_bound = 5
        price_upper_bound = 10
        break
      case 3:
        price_lower_bound = 10
        price_upper_bound = 25
      break
      case 4:
        price_lower_bound = 25
        price_upper_bound = ''
        break
    }

    let search_params = {}
    return (dispatch, getState, api) => {
      switch(search.category){
        case SEARCH_CATEGORIES.CONCERTS:
          Object.assign(search_params, search.query && { title__icontains: search.query },
                                        search.city && { timeslot__venue__city: search.city },
                    search.province && !search.city && { timeslot__venue__city__province: search.province },
 search.country && !search.province && !search.city && { timeslot__venue__city__province__country: search.country },
                                  price_lower_bound && { promoter_cut__gte: price_lower_bound },
                                  price_upper_bound && { promoter_cut__lte: price_upper_bound },
                                       search.genre && { bands__genres__like: search.genre },

                                                       { timeslot__start_time__gte: today },
                                                       { is_open_mic: false },
                                                       { is_venue_approved: 'True' },
                                                       { ordering: '-promoter_cut,funding_end' },
                                                       { expand: 'bands.band,purchase_options,timeslot.venue' },
                                                       { page: page },
                                                       { page_size: 20 }
          )
          dispatch(actions.campaignResultsLoading())
          api.campaigns.query(search_params).then((res) => {
            dispatch(actions.campaignResultsLoaded(res.results,page,res.count))
          })
          break;

        case SEARCH_CATEGORIES.OPEN_SHOWS:
          Object.assign(search_params, search.query && { title__icontains: search.query },
                                        search.city && { timeslot__venue__city: search.city },
                    search.province && !search.city && { timeslot__venue__city__province: search.province },
 search.country && !search.province && !search.city && { timeslot__venue__city__province__country: search.country },
                                  price_lower_bound && { promoter_cut__gte: price_lower_bound },
                                  price_upper_bound && { promoter_cut__lte: price_upper_bound },
                                       search.genre && { bands__genres__like: search.genre },

                                                       { timeslot__start_time__gte: today },
                                                       { is_open: true },
                                                       { is_open_mic: false },
                                                       { is_venue_approved: 'True' },
                                                       { ordering: '-promoter_cut,funding_end' },
                                                       { expand: 'bands.band,purchase_options,timeslot.venue' },
                                                       { page: page },
                                                       { page_size: 20 }
          )
          dispatch(actions.openShowResultsLoading())
          api.campaigns.query(search_params).then((res) => {
            dispatch(actions.openShowResultsLoaded(res.results,page,res.count))
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