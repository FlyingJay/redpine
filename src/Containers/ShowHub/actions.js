import { push } from 'react-router-redux'

import { paths } from 'globals'

import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'

import notifications from './strings'
import constants from './constants'


const actions = {
  loadCampaign: (id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.campaignLoading()) 
      api.ready.then(() => {
        api.campaigns.get(id,{
          expand: 'bands,bands.band,bands.band.owner,timeslot,timeslot.venue,timeslot.venue.managers,timeslot.venue.managers.manager,purchase_options,feed,feed.sender,organizations,organizations.organization,organizations.organization.managers,organizations.organization.managers.manager,documents'
        }).then((res) => {
          dispatch(actions.campaignLoaded(res))
          dispatch(actions.loadPledges(id))
        })
      })
    }
  },

  loadHints: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.hints.query().then((res) => {
          dispatch(actions.hintsLoaded(res.results))
        })
      })
    }
  },

  deleteShow: (show, is_manager, venue_id) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.campaigns.delete(show).then((res) => {
          dispatch(appActions.success_message(constants.SHOW_DELETED_SUCCESS))

          if (is_manager) {
            dispatch(push(paths.venueCalendar(venue_id)))
          } else {
            dispatch(push(paths.myShows()))
          }
        })
      })
    }
  },

  loadPledges: (id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.pledgesLoading())
      api.pledges.query({
        campaign: id,
        is_processed: true,
        is_cancelled: false,
        expand: 'campaign,bands,bands.band'
      }).then((res) => {
        dispatch(actions.pledgesLoaded(res.results))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  updateCampaignDetails: (campaign,data) => { 
    return (dispatch,getState,api) => { 
      api.campaigns.update(campaign.id, data).then((res) => { 
        dispatch(appActions.success_message(constants.DETAILS_UPDATED_SUCCESS))
        
        const message = notifications.NEW_DETAILS(campaign,data)
        dispatch(actions.sendNotification(campaign,message))
      }).catch((err) => { 
        dispatch(errorMessage(err))
      }) 
    } 
  }, 

  updateDate: (campaign,timeslot,data) => {
    return (dispatch, getState, api) => {
      api.timeslots.update(timeslot.id, data).then((res) => {
        dispatch(appActions.success_message(constants.DATE_UPDATED_SUCCESS))

        const message = notifications.NEW_DATE(timeslot,data)
        dispatch(actions.sendNotification(campaign,message))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  updateRequirements: (campaign,timeslot,data) => {
    return (dispatch, getState, api) => {
      api.timeslots.update(timeslot.id, data).then((res) => {
        dispatch(appActions.success_message(constants.REQUIREMENTS_UPDATED_SUCCESS))

        const message = notifications.NEW_REQUIREMENTS(timeslot,data)
        dispatch(actions.sendNotification(campaign,message))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  loadUserActs: () => {
    return (dispatch, getState, api) => {
      if(api.user){
        dispatch(actions.actsLoading())
        api.bands.query({owner: api.user}).then((res) => {
          dispatch(actions.actsLoaded(res.results))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      }
    }
  },

  searchActs: (query) => {
    return (dispatch, getState, api) => {
      dispatch(actions.searchActsStart())
      api.ready.then(() => {
        api.bands.query({
          name__icontains: query,
          is_redpine: true,
          ordering: 'name',
          expand: 'genres,hometown,hometown.province'
        }).then((res) => {
          dispatch(actions.searchActsLoaded(res.results))
        })
      })
    }
  },

  inviteAct: (campaign, name, email) => {
    return (dispatch, getState, api) => {
      dispatch(actions.verifyActsLoading())
      api.users.query({ email: email }).then((res) => {
        const results = res.results
        if(results && results.length > 0){
          api.bands.query({
            owner: results[0].id,
            page_size: 50
          }).then((res) => {
            const results = res.results
            dispatch(actions.verifyActsLoaded(results))

            if(results.length == 0){
              const new_act = {
                name: name,
                short_bio: name + ' has not yet added a bio.',
                is_redpine: false
              }

              api.bands.create(new_act).then((act) => {
                const campaign_band = {
                  band: act.id,
                  campaign: campaign.id,
                  is_headliner: false,
                  is_accepted: null
                }

                api.campaignBands.create(campaign_band).catch((err) => {
                  dispatch(errorMessage(err))
                })

                const invitation = {
                  template: 'ACT_SHOW_INVITE',
                  sender: api.user,
                  recipient_email: email,
                  join_token: act.join_token,
                  data: {
                    campaign: campaign.id,
                    join_token: act.join_token
                  }
                }

                api.invitations.create(invitation).then((res) => {
                  dispatch(appActions.success_message(constants.INVITE_WILL_BE_SENT))
                }).catch((err) => {
                  dispatch(errorMessage(err))
                })
              }).catch((err) => {
                dispatch(errorMessage(err))
              })
            }
          })
        }
      })
    }
  },

  addCampaignBands: (campaign,acts,data) => {
    return (dispatch, getState, api) => {
      let addPromises = data.map((act) => { 
        return api.campaignBands.create(act) 
      }) 
      Promise.all(addPromises).then(() => {
        dispatch(appActions.success_message(constants.ACTS_ADDED_SUCCESS))
        dispatch(actions.campaignBandsAdded())

        const message = notifications.NEW_ACTS(acts)
        dispatch(actions.sendNotification(campaign,message))      
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  updateCampaignBand: (campaign,campaign_band,data,update_type) => {
    return (dispatch, getState, api) => {
      api.campaignBands.update(campaign_band.id, data).then((res) => {
        dispatch(appActions.success_message(constants.ACT_UPDATED_SUCCESS))

        let message = ''
        switch (update_type) {
          case "Headliner":
            message = notifications.HEADLINER_CHANGED(campaign_band)
            break;
          case "Accept":
            message = notifications.ACT_CONFIRMED(campaign_band)
            break;
          case "Reject":
            message = notifications.ACT_REJECTED(campaign_band)
            break;
          case "Approve_Application":
            message = notifications.ACT_APPLICATION_APPROVED(campaign_band)
            break;
          case "Reject_Application":
            message = notifications.ACT_APPLICATION_REJECTED(campaign_band)
            break;
          case "Set_Times":
            message = notifications.ACT_START_CHANGED(campaign_band)
            break;
        }
        dispatch(actions.sendNotification(campaign,message))

      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  removeCampaignBand: (campaign,campaign_band,was_removed) => {
    return (dispatch, getState, api) => {
      api.campaignBands.delete(campaign_band.id).then((res) => {
        dispatch(appActions.success_message(constants.ACT_REMOVED_SUCCESS))

        const message = notifications.REMOVED_ACT(campaign_band,was_removed)
        dispatch(actions.sendNotification(campaign,message)) 
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  addPurchaseItems: (campaign,new_items) => {
    return (dispatch, getState, api) => {
      let addPromises = new_items.map((item) => { 
        return api.purchaseItems.create(item) 
      }) 
      Promise.all(addPromises).then(() => { 
        dispatch(appActions.success_message(constants.DETAILS_UPDATED_SUCCESS))

        const message = notifications.NEW_PURCHASES(new_items)
        dispatch(actions.sendNotification(campaign,message))
      }).catch((err) => { 
        dispatch(errorMessage(err))
      })
    }
  },

  updatePurchaseItem: (id,data,campaign_id) => {
    return (dispatch, getState, api) => {
      api.purchaseItems.update(id,data).then(() => { 
        dispatch(actions.loadCampaign(campaign_id))
        dispatch(appActions.success_message(constants.DETAILS_UPDATED_SUCCESS))
      }).catch((err) => { 
        dispatch(errorMessage(err))
      })
    }
  },

  deletePurchaseItem: (id,campaign_id) => {
    return (dispatch, getState, api) => {
      api.purchaseItems.delete(id).then(() => { 
        dispatch(actions.loadCampaign(campaign_id))
        dispatch(appActions.success_message(constants.PURCHASE_OPTION_REMOVED_SUCCESS))
      }).catch((err) => { 
        dispatch(errorMessage(err))
      })
    }
  },

  updateTasks: (taskList) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.campaigns.update(taskList.id,taskList).then((res) => {
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  sendMessage: (message) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.campaignFeed.create(message).then(() => {
          dispatch(actions.loadCampaign(message.campaign))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  sendNotification: (campaign,text) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        const message = {
          campaign: campaign.id,
          sender: api.user,
          is_system: true,
          item_type: 0, //Notification
          text: text
        }

        api.campaignFeed.create(message).then(() => {
          dispatch(actions.loadCampaign(message.campaign))
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  bookNow: (campaign) => {
    return (dispatch, getState, api) => {
      api.campaigns.book(campaign.id).then((res) => {
        dispatch(actions.loadCampaign(campaign.id))
        dispatch(actions.sendNotification(campaign, "THE SHOW HAS BEEN BOOKED!"))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  saveDocument: (campaign,file) => {
    return (dispatch, getState, api) => {
      api.campaignDocuments.create(file).then((res) => {
        dispatch(actions.loadCampaign(campaign.id))
        dispatch(appActions.success_message(constants.DOCUMENT_UPLOADED_SUCCESS))
        dispatch(actions.sendNotification(campaign, 'A file was added! You may download it from the "Documents" tab.'))
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  campaignLoading: () => { 
    return { 
      type: constants.CAMPAIGN_LOADING
    }
  },

  campaignLoaded: (campaign) => { 
    return { 
      type: constants.CAMPAIGN_LOADED, 
      campaign 
    }
  },

  searchActsStart: () => {
    return {
      type: constants.SEARCH_ACTS_START
    }
  },

  searchActsLoaded: (acts) => {
    return {
      type: constants.SEARCH_ACTS_LOADED,
      acts
    }
  },

  verifyActsLoaded: (acts) => {
    return {
      type: constants.VERIFY_ACTS_LOADED,
      acts
    }
  },

  verifyActsLoading: () => {
    return {
      type: constants.VERIFY_ACTS_LOADING
    }
  },

  campaignBandsAdded: () => {
    return {
      type: constants.CAMPAIGN_BANDS_ADDED
    }
  },

  actsLoading: () => {
    return {
      type: constants.USER_ACTS_LOADING
    }
  },  

  actsLoaded: (acts) => {
    return {
      type: constants.USER_ACTS_LOADED,
      acts
    }
  },

  hintsLoaded: (hints) => {
    return {
      type: constants.HINTS_LOADED,
      hints
    }
  },

  pledgesLoading: () => {
    return {
      type: constants.PLEDGES_LOADING
    }
  },

  pledgesLoaded: (pledges) => {
    return {
      type: constants.PLEDGES_LOADED,
      pledges
    }
  }
}

export default actions