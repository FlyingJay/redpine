import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'

import { RP_Campaign, RP_Venue } from 'Models'

import { App } from 'Containers'

import { RP_SUPER_LIGHT, RP_RED, MyPageWrapper, FormNotice, Bold } from 'Components' // GLOBALS
import { Modal, ModalPromptLike, ModalPromptHeader, ModalPromptDesc, DescTotalWarn, DescConsequences, ModalPromptActions, ConfirmAction, CancelAction } from 'Components' //MODAL
import { PledgeButton } from 'Components' // BUTTON
import { Link, RedLink } from 'Components' // LINK
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { Title } from 'Components' //TITLE

import { Show } from 'Components' //MY/SHOW

import selectors from './selectors'
import actions from './actions'


export class Pledges extends React.PureComponent {
  constructor(props) {
    super(props) 
    let dateStorer = null;
    this.state = {
      pledgeId: null,
      title: "",
      showModal: false
    }
	}

  render() {
    const campaigns   = this.props.campaigns || []
    const pledges     = this.props.pledges || []

    const has_pledges = (pledges.length > 0)

    return (
      <App requireAuth>
        <MyPageWrapper>
          <Title title="Pledges" summary="Tickets to crowdfunded shows aren't created until the goal is reached. Until then, you may cancel your pledge here. Any tickets will be found in 'My Tickets'." />
          <LoadingIndicator loading={this.props.campaigns_loading} is_child_visible={has_pledges}>
            { has_pledges
              ? <div>
                  { pledges.map(pledge => {
                      const campaign   = campaigns ? campaigns[pledge.campaign] : null
                      
                      const _Campaign  = RP_Campaign(campaign)
                      const can_delete = (_Campaign.progress() < 100 && !_Campaign.isTraditional())

                      return <Show 
                              key={_Campaign.id}
                              campaign={campaign}
                              venue={_Campaign.timeslot ? _Campaign.timeslot.venue : null}>
                              <PledgeRow>
                                <Description>
                                  {
                                    pledge.purchases.map(purchase => <DetailsItem key={purchase.id}>{purchase.quantity}x&nbsp;{purchase.item.name}&nbsp;</DetailsItem>)
                                  }
                                </Description>
                                <Buttons>
                                  <Link href={paths.shows(_Campaign.id)}>
                                    <PledgeButton background="#FFF" hoverBackground={RP_SUPER_LIGHT}>
                                      <i className="fa fa-flag"/>
                                    </PledgeButton>
                                  </Link>
                                  { can_delete
                                    ? <PledgeButton onClick={() => this.updateState({pledgeId:pledge.id,title:_Campaign.title,showModal:true})} background="#FFF" hoverBackground={RP_RED} hoverColor="#FFF">
                                        <i className="fa fa-times"/>
                                      </PledgeButton>
                                    : <Link href={paths.tickets()}>
                                        <PledgeButton background="#FFF" hoverBackground={RP_SUPER_LIGHT}>
                                          <i className="fa fa-ticket"/>
                                        </PledgeButton>
                                      </Link> }
                                </Buttons>
                              </PledgeRow>
                             </Show>
                      }) }
                </div>
              : <FormNotice>
                  <span>
                    You have not yet pledged to a campaign. Once you make a pledge it will appear here for you to manage.
                    <br/>
                    You can cancel a pledge as long as the campaign hasn't reached its goal.
                  </span>
                </FormNotice>
            }
          </LoadingIndicator>
        </MyPageWrapper>

        <Modal show={this.state.showModal} type="PROMPT" transparent onClose={() => this.updateState({showModal: false})}>
          <ModalPromptLike>
            <ModalPromptHeader>
              You are about to delete your pledge for 
              <Bold>&nbsp;{this.state.title}</Bold>...
            </ModalPromptHeader>
            <ModalPromptDesc style={{fontSize:"2vmin"}}>
              <DescTotalWarn>Are you sure you want to delete this pledge?</DescTotalWarn>
              <DescConsequences>
                It's too bad you can't make it to the show.. 
                <br/>
                If you do however change your mind, you can always come back and make a pledge again!<br/><br/>
                In some cases the price of tickets will change once the campaign reaches its goal. 
                If deleting this pledge is not something you want, and you have others questions or concerns you can contact us via
                &nbsp;<RedLink href={paths.redpineFacebook()} target="_blank">facebook</RedLink>,
                &nbsp;<RedLink href={paths.redpineTwitter()} target="_blank">twitter</RedLink> or
                &nbsp;<RedLink href={paths.supportMail()} target="_blank">email</RedLink>.
              </DescConsequences>
            </ModalPromptDesc>
            <ModalPromptActions>
              <CancelAction onClick={() => this.updateState({showModal: false})}>
                <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Cancel
              </CancelAction>
              <ConfirmAction onClick={() => this.deletePledge({id:this.state.pledgeId})}>
                Delete Pledge
              </ConfirmAction>
            </ModalPromptActions>
          </ModalPromptLike>
        </Modal>
      </App>
    )
  }

  deletePledge(pledge){
    this.props.cancelPledge(pledge)
    this.updateState({showModal:false})
  }

  componentDidMount() {
    this.props.loadPledges()
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    pledges: selectors.selectPledges(state),
    campaigns: selectors.selectCampaigns(state),
    pledges_loading: selectors.selectPledgesLoading(state),
    campaigns_loading: selectors.selectCampaignsLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPledges: () => {
      dispatch(actions.loadPledges())
    },
    cancelPledge: (pledge) => {
      dispatch(actions.cancelPledge(pledge))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pledges)

const PledgeRow = styled.div`
  display: block;
  position: relative;
  padding: 0 2vmin;
`
const Description = styled.div`
  padding: 2vmin 0 1vmin 1vmin;
  max-width: 75%;
`
const Buttons = styled.div`
  position: absolute;
  display: block;
  text-align: right;
  min-width: 20%;
  top: 0;
  right: 2vmin;
`
const DetailsItem = styled.div`
  font-size: 2vmin;
  font-weight: 550;
  line-height: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  padding-left: 1vmin;
  margin-bottom: 0.25vmin;
`