import { RP_User } from 'Models'

class Organization {
	constructor(organization){
		//STATIC PROPERTIES
		this.organization     = organization
		this.id               = organization ? organization.id : null
		this.title            = organization ? organization.title : ''
		this.picture          = organization ? (organization.picture ? organization.picture : '/Assets/images/defaults/defaultVenue.png') : null
    this.badge            = organization ? (organization.badge ? organization.badge : '/Assets/images/defaults/badge.png') : null
		this.description      = organization ? organization.description : ''
    this.managers         = organization ? organization.managers : []
    this.bands            = organization ? organization.bands : []
    this.account_balance  = organization ? organization.account_balance : 0.00

		this.location         = organization ? organization.location : null 
		this.address          = organization ? organization.address : '' 
		this.postal_code      = organization ? (organization.postal_code && organization.postal_code.toUpperCase()) : '' 
		this.city             = organization ? organization.city : null 
		this.province         = this.city ? this.city.province : null 
		this.country          = this.province ? this.province.country : null 

		this.city_name        = this.city ? this.city.name : '' 
		this.province_name    = this.province ? this.province.name : '' 
		this.country_name     = this.country ? this.country.name : '' 
		this.address_string   = `${this.address}. ${this.city_name}, ${this.province_name}. ${this.country_name}. ${this.postal_code}`

    this.manager  = this.managers ? (this.managers.length > 0 ? this.managers[0] : null) : null
    this._Manager = Number.isInteger(this.manager) ? RP_User({id:this.manager}) : RP_User(this.manager)
	}

  //Returns whether or not a user is an organization manager
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

  confirmed_acts(organization_bands=false){
    let acts = []
    this.bands.forEach(organization_band => {
      if(organization_band.is_accepted && organization_band.is_application){
        if(organization_bands){
          acts.push(organization_band)
        }else{
          acts.push(organization_band.band)
        } 
      }
    })
    
    return acts
  }
}

export function RP_Organization(organization) {
  return new Organization(organization)
}