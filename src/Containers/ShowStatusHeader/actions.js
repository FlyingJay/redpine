import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'
import { analytics } from 'globals'

const actions = {
  updateCampaignBand: (campaign_band,data) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loading())
      api.campaignBands.update(campaign_band, data).then((res) => {
        dispatch(appActions.success_message(constants.ACT_UPDATED_SUCCESS))
        location.reload()
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(actions.loaded())
      })
    }
  },

  confirmCampaign: (id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loading())
      api.campaigns.confirm(id).then((res) => {
        analytics.bookingRequestApproved(id)
        dispatch(appActions.success_message(constants.CAMPAIGN_CONFIRMED_SUCCESS))
        location.reload()
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(actions.loaded())
      })
    }
  },

  placeHold: (id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loading())
      api.campaigns.update(id,{is_hold:true}).then((res) => {
        dispatch(appActions.success_message(constants.CAMPAIGN_HOLD_SUCCESS))
        location.reload()
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(actions.loaded())
      })
    }
  },

  denyCampaign: (id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loading())
      api.campaigns.deny(id).then((res) => {
        analytics.bookingRequestRejected(id)
        dispatch(appActions.success_message(constants.CAMPAIGN_DENIED_SUCCESS))
        location.reload()
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(actions.loaded())
      })
    }
  },

  loading: () => {
    return {
      type: constants.LOADING
    }
  },

  loaded: () => {
    return {
      type: constants.LOADED
    }
  }
}

export default actions