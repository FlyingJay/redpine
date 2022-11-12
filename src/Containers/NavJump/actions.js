import { push } from 'react-router-redux'

import { paths } from 'globals'
import { errorMessage } from 'Components/errors'

import appActions from 'Containers/App/actions'
import constants from './constants'


const actions = {
  navigationFeedbackCreate: (category,text) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.navigationFeedback.create({created_by:api.user,category,text}).then((res) => {
          dispatch(appActions.hideNavJump())
          dispatch(appActions.success_message(constants.FEEDBACK_RECIEVED))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  }
}

export default actions

