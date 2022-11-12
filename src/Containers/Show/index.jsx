import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { getQueryParams, paths, validators, analytics } from 'globals'

import { RP_Campaign, RP_Venue } from 'Models'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'
import { ShowStatusHeader } from 'Containers' //SHOWSTATUSHEADER

import { RP_RED, RP_GREY, RP_DARK_GREY, RP_SUPER_LIGHT, RP_DDD, RP_BLACK, RP_WHITE, RP_BLUE, RP_FONT, Clear, Bold } from 'Components' // GLOBALS
import { Link, RedLink } from 'Components' //LINK
import { LoadingIndicator } from 'Components'
import { SquareFields } from 'Components'
import { FormButton } from 'Components' //BUTTON
import { FormError } from 'Components' //PROGRESS BAR, ERROR
import { Markdown } from 'Components' //MARKDOWN
import { Modal } from 'Components'
import { Input } from 'Components'
import { Money } from 'Components'

import { SelectAct } from 'Components'
import { SelectActRegister } from 'Components'

import { GoingToSee } from './CheckoutForm/GoingToSee/index.jsx'

import { EditCampaign } from './EditCampaign/index.jsx'
import { PerformerList } from './PerformerList/index.jsx'
import { SummaryBanner } from './SummaryBanner/index.jsx'
import { DetailSummary } from './DetailSummary/index.jsx'
import { PledgeOptions } from './PledgeOptions/index.jsx'
import { CheckoutButton } from './CheckoutButton/index.jsx'
import { ShareCampaign } from './ShareCampaign/index.jsx'

import actions from './actions'
import selectors from './selectors'

import { Poster } from 'Components'


export class Show extends React.PureComponent {
  constructor(props) {
    super(props)
    
    this.state = {
      showModal: false,
      showSquare: false,
      showMap: false,
      show_select_act: false,
      show_register: false,
      goingToSee: [],
      purchaseQuantities: [],
      hst: .13,
      mapInitialized: false,

      //SIGNUP INFO
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      birthdate: moment(),

      //SUBSCRIPTIONS
      subscribe_to_venue: false,
      subscribe_to_acts: false,
      subscribe_to_organizations: false
    }
  }

