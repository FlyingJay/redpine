const notifications = {

	NEW_DETAILS: (campaign,data) => {
    return 'User changed the details for the show!  '
						+ ((data.title && (data.title != campaign.title)) ? 'Title was changed.  ' : '')
						+ (data.picture ? 'The picture was changed.  ' : '')
						+ ((data.hashtag && (data.hashtag != campaign.hashtag)) ? 'Hashtag was changed.  ' : '')
						+ ((data.description && (data.description != campaign.description)) ? 'Description was changed.  ' : '')
						+ ((data.funding_end && (data.funding_end != campaign.funding_end)) ? 'The last day for tickets was changed.  ' : '')
						+ (data.is_open === false ? 'The lineup has been finalized.  ' : '')
	},

	NEW_DATE: (timeslot,data) => {
    return 'User changed the date/time for the show!  '
    				+ ((data.start_time && (data.start_time != timeslot.start_time)) ? 'Start date/time was changed.  ' : '')
    				+ ((data.end_time && (data.end_time != timeslot.end_time)) ? 'End date/time was changed.  ' : '')
	},

	NEW_REQUIREMENTS: (timeslot,data) => {
    return 'Venue changed the show requirements!  '
    				+ ((data.asking_price && (data.asking_price != timeslot.asking_price)) ? 'The funding requirement was changed.  ' : '')
    				+ ((data.min_headcount && (data.min_headcount != timeslot.min_headcount)) ? 'The headcount requirement was changed.  ' : '')
	},

	NEW_ACTS: (new_acts) => {
		let text = 'New acts were added! Pending confirmation: '

	    new_acts.forEach((act,i) => {
	      text += act.name 
	      text += (i+1 == new_acts.length ? '.' : ', ')
	    })
	    return text
	},

	REMOVED_ACT: (campaign_band,was_removed) => {
		let removed_text = campaign_band.band.name + ' was removed from the show.'
		let quit_text	 = campaign_band.band.name + ' has quit the show.'
		
		return was_removed ? removed_text : quit_text
	},

	HEADLINER_CHANGED: (campaign_band) => {
		return (campaign_band.band.name + (campaign_band.is_headliner ? ' is no longer the headliner.' : ' is now the headliner.'))
	},

	ACT_START_CHANGED: (campaign_band) => {
		return (campaign_band.band.name +  '\'s set time was changed.')
	},

	ACT_APPLICATION_APPROVED: (campaign_band) => {
		return (campaign_band.band.name +  '\'s application to play was approved by the organizer.')
	},                    

	ACT_APPLICATION_REJECTED: (campaign_band) => {
		return (campaign_band.band.name +  '\'s application to play was rejected by the organizer.')
	},

	ACT_CONFIRMED: (campaign_band) => {
		return (campaign_band.band.name +  ' has confirmed that they will be playing.')
	},                    

	ACT_REJECTED: (campaign_band) => {
		return (campaign_band.band.name +  ' has rejected the offer to play.')
	},

	NEW_PURCHASES: (new_items) => {
    let text = 'Purchase options were added!  They are: '

    new_items.forEach((item,i) => {
      text += item.name 
      text += ' ($' + item.price + ')' 
      text += (i+1 == new_items.length ? '.' : ', ')
    })
    return text
  }
}

export default notifications