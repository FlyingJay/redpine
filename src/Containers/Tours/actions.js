import { push } from 'react-router-redux'

import { paths } from 'globals'
import { RP_Tour } from 'Models'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'

const actions = {

  loadData: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadToursStart())
      api.ready.then(() => {
        if(api.user){
          api.tourCampaigns.query({
            tour__created_by: api.user,
            expand: 'tour.campaigns.timeslot.venue,campaign.timeslot'
          }).then((res) => {
            dispatch(actions.tourCampaignsLoaded(res.results))
          })
        }
    	})
    }
  },

  createTour: (tour) => {
    return (dispatch,getState,api) => {
      api.tours.create(tour).then((res) => {
        dispatch(push(paths.showCreate()+'?tour='+RP_Tour(res).id+'&headliner='+tour.headliner))
        dispatch(appActions.success_message(constants.TOUR_CREATED_SUCCESS))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  removeCampaign: (tourCampaign_id) => {
  	return (dispatch,getState,api) => {
			api.tourCampaigns.delete(tourCampaign_id).then((res) => {
        dispatch(actions.loadData())
        dispatch(appActions.success_message(constants.SHOW_REMOVED_SUCCESS))
			}).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(appActions.error_message(constants.SHOW_REMOVED_ERROR))
			})
  	}
  },

  loadToursStart: () => {
    return {
      type: constants.LOAD_TOURS_START
    }
  },

  tourCampaignsLoaded: (tourCampaigns) => {
    return {
      type: constants.TOURS_LOADED,
      tourCampaigns
    }
  }
}

export default actions
