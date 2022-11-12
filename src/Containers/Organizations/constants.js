const constants = {
  REDUCER_ROOT: 'organizations',

  //ACTIONS
  LOAD_DATA_START: 'app/Organizations/LOAD_DATA_START',
  ACTIVE_CAMPAIGNS_LOADED: 'app/Organizations/ACTIVE_CAMPAIGNS_LOADED',
  ORGANIZATIONS_LOADED: 'app/Organizations/ORGANIZATIONS_LOADED',
  ORGANIZATION_UPDATED: 'app/Organizations/ORGANIZATION_UPDATED',
  SEARCH_ACTS_START: 'app/Organizations/SEARCH_ACTS_START',
  SEARCH_ACTS_LOADED: 'app/Organizations/SEARCH_ACTS_LOADED',
  ORGANIZATION_ERROR: 'app/Organizations/ORGANIZATION_ERROR',
  USER_ACTS_LOADING: 'app/Organizations/USER_ACTS_LOADING',
  USER_ACTS_LOADED: 'app/Organizations/USER_ACTS_LOADED',
  VERIFY_ACTS_LOADING: 'app/Organizations/VERIFY_ACTS_LOADING',
  VERIFY_ACTS_LOADED: 'app/Organizations/VERIFY_ACTS_LOADED',
  CAMPAIGN_BANDS_ADDED: 'app/Organizations/CAMPAIGN_BANDS_ADDED',

  //NOTIFICATIONS
  ORGANIZATION_CREATED_SUCCESS: 'Organization created.',
  ORGANIZATION_UPDATED_SUCCESS: 'Organization updated.',
  ORGANIZATION_MEMBERSHIP_CONFIRMED_SUCCESS: 'Act confirmed.',
  ORGANIZATION_MEMBERSHIP_DENIED_SUCCESS: 'Act denied.',
  PAYMENT_REQUEST_SUCCESS: 'Your payment request has been submitted.  You will recieve an e-transfer by e-mail once it has been reviewed.',
  PAYMENT_REQUEST_ERROR: 'Your payment request failed, but no money has been taken from your account. If this problem persists, please contact RedPine so we can make sure you get it!',
  ORGANIZATION_CREATED_ERROR: 'Organization creation failed. If this problem persists, please let us know!',
  ORGANIZATION_UPDATED_ERROR: 'Organization update failed. If this problem persists, please let us know!',
  ACTS_PAID_SUCCESS: 'The acts have been paid.',
  ACTS_PAID_ERROR: 'Couldn\'t pay acts. If this problem persists, please let us know!',
  ACT_REMOVED_SUCCESS: 'Act removed.',
  ACTS_ADDED_SUCCESS: 'Act(s) added.'
}

export default constants