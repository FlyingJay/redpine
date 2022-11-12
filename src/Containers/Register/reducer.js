import { fromJS } from 'immutable'


export const initialState = fromJS({})

export function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default reducer