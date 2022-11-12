import { RP_Act } from 'Models'

class Tour {
  constructor(tour){
    //STATIC PROPERTIES
    this.tour      = tour
    this.id        = tour ? tour.id : null
    this.title     = tour ? tour.title : ''
    this.headliner = tour ? tour.headliner : null
    this.campaigns = tour ? tour.campaigns : []

    this._Headliner = Number.isInteger(this.headliner) ? RP_Act({id:this.headliner}) : RP_Act(this.headliner)
  }

  //COMPUTED PROPERTIES
  venues(){
    if (!this.tour) return []
    if (!this.campaigns) return []

    return this.campaigns.map(campaign => campaign.timeslot.venue)
  }

  locations(){
    if (!this.tour) return []
    if (!this.campaigns) return []

    return this.campaigns.map(campaign => {
      const location = campaign.timeslot.venue.location
      return {
        latitude: location ? location.latitude : null,
        longitude: location ? location.longitude : null
      }
    })
  }
}

export function RP_Tour(tour) {
  return new Tour(tour)
}