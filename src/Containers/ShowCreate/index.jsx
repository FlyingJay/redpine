//Libraries
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

//Global Files
import { paths, getQueryParams, analytics } from 'globals'
import { PAYOUT_TYPES } from 'enums'
import { RP_Act } from 'Models'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

//Local Infrastructure
import selectors from './selectors'
import actions from './actions'
import constants from './constants'

//General Components
import { Modal, WarningModal } from 'Components' // MODAL
import { BackgroundImage } from 'Components' //IMAGE

//Local Components
import { Tab0YourAct } from './Tab0YourAct/index.jsx'
import { Tab1City } from './Tab1City/index.jsx'
import { Tab2Venue } from './Tab2Venue/index.jsx'
import { Tab3Ticketing } from './Tab3Ticketing/index.jsx'
import { Tab4Day } from './Tab4Day/index.jsx'
import { Tab5Acts } from './Tab5Acts/index.jsx'
import { Tab6Summary } from './Tab6Summary/index.jsx'
import { Tab7Register } from './Tab7Register/index.jsx'


export class ShowCreate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tab: 0,
      act: null,
      city: null,
      date: null,
      acts: [],
      empty_slots: 4,
      venue: null,
      payout_type: 1,
      ticket_price: null,
      doors_price: null,
      is_crowdfunded: false,
      is_open: true,
      extra_info: '',
      url_venue: null,
      default_loaded: false,
      show_warning: false,
      timeslot: null, //Used exclusively for opportunities
      tour: null, //Used exclusively for tours
      organization: null //Used exclusively for organizations
    }
  }

  render() {
    const user = this.props.user || null
    const acts = this.props.acts || []
    const cities = this.props.cities || [{id:1,name:'Toronto'}]
    const genres = this.props.genres || []
    const available_acts = this.props.available_acts || []
    const search_acts = this.props.search_acts || []
    const search_venues = this.props.search_venues || []
    const default_venue = this.props.default_venue || []

    const tab = this.state.tab

    const acts_loading = this.props.acts_loading
    const search_venues_loading = this.props.search_venues_loading

    return (
      <App>
        <BackgroundImage image={'/Assets/images/background/bg8.jpg'} height="95vmin">
          <WarningModal
            show={this.state.show_warning}
            description="You are about to submit your booking request. You will recieve an email when your request is approved or the venue sends you a message. Just as a friendly reminder, RedPine is not responsible for the promotion of your show."
            onContinue={() => this.requestShow()}
            onClose={() => this.updateState({show_warning:false})}/>
          <Modal show onClose={() => this.props.history.goBack()} transparent>
            {{[0]: <Tab0YourAct
                    user={user}
                    acts={acts}
                    acts_loading={acts_loading}
                    cities={cities}
                    genres={genres}
                    is_opening={this.state.timeslot}
                    next={(act) => this.tab0Next(act)}
                    error={(text) => this.props.errorMessage(text)}/>,

              [1]: <Tab1City 
                    city={this.state.city}
                    date={this.state.date}
                    is_opening={this.state.timeslot}
                    cities={cities}
                    next={(city) => this.tab1Next(city)}
                    error={(text) => this.props.errorMessage(text)}/>,

              [2]: <Tab2Venue
                    user={user}
                    venue={this.state.venue}
                    is_opening={this.state.timeslot}
                    search_venues={search_venues}
                    loading={search_venues_loading}
                    showBuyRedPine={() => this.props.showBuyRedPine()}
                    back={(venue) => this.tab2Back(venue)}
                    next={(venue) => this.tab2Next(venue)}/>,

              [3]: <Tab3Ticketing
                    ticket_price={this.state.ticket_price}
                    doors_price={this.state.doors_price}
                    payout_type={this.state.payout_type}
                    organization={this.state.organization}
                    back={(payout_type,ticket_price,doors_price) => this.tab3Back(payout_type,ticket_price,doors_price)}
                    next={(payout_type,ticket_price,doors_price) => this.tab3Next(payout_type,ticket_price,doors_price)}/>,

              [4]: <Tab4Day 
                    city={this.state.city}
                    date={this.state.date}
                    venue={this.state.venue}
                    cities={cities}
                    events={this.props.venue_events}
                    shows={this.props.venue_shows}
                    back={(date) => this.tab4Back(date)}
                    next={(date) => this.tab4Next(date)}
                    error={(text) => this.props.errorMessage(text)}/>,

              [5]: <Tab5Acts
                    act={this.state.act}
                    acts={this.state.acts}
                    city={this.state.city}
                    empty_slots={this.state.empty_slots}
                    is_open={this.state.is_open}
                    available_acts={available_acts}
                    search_acts={search_acts}
                    search_acts_loading={this.props.search_acts_loading}
                    is_opening={this.state.timeslot}
                    searchActs={(act_query) => this.props.searchActs(act_query)}
                    back={(acts,empty_slots,is_open) => this.tab5Back(acts,empty_slots,is_open)}
                    next={(acts,empty_slots,is_open) => this.tab5Next(acts,empty_slots,is_open)}
                    success={(text) => this.props.successMessage(text)}
                    error={(text) => this.props.errorMessage(text)}/>,
                    
              [6]: <Tab6Summary
                    my_act={this.state.act}
                    date={this.state.date}
                    acts={this.state.acts}
                    empty_slots={this.state.empty_slots}
                    venue={this.state.venue}
                    ticket_price={this.state.ticket_price}
                    extra_info={this.state.extra_info}
                    is_opening={this.state.timeslot}
                    back={() => this.tab6Back()}
                    next={(extra_info) => this.tab6Next(extra_info)}/>,

              [7]: <Tab7Register
                    back={() => this.tab7Back()}
                    next={(user_details) => this.tab7Next(user_details)}
                    error={(text) => this.props.errorMessage(text)}/>
            }[tab]}
          </Modal>
        </BackgroundImage>
      </App>
    )
  }

  tabBack(goTo){
    this.updateState({tab:goTo})
  }

  tab0Next(act){
    const skip_city_selection = (this.state.timeslot || this.state.organization)
    if(skip_city_selection){
      this.updateState({tab:2,act:act})
      analytics.playShowCitySelected()
    }else{
      this.updateState({tab:1,act:act})
    }
  }

  tab1Next(city){
    const venue = this.state.venue

    //Skip venue selection when city is TBD
    if(city.id == -1){
      this.updateState({tab:3,city:city,venue:null})
      this.props.searchVenues('',9999999,9999999,9999999,this.state.city)
    }
    //Reset venue selection when city changes
    else if((venue && venue.city) && venue.city.id != city.id){
      this.updateState({tab:2,city:city,venue:null})
      this.props.searchVenues('',9999999,9999999,9999999,this.state.city)
    }
    else{
      this.updateState({tab:2,city:city})
      this.props.searchVenues('',9999999,9999999,9999999,this.state.city)
    }
    this.props.searchAvailableActs(city.id)
    analytics.playShowCitySelected()
  }

  tab2Back(venue){
    if(this.props.organization){
      this.props.organizationCalendar(this.props.organization)
    }
    else{
      this.updateState({tab:1,venue:venue})
    }
  }

  tab2Next(venue){
    //Skip date selection, ticketing, and acts when applying for an opportunity
    if(this.state.timeslot){
      const user_act = this.state.act
      user_act.is_headliner = true
      user_act.is_accepted = true

      this.updateState({tab:6,payout_type:PAYOUT_TYPES.ALL_TO_ORGANIZER,ticket_price:0.00,doors_price:0.00,acts:[user_act]})
      analytics.playShowDaySelected()
      analytics.playShowActsSelected()
    }else{
      venue ? this.props.getEventDates(venue.id) : null
      this.updateState({tab:3,venue:venue})
    }
    analytics.playShowVenueSelected()
  }

  tab3Back(payout_type,ticket_price,doors_price){
    if(this.state.city.id == -1){
      this.updateState({tab:1,payout_type,ticket_price,doors_price})
    }else{
      this.updateState({tab:2,payout_type,ticket_price,doors_price})
    }
  }

  tab3Next(payout_type,ticket_price,doors_price){
    this.updateState({tab:4,payout_type,ticket_price,doors_price})
  }

  tab4Back(date){
    this.updateState({tab:3,date:date})
  }

  tab4Next(date){
    this.updateState({tab:5,date:date})
    analytics.playShowDaySelected()
  }

  tab5Back(acts,empty_slots,is_open){
    this.updateState({tab:4,acts:acts,empty_slots:empty_slots,is_open:is_open})
  }

  tab5Next(acts,empty_slots,is_open){
    const user_act = this.state.act
    acts.forEach(act => {
      act.is_headliner = (act.id == user_act.id)
      act.is_accepted = (act.id == user_act.id)
    })
    this.updateState({tab:6,acts:acts,empty_slots:empty_slots,is_open:is_open})
    analytics.playShowActsSelected()
  }

  tab6Back(){
    //Skip date selection, ticketing, and acts when applying for an opportunity
    if(this.state.timeslot){
      this.updateState({tab:2})
    }
    else{
      this.updateState({tab:5})
    }
  }

  tab6Next(extra_info){
    this.props.user
    ? this.updateState({show_warning:true,extra_info:extra_info})
    : this.updateState({tab:7,extra_info:extra_info})
  }

  tab7Back(){
    this.updateState({tab:6})
  }

  tab7Next(user_details){
    this.updateState({show_warning:true,user_details:user_details})
  }

  requestShow(){
    const venue          = this.state.venue
    const date           = moment.utc(this.state.date).toISOString().replace('.000Z', '')
    const payout_type    = this.state.payout_type
    const ticket_price   = this.state.ticket_price ? parseFloat(this.state.ticket_price).toFixed(2) : null
    const doors_price    = this.state.doors_price ? parseFloat(this.state.doors_price).toFixed(2) : null
    const extra_slots    = this.state.empty_slots
    const is_open        = this.state.is_open
    const extra_info     = this.state.extra_info
    const is_crowdfunded = this.state.is_crowdfunded

    const acts           = this.state.acts
    const performers     = acts && acts.map(act => {
                                      return Object.assign({
                                        band: act.id,
                                        name: act.name,
                                        email: act.email,
                                        owner: act.owner,
                                        is_redpine: act.is_redpine,
                                        is_headliner: act.is_headliner,
                                        is_accepted: act.is_headliner ? true : null
                    }, act.facebook && { facebook: act.facebook},
                        act.twitter && { twitter: act.twitter},
                      act.instagram && { instagram: act.instagram},
                        act.youtube && { youtube: act.youtube},
                        act.spotify && { spotify: act.spotify},
                     act.soundcloud && { soundcloud: act.soundcloud},
                       act.bandcamp && { bandcamp: act.bandcamp})
                  }) || []

    const data = {
      venue: venue,
      date: date,
      performers: performers,
      extra_slots: extra_slots,
      is_open: is_open,
      payout_type: payout_type,
      ticket_price: ticket_price,
      doors_price: doors_price,
      extra_info: extra_info,
      is_crowdfunded: is_crowdfunded,
      timeslot: this.state.timeslot, //If the request was created from an existing timeslot
      tour: this.state.tour, //If the request was created from an existing tour
      organization: this.state.organization //If the request was created by an organization
    }

    const redirect = this.state.tour 
                     ? paths.tours(RP_Act(this.state.act).id) 
                     : this.state.organization
                       ? paths.organizationCalendar(this.state.organization)
                       : paths.myShows()

    if(this.state.user_details){
      this.props.registerThenRequest(this.state.user_details,data,redirect)
      analytics.actCreated()
    }else{
      this.props.requestShow(this.props.user,data,redirect)
    }
    analytics.playShowSubmitted()
  }

  componentDidMount(){
    const params = getQueryParams()
    if(params.venue && !this.props.default_venue){ 
      this.props.loadVenue(params.venue)
    }
    if(params.opening && !this.props.default_opening){ 
      this.props.loadOpening(params.opening)
    }
    if(params.tour){ 
      this.updateState({tour:params.tour})
    }
    if(params.organization){ 
      this.updateState({organization:params.organization})
    }
    if(params.date){
      this.updateState({date:params.date})
    }
    this.props.loadData()
    this.props.refreshCache()
  }

  componentWillReceiveProps(nextProps){
    //PRE-POPULATE THE FORM
    if(!this.state.default_loaded){
      if(nextProps.default_venue){
        const venue = nextProps.default_venue
        const city  = venue ? venue.city : null

        this.updateState({
          city:city,
          venue:venue,
          default_venue:null,
          default_loaded:true
        })
      }
      else if(nextProps.default_opening){
        const extra_info = `Applying for ${nextProps.default_opening.title}`
        const timeslot = nextProps.default_opening.timeslot
        const venue    = timeslot ? timeslot.venue : null
        const city     = venue ? venue.city : null

        const date     = moment(timeslot.start_time)
        
        this.updateState({
          city:city,
          venue:venue,
          date:date,
          timeslot:timeslot,
          extra_info:extra_info,
          default_opening:null,
          default_loaded:true
        })
      }
    }
  }

  componentWillUnmount() {
    this.updateState({default_venue:null,default_opening:null,default_loaded:false,user_details:null})
    this.props.resetState()
  }

  updateState(update){
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state),
    cities: appSelectors.selectVenueCities(state),
    genres: appSelectors.selectGenres(state),

    acts: selectors.selectActs(state),
    acts_loading: selectors.selectActsLoading(state),
    venue_events: selectors.selectVenueEvents(state),
    venue_shows: selectors.selectVenueShows(state),
    available_acts: selectors.selectAvailableActs(state),
    search_acts: selectors.selectSearchActs(state),
    search_acts_loading: selectors.selectSearchActsLoading(state),
    search_venues: selectors.selectSearchVenues(state),
    search_venues_loading: selectors.selectSearchVenuesLoading(state),
    default_venue: selectors.selectVenue(state),
    default_opening: selectors.selectOpening(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(actions.loadData())
    },
    loadVenue: (id) => {
      dispatch(actions.loadVenue(id))
    },
    loadOpening: (id) => {
      dispatch(actions.loadOpening(id))
    },
    getEventDates: (venue_id) => {
      dispatch(actions.getEventDates(venue_id))
    },
    requestShow: (user,data,redirect) => {
      dispatch(actions.requestShow(user,data,redirect))
    },
    registerThenRequest: (user_details,data,redirect) => {
      dispatch(actions.submitRegistration(user_details,data,redirect))
    },
    searchAvailableActs: (city_id) => {
      dispatch(actions.searchAvailableActs(city_id))
    },
    searchVenues: (query,capacity,headcount,fee,city) => {
      dispatch(actions.searchVenues(query,capacity,headcount,fee,city))
    },
    searchActs: (act_query) => {
      dispatch(actions.searchActs(act_query))
    },
    organizationCalendar: (organization_id) => {
      dispatch(push(paths.organizationCalendar(organization_id)))
    },
    refreshCache: () => {
      dispatch(appActions.refreshCache())
    },
    showBuyRedPine: () => {
      dispatch(appActions.showBuyRedPine())
    },
    successMessage: (text) => {
      dispatch(appActions.success_message(text))
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    },
    resetState: () => {
      dispatch(actions.resetState())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowCreate)