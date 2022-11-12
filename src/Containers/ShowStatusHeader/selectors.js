import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  selectIsLoading: (state, props) => {
    return c(state, props).get('is_loading')
  }
}
	
export default selectors