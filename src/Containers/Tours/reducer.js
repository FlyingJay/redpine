import {fromJS} from 'immutable'

import { RP_Tour } from 'Models'

import constants from './constants'

export const initialState = fromJS({
  tours_loading: false,
  act: null,
  tours: []
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_TOURS_START:
      return state
        .set('tours_loading', true)    

    case constants.ACT_LOADED:
      return state
        .set('act', action.act)

    case constants.TOURS_LOADED:
      const tourCampaigns = action.tourCampaigns || []

      let tours = {}
      let campaigns = {}
      tourCampaigns.forEach(tourCampaign => {
        const tour_id = RP_Tour(tourCampaign.tour).id
        const campaign = Object.assign(tourCampaign.campaign,{delete_id:tourCampaign.id})

        tours[tour_id] = tourCampaign.tour
        campaigns[tour_id] = campaigns[tour_id] ? campaigns[tour_id].concat([campaign]) : [campaign]
      })

      let tour_list = []
      let campaign_list = []
      Object.keys(tours).forEach((key,i) => {
        tour_list[i] = tours[key]
        campaign_list[i] = campaigns[key]
      })

      return state
        .set('tours', tour_list)
        .set('campaigns', campaign_list)
        .set('tours_loading', false)

    default:
      return state
  }
}

export default reducer