  render() {
    const user             = this.props.user
    const profile          = user && user.profile || null
    const is_artist        = profile && profile.is_artist || false
    const campaign         = this.props.campaign
    const pledges          = this.props.pledges
    const purchase_options = this.props.purchase_options || []

    const cities            = this.props.cities || []
    const genres            = this.props.genres || []
    const user_acts         = this.props.user_acts || []
    const user_acts_loading = this.props.user_acts_loading || true

    const _Campaign        = RP_Campaign(campaign)
    const progress         = _Campaign.progress()
    const isTraditional    = _Campaign.isTraditional()
    const isManager        = _Campaign.userIsVenueManager(user)
    const timeRemaining    = _Campaign.timeRemaining()
    const cheapestTicket   = _Campaign.cheapestTicket(true)
    const headliner        = _Campaign.headliner()
    const supporting_acts  = _Campaign.supportingActs()

    const timeslot         = campaign && campaign.timeslot || null
    const start_time       = timeslot && timeslot.start_time || null
    const venue            = timeslot && timeslot.venue || null

    const _Venue           = _Campaign._Venue
    const startDate        = moment(start_time).toDate()

    const isComplete       = timeRemaining === 'Completed'
    const poster_visible   = _Campaign.has_acts && _Campaign.has_picture

    return (
      <App padding>
        { _Campaign.third_party_tickets
          ? <FullPage>
              <iframe src={_Campaign.third_party_tickets} width="100%" height="100%" frameBorder="0"/>
            </FullPage>
          : <MobileFirstDiv>
              <LoadingIndicator loading={this.props.campaign_loading}>
                {/* EDIT CAMPAIGN LINK */}
                <EditCampaign campaign={_Campaign.campaign} user={user}/>

                {/* CURRENT STATUS OF CAMPAIGN */}
                <ShowStatusHeader campaign={_Campaign.campaign}/>

                {/* CAMPAIGN TITLE */}
                { !poster_visible
                  ? <CampaignTitle>{_Campaign.title}</CampaignTitle>
                  : null }

                {/* FIRST COLUMN OF CAMPAIGN DATA */}
                <CampaignFirstCol>
                  { poster_visible
                    ? <Poster 
                        title={_Campaign.title} 
                        campaign_acts={_Campaign.bands} 
                        venue={_Venue.title} 
                        image={venue.picture}
                        cheapestTicket={cheapestTicket}/>
                    : <CampaignThumb image={_Campaign.picture}/> } 

                  {/* CAMPAIGN DETAILS - MOBILE */}
                  <DetailSummary 
                    campaign={_Campaign.campaign}
                    isComplete={isComplete}
                    isTraditional={isTraditional}
                    progress={progress} 
                    cheapestTicket={cheapestTicket}
                    startDate={startDate}
                    timeRemaining={timeRemaining}
                    updateCart={this.updateCart.bind(this)}
                    showMap={() => this.showMap()}
                    mobile/>

                  {/* CAMPAIGN PERFORMERS */}
                  <PerformerList 
                    campaign={_Campaign.campaign} 
                    is_artist={is_artist} 
                    showSelectAct={() => this.showSelectAct()}/>

                  {/* CROWDFUNDED/TRADITIONAL SUMMARY BANNER */}
                  <SummaryBanner isTraditional={isTraditional}/>

                  {/* PLEDGE OPTIONS */}
                  <PledgeOptions 
                    campaign={_Campaign.campaign}
                    purchase_options={purchase_options}
                    isComplete={isComplete}
                    updateCart={this.updateCart.bind(this)}
                    mobile/>

                  {/* OPEN CHECKOUT - MOBILE */}
                  { purchase_options.length > 0
                    ? <CheckoutButton 
                        campaign={_Campaign.campaign}
                        isComplete={isComplete}
                        isTraditional={isTraditional}
                        progress={progress} 
                        showCheckout={() => {
                          if(this.itemsSelected()){
                            analytics.pledgeOpenModal(campaign.id)
                            this.updateState({showModal: true})
                          }
                        }}
                        mobile/>
                    : null }

                  {/* CAMPAIGN DETAILS */}
                  <DescriptionFrame>
                    <DescriptionHeader>
                      About {_Campaign.title}
                    </DescriptionHeader>
                    <Markdown text={_Campaign.description}/>
                  </DescriptionFrame>
                </CampaignFirstCol>

                {/* SECOND COLUMN OF Campaign DATA */}
                <CampaignSecondCol>
                  {/* CAMPAIGN DETAILS - DESKTOP */}
                  <DetailSummary 
                    campaign={_Campaign.campaign}
                    isComplete={isComplete}
                    isTraditional={isTraditional}
                    progress={progress} 
                    cheapestTicket={cheapestTicket}
                    startDate={startDate}
                    timeRemaining={timeRemaining}
                    updateCart={this.updateCart.bind(this)}
                    showMap={() => this.showMap()}/>

                  {/* PLEDGE OPTIONS */}
                  <PledgeOptions 
                    campaign={_Campaign.campaign}
                    purchase_options={purchase_options}
                    isComplete={isComplete}
                    updateCart={this.updateCart.bind(this)}/> 

                  {/* OPEN CHECKOUT - DESKTOP */}
                  { purchase_options.length > 0
                    ? <CheckoutButton
                        campaign={_Campaign.campaign}
                        isComplete={isComplete}
                        isTraditional={isTraditional}
                        progress={progress} 
                        showCheckout={() => {
                          if(this.itemsSelected()){
                            analytics.pledgeOpenModal(_Campaign.id)
                            this.updateState({showModal: true})
                          }
                        }}/>
                    : null }
                  <Clear></Clear>

                  {/* SHARE BUTTONS */}
                  <ShareCampaign
                    campaign={_Campaign.campaign}
                    venue={venue}/>
                </CampaignSecondCol>
              </LoadingIndicator>
            </MobileFirstDiv>
        }

        {this.renderModal()}

        <Modal transparent
          show={this.state.showMap} 
          alreadyOpen={this.state.showModal || this.state.showMap} 
          onClose={() => this.updateState({showMap: false})}>
        </Modal>
        <Map id="map" show={this.state.showMap}/>

        { this.state.show_select_act
          ? <Modal show onClose={() => this.updateState({show_select_act:false})} transparent>
              <SelectAct
                user={user}
                acts={user_acts}
                acts_loading={this.props.user_acts_loading}
                cities={cities}
                genres={genres}
                actSelected={(act) => this.props.joinOpenShow(_Campaign.id,act)}
                actCreated={(act_details) => this.createActThenJoinOpenShow(_Campaign.id,act_details)}
                error={(text) => this.props.errorMessage(text)}/>
            </Modal>
          : null }

        { this.state.show_register
          ? <Modal show onClose={() => this.updateState({show_register:false})} transparent>
              <SelectActRegister
                register={(user_details) => this.props.registerThenCreateAct(user_details,_Campaign.id,this.state.act_details)}
                error={(text) => this.props.errorMessage(text)}/>
            </Modal>
          : null }
      </App>
    )
  }

