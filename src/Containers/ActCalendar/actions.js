import appActions from 'Containers/App/actions'
import { errorMessage } from 'Components/errors'
import constants from './constants'
import moment from 'moment'

const actions = {
  loadData: (act_id,date) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.bands.get(act_id).then((act) => {
          dispatch(actions.actLoaded(act))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
        api.campaigns.query({
          bands__id: act_id,
          timeslot__start_time__gte: moment(date).subtract(1, 'M').toISOString(),
          timeslot__start_time__lte: moment(date).add(1, 'M').toISOString(),
          expand: 'timeslot,timeslot.venue,bands,bands.band,purchase_options',
          page_size: 100
        }).then((res) => {
          dispatch(actions.campaignsLoaded(res.results))
        }).catch(err => {
          dispatch(errorMessage(err))
        })
      })
    }
  },

  campaignsLoaded: (campaigns) => {
    return {
      type: constants.CAMPAIGNS_LOADED,
      campaigns
    }
  },

  actLoaded: (act) => {
    return {
      type: constants.ACT_LOADED,
      act
    }
  }
}

export default actions