const constants = {
  REDUCER_ROOT: 'settings',

  //ACTIONS
  UPDATE_USER: 'app/Settings/UPDATE_USER',
  REWARDS_LOADING: 'app/Settings/REWARDS_LOADING',
  PENDING_REWARDS_LOADED: 'app/Settings/PENDING_REWARDS_LOADED',
  EARNED_REWARDS_LOADED: 'app/Settings/EARNED_REWARDS_LOADED',

  //NOTIFICATIONS
  UPDATE_USER_SUCCESS: 'Your settings have been updated.',
  PAYMENT_REQUEST_SUCCESS: 'Your payment request has been submitted.  You will recieve an e-transfer by e-mail once it has been reviewed.',

  UPDATE_USER_ERROR: 'Failed to update your settings. If this problem persists, please contact RedPine so that we may address it as quickly as possible!',
  PAYMENT_REQUEST_ERROR: 'Your payment request failed, but no money has been taken from your account. If this problem persists, please contact RedPine so we can make sure you get it!'
}

export default constants