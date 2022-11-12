import { push } from 'react-router-redux'

import { paths } from 'globals'
import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'


const actions = {
  loadData: (show) => {
    return (dispatch, getState, api) => {
      dispatch(actions.guestlistLoading()) 
      api.ready.then(() => {
        api.guestList.query({
          pledge__campaign: show,
          pledge__is_processed: true,
          pledge__is_cancelled: false,
          expand:'details,pledge.user,pledge.bands'
        }).then((res) => {
          dispatch(actions.guestlistLoaded(res.results))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },
 
  toggleAttended: (show,ticket,attended) => {
    return (dispatch, getState, api) => {
      api.guestList.update(ticket,{attended:attended}).then((res) => {
        dispatch(actions.loadData(show))
        if(res.detail){
          dispatch(errorMessage(res.detail))
        }
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },
 
  guestlistLoading: () => { 
    return { 
      type: constants.GUESTLIST_LOADING
    }
  },

  guestlistLoaded: (tickets) => { 
    return { 
      type: constants.GUESTLIST_LOADED,
      tickets
    }
  }
}

export default actions

