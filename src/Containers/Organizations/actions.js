import moment from 'moment'
import { analytics } from 'globals'
import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'

const actions = {

  loadData: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        dispatch(actions.loadDataStart())
        if(api.user){
          api.organizations.query({
            managers__id__in: api.user,
            expand:'city.province.country,bands.band,mangers'
          }).then((res) => {
            dispatch(actions.organizationsLoaded(res.results))
          })

          const today = moment().toISOString()
          api.campaigns.query({
            organizations__managers__id__in: api.user,
            funding_end__gte: today,
            ordering: 'funding_end',
            expand: 'timeslot,timeslot.venue,purchase_options,bands.band'
          }).then((res) => {
            dispatch(actions.activeCampaignsLoaded(res.results))
          })
        }
      })
    }
  },

  createOrganization: (organization) => {
    return (dispatch,getState,api) => {
      api.organizations.create(organization).then((res) => {
        dispatch(actions.loadData())
        dispatch(appActions.success_message(constants.ORGANIZATION_CREATED_SUCCESS))
      }).catch((err) => {
        dispatch(appActions.error_message(constants.ORGANIZATION_CREATED_ERROR))
        dispatch(errorMessage(err))
        dispatch(actions.organizationError(err))
      })
    }
  },

  updateOrganization: (organization) => {
    return (dispatch,getState,api) => {
      api.organizations.update(organization.id, organization).then((res) => {
        dispatch(actions.organizationUpdated(organization))
        dispatch(actions.loadData())
        dispatch(appActions.success_message(constants.ORGANIZATION_UPDATED_SUCCESS))
      }).catch((err) => {
        dispatch(appActions.error_message(constants.ORGANIZATION_UPDATED_ERROR))
        dispatch(errorMessage(err))
      })
    }
  },

  confirmOrganizationMembership: (organization_band) => {
    return (dispatch, getState, api) => {
      api.organizationBands.confirm(organization_band).then((res) => {
        dispatch(appActions.success_message(constants.ORGANIZATION_MEMBERSHIP_CONFIRMED_SUCCESS))
        dispatch(actions.loadData())
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  denyOrganizationMembership: (organization_band) => {
    return (dispatch, getState, api) => {
      api.organizationBands.deny(organization_band).then((res) => {
        dispatch(appActions.success_message(constants.ORGANIZATION_MEMBERSHIP_DENIED_SUCCESS))
        dispatch(actions.loadData())
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

  inviteAct: (organization, name, email) => {
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
                const organization_band = {
                  band: act.id,
                  organization: organization.id
                }
                api.organizationBands.create(organization_band).catch((err) => {
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

  addOrganizationBands: (organization_bands) => {
    return (dispatch, getState, api) => {
      let addPromises = organization_bands.map((organization_band) => { 
        return api.organizationBands.create(organization_band) 
      }) 
      Promise.all(addPromises).then(() => {
        dispatch(appActions.success_message(constants.ACTS_ADDED_SUCCESS))     
        dispatch(actions.loadData())
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  removeOrganizationBand: (organization_band) => {
    return (dispatch, getState, api) => {
      api.organizationBands.delete(organization_band.id).then((res) => {
        dispatch(appActions.success_message(constants.ACT_REMOVED_SUCCESS))
        dispatch(actions.loadData())
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  payout: (organization) => {
    return (dispatch, getState, api) => {
      api.organizations.payout(organization).then((res) => {
        dispatch(appActions.success_message(constants.PAYMENT_REQUEST_SUCCESS))
        dispatch(actions.loadData())
      }).catch((err) => {
        dispatch(appActions.error_message(constants.PAYMENT_REQUEST_ERROR))
      })
    }
  },

  payActs: (organization_id,acts,payouts) => {
    return (dispatch, getState, api) => {
      const requests = []

      acts.forEach(act => {
        if(!isNaN(payouts[act.id])){
          var data = {
            organization: organization_id,
            band: act.id,
            amount: payouts[act.id]
          }
          requests.push(api.actPayments.create(data))
        }
      })

      Promise.all(requests).then(() => {
        dispatch(actions.loadData())
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(appActions.error_message(constants.ACTS_PAID_ERROR))
      })
      dispatch(appActions.success_message(constants.ACTS_PAID_SUCCESS))
    }
  },

  loadDataStart: () => {
    return {
      type: constants.LOAD_DATA_START
    }
  },

  organizationsLoaded: (organizations) => {
    return {
      type: constants.ORGANIZATIONS_LOADED,
      organizations
    }
  },

  activeCampaignsLoaded: (campaigns) => {
    return {
      type: constants.ACTIVE_CAMPAIGNS_LOADED,
      campaigns
    }
  },

  organizationUpdated: (organization) => {
    return {
      type: constants.ORGANIZATION_UPDATED,
      organization
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

  organizationError: (error) => {
    return {
      type: constants.ORGANIZATION_ERROR,
      error
    }
  }
}

export default actions