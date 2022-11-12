import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectBand: (state, props) => {
    return c(state, props).get('band')
  },
  selectBandLoading: (state, props) => {
    return c(state, props).get('band_loading')
  },
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  },
  selectRelatedBands: (state, props) => {
    return c(state, props).get('related_bands')
  },
}

export default selectors
