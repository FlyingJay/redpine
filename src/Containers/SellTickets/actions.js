import { paths } from 'globals'
import appActions from 'Containers/App/actions'
import constants from './constants'
import { errorMessage } from 'Components/errors'
import { push } from 'react-router-redux'

const actions = {

  loadData: () => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        dispatch(actions.actsLoading())
        if(api.user){
          api.bands.query({owner: api.user}).then((res) => {
            dispatch(actions.actsLoaded(res.results))
          }).catch((err) => {
            dispatch(errorMessage(err))
          })
        }
        api.bands.query({
          is_redpine: true,
          ordering:'name'
        }).then((res) => {
          dispatch(actions.searchActsLoaded(res.results))
        })
      })
    }
  },

  searchActs: (act_query) => {
    return (dispatch, getState, api) => {
      dispatch(actions.searchActsLoading())
      api.ready.then(() => {
        api.bands.query({
          name__icontains: act_query,
          is_redpine: true,
          ordering:'name',
          expand: 'genres,hometown.province'
        }).then((res) => {
          dispatch(actions.searchActsLoaded(res.results))
        })
      })
    }
  },

  createShow: (data) => {
    return (dispatch, getState, api) => {
      api.ready.then(() => {
        api.justTickets.create(data).then(() => {
          dispatch(appActions.success_message(constants.SHOW_CREATION_SUCCESS))
          if(data.organization){
            dispatch(push(paths.organizationCalendar(data.organization)))
          }else{
            dispatch(push(paths.myShows()))
          }
        }).catch((err) => {
          dispatch(errorMessage(err))
        })
      }).catch((err) => {
        dispatch(errorMessage(err))
      })
    }
  },

  actsLoading: () => {
    return {
      type: constants.ACTS_LOADING
    }
  },

  actsLoaded: (acts) => {
    return {
      type: constants.ACTS_LOADED,
      acts
    }
  },

  searchActsLoading: () => {
    return {
      type: constants.SEARCH_ACTS_LOADING
    }
  },

  searchActsLoaded: (acts) => {
    return {
      type: constants.SEARCH_ACTS_LOADED,
      acts
    }
  }
}

export default actions