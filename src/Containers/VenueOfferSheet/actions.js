import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {

  loadData: (venue_id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venues.get(venue_id, {
          expand: 'city,city.province,city.province.country,events'
        }).then((venue) => {
          dispatch(actions.venueLoaded(venue))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  venueLoaded: (venue) => {
    return {
      type: constants.VENUE_LOADED,
      venue
    }
  },

  saveOfferData: (offerData) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.offerSheet.create(venue_id, offerData).then(() => {
          dispatch(actions.downloadOfferCSV(offerData))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  },  

  downloadOffer: (offerData) => {
    return {
      type: constants.DOWNLOADING_OFFER,
      offerData
    }
  }
}

export default actions