import { fromJS } from 'immutable'

export const initialState = fromJS({

})

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer