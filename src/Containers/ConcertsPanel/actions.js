import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {
  subscribeAct: (entity_id) => {
    return (dispatch, getState, api) => {
      api.bandSubscriptions.create({
        user: api.user,
        band: entity_id
      }).then((res) => {
        dispatch(appActions.success_message(constants.SUBSCRIBED_SUCCESS))
      }).catch((err) => {
        dispatch(appActions.success_message(constants.SUBSCRIBED_ERROR))
      })
    }
  },

  subscribeOrganization: (entity_id) => {
    return (dispatch, getState, api) => {
      api.organizationSubscriptions.create({
        user: api.user,
        organization: entity_id
      }).then((res) => {
        dispatch(appActions.success_message(constants.SUBSCRIBED_SUCCESS))
      }).catch((err) => {
        dispatch(appActions.success_message(constants.SUBSCRIBED_ERROR))
      })
    }
  },

  subscribeVenue: (entity_id) => {
    return (dispatch, getState, api) => {
      api.venueSubscriptions.create({
        user: api.user,
        venue: entity_id
      }).then((res) => {
        dispatch(appActions.success_message(constants.SUBSCRIBED_SUCCESS))
      }).catch((err) => {
        dispatch(appActions.success_message(constants.SUBSCRIBED_ERROR))
      })
    }
  },

  unsubscribeAct: (subscription_id) => {
    return (dispatch, getState, api) => {
      api.bandSubscriptions.delete(subscription_id).then((res) => {
        dispatch(appActions.success_message(constants.UNSUBSCRIBED_SUCCESS))
      }).catch((err) => {
        dispatch(appActions.success_message(constants.UNSUBSCRIBED_ERROR))
      })
    }
  },

  unsubscribeOrganization: (subscription_id) => {
    return (dispatch, getState, api) => {
      api.organizationSubscriptions.delete(subscription_id).then((res) => {
        dispatch(appActions.success_message(constants.UNSUBSCRIBED_SUCCESS))
      }).catch((err) => {
        dispatch(appActions.success_message(constants.UNSUBSCRIBED_ERROR))
      })
    }
  },

  unsubscribeVenue: (subscription_id) => {
    return (dispatch, getState, api) => {
      api.venueSubscriptions.delete(subscription_id).then((res) => {
        dispatch(appActions.success_message(constants.UNSUBSCRIBED_SUCCESS))
      }).catch((err) => {
        dispatch(appActions.success_message(constants.UNSUBSCRIBED_ERROR))
      })
    }
  }
}

export default actions