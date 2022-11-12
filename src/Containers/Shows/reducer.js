import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  campaigns_loading: false,
  campaigns: null,
  error: null
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_SHOWS_START:
      return state
        .set('campaigns_loading', true)

    case constants.SHOWS_LOADED:
      //Unique ids
      const shows = (action.campaigns || []).filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
      return state
        .set('campaigns', shows)
        .set('campaigns_loading', false)

    case constants.SHOW_ERROR:
      return state
        .set('error', action.error) 

    default:
      return state
  }
}

export default reducer