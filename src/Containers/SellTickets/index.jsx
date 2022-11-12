//Libraries
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

import { analytics, getQueryParams, paths } from 'globals'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

//Local Infrastructure
import selectors from './selectors'
import actions from './actions'

//General Components
import { Bold, Clear } from 'Components' //GLOBALS
import { Modal, WarningModal } from 'Components' // MODAL
import { BackgroundImage } from 'Components' //IMAGE
import { TotalLandingWrapper, LandingInfoWrapper, InnerContentWrapper, InnerContent, ContentMinorHeading, 
          ContentMajorHeading, ContentSummary, ContentAction, LandingInfoDetails, HowToSectionWrapper, DetailsSection, 
          DetailsSectionStepCount, DetailsHeading, DetailsSubheading, DetailsSubsection, SubsectionHeading, 
          SubsectionSummary, LandingInfoFooter, FooterHeading, FooterAction } from 'Components' // MODAL AND MODALOTHERS
import { Link } from 'Components'

//Local Components
import { Tab0YourAct } from './Tab0YourAct/index.jsx'
import { Tab1Day } from './Tab1Day/index.jsx'
import { Tab2Acts } from './Tab2Acts/index.jsx'
import { Tab3Price } from './Tab3Price/index.jsx'
import { Tab4Summary } from './Tab4Summary/index.jsx'