  renderModal() {
    const campaign         = this.props.campaign || {}
    const purchase_options = this.props.purchase_options || {}

    const _Campaign        = RP_Campaign(campaign)
    const isTraditional    = _Campaign.isTraditional()
    const isCrowdfunded    = _Campaign.isCrowdfunded()

    const currency = _Campaign._Venue ? _Campaign._Venue.currency : null

    {/* CHECKOUT */}
    return ( 
      <Modal show={this.state.showModal} onClose={() => this.updateState({showModal: false})}>
        <ModalWrapper>

          {/* CAMPAIGN HEADER */}
          <CheckoutCampaignThumb image={_Campaign.picture}/>
          <CheckoutDetails>
            <CheckoutNormalText style={{fontWeight: 'bold'}}>
              You are going to attend <span style={{color:RP_RED, fontWeight: 'bold'}}>{campaign.title}</span>
            </CheckoutNormalText>
            <CheckoutNormalText>
              You are {isTraditional ? 'paying ' : 'pledging '} 
              <span style={{color:RP_RED}}>
                <Money amount={this.totalPrice()} currency={currency} />
              </span> 
              &nbsp;for&nbsp; 
              <span style={{color:RP_RED}}>
                {this.ticketCount()}
                {this.ticketCount() === 1 ? ' ticket' : ' tickets'}
              </span>
            </CheckoutNormalText>
          </CheckoutDetails>

          {/* SHOW ERRORS ENCOUNTERED DURING PLEDGE */}
          <FormError name="pledge-error" error={this.props.pledgeError} />

          {/* IMPORTANT NOTE */}
          <Containerizer style={{borderRadius: '0.5vmin 0.5vmin 0 0', boxShadow: 'none'}}>
            <CheckoutHeadingText>We just need a little information for your purchase..</CheckoutHeadingText>
            <NoteText style={{color: 'rgba(49,49,49,1)'}}><Bold>Note:</Bold> You will be shown a breakdown of your pledge, purchases and/or associated costs below. Let&#39;s get started!</NoteText>
          </Containerizer>
          <Containerizer style={{background:RP_WHITE, marginTop: '0', borderRadius: '0 0 0.5vmin 0.5vmin', boxShadow: 'none', borderTop: '0'}}>
            {/* GOING TO SEE */}
            <SectionalHeading>
              Who are you going to see?
              <NoteText>
                You will still get to see all performing artists. This just helps us make sure the artists are fairly compensated.
                <br/>
                <i>If an artist isn't listed here, it's because they have not yet confirmed that they will be participating.</i>
              </NoteText>
            </SectionalHeading>
            <GoingToSee 
              bands={campaign.bands && campaign.bands.filter(band => band.is_accepted) || []} 
              onChange={(bands) => {this.updateState({goingToSee: bands})}}/>

            {/* PAYMENT INFORMATION */}
            <SectionalHeading>
              Your Information
              <NoteText>
                This ensures we can get in contact with you in case of any emergencies.
              </NoteText>
            </SectionalHeading>

            <Input type='text' value={this.state.first_name} placeholder='First Name' name='first-name' image='first-name' focusImage='first-name-focus' onUpdate={(e) => this.updateState({first_name: e.target.value})} />
            <Input type='text' value={this.state.last_name} placeholder='Last Name' name='last-name' image='last-name' focusImage='last-name-focus' onUpdate={(e) => this.updateState({last_name: e.target.value })} />
            <Input type='text' value={this.state.email} placeholder='Email' image='email' focusImage='email-focus' onUpdate={(e) => this.updateState({email: e.target.value})} />
            { !this.props.authenticated
              ? <div>
                  {/* Nest an input within the mobiscroll.Date tags to use 
                      that component instead of the default Mobiscroll one. */}
                  <mobiscroll.Date
                    display="center"
                    placeholder="Please Select..."
                    value={this.state.birthdate}
                    onSet={(value) => this.validateBirthdate(value.valueText)}>
                    <Input 
                      placeholder="Birthday"
                      value={this.state.birthdate}
                      image="dot" 
                      focusImage="dot-focus"/>
                  </mobiscroll.Date>
                  <SectionalHeading>
                    Add Password (optional)
                    <NoteText>
                      Recover your tickets in case they are lost, and subscribe for updates on acts & venues of your choice.
                    </NoteText>
                  </SectionalHeading>
                  <Input type='password' value={this.state.password} placeholder='Password' image='password' focusImage='password-focus' onUpdate={(e) => this.updateState({password: e.target.value})} />
                </div>
              : null }
          </Containerizer>

          {/* PAYMENT DETAILS */}
          <Containerizer style={{borderRadius: '0.5vmin 0.5vmin 0 0', boxShadow: 'none'}}>
            <CheckoutHeadingText>See you there!</CheckoutHeadingText>
            <NoteText style={{color: 'rgba(49,49,49,1)'}}>We hope you enjoy the show - thank you for being a part of it!</NoteText>
          </Containerizer>

          <Containerizer style={{background: RP_WHITE, marginTop: '0', borderRadius: '0 0 0.5vmin 0.5vmin', boxShadow: 'none', borderTop: '0'}}>

            {/* SUBSCRIPTIONS */}
            <SectionalHeading>
              Subscribe for Updates
              <NoteText>
                Check any of the following for email updates whenever a new show is listed!
              </NoteText>
            </SectionalHeading>
            { _Campaign.has_venue
              ? [<Checkbox type="checkbox" key="venue_c"
                    onChange={(e) => this.updateState({subscribe_to_venue:!this.state.subscribe_to_venue})} 
                    checked={this.state.subscribe_to_venue} />,
                  <CheckboxValue key="venue_cv">&nbsp;Events at this venue</CheckboxValue>,
                  <br key="venue_br"/>]
              : null }
            <Checkbox type="checkbox" 
              onChange={(e) => this.updateState({subscribe_to_acts:!this.state.subscribe_to_acts})} 
              checked={this.state.subscribe_to_acts} />
            <CheckboxValue>&nbsp;Events with the acts I'm going to see</CheckboxValue>
            <br/>
            { _Campaign.has_organizations
              ? [<Checkbox type="checkbox" key="org_c" 
                   onChange={(e) => this.updateState({subscribe_to_organizations:!this.state.subscribe_to_organizations})} 
                   checked={this.state.subscribe_to_organizations} />,
                 <CheckboxValue key="org_cv">&nbsp;Events with organizations who participated in this event</CheckboxValue>,
                 <br key="org_br"/>]
              : null }

            {/* PAYMENT DETAILS */}
            <PaymentBreakdown>
              <PaymentCategory style={{marginTop: '4vmin', padding: '2vmin 0', background: RP_GREY}}>
                <CategoryName><Bold>Item</Bold></CategoryName>
                <CategoryDetails><Bold>Product Description</Bold></CategoryDetails>
                <CategoryPrice><Bold>Total</Bold></CategoryPrice>
              </PaymentCategory>

              {/* ITEMS PURCHASED */}
              {this.state.purchaseQuantities.map((quantity,index) => {
                if(parseInt(quantity) > 0){
                  return (
                    <PaymentCategory key={index}>
                      <CategoryName>
                        {purchase_options[index].name}
                      </CategoryName>
                      <CategoryDetails>
                        <Bold>{quantity}x</Bold> {purchase_options[index].description}
                      </CategoryDetails>
                      <CategoryPrice>
                        <Money amount={purchase_options[index].price * quantity} currency={currency} />
                      </CategoryPrice>
                    </PaymentCategory>
                  ) 
                }
              })}

              {/* TAXES 
              <PaymentCategory style={{display: 'none', borderBottom: '0px'}}>
                <CategoryName></CategoryName>
                <CategoryDetails style={{textAlign: 'right'}}><Bold>HST (13%)</Bold></CategoryDetails>
                <CategoryPrice><Money amount={campaign.min_ticket_price * this.state.numTickets} currency={currency} /></CategoryPrice>
              </PaymentCategory>
              */}

              {/* REDPINE'S FEE*/}
              <PaymentCategory style={{paddingTop: '2vmin'}}>
                <CategoryName>Service Charge</CategoryName>
                <CategoryDetails></CategoryDetails>
                <CategoryPrice><Money amount={this.totalPrice() * (_Campaign.service_fee/100)} currency={currency} /></CategoryPrice>
              </PaymentCategory>

              {/* CHECKOUT TOTAL*/}
              <PaymentCategory style={{borderBottom: '0px', paddingTop: '2vmin'}}>
                <CategoryName></CategoryName>
                <CategoryDetails style={{textAlign: 'right'}}><Bold>Total</Bold></CategoryDetails>
                <CategoryPrice><Money amount={this.totalPrice() * (1 + (_Campaign.service_fee/100))} currency={currency} /></CategoryPrice>
              </PaymentCategory>
            </PaymentBreakdown>

            <NoteText style={{textAlign:'right'}}>
              <Bold>Note: </Bold>
              { isTraditional
                ? 'It may take up to 5 minutes for your ticket to appear under your tickets page.'
                : 'This is a crowdfunded show and you will not be charged until the campaign reaches its goal.' }
            </NoteText>
            
            {/* CHECKOUT - MAKE A PLEDGE - FINALIZE PLEDGE */}
            <ButtonsContainer>
              <LeaveModalButton onClick={() => this.updateState({showModal: false})}><i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Back</LeaveModalButton>
              { !this.props.pledgeLock 
                ? <FormButton onClick={() => this.checkShowSquare()}>Finalize</FormButton>
                : <CheckoutButtonDisabled>Finalize</CheckoutButtonDisabled> }
            </ButtonsContainer>
            <BreakdownHeader>
              If there is an issue with your payment, please reach us via
              &nbsp;<RedLink href={paths.redpineFacebook()} target="_blank">facebook</RedLink>,
              &nbsp;<RedLink href={paths.redpineTwitter()} target="_blank">twitter</RedLink> or
              &nbsp;<RedLink href={paths.supportMail()} target="_blank">email</RedLink>.
            </BreakdownHeader>
          </Containerizer>
          { this.state.showSquare
            ? <SquareFields 
                isPledge={!isTraditional}
                onSubmit={this.submitPledge.bind(this)}
                back={() => this.updateState({showSquare:false})}/>
            : null }
        </ModalWrapper>
      </Modal>
    )
  }

