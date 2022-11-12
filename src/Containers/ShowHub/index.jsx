import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import moment from 'moment'

import { paths } from 'globals'
import { RP_Campaign, RP_Venue, RP_User } from 'Models'

import { App } from 'Containers'
import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'

import { RP_RED, RP_BLACK, RP_GREEN, RP_BLUE, RP_DARKBLUE, RP_ORANGE } from 'Components' //GLOBALS
import { LoadingIndicator } from 'Components'
import { BackgroundImage } from 'Components' //IMAGE
import { HintFader } from 'Components'
import { Modal, WarningModal } from 'Components'
import { Link } from 'Components'

import { AddActs } from 'Components'

import { PurchaseOptions } from './PurchaseOptions/index.jsx'
import { Checklist } from './Checklist/index.jsx'
import { Documents } from './Documents/index.jsx'
import { Promotion } from './Promotion/index.jsx'
import { Tickets } from './Tickets/index.jsx'
import { Details } from './Details/index.jsx'
import { People } from './People/index.jsx'
import { Feed } from './Feed/index.jsx'

import { EditPurchases } from './Edit/EditPurchases/index.jsx'
import { EditDetails } from './Edit/EditDetails/index.jsx'
import { EditDates } from './Edit/EditDates/index.jsx'
import { EditGoals } from './Edit/EditGoals/index.jsx'