export class SellTickets extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      tab: 0,
      act: null,
      date: null,
      acts: [],
      is_open: false,
      title: '',
      venue_name: '',
      venue_address: '',
      ticket_price: null,
      doors_price: null,
      show_warning: false,
      show_form: false,
      organization: null //Only used if the show was created by an organization
    }
  }

  render() {
    const user = this.props.user || null
    const acts = this.props.acts || []
    const acts_loading = this.props.acts_loading
    const search_acts = this.props.search_acts || []

    const tab = this.state.tab

    return (
      <App>
        { this.state.show_form
          ? <BackgroundImage image={'/Assets/images/background/bg8.jpg'} height="95vmin">
              <WarningModal
                show={this.state.show_warning}
                description="You are about to create a ticketed event. Once created, you can manage it's details on your My Shows page."
                onContinue={() => this.createShow()}
                onClose={() => this.updateState({show_warning:false})}/>
              <Modal transparent show onClose={() => this.updateState({show_form:false})}>
                {{
                  [0]: <Tab0YourAct
                        acts={acts}
                        acts_loading={acts_loading}
                        next={(act) => this.tab0Next(act)}/>,
                  
                  [1]: <Tab1Day 
                        date={this.state.date}
                        next={(date) => this.tab1Next(date)}
                        error={(text) => this.props.errorMessage(text)}/>,
                  
                  [2]: <Tab2Acts
                        act={this.state.act}
                        acts={this.state.acts}
                        empty_slots={this.state.empty_slots}
                        is_open={this.state.is_open}
                        search_acts={search_acts}
                        search_acts_loading={this.props.search_acts_loading}
                        searchActs={(act_query) => this.props.searchActs(act_query)}
                        back={(acts,is_open) => this.tab2Back(acts,is_open)}
                        next={(acts,is_open) => this.tab2Next(acts,is_open)}
                        success={(text) => this.props.successMessage(text)}
                        error={(text) => this.props.errorMessage(text)}/>,
                  
                  [3]: <Tab3Price
                        title={this.state.title}
                        ticket_price={this.state.ticket_price}
                        ticket_quantity={this.state.ticket_quantity}
                        doors_price={this.state.doors_price}
                        doors_quantity={this.state.doors_quantity}
                        back={(title,venue_name,venue_address,ticket_price,ticket_quantity,doors_price,doors_quantity) => this.tab3Back(title,venue_name,venue_address,ticket_price,ticket_quantity,doors_price,doors_quantity)}
                        next={(title,venue_name,venue_address,ticket_price,ticket_quantity,doors_price,doors_quantity) => this.tab3Next(title,venue_name,venue_address,ticket_price,ticket_quantity,doors_price,doors_quantity)}/>,
                  
                  [4]: <Tab4Summary
                        title={this.state.title}
                        my_act={this.state.act}
                        date={this.state.date}
                        acts={this.state.acts}
                        empty_slots={this.state.empty_slots}
                        venue={this.state.venue}
                        ticket_price={this.state.ticket_price}
                        ticket_quantity={this.state.ticket_quantity}
                        is_crowdfunded={this.state.is_crowdfunded}
                        is_opening={this.state.timeslot}
                        back={() => this.tab4Back()}
                        next={() => this.updateState({show_warning:true})}/>
                }[tab]}
              </Modal>
            </BackgroundImage>
          : <LandingInfo 
              showSellTickets={() => this.updateState({show_form: true})}
              userData={user}
              becomeAnArtist={() => this.props.settings()}
              logInToContinue={() => this.props.viewLogin()}/> }
      </App>
    )
  }

  tabBack(goTo){
    this.updateState({tab:goTo})
  }

  tab0Next(act){
    this.updateState({tab:1,act:act})
  }

  tab1Next(date){
    this.updateState({tab:2,date:date})
  }

  tab2Back(acts,is_open){
    this.updateState({tab:1,acts:acts,is_open:is_open})
  }

  tab2Next(acts,is_open){
    const user_act = this.state.act
    acts.forEach(act => {
      act.is_headliner = (act.id == user_act.id)
      act.is_accepted = (act.id == user_act.id)
    })
    this.updateState({tab:3,acts:acts,is_open:is_open})
  }

  tab3Back(title,venue_name,venue_address,ticket_price,ticket_quantity,doors_price,doors_quantity){
    this.updateState({tab:2,title,venue_name,venue_address,ticket_price,ticket_quantity,doors_price,doors_quantity})
  }

  tab3Next(title,venue_name,venue_address,ticket_price,ticket_quantity,doors_price,doors_quantity){
    this.updateState({tab:4,title,venue_name,venue_address,ticket_price,ticket_quantity,doors_price,doors_quantity})
  }

  tab4Back(){
    this.updateState({tab:3})
  }

  createShow(){
    const date       = moment.utc(this.state.date).toISOString().replace('.000Z', '')

    const acts       = this.state.acts
    const performers = acts && acts.map(act => {
                                          return Object.assign({
                                            band: act.id,
                                            name: act.name,
                                            email: act.email,
                                            owner: act.owner,
                                            is_redpine: act.is_redpine,
                                            is_headliner: act.is_headliner,
                                            is_accepted: act.is_headliner ? true : null, 
                        }, act.facebook && { facebook: act.facebook},
                            act.twitter && { twitter: act.twitter},
                          act.instagram && { instagram: act.instagram},
                            act.youtube && { youtube: act.youtube},
                            act.spotify && { spotify: act.spotify},
                         act.soundcloud && { soundcloud: act.soundcloud},
                           act.bandcamp && { bandcamp: act.bandcamp})
                      }) || []
    
    const data = {
      title: this.state.title,
      venue_name: this.state.venue_name,
      venue_address: this.state.venue_address,
      performers: performers,
      is_open: this.state.is_open,
      ticket_price: this.state.ticket_price,
      ticket_quantity: this.state.ticket_quantity,
      doors_price: this.state.doors_price,
      doors_quantity: this.state.doors_quantity,
      date: date,
      organization: this.state.organization
    }
    
    this.props.createShow(data)
    analytics.justTicketsSubmitted()
  }

  loadData(){
    this.props.loadData()
  }

  componentDidMount(){
    const params = getQueryParams()
    if(params.organization){ 
      this.updateState({organization:params.organization})
    }
    this.props.loadData()
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
    acts: selectors.selectActs(state),
    acts_loading: selectors.selectActsLoading(state),
    search_acts: selectors.selectSearchActs(state),
    search_acts_loading: selectors.selectSearchActsLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(actions.loadData())
    },
    searchActs: (act_query) => {
      dispatch(actions.searchActs(act_query))
    },
    createShow: (data) => {
      dispatch(actions.createShow(data))
    },
    successMessage: (text) => {
      dispatch(appActions.success_message(text))
    },
    viewLogin: () => {
      dispatch(appActions.redirectToLogin())
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellTickets)


