import { analytics } from 'globals'
import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'


const actions = {
  loadData: () => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadBandsStart())
      api.ready.then(() => {
        if(api.user){
          api.bands.query({
            owner: api.user,
            expand:'genres,hometown,organizations,organizations.organization'
          }).then((res) => {
            dispatch(actions.bandsLoaded(res.results))
          }).catch((err) => {
            dispatch(actions.bandError(err))
          })
        }
      })
    }
  },

  createBand: (band, closeModal) => {
    return (dispatch, getState, api) => {
      api.bands.create(band).then((band) => {
        analytics.actCreated()
        dispatch(actions.bandSaved(band))
        dispatch(actions.loadData())
        dispatch(appActions.success_message(constants.BAND_CREATED_SUCCESS))
        closeModal()
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(actions.bandError(err))
      })
    }
  },

  updateActPartial: (data) => {
    return (dispatch, getState, api) => {
      api.bands.update(data.id, data).then((act) => {
        dispatch(actions.actUpdated(act))
        dispatch(actions.loadData())
        dispatch(appActions.success_message(constants.BAND_UPDATED_SUCCESS))
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(actions.bandError(err))
      })
    }
  },

  updateBand: (band, closeModal) => {
    return (dispatch, getState, api) => {
      api.bands.update(band.id, band).then((res) => {
        dispatch(actions.actUpdated(band))
        dispatch(actions.loadData())
        dispatch(appActions.success_message(constants.BAND_UPDATED_SUCCESS))
        closeModal()
      }).catch((err) => {
        dispatch(errorMessage(err))
        dispatch(actions.bandError(err))
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

  removeBandOrganization: (organization_band) => {
    return (dispatch, getState, api) => {
      api.organizationBands.delete(organization_band.id).then((res) => {
        dispatch(appActions.success_message(constants.ORGANIZATION_REMOVED_SUCCESS))
        dispatch(actions.loadData())
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  payout: (act) => {
    return (dispatch, getState, api) => {
      api.bands.payout(act).then((res) => {
        dispatch(appActions.success_message(constants.PAYMENT_REQUEST_SUCCESS))
        dispatch(actions.loadData())
      }).catch((err) => {
        dispatch(actions.bandError(err))
        dispatch(appActions.error_message(constants.PAYMENT_REQUEST_ERROR))
      })
    }
  },

  loadBandsStart: () => {
    return {
      type: constants.LOAD_BANDS_START
    }
  },

  bandsLoaded: (bands) => {
    return {
      type: constants.BANDS_LOADED,
      bands
    }
  },

  bandSaved: (band) => {
      return {
        type: constants.BAND_SAVED,
        band
      }
  },

  actUpdated: (act) => {
      return {
        type: constants.SET_ACTIVE_ACT,
        act
      }
  },

  bandError: (error) => {
    return {
      type: constants.BAND_ERROR,
      error
    }
  },

  usersLoaded: (users) => {
    return {
      type: constants.USERS_LOADED,
      users
    }
  },

  setActiveAct: (act) => {
    return {
      type: constants.SET_ACTIVE_ACT,
      act
    }
  }

}

export default actions
