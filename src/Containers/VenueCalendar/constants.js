const constants = {
  REDUCER_ROOT: 'venueCalendar',

  //ACTIONS
  VENUE_LOADED: 'app/venueCalendar/VENUE_LOADED',
  DATES_LOADING: 'app/venueCalendar/DATES_LOADING',
  CAMPAIGNS_LOADED: 'app/venueCalendar/CAMPAIGNS_LOADED',
  OPENINGS_LOADED: 'app/venueCalendar/OPENINGS_LOADED',

  //NOTIFICATIONS
  OPENING_CREATED_SUCCESS: 'Opening created successfully.',
  OPENING_UPDATED_SUCCESS: 'Opening updated successfully.',
  OPENING_REMOVED_SUCCESS: 'Opening removed successfully.',

  EVENT_CREATED_SUCCESS: 'Event created successfully.',
  EVENT_UPDATED_SUCCESS: 'Event updated successfully.',
  EVENT_REMOVED_SUCCESS: 'Event removed successfully.',

  SHOW_CREATED_SUCCESS: 'Show(s) created successfully.',

  //ERRORS
  PLEASE_ADD_TITLE: 'Please add a title.',
  PLEASE_CHOOSE_DATE: 'Please choose a date.',
  DETAILS_MAX_LENGTH_2000: 'Extra details should be less than 2000 characters.',
  PLEASE_ADD_TICKET_PRICE: 'Please pick a valid ticket price.',
  FREQUENCY_MUST_BE_NUMBER: 'Please specify a number of events to create.'
}

export default constants