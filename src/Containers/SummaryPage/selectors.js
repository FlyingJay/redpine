import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}

const selectors = {
  selectCampaigns: (state, props) => {
    return c(state, props).get('campaigns')
  },
  selectBandCampaigns: (state, props) => {
    return c(state, props).get('band_campaigns')
  },
  selectVenueCampaigns: (state, props) => {
    return c(state, props).get('venue_campaigns')
  },
  selectTimeslots: (state, props) => {
    return c(state, props).get('timeslots')
  },
  selectPledges: (state, props) => {
    return c(state, props).get('pledges')
  },
  selectBandPledges: (state, props) => {
    return c(state, props).get('band_pledges')
  },
  selectBand: (state, props) => {
    return c(state, props).get('band')
  },
  selectVenue: (state, props) => {
    return c(state, props).get('venue')
  },
  selectRelatedBands: (state, props) => {
    return c(state, props).get('related_bands')
  }
}

export default selectors