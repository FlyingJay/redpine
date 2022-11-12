import { push } from 'react-router-redux'

import { paths, analytics } from 'globals'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import consts from './constants'


const actions = {
  loadCampaign: (id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.campaignLoading())
      api.campaigns.get(id, { 
        expand: 'bands,bands.band.hometown.province,timeslot,timeslot.venue,photos,purchase_options' 
      }).then((campaign) => {
        dispatch(actions.campaignLoaded(campaign))
      })
    }
  },

  submitPledge: (is_ghost, is_free, pledgeArgs, subscriptionArgs) => {
    return (dispatch, getState, api) => {
      analytics.pledgeSubmit(pledgeArgs.campaign)
      dispatch(actions.pledgeStart())
      dispatch(actions.pledgeLock(true))

      api.pledges.create(pledgeArgs).then((res) => {
        dispatch(actions.pledgeLock(false))

        if(is_free){
          dispatch(appActions.success_message(consts.RSVP_PLEDGE_CREATED_SUCCESS))
        }else if(is_ghost){
          dispatch(appActions.success_message(consts.GUEST_PURCHASE_SUCCESS))
        }else{
          dispatch(appActions.success_message(consts.PURCHASE_SUCCESS))
        }
        analytics.pledgeSuccess(pledgeArgs.campaign)

        //Add user subscriptions, if selected.
        if(subscriptionArgs.acts){
          dispatch(actions.subscribeActs(subscriptionArgs.acts))
        }
        if(subscriptionArgs.organizations){
          dispatch(actions.subscribeOrganizations(subscriptionArgs.organizations))
        }
        if(subscriptionArgs.venue){
          dispatch(actions.subscribeVenue(subscriptionArgs.venue))
        }

        if(is_ghost){
          dispatch(appActions.logout(false))
        }else{
          dispatch(push(paths.tickets()))
        }
      }).catch((err) => {
        analytics.pledgeFailure(pledgeArgs.campaign)
        dispatch(actions.pledgeCreationError(err))
        dispatch(actions.pledgeLock(false))
        dispatch(errorMessage(err))

        if(is_ghost){
          dispatch(appActions.logout(false))
        }
      })
    }
  },

  submitRegistration: (userArgs, is_ghost, is_free, pledgeArgs, subscriptionArgs) => {
    return (dispatch, getState, api) => {
      api.register.create(userArgs).then((res) => {
        analytics.userSignup()
        if(res.password){
          api.logIn(userArgs.email, res.password).then((res) => {
            dispatch(appActions.setAuth(true))
            dispatch(actions.submitPledge(is_ghost, is_free, pledgeArgs, subscriptionArgs))
          }).catch((err) => {
            dispatch(errorMessage(err))
          })
        }else{
          api.logIn(userArgs.email, userArgs.password).then((res) => {
            dispatch(appActions.setAuth(true))
            dispatch(actions.submitPledge(is_ghost, is_free, pledgeArgs, subscriptionArgs))
          }).catch((err) => {
            dispatch(push(paths.login()))
          })
        }
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  subscribeActs: (act_ids) => {
    return (dispatch, getState, api) => {
      let requests = []
      act_ids.forEach(id => {
        requests.push(new Promise((resolve,reject) => {
          api.bandSubscriptions.create({
            user: api.user,
            band: id
          })
        }))
      })

      Promise.all(requests).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  subscribeOrganizations: (organization_ids) => {
    return (dispatch, getState, api) => {
      let requests = []
      organization_ids.forEach(id => {
        requests.push(new Promise((resolve,reject) => {
          api.organizationSubscriptions.create({
            user: api.user,
            organization: id
          })
        }))
      })

      Promise.all(requests).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  subscribeVenue: (venue_id) => {
    return (dispatch, getState, api) => {
      api.venueSubscriptions.create({
        user: api.user,
        venue: venue_id
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  loadUserActs: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.actsLoading())
      if(api.user){
        api.bands.query({owner: api.user}).then((res) => {
          dispatch(actions.actsLoaded(res.results))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      }
      dispatch(appActions.refreshCache())
    }
  },
  
  joinOpenShow: (campaign,act) => {
    return (dispatch, getState, api) => {
      const campaign_id = Number.isInteger(campaign) ? campaign : campaign.id

      const campaign_band = {
        band: act.id,
        campaign: campaign_id,
        is_headliner: false,
        is_accepted: true,
        is_application: null
      }

      api.campaignBands.create(campaign_band).then(() => {
        dispatch(appActions.success_message(consts.OPPORTUNITY_APPLIED_SUCCESS))
        dispatch(push(paths.showHub(campaign_id)))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },
  
  createActThenJoinOpenShow: (campaign,act) => {
    return (dispatch, getState, api) => {
      Object.assign(act, { owner:api.user })
      api.bands.create(act).then((act) => {
        dispatch(actions.joinOpenShow(campaign,act))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  registerThenCreateAct: (user_details,campaign,act_details) => {
    return (dispatch, getState, api) => {
      api.register.create(user_details).then((user) => {
        analytics.userSignup()

        api.logIn(user_details.email, user_details.password).then((res) => {
          dispatch(appActions.setAuth(true))
          dispatch(actions.createActThenJoinOpenShow(campaign,act_details))
        }).catch((err) => {
          dispatch(errorMessage(err))
          dispatch(push(paths.login()))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  actsLoading: () => {
    return {
      type: consts.USER_ACTS_LOADING
    }
  },  

  actsLoaded: (acts) => {
    return {
      type: consts.USER_ACTS_LOADED,
      acts
    }
  },

  setPromoter: (user) => {
    return {
      type: consts.SET_PROMOTER,
      user
    }
  },

  campaignLoading: () => {
    return {
      type: consts.CAMPAIGN_LOADING
    }
  },

  campaignLoaded: (campaign) => {
    return {
      type: consts.CAMPAIGN_LOADED,
      campaign
    }
  },

  pledgesLoaded: (pledges) => {
    return {
      type: consts.PLEDGES_LOADED,
      pledges
    }
  },

  pledgeStart: () => {
    return {
      type: consts.PLEDGE_START
    }
  },

  pledgeTokenError: (error) => {
    return {
      type: consts.PLEDGE_TOKEN_ERROR,
      error
    }
  },

  pledgeCreationError: (error) => {
    return {
      type: consts.PLEDGE_CREATION_ERROR,
      error
    }
  },

  pledgeLock: (lock) => {
    return {
      type: consts.PLEDGE_LOCK,
      lock
    }
  }
}

export default actions