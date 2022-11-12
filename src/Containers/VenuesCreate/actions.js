import { push } from 'react-router-redux'
import { paths, analytics } from 'globals'
import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {
  saveVenue: (venue) => {
    return (dispatch, getState, api) => {
      dispatch(actions.isSaving(true))
      dispatch(actions.creationError(null))
      venue.city = 1
      api.venues.create(venue).then((res) => {
        dispatch(actions.isSaving(false))
        dispatch(push(paths.myVenues()))
        dispatch(appActions.success_message(constants.VENUE_CREATED_SUCCESS))
        analytics.venueCreated()
      }).catch((err) => {
        dispatch(actions.creationError(err))
        dispatch(actions.isSaving(false))
        dispatch(appActions.error_message(constants.VENUE_CREATED_ERROR))
        dispatch(errorMessage(err))
      })
    }
  },
  
  isSaving: (saving) => {
    return {
      type: constants.IS_SAVING,
      saving
    }
  },

  creationError: (error) => {
    return {
      type: constants.CREATION_ERROR,
      error
    }
  }
}

export default actions