const LandingInfo = ({showSellTickets, userData, becomeAnArtist, logInToContinue}) => (
  <TotalLandingWrapper>
    
    {/* LANDING INFO BANNER */}
    <LandingInfoWrapper image="/Assets/images/background/bg12.jpg" mobileImage="/Assets/images/background/bg8.jpg">
      <InnerContentWrapper>
        <InnerContent>
          <ContentMinorHeading>The best, we promise</ContentMinorHeading>
          <ContentMajorHeading>Concert ticketing, made for live music.</ContentMajorHeading>
          <ContentSummary>
            <i>Concerts are unlike any other event.</i>
            <br/>
            <br/>
            With RedPine tickets, your payout is available right after the show and we make it easy to split between performing acts.
          </ContentSummary>
          { userData
            ? userData.profile.is_artist
              ? <ContentAction onClick={showSellTickets}><i className="fa fa-ticket"/>&nbsp;&nbsp;Get Started</ContentAction>
              : <Link href={paths.settings()}><ContentAction>Become an Artist</ContentAction></Link>
            : <Link redirectToLogin><ContentAction>Log in to get started</ContentAction></Link> }
        </InnerContent>
      </InnerContentWrapper>
    </LandingInfoWrapper>

    {/* LANDING INFO DETAILS */}
    <LandingInfoDetails>
      <InnerContentWrapper width="auto">

        {/* WHAT'S A CAMPAIGN */}
        <DetailsSection>
          <DetailsHeading>The benefits of ticketing on RedPine</DetailsHeading>
          <DetailsSubheading>We've built a platform around the unique needs of musicians.</DetailsSubheading>

          <DetailsSubsection display>
            <i className="fa fa-bicycle" />
            <SubsectionHeading>Simple & Fast</SubsectionHeading>
            <SubsectionSummary>Set up a ticketing page and begin selling in under a minute.</SubsectionSummary>
          </DetailsSubsection>

          <DetailsSubsection display>
            <i className="fa fa-music" />
            <SubsectionHeading>Free for Artists</SubsectionHeading>
            <SubsectionSummary>You never pay to use RedPine. Credit card fees are covered by a simple charge of 15% to the ticket buyer.</SubsectionSummary>
          </DetailsSubsection>

          <DetailsSubsection display>
            <i className="fa fa-ticket" />
            <SubsectionHeading>Ticket & Merch Packages</SubsectionHeading>
            <SubsectionSummary>Pair a ticket with merchandise, digital downloads, or experiences. Create as many packages as you'd like.</SubsectionSummary>
          </DetailsSubsection>

          <DetailsSubsection display>
            <i className="fa fa-pie-chart" />
            <SubsectionHeading>Real-Time Sales Tracking</SubsectionHeading>
            <SubsectionSummary>Everyone is kept in the loop with live tracking of each act's sales.</SubsectionSummary>
          </DetailsSubsection>

          <DetailsSubsection display>
            <i className="fa fa-credit-card" />
            <SubsectionHeading>Cashless Door Sales</SubsectionHeading>
            <SubsectionSummary>Stop losing money at the door. Using our free app you may collect credit card payments at the venue.</SubsectionSummary>
          </DetailsSubsection>

          <DetailsSubsection display>
            <i className="fa fa-users" />
            <SubsectionHeading>Payout Options</SubsectionHeading>
            <SubsectionSummary>Multiple acts performing in the show? Not a problem! You may split sales based on each act's sales.</SubsectionSummary>
          </DetailsSubsection>
        </DetailsSection>
      </InnerContentWrapper>
    </LandingInfoDetails>

    {/* LANDING INFO FOOTER */}
    <LandingInfoFooter image="/Assets/images/background/bg3.jpg">
      <FooterHeading>Ticket your show!</FooterHeading>
      <Clear></Clear>
      { userData
        ? userData.profile.is_artist
          ? <FooterAction onClick={showSellTickets}><i className="fa fa-ticket"/>&nbsp;&nbsp;Get Started</FooterAction>
          : <FooterAction onClick={becomeAnArtist}>Become an Artist</FooterAction>
        : <FooterAction onClick={logInToContinue}>Log in to get started</FooterAction> }
    </LandingInfoFooter>
  </TotalLandingWrapper>
);