  checkShowSquare(){
    if(this.totalPrice() > 0){
      this.showSquare()
    }else{
      this.submitPledge()
    }
  }

  showSquare(){
    (this.state.goingToSee || []).length > 0
    ? (this.state.first_name || []).length > 0
      ? (this.state.last_name || []).length > 0
        ? (this.state.email || []).length > 0
          ? this.updateState({showSquare:true})
          : this.props.errorMessage('Please add your email.')
        : this.props.errorMessage('Please add your last name.')
      : this.props.errorMessage('Please add your first name.')
    : this.props.errorMessage('Please mark which acts you\'re coming to see!')
  }

  submitPledge(customer) {
    const _Campaign      = RP_Campaign(this.props.campaign)
    const is_crowdfunded = _Campaign.isCrowdfunded()

    const campaignBand_ids = this.state.goingToSee.map((band) => band.id)
    const act_ids          = this.state.goingToSee.map((band) => band.band.id)

    var purchase_option_ids = []
    Object.keys(this.props.purchase_options).forEach(key => {
      var option = this.props.purchase_options[key]
      purchase_option_ids.push(option.id)
    })

    const userArgs = Object.assign({
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.email,
      birthdate: this.state.birthdate
    }, this.state.password && { password: this.state.password })

    const pledgeArgs = {
      total: this.totalPrice(),
      count: this.ticketCount(),
      campaign: _Campaign.id, 
      bands: campaignBand_ids,
      items: purchase_option_ids,
      quantities: this.state.purchaseQuantities,
      token: customer,
      promoter: this.props.promoter
    }

    const is_free = this.totalPrice() == 0
    let subscriptionArgs = []
    if (this.state.subscribe_to_acts) { subscriptionArgs.acts = act_ids }
    if (this.state.subscribe_to_organizations) { subscriptionArgs.organizations = _Campaign.organizations }
    if (this.state.subscribe_to_venue) { subscriptionArgs.venue = _Campaign._Venue.id }

    if(!this.props.pledgeLock){
      if(this.props.authenticated){
        this.props.submitPledge(false, is_free, pledgeArgs, subscriptionArgs)
      }else{
        const is_ghost = userArgs.password ? false : true
        this.props.registerThenPledge(userArgs, is_ghost, is_free, pledgeArgs, subscriptionArgs)
      }
      this.updateState({showModal:false,showSquare:false})
    }
  }

