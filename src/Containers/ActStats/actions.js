import constants from './constants'
import appActions from 'Containers/App/actions'

const actions = {
  loadStats: (act_id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadStatsStart())
      api.ready.then(() => {
        api.bands.get(act_id, {}).then((res) => {
          dispatch(actions.bandLoaded(res))
        })
	      api.campaigns.query({
	      	bands__id__in: act_id,
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

  bandLoaded: (band) => {
    return {
      type: constants.BAND_LOADED,
      band
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