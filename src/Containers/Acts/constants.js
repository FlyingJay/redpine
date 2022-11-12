const constants = {
  REDUCER_ROOT: 'acts',

  //ACTIONS
  LOAD_BANDS_START: 'app/acts/LOAD_BANDS_START',
  BANDS_LOADED: 'app/acts/BANDS_LOADED',
  BAND_SAVED: 'app/acts/BAND_SAVED',
  BAND_UPDATED: 'app/acts/BAND_UPDATED',
  BAND_ERROR: 'app/acts/BAND_ERROR',
  SET_ACTIVE_ACT: 'app/acts/SET_ACTIVE_ACT',

  //NOTIFICATIONS
  BAND_CREATED_SUCCESS: 'Act created successfully.',
  BAND_UPDATED_SUCCESS: 'Act updated successfully.',
  ORGANIZATION_MEMBERSHIP_CONFIRMED_SUCCESS: 'Organization membership confirmed.',
  ORGANIZATION_MEMBERSHIP_DENIED_SUCCESS: 'Organization membership denied.',
  ORGANIZATION_REMOVED_SUCCESS: 'Organization membership removed.',
  TRACK_ADDED_SUCCESS: 'Track added.',
  TRACK_REMOVED_SUCCESS: 'Track removed.',
  PAYMENT_REQUEST_SUCCESS: 'Your payment request has been submitted.  You will recieve an e-transfer by e-mail once it has been reviewed.',

  BAND_CREATED_ERROR: 'Act creation failed. If this problem persists, please contact RedPine so that we may address it as quickly as possible!',
  BAND_UPDATED_ERROR: 'Act update failed. If this problem persists, please contact RedPine so that we may address it as quickly as possible!',
  TRACK_ADDED_ERROR: 'Couldn\'t add track. If this problem persists, please contact RedPine so that we may address it as quickly as possible!',
  TRACK_REMOVED_ERROR: 'Couldn\'t remove track. If this problem persists, please contact RedPine so that we may address it as quickly as possible!',
  PAYMENT_REQUEST_ERROR: 'Your payment request failed, but no money has been taken from your account. If this problem persists, please contact RedPine so we can make sure you get it!'
}

export default constants