  validateBirthdate(birthdate){
    if(moment(birthdate).isAfter(Date.now())){
      this.props.errorMessage('Your birthdate should have already happened.')
    }else{
      this.updateState({birthdate:moment.utc(birthdate).toISOString().slice(0,-5)})
    }
  }

  itemsSelected(){
    var count = 0
    this.state.purchaseQuantities.forEach(item => {
      if (item != "0"){ count++ } 
    })
    
    if(count == 0){
      this.props.errorMessage("Select at least one item.")
      return false
    }
    
    return true
  }

  updateCart(index,quantity){
    if (this.state.purchaseQuantities.length != this.props.purchase_options.length){
      this.state.purchaseQuantities = Array(this.props.purchase_options.length).fill("0")
    }
    var currentQuantities = this.state.purchaseQuantities
    currentQuantities[index] = quantity
    this.updateState({purchaseQuantities:currentQuantities})
  }

  totalPrice(){
    var total = 0
    if(this.props.purchase_options != null){
      this.state.purchaseQuantities.forEach((item, i) => {
        total += (item * this.props.purchase_options[i].price)
      })
    }
    return total.toFixed(2)
  }

  ticketCount(){
    var total = 0
    if(this.props.purchase_options != null){
      this.state.purchaseQuantities.forEach((item, i) => {
        if(this.props.purchase_options[i].is_ticket){
          total += parseInt(item)
        }
      })
    }
    return total
  }

