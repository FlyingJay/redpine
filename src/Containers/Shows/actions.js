import constants from './constants'
import appActions from 'Containers/App/actions'
import moment from 'moment'


const today = moment().toISOString()

const actions = {
  loadInvitations: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadShowsStart())
      api.ready.then(() => {
        if(api.user){
          api.campaigns.query({
            invitations: api.user,
            status: 2,
            bands__owner: api.user,
            timeslot__end_time__gte: today,
            expand:'bands.band.owner,purchase_options,campaign.timeslot,timeslot.venue.city',
            ordering:'funding_end',
            page_size: 1000
          }).then((res) => {
            dispatch(actions.showsLoaded(res.results))
          }).catch((err) => {
            dispatch(actions.showError(err))
          })
        }
      })
    }
  },
  
  loadPending: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadShowsStart())
      api.ready.then(() => {
        if(api.user){
          api.campaigns.query({
            status: 1,
            bands__owner: api.user,
            timeslot__end_time__gte: today,
            expand:'bands.band.owner,purchase_options,campaign.timeslot,timeslot.venue.city',
            ordering:'funding_end',
            page_size: 1000
          }).then((res) => {
            dispatch(actions.showsLoaded(res.results))
          }).catch((err) => {
            dispatch(actions.showError(err))
          })
        }
      })
    }
  },
  
  loadActive: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadShowsStart())
      api.ready.then(() => {
        if(api.user){
          api.campaigns.query({
            status: 4,
            bands__owner: api.user,
            timeslot__end_time__gte: today,
            expand:'bands.band.owner,purchase_options,campaign.timeslot,timeslot.venue.city',
            ordering:'funding_end',
            page_size: 1000
          }).then((res) => {
            dispatch(actions.showsLoaded(res.results))
          }).catch((err) => {
            dispatch(actions.showError(err))
          })
        }
      })
    }
  },
  
  loadHistory: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadShowsStart())
      api.ready.then(() => {
        if(api.user){
          api.campaigns.query({
            status: 5,
            bands__owner: api.user,
            timeslot__end_time__lt: today,
            expand:'bands.band.owner,purchase_options,campaign.timeslot,timeslot.venue.city',
            ordering:'-funding_end',
            page_size: 1000
          }).then((res) => {
            dispatch(actions.showsLoaded(res.results))
          }).catch((err) => {
            dispatch(actions.showError(err))
          })
        }
      })
    }
  },

  deleteShow: (campaign,category) => {
    const INVITATION = 0
    const UNDER_VENUE_REVIEW = 1
    const CONFIRMED = 3
    const PAST = 4

  	return (dispatch,getState,api) => {
			api.campaigns.delete(campaign).then((res) => {
				//Deleted success notification
				dispatch(actions.showError(null))
        dispatch(appActions.success_message(constants.SHOW_DELETED_SUCCESS))
        
        if(category == INVITATION){
          dispatch(actions.loadInvitations())
        }else if (category == UNDER_VENUE_REVIEW){
          dispatch(actions.loadPending())
        }else if (category == CONFIRMED){
          dispatch(actions.loadActive())
        }else if (category == PAST){
          dispatch(actions.loadHistory())
        }
			}).catch((err) => {
				dispatch(actions.showError(err))
        dispatch(appActions.error_message(constants.SHOW_DELETED_ERROR))
			})
  	}
  },

  loadShowsStart: () => {
    return {
      type: constants.LOAD_SHOWS_START
    }
  },

  showsLoaded: (campaigns) => {
    return {
      type: constants.SHOWS_LOADED,
      campaigns
    }
  },

  showError: (error) => {
  	return {
      type: constants.SHOW_ERROR,
      error
    }
  }
}

export default actions
