export const context = (state) => {
  return state.show
}
export const selectCampaign = (state) => {
  return context(state).get('campaign')
}
export const selectCampaignLoading = (state) => {
  return context(state).get('campaign_loading')
}
export const selectPurchaseOptions = (state) => {
  return context(state).get('purchase_options')
}
export const selectPledges = (state) => {
  return context(state).get('pledges')
}
export const selectPledgeError = (state) => {
  return context(state).get('pledgeError')
}
export const selectPledgeLock = (state) => {
  return context(state).get('pledgeLock')
}
export const selectUserActs = (state) => {
  return context(state).get('user_acts')
}
export const selectUserActsLoading = (state) => {
  return context(state).get('user_acts_loading')
}
export const selectPromoter = (state) => {
  return context(state).get('promoter')
}
export default {
  selectCampaign,
  selectCampaignLoading,
  selectPurchaseOptions,
  selectPledges,
  selectPledgeError,
  selectPledgeLock,
  selectUserActs,
  selectUserActsLoading,
  selectPromoter
}