  initMap() {
    const coords = this.props.campaign.timeslot.venue.location
    const loc = {lat: parseFloat(coords.latitude), lng: parseFloat(coords.longitude)};

    var map = new google.maps.Map(document.getElementById('map'), { zoom: 17, center: loc });
    var marker = new google.maps.Marker({ position: loc, map: map });

    this.updateState({mapInitialized: true})
  }

  showMap() {
    if (!this.state.mapInitialized) {
      this.initMap()
    }
    this.updateState({showMap: true})
  }

  showSelectAct(){
    this.updateState({show_select_act:true})
    this.props.loadUserActs()
  }

  createActThenJoinOpenShow(campaign,act_details){
    if(this.props.user){
      this.updateState({show_select_act:false})
      this.props.createActThenJoinOpenShow(campaign,act_details)
    }else{
      this.updateState({show_select_act:false,show_register:true,act_details:act_details})
    }
  }

  componentDidMount() {
    let id = this.props.match.params.campaignId

    if(!id){
      id = 845
    }
    this.props.loadCampaign(id)

    const params = getQueryParams()
    let promoter = params.promoter ? params.promoter : null
    this.props.setPromoter(promoter)
  }

  componentWillReceiveProps(nextProps) {
    const user = nextProps.user
    if(user){
      this.setState(Object.assign(this.state, {
        //USER INFO
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        birthdate: user.profile.birthdate,

        //CARD INFO
        name: `${user.first_name} ${user.last_name}`
      }))
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state),
    authenticated: appSelectors.selectAuthenticated(state),
    cities: appSelectors.selectCities(state),
    genres: appSelectors.selectGenres(state),

    campaign: selectors.selectCampaign(state),
    campaign_loading: selectors.selectCampaignLoading(state),
    purchase_options: selectors.selectPurchaseOptions(state),
    pledges: selectors.selectPledges(state),
    pledgeError: selectors.selectPledgeError(state),
    pledgeLock: selectors.selectPledgeLock(state),
    user_acts: selectors.selectUserActs(state),
    user_acts_loading: selectors.selectUserActsLoading(state),
    promoter: selectors.selectPromoter(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCampaign: (id) => {
      dispatch(actions.loadCampaign(id))
    },
    setPromoter: (user) => {
      dispatch(actions.setPromoter(user))
    },
    submitPledge: (is_ghost, is_free, pledgeArgs, subscriptionArgs) => {
      dispatch(actions.submitPledge(is_ghost, is_free, pledgeArgs, subscriptionArgs))
    },
    registerThenPledge: (userArgs, is_ghost, is_free, pledgeArgs, subscriptionArgs) => {
      dispatch(actions.submitRegistration(userArgs, is_ghost, is_free, pledgeArgs, subscriptionArgs))
    },
    loadUserActs: () => {
      dispatch(actions.loadUserActs())
    },
    joinOpenShow: (campaign,act) => {
      dispatch(actions.joinOpenShow(campaign,act))
    },
    createActThenJoinOpenShow: (campaign,act_details) => {
      dispatch(actions.createActThenJoinOpenShow(campaign,act_details))
    },
    registerThenCreateAct: (user_details,campaign,act_details) => {
      dispatch(actions.registerThenCreateAct(user_details,campaign,act_details))
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}

//** CHECKOUT CAMPAIGN THUMB CREATOR **
const CheckoutCampaignThumb = ({image}) => (
  <CampaignImage image={image} width="10vmin" height="10vmin" inline radius="0.5vmin" style={{marginRight: '3vmin'}}></CampaignImage>
);
//** FIRST COLUMN GENERATOR **
//* CAMPAIGN THUMBNAIL GENERATOR *
const CampaignThumb = ({image}) => (
  <CampaignImageWrap>
    <CampaignImage inline image={image} width="100%" height="100%" radius="0.5vmin 0.5vmin 0 0"></CampaignImage>
  </CampaignImageWrap>
);

const CampaignImageWrap = styled.div`
  width: 100vmin;
  height: 60vmin;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`
const CampaignImage = styled.div`
  margin: 0 auto;
  position: relative;
  display: ${props => props.inline ? 'inline-block' : 'block'};
  height: ${props => props.height || 'auto' };
  width: ${props => props.width || '100%' };
  max-height: 100%;
  max-width: 100%;
  background: url('${props => props.image || '/Assets/images/defaults/default-thumb.png' }');
  background-size: ${props => props.inline ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  /*background-position: center !important;*/

  border-radius: ${props => props.radius || '0.75vmin' };
`

const Checkbox = styled.input`
  display: inline-block;
  vertical-align: middle;
  width: 3vmin;
  height: 3vmin;
  line-height: 3vmin;
  margin-bottom: 0;
`
const CheckboxValue = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: auto;
  height: 3vmin;
  line-height: 3vmin;
  font-size: 1.8vmin;
  color: ${RP_BLACK};
`

const MobileFirstDiv = styled.div`
  display: block;
  width: 80vw;
  height: auto;
  margin: 0 auto;
  padding-top: 2vmin;

  @media (max-width: 768px) and (orientation: portrait) { 
    width: 90vw;
  }

  @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) { 
    width: 80vw;
  }

  @media (min-width: 769px) and (max-width: 1366px) and (orientation: landscape) { 
    width: 90vw;
  }
`
//**** CAMPAIGN COLUMNS ****
const CampaignTitle = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  width: auto;
  vertical-align: top;
  color: ${RP_BLACK};
  font-size: 3vmin;
  font-weight: 100;
  padding: 3vmin 0;
  margin-bottom: 0;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 4vmin;
    text-align: left;
  }
`
//*** FIRST COLUMN DETAILS ***
const CampaignFirstCol = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 60%;
  height: auto;
  padding: 2vmin 0 5vmin 0;

  @media (max-width: 1024px){ 
    width: 100%;
    padding: 0;
    margin-bottom: 5vmin;
  }
`
const CampaignThumbWrap = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 60vh;
  margin: 0 auto;
  border-radius: 0.5vmin;
  text-align: center;

  @media (max-width: 1024px) and (orientation: portrait) {
    height: 40vmin;
  }
`
//*** SECOND COLUMN DETAILS ***
const CampaignSecondCol = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 39%;
  height: auto;
  padding: 4vmin 0 0 0;

  @media (max-width: 1024px){ 
    width: 100%;
    padding: 0;
    margin-bottom: 5vmin;
  }
`
//** DESKTOP CHECKOUT **
const ModalWrapper = styled.div`
  display: block;
  position: relative;
  width: 60vw;
  margin: 0 auto;
  padding:10vmin 0;

  @media (max-width: 1440px) and (orientation: portrait) { 
    width: 90vw;
  }
`
const Map = styled.div`  
  display: ${props => props.show ? 'block' : 'none'};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: none;
  background: none;
  outline: none;
  padding: 0;
  z-index: 105;
`
const Containerizer = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 5vmin;
  margin-top: 5vmin;
  background: ${RP_SUPER_LIGHT};
  border: 1px solid ${RP_GREY};
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 0.5vmin;
`
const SectionalHeading = styled.div`
  display: block;
  position: relative;
  padding: 5vmin 0 2vmin 0;
  font-size: 2.3vmin;
  color: ${RP_BLACK};
  font-weight: bold;

  &:first-child {
    padding-top: 0;
  }
`
const CheckoutDetails = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 2.3vmin 0;
`
const CheckoutHeadingText = styled.div`
  display: block;
  position: relative;
  color: ${RP_BLACK};
  font-size: 4vmin;
  font-weight: normal;

  @media (max-width: 768px) and (orientation: portrait) { 
    font-size: 2.3vmin;
    font-weight: bold;
  }
`
const CheckoutNormalText = styled.div`  
  display: block;
  position: relative;
  font-size: 2vmin;
  font-weight: normal;
`
const NoteText = styled.div`
  color: #000;
  font-size: 1.6vmin;
`
const CheckoutInput = styled(Input)`
  min-width: 20vw;
  max-width: 26vw;

  &:hover {
    border-color: ${RP_DARK_GREY};
  }

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
`
const ButtonsContainer = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0;
  padding: 5vmin 0 0 0;
  text-align: right;
`
const CheckoutButtonDisabled = styled(FormButton)`
  cursor: defualt !important;
  display: block;
  position: relative;
  float: right;
  background: ${RP_DARK_GREY};
  color: #FFF;

  &:hover {
    background: ${RP_DARK_GREY};
    color: #FFF;
  }
`
const LeaveModalButton = styled(FormButton)`
  margin-right: 2vmin;
  background: #FFF;
  color: ${RP_DARK_GREY};

  &:hover {
    background: #FFF;
    color: ${RP_BLACK};
  }
`
const PaymentBreakdown = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 1.8vmin;
`
const BreakdownHeader = styled(PaymentBreakdown)`
  display: inline-block;
  font-size: 1.8vmin;
  font-weight: bold;
  text-align: left;
`
const PaymentCategory = styled(PaymentBreakdown)`
  display: inline-block;
  border-bottom: 1px solid ${RP_GREY};
  padding: 2vmin 0 1vmin 0;
`
const CategoryName = styled.div`
  display: inline-block;
  position: relative;
  width: 20%;
  padding: 0 1vmin;
  text-align: left;
`
const CategoryDetails = styled.div`
  display: inline-block;
  position: relative;
  width: 40%;
  padding: 0 1vmin;
  text-align: left;
`
const CategoryPrice = styled.div`
  display: inline-block;
  position: relative;
  width: 20%;
  padding: 0 1vmin;
  text-align: right;
`
const FullPage = styled.div`
  margin: 0; 
  padding: 0; 
  height: 100vh; 
  overflow: hidden;
`
const DescriptionFrame = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 3vmin;
  margin: 0 auto;
  word-wrap: break-word;
  text-align: left;
  color: ${RP_BLACK};
  font-family: ${RP_FONT};
  font-size: 2vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`
const DescriptionHeader = styled.div`
  display: block;
  position: relative;
  font-size: 2vmin;
  padding-bottom: 3vmin;
  text-align: left;
  font-family: ${RP_FONT};
  font-weight: bold;
  color: ${RP_BLACK};

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3.5vmin;
  }
`
export default connect(mapStateToProps, mapDispatchToProps)(Show)