const constants = {
  REDUCER_ROOT: 'pledges',

  //ACTIONS
  LOAD_PLEDGES_START: 'redpine/Pledges/LOAD_PLEDGES_START',
  PLEDGES_LOADED: 'redpine/Pledges/PLEDGES_LOADED',
  CAMPAIGNS_LOADED: 'redpine/Pledges/CAMPAIGNS_LOADED',
  CANCEL_PLEDGE_START: 'redpine/Pledges/CANCEL_PLEDGE_START',
  CANCEL_PLEDGE_FAILURE: 'redpine/Pledges/CANCEL_PLEDGE_FAILURE',
  CANCEL_PLEDGE_SUCCESS: 'redpine/Pledges/CANCEL_PLEDGE_SUCCESS',

  //NOTIFICATIONS
  PLEDGE_DELETED_SUCCESS: 'Pledge cancelled successfully.',

  PLEDGE_DELETED_ERROR: 'Pledge cancellation failed. If this problem persists, please contact RedPine so that we may address it as quickly as possible!',
}

export default constants