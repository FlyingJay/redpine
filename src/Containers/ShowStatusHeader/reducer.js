import {fromJS} from 'immutable'

import { RP_Tour } from 'Models'

import constants from './constants'

export const initialState = fromJS({
  is_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.LOADING:
      return state
        .set('is_loading', true) 
    case constants.LOADED:
      return state
        .set('is_loading', false)    
    default:
      return state
  }
}

export default reducer