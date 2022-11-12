const constants = {
	REDUCER_ROOT: 'tours',

	//ACTIONS
	LOAD_TOURS_START: 'app/Tours/LOAD_TOURS_START',
	TOURS_LOADED: 'app/Tours/TOURS_LOADED',
	ACT_LOADED: 'app/Tours/ACT_LOADED',

	TOUR_CREATED_SUCCESS: 'Tour created. To see it in your account, just add your first show!',
	SHOW_REMOVED_SUCCESS: 'The show was removed from the tour, but not deleted. If you created the show, you may delete it from My Shows.',

	//ERRORS
	TOUR_CREATED_ERROR: 'There was a problem creating the tour! If this issue persists, please contact us and we\'ll be sure to help you out.',
	SHOW_REMOVED_ERROR: 'There was a problem removing the show! If this issue persists, please contact us and we\'ll be sure to help you out.'
}

export default constants