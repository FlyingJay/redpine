import { fromJS } from 'immutable'
import consts from './constants'

export const initialState = fromJS({
  band: null,
  band_loading: false,
  campaigns: null,
  related_bands: null,
})

export const reducer = function (state = initialState, action) {
  switch (action.type) {
    case consts.ACT_LOADED:
      return state
        .set('band', action.act)
        .set('band_loading', false)

    case consts.ACT_LOADING:
      return state
        .set('band_loading', true)

    case consts.CAMPAIGNS_LOADED:
      return state
        .set('campaigns', action.campaigns)

    case consts.RELATED_ACTS_LOADED:
      return state
        .set('related_bands', action.acts)

    default:
      return state
  }
}

export default reducer