
import { analytics } from 'globals'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import constants from './constants'


const actions = {
  loadBandReviews: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        if(api.user){
          api.bands.query({
            owner: api.user,
            expand: 'band_reviews,band_reviews.band,venue_reviews,venue_reviews.band,reviews_by_bands,reviews_by_venues'
          }).then((res) => {
            dispatch(actions.bandReviewsLoaded(res.results))
          })
        }
      })
    }
  },

  loadVenueReviews: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        if(api.user){
          api.venues.query({
            managers__id__in: api.user,
            expand: 'band_reviews,band_reviews.band,reviews_by_bands'
          }).then((res) => {
            dispatch(actions.venueReviewsLoaded(res.results))
          })
        }
      })
    }
  },

  getReviewBand: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bands.get(id).then((res) => {
          dispatch(actions.reviewBandLoaded(res))
        })
      })
    }
  },

  getReviewVenue: (id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venues.get(id).then((res) => {
          dispatch(actions.reviewVenueLoaded(res))
        })
      })
    }
  },

  submitBandToBandReview: (review) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bandToBandReviews.update(review.id,review).then((res) => {
          dispatch(appActions.success_message(constants.REVIEW_SUCCESS))
          dispatch(actions.reviewSubmitted())
          dispatch(actions.loadBandReviews())
          analytics.reviewSubmitted()
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  submitBandToVenueReview: (review) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bandToVenueReviews.update(review.id,review).then((res) => {
          dispatch(appActions.success_message(constants.REVIEW_SUCCESS))
          dispatch(actions.reviewSubmitted())
          dispatch(actions.loadBandReviews())
          analytics.reviewSubmitted()
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  submitVenueToBandReview: (review) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venueToBandReviews.update(review.id,review).then((res) => {
          dispatch(appActions.success_message(constants.REVIEW_SUCCESS))
          dispatch(actions.reviewSubmitted())
          dispatch(actions.loadVenueReviews())
          analytics.reviewSubmitted()
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  respondBandToBandReview: (review) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bandToBandReviews.update(review.id,review).then((res) => {
          dispatch(appActions.success_message(constants.RESPONSE_SUCCESS))
          dispatch(actions.reviewResponded())
          dispatch(actions.loadBandReviews())
          analytics.reviewResponded()
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  respondBandToVenueReview: (review) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bandToVenueReviews.update(review.id,review).then((res) => {
          dispatch(appActions.success_message(constants.RESPONSE_SUCCESS))
          dispatch(actions.reviewResponded())
          dispatch(actions.loadVenueReviews())
          analytics.reviewResponded()
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  respondVenueToBandReview: (review) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.venueToBandReviews.update(review.id,review).then((res) => {
          dispatch(appActions.success_message(constants.RESPONSE_SUCCESS))
          dispatch(actions.reviewResponded())
          dispatch(actions.loadBandReviews())
          analytics.reviewResponded()
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  bandReviewsLoaded: (bands) => {
    return {
      type: constants.BANDS_LOADED,
      bands
    }
  },

  venueReviewsLoaded: (venues) => {
    return {
      type: constants.VENUES_LOADED,
      venues
    }
  },

  reviewBandLoaded: (band) => {
    return {
      type: constants.REVIEW_BAND_LOADED,
      band
    }
  },

  reviewVenueLoaded: (venue) => {
    return {
      type: constants.REVIEW_VENUE_LOADED,
      venue
    }
  },

  reviewSubmitted: () => {
    return {
      type: constants.REVIEW_SUBMITTED
    }
  },

  reviewResponded: () => {
    return {
      type: constants.REVIEW_RESPONDED
    }
  }

}

export default actions