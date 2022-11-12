import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  organization: null,
  campaigns: null,
  stats_loading: false
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {

    case consts.LOAD_STATS_START:
      return state
        .set('stats_loading', true)

    case consts.ORGANIZATION_LOADED:
      return state
        .set('organization', action.organization)

    case consts.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)
        .set('stats_loading', false)

    default:
      return state
  }
}

export default reducer