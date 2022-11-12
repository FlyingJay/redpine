
class User {
	constructor(user){
     //STATIC PROPERTIES
		this.user = user
    this.id   = user ? user.id : null

    this.email   = user ? user.email : null
    this.profile = user ? user.profile : null

    this.first_name = user ? user.first_name : null
    this.last_name  = user ? user.last_name : null
    this.full_name  = user ? user.first_name && user.last_name
                             ? `${user.first_name} ${user.last_name}`
                             : user.first_name
                               ? user.first_name
                               : ''
                           : ''

    this.picture = this.profile ? this.profile.picture : false

    //Artist subscription level
    this.is_artist          = this.profile ? this.profile.is_artist : false
    this.is_member_artist   = this.profile ? this.profile.is_member_artist : false
    this.is_ultimate_artist = this.profile ? this.profile.is_ultimate_artist : false

    //Venue subscription level
    this.is_venue           = this.profile ? this.profile.is_venue : false
    this.is_member_venue    = this.profile ? this.profile.is_member_venue : false
    this.is_ultimate_venue  = this.profile ? this.profile.is_ultimate_venue : false

    //Organization subscription level
    this.is_member_organizer  = this.profile ? this.profile.is_member_organizer : false

    //Fan Welcome Tasks
    this.welcome_add_profile_pic         = this.profile ? this.profile.welcome_add_profile_pic : false
    this.welcome_view_my_tickets         = this.profile ? this.profile.welcome_view_my_tickets : false

    //Artist Welcome Tasks
    this.welcome_create_act              = this.profile ? this.profile.welcome_create_act : false
    this.welcome_add_act_socials         = this.profile ? this.profile.welcome_add_act_socials : false
    this.welcome_submit_booking_request  = this.profile ? this.profile.welcome_submit_booking_request : false

    //Venue Welcome Tasks
    this.welcome_create_venue            = this.profile ? this.profile.welcome_create_venue : false
    this.welcome_check_calendar          = this.profile ? this.profile.welcome_check_calendar : false
    this.welcome_add_event               = this.profile ? this.profile.welcome_add_event : false
    this.welcome_approve_booking_request = this.profile ? this.profile.welcome_approve_booking_request : false
	}
}

export function RP_User(user) {
  return new User(user)
}