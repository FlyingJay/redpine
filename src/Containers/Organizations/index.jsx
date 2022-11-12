import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { RP_Act, RP_Organization, RP_User } from 'Models'
import { validators, paths } from 'globals'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { RP_RED, RP_BLACK, RP_SUPER_LIGHT, RP_PINK, RP_BLUE, RP_DARKBLUE, RP_GREEN, RP_PURPLE, GRAPH_MAGENTA,
          SPOTIFY_GREEN, RP_ORANGE, RP_DARKORANGE, Bold, MyPageWrapper } from 'Components' // GLOBALS
import { Modal, WarningModal, SidePanel, ModalSection, ModalHeading, ModalSubheading, PositiveButton, NegativeButton } from 'Components'  // MODAL & MODALOTHER
import { EditOrganization } from 'Components'
import { FormSeparator } from 'Components' // BUTTON
import { BaseButton } from 'Components' // BUTTON
import { MainEntity, SpecialRedPineHeading, NoDataFound, ColorButton, IconButton } from 'Components' // MY
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { ShowResult } from 'Components' // SHOWRESULT
import { AddActs } from 'Components'
import { Title } from 'Components'
import { Input } from 'Components'

import { OrganizationAct } from './OrganizationAct/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class Organizations extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selected_organization: null,
      payout_amounts: {},
      show_edit_organization: false,
      show_add_acts: false,
      show_remove_act_warning: false,
      showPayoutPanel: false
    }
  }

  render() {
    const _User           = RP_User(this.props.user)
    const organizations   = this.props.organizations || []
    const activeCampaigns = (this.props.activeCampaigns || []).filter(campaign => campaign.is_venue_approved)

    const _Organization      = RP_Organization(this.state.selected_organization)
    const act_search_results = this.props.act_search_results || []

    return (
      <App requireAuth venuePage artistPage>
        <MyPageWrapper>
          <Title title='Organizations' summary='Connect your collective'/>
          <LoadingIndicator loading={this.props.organizations_loading} is_child_visible={organizations.length > 0}>
            { organizations.length > 0
              ? organizations.map((organization, index) => {
                  const _Organization = RP_Organization(organization)
                  return <MainEntity key={_Organization.id}
                          picture={_Organization.picture}
                          title={_Organization.title}
                          link={paths.organizations(_Organization.id)}
                          onAdd={() => this.updateState({selected_organization:_Organization.organization,show_add_acts:true})}
                          actions={[
                            <ColorButton key={_Organization.id+"o_1"}
                              onClick={() => this.updateState({show_edit_organization:true, selected_organization:organization})}>
                              <i className="fa fa-pencil"/>&nbsp;&nbsp;
                              Edit
                            </ColorButton>,
                            <ColorButton key={_Organization.id+"o_2"} color={RP_RED} hoverColor={RP_PINK}
                              onClick={() => this.props.organizationCalendar(_Organization.id)}>
                              <i className="fa fa-calendar"/>&nbsp;&nbsp;
                              Calendar
                            </ColorButton>,
                            <ColorButton key={_Organization.id+"o_3"} color={RP_ORANGE} hoverColor={RP_DARKORANGE}
                              onClick={() => this.props.organizationProfile(_Organization.id)}>
                              <i className="fa fa-user"/>&nbsp;&nbsp;
                              Profile
                            </ColorButton>,
                            <ColorButton key={_Organization.id+"o_4"} color={RP_GREEN} hoverColor={SPOTIFY_GREEN} onClick={() => this.payout(_Organization)}>
                              <i className="fa fa-usd"/>&nbsp;&nbsp;
                              Pay Me
                            </ColorButton>,
                            <ActBalance key={_Organization.id+"_balance"} onClick={() => this.payout(_Organization)}>
                              ${_Organization.account_balance}
                            </ActBalance>]}>
                          
                          <FormSeparator text="Acts" padding="0"/>
                          { _Organization.bands.map(organization_band => {
                            const _Act = RP_Act(organization_band.band)
                            if(organization_band.is_accepted || organization_band.is_application){
                              return <OrganizationAct key={organization_band.id}
                                        picture={_Act.picture}
                                        title={
                                          <span>
                                            { _Act.name }&nbsp;
                                            { organization_band.is_accepted && organization_band.is_application
                                              ? <i className="fa fa-check-circle" style={{color:RP_GREEN}} />
                                              : <i className="fa fa-question-circle-o" style={{color:RP_RED}} /> }
                                          </span>}
                                        subtitle={
                                          organization_band.is_application === null
                                          ? _Organization.userIsManager(_User.user)
                                            ? 'Do you work with this act?'
                                            : 'Awaiting approval'
                                          : organization_band.is_accepted === null 
                                            ? _Act.userIsOwner(_User.user)
                                              ? 'Does your act work with this organization?'
                                              : 'Awaiting approval'
                                            : null
                                        }
                                        link={paths.acts(_Act.id)}
                                        actions={
                                          (organization_band.is_accepted === null && _Act.userIsOwner(_User.user)) || 
                                          (organization_band.is_application === null && _Organization.userIsManager(_User.user))
                                          ? <div>
                                              <IconButton key={_Act.id+"p_1"} color={RP_GREEN} hoverColor={SPOTIFY_GREEN}
                                                onClick={() => this.props.confirmOrganizationMembership(organization_band.id)}>
                                                <i className="fa fa-check"/>
                                              </IconButton>
                                              <IconButton key={_Act.id+"p_2"} color={RP_PINK} hoverColor={RP_RED}
                                                onClick={() => this.props.denyOrganizationMembership(organization_band.id)}>
                                                <i className="fa fa-times"/>
                                              </IconButton>
                                            </div>
                                          : <div>
                                              { _User.id && _Act.owner === _User.id
                                                ? <IconButton key={_Act.id+"a_1"}
                                                    onClick={() => this.props.myActs()}>
                                                    <i className="fa fa-pencil"/>
                                                  </IconButton>
                                                : null }
                                              { _User.id && _Act.owner !== _User.id
                                                ? <IconButton key={_Act.id+"a_2"}
                                                    onClick={() => this.props.messageUser(_Act.owner)}>
                                                    <i className="fa fa-envelope"/>
                                                  </IconButton>
                                                : null }
                                              <IconButton key={_Act.id+"a_3"} color={RP_ORANGE} hoverColor={RP_DARKORANGE}
                                                onClick={() => this.props.actProfile(_Act.id)}>
                                                &nbsp;<i className="fa fa-user"/>&nbsp;
                                              </IconButton>
                                              { organization_band.is_accepted && organization_band.is_application
                                                ? <IconButton key={_Act.id+"a_4"} color={RP_GREEN} hoverColor={SPOTIFY_GREEN}
                                                    onClick={() => this.updateState({showPayoutPanel:true,selected_organization:_Organization.organization})}>
                                                    &nbsp;<i className="fa fa-usd"/>&nbsp;
                                                  </IconButton>
                                                : null }
                                              <IconButton key={_Act.id+"a_5"} color={GRAPH_MAGENTA} hoverColor={RP_PURPLE}
                                                onClick={() => this.props.actStats(_Act.id)}>
                                                <i className="fa fa-bar-chart"/>
                                              </IconButton>
                                              <IconButton key={_Act.id+"a_6"} color={RP_PINK} hoverColor={RP_RED}
                                                onClick={() => this.updateState({show_remove_act_warning:true,removing_act:organization_band})}>
                                                <i className="fa fa-times"/>
                                              </IconButton>
                                            </div>}/>
                            }
                          }) }
                         </MainEntity> })
              : null }
            <MainEntity 
              new_picture='/Assets/images/apps/organizations.png' 
              onCreate={() => this.updateState({show_edit_organization:true, selected_organization:RP_Organization(null)})}/>
          </LoadingIndicator>

          <SpecialRedPineHeading>Active Shows</SpecialRedPineHeading>
          <LoadingIndicator loading={this.props.activeCampaigns_loading}>
            { activeCampaigns.length > 0
              ? activeCampaigns.map((campaign, index) => <ShowResult key={campaign.id} campaign={campaign} show_venue_name/>)
              : <NoDataFound>
                  There are no upcoming shows for any of your organizations, but if you had one this is where it would be.
                </NoDataFound> }
          </LoadingIndicator>
        </MyPageWrapper>

        { this.state.show_edit_organization
          ? <EditOrganization 
              organization={this.state.selected_organization}
              onCreate={(organization) => this.props.createOrganization(organization)}
              onUpdate={(organization) => this.props.updateOrganization(organization)}
              onClose={() => this.updateState({show_edit_organization: false})}
              error={this.props.error}/>
          : null }
        
        { this.state.show_add_acts
          ? <Modal onClose={(e) => this.updateState({show_add_acts:false})} show transparent>
              <AddActs
                acts={_Organization.confirmed_acts(true)}
                user_acts={this.props.user_acts}
                user_acts_loading={this.props.user_acts_loading}
                search_acts={act_search_results}
                search_acts_loading={this.props.search_acts_loading}
                verify_acts={this.props.verify_acts}
                verify_acts_loading={this.props.verify_acts_loading}
                loadUserActs={() => this.props.loadUserActs()}
                searchActs={(query) => this.props.searchActs(query)}
                inviteAct={(name,email) => this.props.inviteAct(_Organization.organization,name,email)}
                save={(acts) => this.addActs(acts)}
                back={() => this.updateState({show_add_acts:false})}
                success={this.props.successMessage.bind(this)}
                error={this.props.errorMessage.bind(this)}/>
            </Modal> 
          : null }

        <Modal show={this.state.showPayoutPanel} onClose={(e) => this.updateState({showPayoutPanel:false})} transparent>
          <SidePanel>
            <ModalSection top>
              <ModalHeading>Payouts for {_Organization.title}..</ModalHeading>
              <ModalSubheading>Enter an amount to pay an act...</ModalSubheading>
            </ModalSection>
            <ModalSection>
              {_Organization.title} has <Bold>${_Organization.account_balance}</Bold> in their account.
            </ModalSection>
            <ModalSection>
              { _Organization.confirmed_acts().map(act => { return <div key={act.id}>
                  <PayoutLabel>{act.name}</PayoutLabel>
                  <div style={{width:'40%',display:'inline-block'}}>
                    <Input
                      validate={validators.POSITIVE_DOLLAR()}
                      onValidate={(text) => this.updatePayoutAmount(act.id,text)}
                      placeholder='0.00'
                      image='money'
                      focusImage='money-focus' 
                      inline />
                  </div>
                </div> }) }
              <TextRight style={{display:'block',paddingTop:'2vmin'}}>
                { this.verifyBalance()
                  ? <PositiveButton onClick={() => this.payActs()}>Pay Acts</PositiveButton>
                  : <NegativeButton onClick={() => this.props.errorMessage('The organization doesn\'t have enough money to pay this much!')}>Pay Acts</NegativeButton> }
              </TextRight>
            </ModalSection>
          </SidePanel>
        </Modal>
        <WarningModal light_warning
          show={this.state.show_payout_warning}
          description="Are you sure you would like to withdraw all funds from your organization?"
          onContinue={() => this.props.payout(this.state.paying_organization)}
          onClose={() => this.updateState({show_payout_warning:false,paying_organization:null})}/>
        <WarningModal light_warning
          show={this.state.show_remove_act_warning}
          description="You are about to remove an act from your organization."
          onContinue={() => this.props.removeOrganizationBand(this.state.removing_act)}
          onClose={() => this.updateState({show_remove_act_warning:false,removing_act:null})}/>
      </App>
    )
  }

  addActs(acts){
    let organization_bands = []
    acts.forEach(act => {
      organization_bands.push({
        band: act.id,
        organization: RP_Organization(this.state.selected_organization).id,
        is_application: true
      })
    })

    this.props.addOrganizationBands(organization_bands)
    this.updateState({show_add_acts:false})
  }

  updatePayoutAmount(actId, amount){
    if (!isNaN(parseFloat(amount))){
      const payouts = this.state.payout_amounts
      const payout = parseFloat(amount)

      payouts[actId] = payout
      this.updateState({payout_amounts:payouts})
    }
  }

  verifyBalance(acts) {
    const _Organization = RP_Organization(this.state.selected_organization)
    const organization_balance = parseFloat(_Organization.account_balance)
    const payout_amounts = this.state.payout_amounts
    var total_payout = 0.00
    _Organization.confirmed_acts().forEach(act => {
      if(!isNaN(payout_amounts[act.id])){
        total_payout += payout_amounts[act.id]
      }
    })
    if(total_payout > organization_balance){
      return false
    }
    return true
  }

  payActs(){
    const _Organization = RP_Organization(this.state.selected_organization)
    const payouts = this.state.payout_amounts

    this.props.payActs(_Organization.id,_Organization.confirmed_acts(),payouts)
    this.updateState({showPayoutPanel:false,payout_amounts:{}})
  }

  payout(_Organization){
    if(_Organization.account_balance > 10.00){
      this.updateState({show_payout_warning:true,paying_organization:_Organization.id})
    }else{
      this.props.errorMessage('A $10 minimum is required to request a payout. (If you really need the money, please contact us)')
    }
  }

  componentDidMount() {
    this.props.loadData()
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state),
    organizations: selectors.selectOrganizations(state, props),
    organizations_loading: selectors.selectOrganizationsLoading(state, props),
    activeCampaigns: selectors.selectActiveCampaigns(state, props),
    activeCampaigns_loading: selectors.selectActiveCampaignsLoading(state, props),
    act_search_results: selectors.selectSearchActs(state),
    act_search_loading: selectors.selectSearchActsLoading(state),
    user_acts: selectors.selectUserActs(state),
    user_acts_loading: selectors.selectUserActsLoading(state),
    error: selectors.selectError(state, props),
    verify_acts: selectors.selectVerifyActs(state),
    verify_acts_loading: selectors.selectVerifyActsLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => {
      dispatch(actions.loadData())
    },
    loadUserActs: () => {
      dispatch(actions.loadUserActs())
    },
    inviteAct: (organization,name,email) => {
      dispatch(actions.inviteAct(organization,name,email))
    },
    addOrganizationBands: (organization_bands) => {
      dispatch(actions.addOrganizationBands(organization_bands))
    },
    removeOrganizationBand: (organization_band) => {
      dispatch(actions.removeOrganizationBand(organization_band))
    },
    organizationCalendar: (organization_id) => {
      dispatch(push(paths.organizationCalendar(organization_id)))
    },
    organizationStats: (organization_id) => {
      dispatch(push(paths.organizationStats(organization_id)))
    },
    organizationProfile: (organization_id) => {
      dispatch(push(paths.organizations(organization_id)))
    },
    searchActs: (query) => {
      dispatch(actions.searchActs(query))
    },
    myActs: () => {
      dispatch(push(paths.myActs()))
    },
    messageUser: (user_id) => {
      dispatch(push(paths.messageUser(user_id)))
    },
    actProfile: (act_id) => {
      dispatch(push(paths.acts(act_id)))
    },
    actStats: (act_id) => {
      dispatch(push(paths.actStats(act_id)))
    },
    createOrganization: (organization) => {
      dispatch(actions.createOrganization(organization))
    },
    updateOrganization: (organization) => {
      dispatch(actions.updateOrganization(organization))
    },
    confirmOrganizationMembership: (organization_band) => {
      dispatch(actions.confirmOrganizationMembership(organization_band))
    },
    denyOrganizationMembership: (organization_band) => {
      dispatch(actions.denyOrganizationMembership(organization_band))
    },
    payout: (organization) => {
      dispatch(actions.payout(organization))
    },
    payActs: (organization_id,acts,payouts) => {
      dispatch(actions.payActs(organization_id,acts,payouts))
    },
    organizationError: (error) => {
      dispatch(actions.organizationError(error))
    },
    successMessage: (text) => {
      dispatch(appActions.success_message(text))
    },
    errorMessage: (text) => {
      dispatch(appActions.error_message(text))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Organizations)


const PayoutLabel = styled.div`
  display: inline-block;
  width: 60%;
  line-height: 7vmin;
  text-align: left;
  font-size: 2.5vmin;
  font-weight: bold;
`
const TextRight = styled.div`
  text-align: right;
`
const ActBalance = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2.5vmin;
  padding: 2vmin;
  color: ${RP_BLACK};
  font-weight: 200;

  &:hover {
    color: ${RP_GREEN};
    cursor: pointer;
  }
`