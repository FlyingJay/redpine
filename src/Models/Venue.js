import moment from 'moment'

import { RP_User } from 'Models'

class Venue {
	constructor(venue){
     //STATIC PROPERTIES
    this.is_only_tickets = venue ? venue.is_only_tickets : false

    this.venue            = venue
    this.id               = venue ? venue.id : null
    this.title            = venue ? venue.title : 'Venue'
    this.managers         = venue ? venue.managers : []
    
    this.picture          = venue ? (venue.picture ? venue.picture : '/Assets/images/defaults/defaultVenue.png') : null
    this.description      = venue ? venue.description : ''
    this.currency         = venue ? (this.is_only_tickets ? 'cad' : venue.currency) : null
    this.capacity         = venue ? (this.is_only_tickets ? Number.MAX_SAFE_INTEGER : venue.capacity) : null
    this.before_booking_info = venue ? venue.before_booking_info : ''

    this.location         = venue ? venue.location : null 
    this.address          = venue ? venue.address : '' 
    this.postal_code      = venue ? (venue.postal_code && venue.postal_code.toUpperCase()) : '' 
    this.city             = venue ? venue.city : null 
    this.province         = this.city ? this.city.province : null 
    this.country          = this.province ? this.province.country : null 
    
    this.city_name        = this.city ? this.city.name : '' 
    this.province_name    = this.province ? this.province.name : '' 
    this.country_name     = this.country ? this.country.name : '' 

    //City, Province
    this.city_province_string = this.city_name && this.province_name
                                ? `${this.city_name}, ${this.province_name}`
                                : this.city_name
                                  ? this.city_name
                                  : ''

    this.address_string   = this.address && this.city_name
                            ? `${this.address}. ${this.city_name}, ${this.province_name}. ${this.country_name}. ${this.postal_code}`
                            : this.city_name
                              ? `${this.city_name}, ${this.province_name}. ${this.country_name}. ${this.postal_code}`
                              : this.address

    this.genres              = venue && venue.genres ? venue.genres : [] 
    this.has_preferred_genre = this.genres ? (this.genres.length > 0) : false
    
    this.genre      = this.has_preferred_genre
                      ? (this.genres.find(genre => (genre.parents && genre.parents.length === 0)) || this.genres[0])
                      : null

    this.genre_string = this.has_preferred_genre
                        ? (this.genres || []).length < 5
                          ? this.genres.map(genre => genre.name).join(" | ")
                          : this.genres.filter(genre => !(genre.parents || []).length).slice(0,4).map(genre => genre.name).join(", ") + ' ...'
                        : 'Any'

    this.reviews_by_bands = venue ? venue.reviews_by_bands : []

    this.has_fast_reply         = venue ? venue.has_fast_reply : false
    this.is_non_redpine_default = venue ? venue.is_non_redpine_default : false
    this.is_promotion           = venue ? venue.is_promotion : false

    this.has_wifi                 = venue ? venue.has_wifi : false
    this.is_accessible_by_transit = venue ? venue.is_accessible_by_transit : false
    this.has_atm_nearby           = venue ? venue.has_atm_nearby : false
    this.has_free_parking_nearby  = venue ? venue.has_free_parking_nearby : false
    this.has_paid_parking_nearby  = venue ? venue.has_paid_parking_nearby : false
    this.is_wheelchair_friendly   = venue ? venue.is_wheelchair_friendly : false
    this.allows_smoking           = venue ? venue.allows_smoking : false
    this.allows_all_ages          = venue ? venue.allows_all_ages : false
    this.has_stage                = venue ? venue.has_stage : false
    this.has_microphones          = venue ? venue.has_microphones : false
    this.has_drum_kit             = venue ? venue.has_drum_kit : false
    this.has_piano                = venue ? venue.has_piano : false
    this.has_wires_and_cables     = venue ? venue.has_wires_and_cables : false
    this.has_soundtech            = venue ? venue.has_soundtech : false
    this.has_lighting             = venue ? venue.has_lighting : false
    this.has_drink_tickets        = venue ? venue.has_drink_tickets : false
    this.has_meal_vouchers        = venue ? venue.has_meal_vouchers : false
    this.has_merch_space          = venue ? venue.has_merch_space : false
    this.has_cash_box             = venue ? venue.has_cash_box : false
    this.has_float_cash           = venue ? venue.has_float_cash : false

    this.website    = venue ? venue.website : null
    this.facebook   = venue ? venue.facebook : null
    this.twitter    = venue ? venue.twitter : null
    this.instagram  = venue ? venue.instagram : null
    this.spotify    = venue ? venue.spotify : null
    this.soundcloud = venue ? venue.soundcloud : null
    this.bandcamp   = venue ? venue.bandcamp : null
    this.youtube    = venue ? venue.youtube : null

    this.manager  = this.managers ? (this.managers.length > 0 ? this.managers[0] : null) : null
    this._Manager = Number.isInteger(this.manager) ? RP_User({id:this.manager}) : RP_User(this.manager)
	}

  //COMPUTED PROPERTIES
  hasReviews() {
    if(!this.venue) return false

    return (this.reviews_by_bands.length > 0)
  }

  //Returns whether or not a user is a venue manager
  userIsManager(user) {
    if(!user) return false

    const user_id = user && user.id || null
    let is_manager = false
    this.managers.forEach(manager => {
      //Sometimes we get ids instead of objects.
      Number.isInteger(manager)
      ? manager == user_id
        ? is_manager = true
        : null
      : manager.manager && (manager.manager.id == user_id)
        ? is_manager = true
        : null
    })
    return is_manager
  }
}

export function RP_Venue(venue) {
  return new Venue(venue)
}