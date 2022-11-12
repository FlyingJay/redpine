import Decimal from 'decimal.js'
import moment from 'moment'

import { paths } from 'globals'
import { RP_Venue, RP_Act, RP_Organization } from 'Models'

import { CAMPAIGN_FUNDING_TYPE, CAMPAIGN_STATUS } from 'enums'


class Campaign {
  constructor(campaign) {
    //STATIC PROPERTIES
    this.campaign            = campaign
    this.id                  = campaign ? campaign.id : null
    this.is_featured         = campaign ? campaign.is_featured : false
    this.title               = campaign ? campaign.title : ''
    this.bands               = campaign ? campaign.bands : []
    this.organizations       = campaign ? campaign.organizations : []
    this.description         = campaign ? campaign.description : ''
    this.tickets_sold        = campaign ? campaign.tickets_sold : 0
    this.total_earned        = campaign ? campaign.total_earned : 0
    this.service_fee         = campaign ? campaign.service_fee : 0.00
    this.timeslot            = campaign ? campaign.timeslot : null
    this.is_hold             = campaign ? campaign.is_hold : false
    this.is_open             = campaign ? campaign.is_open : false
    this.is_open_mic         = campaign ? campaign.is_open_mic : false
    this.is_redpine_approved = campaign ? campaign.is_redpine_approved : null
    this.is_venue_approved   = campaign ? campaign.is_venue_approved : null
    this.funding_end         = campaign ? campaign.funding_end : new Date()
    this.is_only_tickets     = campaign ? campaign.is_only_tickets : false
    this.third_party_tickets = campaign ? campaign.third_party_tickets : null
    this.promoter_cut        = campaign ? campaign.promoter_cut : 0.00
    
    this.facebook_event      = campaign ? campaign.facebook_event : ''
    this.discuss_doors       = campaign ? campaign.discuss_doors : ''
    this.discuss_sound       = campaign ? campaign.discuss_sound : ''
    this.discuss_equipment   = campaign ? campaign.discuss_equipment : ''

    this.event_start         = this.timeslot ? this.timeslot.start_time : new Date()
    this.event_end           = this.timeslot ? this.timeslot.end_time : new Date()
    this.venue               = this.timeslot ? this.timeslot.venue : null
    this.venue_name          = campaign ? campaign.venue_name : 'A Non-RedPine Venue'

    this._Venue            = Number.isInteger(this.venue) ? RP_Venue({id:this.venue}) : RP_Venue(this.venue)

    this.has_acts          = this.bands         ? (this.bands.length > 0)         : false
    this.has_organizations = this.organizations ? (this.organizations.length > 0) : false
    this.has_venue         = this.venue         ? true : false

    this.has_picture = campaign && campaign.picture === null
    this.picture = campaign && campaign.picture !== null 
                   ? campaign.picture 
                   : this.is_open_mic
                     ? '/Assets/images/defaults/microphone2.jpg'
                     : '/Assets/images/defaults/microphone.jpg'
  }

  //COMPUTED PROPERTIES
  //Returns whether or not a show has all zero goals - making it a non-crowdfunded show.
  //Phase this out
  isTraditional(){
    if(!this.campaign) return false

    const timeslot      = this.campaign.timeslot || null
    const asking_price  = timeslot && timeslot.asking_price || 0
    const min_headcount = timeslot && timeslot.min_headcount || 0

    return (asking_price == 0 && min_headcount == 0)
  }

  //Returns whether or not a given show is crowdfunded.
  //Phase this out
  isCrowdfunded() {
    if(this.campaign == null) return false

    return !(this.isTraditional() || this.campaign.is_only_tickets)
  }

  isHold(){
    if(this.campaign == null) return false

    return (this.campaign.is_hold && !this.campaign.is_venue_approved)
  }

  //Returns campaign progress
  progress() {
    if(!this.campaign) return 0
    if(!this.is_venue_approved) return 0

    if(!this.isCrowdfunded()) return 100

    const timeslot      = this.campaign && this.campaign.timeslot || null
    const goal_count    = new Decimal(timeslot && timeslot.min_headcount || 0)
    const goal_amount   = new Decimal(timeslot && timeslot.asking_price || 0)
    const tickets_sold  = new Decimal(this.campaign && this.campaign.tickets_sold || 0)
    const total_earned  = new Decimal(this.campaign && this.campaign.total_earned || 0)

    const funding_progress   = goal_amount == 0 ? 100 : parseInt(total_earned.div(goal_amount).mul(new Decimal('100')))
    const headcount_progress =  goal_count == 0 ? 100 : parseInt(tickets_sold.div(goal_count).mul(new Decimal('100')))

    switch (this.campaign.funding_type) {
      case CAMPAIGN_FUNDING_TYPE.GOAL_AMOUNT:
        return funding_progress

      case CAMPAIGN_FUNDING_TYPE.GOAL_COUNT:
        return headcount_progress

      case CAMPAIGN_FUNDING_TYPE.HYBRID:
        return this.campaign.is_successful
               ? Math.max(funding_progress,headcount_progress)
               : Math.min(funding_progress,headcount_progress)
    }
  }

