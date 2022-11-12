import constants from './constants'
import appActions from 'Containers/App/actions'

const actions = {
  loadStats: (organization_id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadStatsStart())
      api.ready.then(() => {
        api.organizations.get(organization_id).then((res) => {
          dispatch(actions.organizationLoaded(res))
        })
	      api.campaigns.query({
	      	organizations: organization_id,
          is_successful: true,
          expand: 'bands,bands.band'
	      }).then((res) => {
	        dispatch(actions.campaignsLoaded(res.results))
	      })
      }).then(() => {
      	dispatch(actions.loadStatsSuccess())
      })
    }
  },

  loadStatsStart: () => {
    return {
      type: constants.LOAD_STATS_START
    }
  },

  loadStatsSuccess: () => {
    return {
      type: constants.LOAD_STATS_SUCCESS
    }
  },

  organizationLoaded: (organization) => {
    return {
      type: constants.ORGANIZATION_LOADED,
      organization
    }
  },

  campaignsLoaded: (campaigns) => {
    return {
      type: constants.CAMPAIGNS_LOADED,
      campaigns
    }
  }
}

export default actions