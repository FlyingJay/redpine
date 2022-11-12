class Act {
  constructor(act){
    this.act         = act
    this.id          = act ? (act.core_id ? act.core_id : act.id) : null
    this.name        = act ? act.name : ''
    this.short_bio   = act ? act.short_bio : '' 
    this.owner       = act ? act.owner : null 
    this.is_featured = act ? act.is_featured : false
    this.account_balance = act ? act.account_balance : 0.00
    
    this.organizations = act && act.organizations ? act.organizations : [] 

    this.has_organizations = this.organizations ? this.organizations.filter(organization_band => (organization_band.is_accepted || organization_band.is_application)).length > 0 : false
    this.is_organization_member = this.organizations ? this.organizations.filter(organization_band => (organization_band.is_accepted && organization_band.is_application)).length > 0 : false

    this.genres    = act && act.genres ? act.genres : [] 
    this.has_genre = this.genres ? (this.genres.length > 0) : false
    
    this.genre     = this.has_genre
                     ? (this.genres.find(genre => (genre.parents && genre.parents.length === 0)) || this.genres[0])
                     : null
    this.genre_string = this.has_genre
                        ? this.genres.map(genre => genre.name).join(" | ")
                        : 'Any'
    this.top_genre  = null

    this.picture    = act && act.picture ? act.picture : '/Assets/images/panel/brick-stage.jpg' 
    this.website    = act ? act.website : ''
    this.facebook   = act ? act.facebook : ''
    this.twitter    = act ? act.twitter : ''
    this.instagram  = act ? act.instagram : ''
    this.spotify    = act ? act.spotify : ''
    this.soundcloud = act ? act.soundcloud : ''
    this.bandcamp   = act ? act.bandcamp : ''
    this.youtube    = act ? act.youtube : ''

    this.hometown               = act ? act.hometown : null
    this.hometown_province      = this.hometown ? this.hometown.province : null 
    this.hometown_country       = this.hometown_province ? this.hometown_province.country : null 

    this.hometown_id            = this.hometown ? this.hometown.id : null 
    this.hometown_name          = this.hometown ? this.hometown.name : '' 
    this.hometown_province_name = this.hometown_province ? this.hometown_province.name : '' 
    this.hometown_country_name  = this.hometown_country ? this.hometown_country.name : '' 

    //Genre - City, Province
    this.subtitle = this.genre_name && this.hometown_name && this.hometown_province_name
                     ? `${this.genre_name} - ${this.hometown_name}, ${this.hometown_province_name}`
                     : this.genre_name && this.hometown_name
                       ? `${this.genre_name} - ${this.hometown_name}`
                       : this.hometown_name == null
                         ? this.genre_name
                         : this.hometown_name && this.hometown_province_name
                           ? `${this.hometown_name}, ${this.hometown_province_name}`
                           : this.hometown_name
    //Genre - City
    this.genre_hometown = this.genre_name && this.hometown_name
                          ? `${this.genre_name} - ${this.hometown_name}`
                          : this.genre_name
                            ? this.genre_name
                            : this.hometown_name
    
  }

  //Returns a shortened version of the show description.
  shortBio() {
    if(!this.act) return false

    return this.short_bio.substring(0, 150) + (this.short_bio.length > 150 ? '...' : '')
  }

  hasSocialLink() {
  	if(!this.act) return false

  	return (this.website || this.facebook || this.twitter || this.instagram || this.spotify || this.soundcloud || this.bandcamp || this.youtube)
  }

  //Returns whether or not a user is the act's owner.
  userIsOwner(user) {
    if(!user) return false
    if(!this.act) return false
    if(!this.owner) return false

    if(Number.isInteger(this.owner)){
      return (user.id == this.owner)
    }else{
      return (user.id == this.owner.id)
    }
  }
}

export function RP_Act(venue) {
  return new Act(venue)
}