  //Returns whether or not a show has reached it's goal.
  //Phase this out
  isSuccess() {
    return (this.progress() >= 100)
  }

  //Returns whether or not tickets are available for purchase.
  isSelling(){
    if(!this.campaign) return false

    return moment(this.funding_end).isAfter(moment(Date.now()))
  }

  //Returns the show's current status.
  status() {
    if(this.campaign == null) return null

    const isApproved = this.is_venue_approved
    const isPending  = (this.is_venue_approved == null)
    const isSuccess  = this.isSuccess()
    const isSelling  = this.isSelling()

    return isPending
           ? isSelling
             ? CAMPAIGN_STATUS.PENDING_APPROVAL
             : CAMPAIGN_STATUS.PENDING_FOREVER
           : isApproved
             ? isSuccess
               ? isSelling
                 ? CAMPAIGN_STATUS.SUCCESSFUL
                 : CAMPAIGN_STATUS.FINISHED
               : isSelling
                 ? CAMPAIGN_STATUS.IN_PROGRESS
                 : CAMPAIGN_STATUS.FAILED
             : CAMPAIGN_STATUS.REJECTED
  }

  //Returns the amount of time remaining to purchase tickets. (string)
  timeRemaining() {
    if(!this.campaign) return null

    const start       = moment()
    const end         = moment(this.funding_end)
    const diffDays    = end.diff(start, 'days')
    const diffHours   = end.diff(start, 'hours')
    const diffMinutes = end.diff(start, 'minutes')
    const diffSeconds = end.diff(start, 'seconds')

    if (diffDays == 1) return `${diffDays} Day`
    if (diffDays > 1) return `${diffDays} Days`

    if (diffHours === 1) return `${diffHours} Hour`
    if (diffHours > 1) return `${diffHours} Hours`

    if (diffMinutes === 1) return `${diffMinutes} Minute`
    if (diffMinutes > 1) return `${diffMinutes} Minutes`

    if (diffSeconds > 0) return `${diffSeconds} Seconds`

    return `Completed`
  }

  //Returns a shortened version of the show description.
  shortDescription() {
    if(!this.campaign) return false

    return this.description.substring(0, 150) + (this.description.length > 150 ? '...' : '')
  }

  //Returns whether or not a user is the show's owner.
  userIsOwner(user) {
    if(!user) return false
    if(!this.campaign) return false

    return (user.id == this.campaign.created_by)
  }

  //Returns whether or not a user is an act's owner.
  userIsActOwner(user) {
    if(!user) return false
    if(!this.campaign) return false

    let isOwner = false
    this.bands.forEach(campaign_band => {
      const owner = campaign_band.band.owner
      if(owner == user.id){
        isOwner = true
      }
      else if(owner && owner.id == user.id){
        isOwner = true
      }
    })
    return isOwner
  }

  //Returns whether or not a user is an approved act's owner.
  userIsApprovedActOwner(user) {
    if(!user) return false
    if(!this.campaign) return false

    let isOwner = false
    this.bands.forEach(campaign_band => {
      const owner = campaign_band.band.owner
      const is_approved = campaign_band.is_application
      if(owner == user.id && is_approved){
        isOwner = true
      }
      else if(owner && owner.id == user.id && is_approved){
        isOwner = true
      }
    })
    return isOwner
  }

  //Returns whether or not a user is a manager for the venue.
  userIsVenueManager(user){
    if(!user) return false
    if(!this.campaign) return false

    const timeslot = this.campaign.timeslot || null
    const venue    = timeslot && timeslot.venue || null
    const managers = venue && venue.managers || []

    let isManager = false
    managers.forEach(manager => {
      if(manager == user.id){
        isManager = true
      }
      else if(manager.id == user.id){
        isManager = true
      }
      else if(manager.manager && manager.manager.id == user.id){
        isManager = true
      }
    })
    return isManager
  }

  //Returns whether or not a user is a member of an organization.
  userIsOrganizationManager(user){
    if(!user) return false
    if(!this.campaign) return false
      
    let isManager = false
    this.organizations.forEach(campaign_organization => {
      const managers = campaign_organization.organization.managers || []

      managers.forEach(manager => {
        if(manager == user.id){
          isManager = true
        } 
        else if(manager.id == user.id){
          isManager = true
        } 
        else if(manager.manager && manager.manager.id == user.id){
          isManager = true
        } 
      })
    })

    return isManager
  }  

  //Returns whether or not the user has an open invitation to the show.
  hasOpenInviteToUserAct(user){
    if(!user) return false

    const acts    = this.campaign && this.campaign.bands || []
    const user_id = user && user.id || null

    let has_open_invite = false
    acts.forEach(campaignBand => {
      campaignBand.is_accepted == null
      ? Number.isInteger(campaignBand.band.owner)
        ? campaignBand.band.owner == user_id
          ? has_open_invite = true
          : null
        : campaignBand.band.owner && (campaignBand.band.owner.id == user_id)
          ? has_open_invite = true
          : null
      : null
    })
    return has_open_invite
  }

