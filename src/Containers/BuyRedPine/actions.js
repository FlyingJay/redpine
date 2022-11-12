import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {
  submitSubscription: (subscription_args) => {
    return (dispatch, getState, api) => {
      api.accountSubscriptions.create(subscription_args).then((res) => {
        dispatch(appActions.success_message(constants.SUBSCRIBED_SUCCESS))
        dispatch(appActions.getUser())
      }).catch((err) => {
        errorMessage(constants.SUBSCRIBED_ERROR)
      })
    }
  }
}

export default actions