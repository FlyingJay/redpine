import { push } from 'react-router-redux'

import { paths } from 'globals'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'


const actions = {
  notifyCoverLead: (lead) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.coverLeads.create(lead).then((res) => {
          location.reload()
        }).catch((err) => {
          console.log('nuu sumthin brok')
        })
      })
    }
  },
 /*
  bookingLoading: () => { 
    return { 
      type: constants.BOOKING_LOADING
    }
  },

  bookingLoaded: () => { 
    return { 
      type: constants.BOOKING_LOADED
    }
  }*/
}

export default actions

