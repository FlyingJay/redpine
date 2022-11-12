import constants from './constants'
import appActions from 'Containers/App/actions'

const actions = {
  loadPledges: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadPledgesStart())
      api.ready.then(() => {
        if(api.user){
          api.pledges.query({
            user: api.user,
            is_cancelled: false,
            expand: 'purchases,purchases.item'
          }).then((res) => {
            const pledges = res.results
            dispatch(actions.pledgesLoaded(pledges))

            // get all the campaign IDs
            const campaignIds = pledges.reduce((ids, pledge) => {
              if (ids.indexOf(pledge.campaign) === -1) {
                ids.push(pledge.campaign)
              }
              return ids
            }, []).join(',')

            api.campaigns.query({
              id__in: campaignIds.toString(), 
              expand: 'timeslot,timeslot.venue,timeslot.venue.city,timeslot.venue.city.province,timeslot.venue.city.country,bands,bands.band'
            }).then((res) => {
              dispatch(actions.campaignsLoaded(res.results))
            })
          })
        }
      })
    }
  },

  cancelPledge: (pledge) => {
    return (dispatch, getState, api) => {
      dispatch(actions.cancelPledgeStart(pledge))
      api.ready.then(() => {
        api.pledges.delete(pledge.id).then((res) => {
          dispatch(actions.cancelPledgeSuccess(pledge))
          dispatch(appActions.success_message(constants.PLEDGE_DELETED_SUCCESS))
        }).catch((err) => {
          dispatch(actions.cancelPledgeFailure(pledge))
          dispatch(appActions.error_message(constants.PLEDGE_DELETED_ERROR))
        })
      })
    }
  },

  loadPledgesStart: () => {
    return {
      type: constants.LOAD_PLEDGES_START
    }
  },

  pledgesLoaded: (pledges) => {
    return {
      type: constants.PLEDGES_LOADED,
      pledges
    }
  },

  campaignsLoaded: (campaigns) => {
    return {
      type: constants.CAMPAIGNS_LOADED,
      campaigns
    }
  },

  cancelPledgeStart: (pledge) => {
    return {
      type: constants.CANCEL_PLEDGE_START,
      pledge
    }
  },

  cancelPledgeSuccess: (pledge) => {
    return {
      type: constants.CANCEL_PLEDGE_SUCCESS,
      pledge
    }
  },

  cancelPledgeFailure: (pledge) => {
    return {
      type: constants.CANCEL_PLEDGE_FAILURE,
      pledge
    }
  }
}

export default actions