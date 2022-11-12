import constants from './constants'
import appActions from 'Containers/App/actions'

const actions = {
  
  loadData: (id) => {
    return (dispatch, getState, api) => {
      dispatch(actions.loadStatsStart())
      api.ready.then(() => {
        api.pledges.query({
          campaign: id,
          is_cancelled: false,
          is_processed: true,
          expand: 'campaign,bands,bands.band'
        }).then((res) => {
          dispatch(actions.pledgesLoaded(res.results))
        }).catch((err) => {
          dispatch(actions.statsError(err))
        })
    	})
    }
  },

  loadStatsStart: () => {
    return {
      type: constants.LOAD_STATS_START
    }
  },
  
  pledgesLoaded: (pledges) => {
    return {
      type: constants.PLEDGES_LOADED,
      pledges
    }
  },

  statsError: (error) => {
    return {
      type: constants.STATS_ERROR,
      error
    }
  }
}

export default actions