  //Returns the first open invite to the show, if one of the user's acts was invited.
  firstOpenInviteToUserAct(user){
    if(!user) return null

    const acts    = this.campaign && this.campaign.bands || []
    const user_id = user && user.id || null

    let open_invite = null
    acts.forEach(campaignBand => {
      if (campaignBand.is_accepted === null) {
        Number.isInteger(campaignBand.band.owner)
        ? campaignBand.band.owner == user_id
          ? open_invite = campaignBand
          : null
        : campaignBand.band.owner && (campaignBand.band.owner.id == user_id)
          ? open_invite = campaignBand
          : null
      }
    })
    return open_invite
  }

  //Returns whether or not the user has an act with a pending application to the show.
  hasOpenApplicationFromUserAct(user){
    if(!user) return false

    const acts    = this.campaign && this.campaign.bands || []
    const user_id = user && user.id || null

    let has_open_application = false
    acts.forEach(campaignBand => {
      campaignBand.is_application == null
      ? Number.isInteger(campaignBand.band.owner)
        ? campaignBand.band.owner == user_id
          ? has_open_application = true
          : null
        : campaignBand.band.owner && (campaignBand.band.owner.id == user_id)
          ? has_open_application = true
          : null
      : null
    })
    return has_open_application
  }

  //Returns the first of the user's acts with an open application to the show.
  firstOpenApplicationFromUserAct(user){
    if(!user) return null

    const acts    = this.campaign && this.campaign.bands || []
    const user_id = user && user.id || null

    let open_application = null
    acts.forEach(campaignBand => {
      if (campaignBand.is_accepted === null) {
        Number.isInteger(campaignBand.band.owner)
        ? campaignBand.band.owner == user_id
          ? open_application = campaignBand
          : null
        : campaignBand.band.owner && (campaignBand.band.owner.id == user_id)
          ? open_application = campaignBand
          : null
      }
    })
    return open_application
  }

  //Returns the cheapest ticket value. 
  //(String by default, pass true for a numeric value)
  cheapestTicket(force_number=false){
    if(!this.campaign) return 0.00

    var price = Number.MAX_SAFE_INTEGER
    if(this.campaign.purchase_options){
      this.campaign.purchase_options.forEach(item => {
        if(item.is_ticket){price = Math.min(item.price,price)}
      })
    }
    return force_number
            ? price == Number.MAX_SAFE_INTEGER 
              ? 0 
              : price.toFixed(2)
            : price == Number.MAX_SAFE_INTEGER 
              ? "No advance tickets." 
              : price.toFixed(2)
  }

  //Returns the Band object for the show's headliner.
  //If there are more than one headliner then the first one will be returned.
  headliner() {
    if(!this.campaign || !this.has_acts) return null

    const acts = this.campaign.bands || []
    const all_headliners = acts.filter(act => act.is_headliner)

    return (all_headliners.length > 0 ? all_headliners[0].band : null)
  }

  //Returns all supporting acts.
  supportingActs(){
    if(!this.campaign || !this.has_acts) return []

    let acts = []
    this.bands.forEach(campaign_band => {
      if(!campaign_band.is_headliner && campaign_band.is_accepted !== false){
        acts.push(campaign_band.band)
      }
    })
    
    return acts
  }

  //Returns all acts.
  //campaign_bands=true will give campaign_band objects instead
  confirmed_acts(campaign_bands=false){
    if(!this.campaign || !this.has_acts) return []

    let acts = []
    this.bands.forEach(campaign_band => {
      if(campaign_band.is_accepted && campaign_band.is_application !== null){
        if(campaign_bands){
          acts.push(campaign_band)
        }else{
          acts.push(campaign_band.band)
        } 
      }
    })
    
    return acts
  }

  //Returns owner's acts.
  //campaign_bands=true will give campaign_band objects instead
  ownersActs(owner,campaign_bands=false){
    if(!this.campaign || !this.has_acts || !owner) return []


    let acts = []
    this.bands.forEach(campaign_band => {
      if(campaign_band.is_accepted !== false){
        const is_owner = RP_Act(campaign_band.band).userIsOwner(owner)
        if(campaign_bands && is_owner){
          acts.push(campaign_band)
        }else if (is_owner){
          acts.push(campaign_band.band)
        } 
      }
    })
    return acts
  }

  //Returns organization manager's organizations.
  managersOrganizations(owner){
    if(!this.campaign || !this.has_organizations || !owner) return []

    let organizations = []
    this.organizations.forEach(campaign_organization => {
      if (RP_Organization(campaign_organization.organization).userIsManager(owner)){
        organizations.push(campaign_organization.organization)
      } 
    })
    return organizations
  }
}


export function RP_Campaign(campaign) {
  return new Campaign(campaign)
}