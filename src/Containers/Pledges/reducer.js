import { fromJS } from 'immutable'

import constants from './constants'


export const initialState = fromJS({
  pledges_loading: false,
  campaigns_loading: false,
  pledges: null,
  campaigns: null,
})

export function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_PLEDGES_START:
      return state
        .set('pledges_loading', true)
        .set('campaigns_loading', true)

    case constants.PLEDGES_LOADED:
      return state
        .set('pledges', action.pledges)
        .set('pledges_loading', false)

    case constants.CAMPAIGNS_LOADED:
      let campaigns = {}
      action.campaigns.forEach((campaign) => {
        campaigns[campaign.id] = campaign
      })
      return state
        .set('campaigns', campaigns)
        .set('campaigns_loading', false)

    case constants.CANCEL_PLEDGE_SUCCESS:
      let pledges = state.get('pledges').reduce((nextPledges, curr) => {
        if (curr.id !== action.pledge.id)
          nextPledges.push(curr)

        return nextPledges
      }, [])
      return state
        .set('pledges', pledges)
      
    default:
      return state
  }
}

export default reducer