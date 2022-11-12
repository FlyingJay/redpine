import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({

})

export const reducer = function (state = initialState, action) {
  switch (action.type) {

    default:
      return state
  }
}

export default reducer