import { SideBar } from './SideBar/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class ShowHub extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      show_edit: false,
      edit_details: false,
      edit_purchases: false,
      edit_dates: false,
      edit_goals: false,
      search_acts: false,
      category: 'details'
    }
  }

  render() {
    const user               = this.props.user || null
    const campaign           = this.props.campaign || null
    const act_search_results = this.props.act_search_results || []

    const _Campaign          = RP_Campaign(campaign)
    const progress           = _Campaign.progress()
    const is_selling         = _Campaign.isSelling()
    const is_owner           = _Campaign.userIsOwner(user)
    const is_manager         = _Campaign.userIsVenueManager(user)
    const is_organization    = _Campaign.userIsOrganizationManager(user)
    const is_act_owner          = _Campaign.userIsActOwner(user)
    const is_approved_act_owner = _Campaign.userIsApprovedActOwner(user)

    const timeslot           = _Campaign.timeslot
    const venue              = timeslot && timeslot.venue || null

    const funding_end        = moment(campaign && campaign.funding_end || null)
    const start_time         = moment(_Campaign.event_start)
    const end_time           = moment(_Campaign.event_end)

    const userId             = user && user.id
    const feed               = (campaign && campaign.feed || []).sort((a,b) => (a.created_date > b.created_date) ? -1 : 1)
    const acts               = (campaign && campaign.bands || []).filter(act => act.is_accepted !== false)
    const organizations      = (campaign && campaign.organizations || []).filter(organization => organization.is_accepted !== false)
    const campaignId         = campaign && campaign.id || 0
    const title              = campaign && campaign.title || ''
    const description        = campaign && campaign.description || ''
    const hashtag            = campaign && campaign.hashtag || ''
    const is_open            = campaign && campaign.is_open || false
    const is_successful      = campaign && campaign.is_successful || null
    const purchase_options   = campaign && campaign.purchase_options || []
    const documents          = campaign && campaign.documents || []

    const goal_count         = timeslot && timeslot.min_headcount || 0
    const goal_amount        = timeslot && timeslot.asking_price || 0.00

    const _Venue             = _Campaign._Venue
    const venueId            = _Venue.id

    const taskList           = campaign && this.getTaskList(campaign) || null
    const can_chat           = (is_owner || is_manager || is_organization || is_act_owner)
    const can_edit           = (is_owner || is_manager || is_organization || is_approved_act_owner)

    const global_settings    = this.props.global_settings
    const feed_picture       = global_settings && global_settings.feed_picture ? global_settings.feed_picture : '/Assets/images/background/bg14.jpg'

    return (
      <App requireAuth>
        <BackgroundImage image={feed_picture}>
          <Overlay/>
          {/* DETAILS + FEED */}
          <MobileFirstDiv>
            <SideBar onSelect={(selected) => this.navigate(selected)} is_owner={is_owner} show_venue_link={!_Campaign.is_only_tickets}/>

            <LoadingIndicator loading={this.props.campaign_loading} style={{paddingTop:'20vh'}}>
              <HubCategory visible={this.state.category == "checklist"}>
                <Checklist 
                  campaign={campaign}
                  updateShow={(details) => this.props.updateCampaignDetails(campaign,details)}/>
                <HintFader hints={this.props.hints}/>
              </HubCategory>
v
              <HubCategory visible={this.state.category == "details"}>
                <Details 
                  campaign={campaign}
                  can_edit={can_edit}
                  editDates={() => this.openEditDates()}
                  editDetails={() => this.openEditDetails()}
                  editGoals={() => this.openEditGoals()}/>
                <People 
                  user={user}
                  acts={acts}
                  venue={_Venue.venue} 
                  organizations={organizations}
                  campaign={campaign}
                  can_edit={can_edit}
                  is_manager={is_manager}
                  is_owner={is_owner}
                  is_organization={is_organization}
                  is_active={is_selling}
                  searchActs={() => this.openSearchActs()}
                  acceptShow={(band) => this.acceptShow(band)}
                  rejectShow={(band) => this.rejectShow(band)}
                  changeHeadliner={(band) => this.changeHeadliner(band)}
                  changeStart={(campaign_band,time) => this.changeStart(campaign_band,time)}
                  removeAct={(band) => this.removeCampaignBand(band)}
                  approveApplication={(band) => this.approveApplication(band)}
                  rejectApplication={(band) => this.rejectApplication(band)}
                  openCampaign={() => this.openCampaign(campaign)}
                  saveLineup={() => this.saveLineup()}/>
                <HintFader hints={this.props.hints}/>
              </HubCategory>

              <HubCategory visible={this.state.category == "tickets"}>
                <Tickets
                  user={user}
                  campaign={campaign}
                  is_owner={is_owner}
                  is_manager={is_manager}
                  is_organization={is_organization}
                  pledges={this.props.pledges}
                  stats_loading={this.props.pledges_loading}
                  third_party_tickets={_Campaign.third_party_tickets}
                  addTicketingLink={(link) => this.addTicketingLink(link)}
                  editDates={() => this.openEditDates()}
                  editDetails={() => this.openEditDetails()}/>
                <PurchaseOptions
                  is_active={is_selling && is_owner}
                  purchase_options={purchase_options}
                  editPurchases={() => this.openEditPurchases()}/>
                <HintFader hints={this.props.hints}/>
              </HubCategory>

              <HubCategory visible={this.state.category == "promotion"}>
                <Promotion
                  can_edit={can_edit}
                  pledges={this.props.pledges}
                  promoter_cut={_Campaign.promoter_cut}
                  updatePromoterCut={(bonus) => this.updatePromoterCut(bonus)}
                  error={this.props.errorMessage.bind(this)}/>
                <HintFader hints={this.props.hints}/>
              </HubCategory>

              <HubCategory visible={this.state.category == "chat"}>
                <Feed 
                  campaign={campaign}
                  feed={feed} 
                  can_chat={can_chat}
                  sendMessage={this.sendMessage.bind(this)} 
                  error={this.props.errorMessage.bind(this)}/>
              </HubCategory>

              <HubCategory visible={this.state.category == "documents"}>
                <Documents 
                  documents={documents}
                  saveDocument={
                    (data,filename) => this.props.saveDocument(campaign, {
                      'document': data,
                      'name': filename,
                      'campaign': campaign.id
                    })
                  }/>
                <HintFader hints={this.props.hints}/>
              </HubCategory>
            </LoadingIndicator>
            { this.props.campaign 
              ? null 
              : <AwaitingRedPineApproval>
                  Newly requested shows will take a few minutes to appear.
                  <br/>
                  RedPine checks requests for genre fit and anti-spam, then the venue decides.
                  <br/>
                  -
                  <br/>
                  If you could previously access this show, then it was likely removed by the organizer.
                </AwaitingRedPineApproval> }
          </MobileFirstDiv>

          {/* EDIT MODAL */}
          <Modal show={this.state.show_edit} onClose={(e) => this.closeModal()} transparent>
            { this.state.edit_dates
              ? <EditDates 
                  venue={_Venue.venue}
                  start_time={start_time} 
                  end_time={end_time} 
                  back={() => this.closeModal()}
                  save={(data) => this.saveDates(data)}
                  error={this.props.errorMessage.bind(this)}/>
              : null }

            { this.state.edit_details
              ? <EditDetails 
                  picture={_Campaign.picture}
                  title={title}
                  description={description}
                  hashtag={hashtag}
                  back={() => this.closeModal()}
                  save={(data) => this.saveDetails(data)}/>
              : null }

            { this.state.edit_goals
              ? <EditGoals                   
                  venue={_Venue.venue}
                  campaign={campaign}
                  goal_count={goal_count}
                  goal_amount={goal_amount}
                  funding_end={funding_end}
                  is_successful={is_successful}
                  back={() => this.closeModal()}
                  save={(campaign_data,timeslot_data,bookNow) => this.saveGoals(campaign_data,timeslot_data,bookNow)}
                  error={this.props.errorMessage.bind(this)}/>
              : null }

            { this.state.edit_purchases
              ? <EditPurchases 
                  purchase_options={purchase_options}
                  back={() => this.closeModal()}
                  updateItem={(purchase_item) => this.props.updatePurchaseItem(purchase_item.id,purchase_item,_Campaign.id)}
                  onDelete={(id) => {
                    this.props.deletePurchaseItem(id,_Campaign.id)
                    this.closeModal() 
                  }}
                  save={(purchase_items) => this.savePurchases(purchase_items)}
                  error={this.props.errorMessage.bind(this)}/>
              : null }

          { this.state.search_acts
            ? <AddActs 
                acts={acts}
                user_acts={this.props.user_acts}
                user_acts_loading={this.props.user_acts_loading}
                search_acts={act_search_results}
                search_acts_loading={this.props.search_acts_loading}
                verify_acts={this.props.verify_acts}
                verify_acts_loading={this.props.verify_acts_loading}
                loadUserActs={() => this.props.loadUserActs()}
                searchActs={(query) => this.props.searchActs(query)}
                inviteAct={(name,email) => this.props.inviteAct(campaign,name,email)}
                save={(acts) => this.addActs(acts)}
                back={() => this.closeModal()}
                success={this.props.successMessage.bind(this)}
                error={this.props.errorMessage.bind(this)}/>
            : null }

          </Modal>
        </BackgroundImage>
        <WarningModal light_warning
          show={this.state.show_warning}
          description="You are about to delete this show. If there are others involved, be sure to let them know why it's being removed - if you haven't already."
          onContinue={() => this.props.deleteShow(_Campaign.id, is_manager, _Venue.id)}
          onClose={() => this.updateState({show_warning:false})}/>
      </App>
    )
  }

  navigate(category){
    const _Campaign = RP_Campaign(this.props.campaign)

    if(category == 'links/show'){
      this.props.redirectToShow(_Campaign.id)
    }else if(category == 'guest_list'){
      this.props.redirectToGuestList(_Campaign.id)
    }else if(category == 'links/venue'){
      this.props.redirectToVenue(_Campaign._Venue.id)
    }else if(category == 'actions/delete'){
      this.updateState({show_warning:true})
    }else{
      this.updateState({category:category})
    }
  }

  /*******************
  ** EDIT/SAVE INFO **
  *******************/

  openEditDates(){ 
    this.updateState({show_edit:true,edit_details:false,edit_purchases:false,edit_dates:true,edit_goals:false,search_acts:false})
  }
  openEditDetails(){ 
    this.updateState({show_edit:true,edit_details:true,edit_purchases:false,edit_dates:false,edit_goals:false,search_acts:false})
  }
  openEditGoals(){ 
    this.updateState({show_edit:true,edit_details:false,edit_purchases:false,edit_dates:false,edit_goals:true,search_acts:false})
  }
  openEditPurchases(){ 
    this.updateState({show_edit:true,edit_details:false,edit_purchases:true,edit_dates:false,edit_goals:false,search_acts:false})
  }
  openSearchActs(){ 
    this.updateState({show_edit:true,edit_details:false,edit_purchases:false,edit_dates:false,edit_goals:false,search_acts:true})
  }

  closeModal() {
    this.updateState({
      show_edit:false,
      edit_details:false,
      edit_purchases:false,
      edit_dates:false,
      edit_goals:false,
      search_acts:false
    })
  }

  saveDates(data){
    const campaign = this.props.campaign
    const timeslot = campaign && campaign.timeslot || null

    this.props.updateDate(campaign,timeslot,data)
    this.closeModal()
  }

  saveDetails(data){
    const campaign = this.props.campaign

    this.props.updateCampaignDetails(campaign,data)
    this.closeModal()
  }

  saveGoals(campaign_data,timeslot_data,bookNow){
    const campaign = this.props.campaign
    const timeslot = campaign && campaign.timeslot || null

    if (bookNow) {
      this.props.bookNow(campaign)
    }else{
      this.props.updateCampaignDetails(campaign,campaign_data)
      this.props.updateRequirements(campaign,timeslot,timeslot_data)
    }
    
    this.closeModal()
  }

  savePurchases(purchase_items){
    const campaign = this.props.campaign

    let new_items = []
    purchase_items.forEach(item => {
      if(!item.campaign){
        item.campaign = campaign.id
        new_items.push(item)
      }
    })

    if(new_items.length > 0){
      this.props.addPurchaseItems(campaign,new_items)
    }
    this.closeModal()
  }

  addTicketingLink(link){
    const data = {
      third_party_tickets: link
    }

    const campaign = this.props.campaign
    this.props.updateCampaignDetails(campaign,data)
  }

  updatePromoterCut(bonus){
    const data = {
      promoter_cut: bonus
    }

    const campaign = this.props.campaign
    this.props.updateCampaignDetails(campaign,data)
  }

  /****************
  ** MANAGE ACTS **
  ****************/

  addActs(acts){
    const _User    = RP_User(this.props.user)
    const campaign = this.props.campaign
    
    let data = []
    acts.forEach(act => {
      data.push({
        band: act.id,
        campaign: campaign.id,
        is_headliner: false,
        is_accepted: null,
        is_application: true
      })
    })

    this.props.addActs(campaign,acts,data)
    this.closeModal()
  }

  removeCampaignBand(campaign_band){
    const _User       = RP_User(this.props.user)
    const campaign    = this.props.campaign
    const was_removed = campaign_band.band && (RP_User(campaign_band.band.owner).id == _User.id)

    this.props.removeCampaignBand(campaign,campaign_band,was_removed)
  }

  changeHeadliner(campaign_band){
    const campaign  = this.props.campaign
    const bands     = campaign && campaign.bands || null
    const headliner = bands.filter((band) => (band.is_headliner))[0]

    if(headliner){
      const data = {
        id: headliner.id,
        campaign: campaign.id,
        is_headliner: false
      }
      this.props.updateCampaignBand(campaign,headliner,data,"Headliner")
    }

    const data2 = {
      id: campaign_band.id,
      campaign: campaign.id,
      is_headliner: true
    }
    this.props.updateCampaignBand(campaign,campaign_band,data2,"Headliner")
  }

  changeStart(campaign_band,time){
    const campaign  = this.props.campaign
    const data = {
      id: campaign_band.id,
      campaign: campaign.id,
      start_time: time
    }
    this.props.updateCampaignBand(campaign,campaign_band,data,"Set_Times")
  }

  acceptShow(campaign_band){
    const campaign = this.props.campaign
    const data = {
      id: campaign_band.id,
      campaign: campaign.id,
      is_accepted: true
    }
    this.props.updateCampaignBand(campaign,campaign_band,data,"Accept")
  }

  rejectShow(campaign_band){
    const campaign = this.props.campaign
    const data = {
      id: campaign_band.id,
      campaign: campaign.id,
      is_accepted: false
    }
    this.props.updateCampaignBand(campaign,campaign_band,data,"Reject")
  }

  approveApplication(campaign_band){
    const campaign = this.props.campaign
    const data = Object.assign({
        id: campaign_band.id,
        campaign: campaign.id,
        is_application: true
      }, 
      //If auto-accept show after application approval if it's one of the user's acts.
      campaign_band.band.owner == this.props.user.id && { is_accepted: true }
    )
    this.props.updateCampaignBand(campaign,campaign_band,data,"Approve_Application")
  }

  rejectApplication(campaign_band){
    const campaign = this.props.campaign
    const data = {
      id: campaign_band.id,
      campaign: campaign.id,
      is_application: false,
      is_accepted: false
    }
    this.props.updateCampaignBand(campaign,campaign_band,data,"Reject_Application")
  }

  openCampaign(){
    const campaign = this.props.campaign
    const campaign_data = {
      is_open: true
    }
    this.props.updateCampaignDetails(campaign,campaign_data)
  }

  saveLineup(){
    const campaign = this.props.campaign
    const campaign_data = {
      is_open: false
    }
    this.props.updateCampaignDetails(campaign,campaign_data)
  }

  /*******************
  ** TASK CHECKLIST **
  *******************/

  getTaskList(campaign) {
    return campaign ? {
      has_event_page: campaign.has_event_page,
      has_set_order: campaign.has_set_order,
      has_door_plan: campaign.has_door_plan,
      has_sound_plan: campaign.has_sound_plan,
      has_equipment_plan: campaign.has_equipment_plan
    } : null
  }

  updateTasks(taskList) {
    taskList.id = this.props.campaign.id
    this.props.updateTasks(taskList)
  }

  /******************
  ** FEED MESSAGES **
  ******************/
  
  sendMessage(text) {
    const user = this.props.user
    const campaign = this.props.campaign

    if (campaign && user){
      this.props.sendMessage({
        campaign: campaign.id,
        sender: user.id,
        is_system: false,
        item_type: 1, //Message
        text: text
      })
    }
  }

  /******************
  ** SAVE DOCUMENT **
  *******************/

  saveDocument(data,filename){
    const campaign = this.props.campaign
    const file = {
      'document': data,
      'name': filename,
      'campaign': campaign.id
    }
    this.props.saveDocument(campaign,file)
  }

  /********************
  ** REACT LIFECYCLE **
  ********************/

  componentDidMount() {
    const id = this.props.match.params.campaignId
    if (id){
      this.props.loadCampaign(id)
    }
    this.props.loadHints()
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    campaign: selectors.selectCampaign(state),
    campaign_loading: selectors.selectCampaignLoading(state),
    act_search_results: selectors.selectSearchActs(state),
    act_search_loading: selectors.selectSearchActsLoading(state),
    hints: selectors.selectHints(state),
    user: appSelectors.selectUser(state),
    global_settings: appSelectors.selectSettings(state, props),
    pledges: selectors.selectPledges(state, props),
    pledges_loading: selectors.selectPledgesLoading(state, props),
    user_acts: selectors.selectUserActs(state),
    user_acts_loading: selectors.selectUserActsLoading(state),
    verify_acts: selectors.selectVerifyActs(state),
    verify_acts_loading: selectors.selectVerifyActsLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadCampaign: (id) => {
      dispatch(actions.loadCampaign(id))
    },
    loadHints: (id) => {
      dispatch(actions.loadHints())
    },
    loadUserActs: () => {
      dispatch(actions.loadUserActs())
    },    
    updateCampaignDetails: (campaign,data) => {
      dispatch(actions.updateCampaignDetails(campaign,data))
    },
    updateDate: (campaign,timeslot,data) => {
      dispatch(actions.updateDate(campaign,timeslot,data))
    },
    updateRequirements: (campaign,timeslot,data) => {
      dispatch(actions.updateRequirements(campaign,timeslot,data))
    },
    searchActs: (query) => {
      dispatch(actions.searchActs(query))
    },
    inviteAct: (campaign,name,email) => {
      dispatch(actions.inviteAct(campaign,name,email))
    },
    addActs: (campaign,acts,data) => {
      dispatch(actions.addCampaignBands(campaign,acts,data))
    },
    updateCampaignBand: (campaign,campaign_band,data,update_type) => {
      dispatch(actions.updateCampaignBand(campaign,campaign_band,data,update_type))
    },
    removeCampaignBand: (campaign,campaign_band,was_removed) => {
      dispatch(actions.removeCampaignBand(campaign,campaign_band,was_removed))
    },
    updateTasks: (taskList) => {
      dispatch(actions.updateTasks(taskList))
    }, 
    addPurchaseItems: (campaign,new_items) => {
      dispatch(actions.addPurchaseItems(campaign,new_items))
    },
    updatePurchaseItem: (id,data,campaign_id) => {
      dispatch(actions.updatePurchaseItem(id,data,campaign_id))
    },
    deletePurchaseItem: (id,campaign_id) => {
      dispatch(actions.deletePurchaseItem(id,campaign_id))
    },
    sendMessage: (message) => {
      dispatch(actions.sendMessage(message))
    },
    bookNow: (campaign) => {
      dispatch(actions.bookNow(campaign))
    },
    saveDocument: (campaign,file) => {
      dispatch(actions.saveDocument(campaign,file))
    },
    deleteShow: (show, is_manager, venue_id) => {
      dispatch(actions.deleteShow(show, is_manager, venue_id))
    },
    redirectToGuestList: (id) => {
      dispatch(push(paths.guestList(id)))
    },
    redirectToShow: (id) => {
      dispatch(push(paths.shows(id)))
    },
    redirectToVenue: (id) => {
      dispatch(push(paths.venues(id)))
    },
    successMessage: (text) => {
      dispatch(appActions.success_message(text))
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}

const MobileFirstDiv = styled.div`
  position: relative;
  width: 50%;
  display: block;
  margin: 0 auto;
  background: #FFF;
  min-height: 80vh;

  @media (max-width: 1512px) { 
    width: 70%;
  }

  @media (max-width: 1024px) { 
    width: 100%;
  }
`
const ActionTab = ({icon,text,link,onClick,color}) => (
  link
  ? <Link href={link}>
      <ColouredBox color={color}>
        <i className={icon} />&nbsp;&nbsp;{text}
      </ColouredBox>
    </Link>
  : <ColouredBox onClick={onClick} color={color}>
      <i className={icon} />&nbsp;&nbsp;{text}
    </ColouredBox>
)
const ColouredBox = styled.div`
  display: inline-block;
  margin-top: 0.5vmin;
  padding: 1vmin 2vmin;
  background: ${props => props.color || RP_RED};
  color: #FFF;
  font-size: 1.5vmin;

  &:hover {
    background: #FFF;
    cursor: pointer;
    color: ${RP_RED};
  }
`
const Overlay = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.35);
  border-radius: inherit;
`
const HubCategory = styled.div`
  min-height: 90vh;
  width: calc(100% - 64px);
  display: inline-block;
  vertical-align:top;
  margin-left: 64px;
  background: #FFF;
  color: ${RP_BLACK};

  display: ${props => props.visible ? 'block' : 'none'};
`
const AwaitingRedPineApproval = styled.div`
  color: ${RP_BLACK};
  text-align: center;
  font-size: 1.75vmin;
  padding: 2vmin 0.25vmin 0 2vmin;
  margin: 2vmin 0 0 0;
  letter-spacing: 1.25px;
  font-weight: 200;

  @media (max-width: 768px) and (orientation: portrait){
    padding-left: 15vmin;
  }
`
export default connect(mapStateToProps, mapDispatchToProps)(ShowHub)