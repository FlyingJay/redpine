import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import QRCode from 'qrcode.react'
import moment from 'moment'
import ReactToPrint from 'react-to-print'

import { paths } from 'globals'
import { RP_User } from 'Models'

import { App } from 'Containers'
import { RP_FONT, RP_PINK, RP_GREY, RP_DARK_GREY, RP_BLACK, RP_RED, RP_DDD, RP_GREEN, SPOTIFY_GREEN, RP_BLUE, RP_DARKBLUE, RP_SUPER_LIGHT, RP_LIGHTGREY } from 'Components' //GLOBALS
import { LoadingIndicator } from 'Components'
import { BasicCheckbox } from 'Components'
import { BaseButton } from 'Components'
import { Title } from 'Components'
import { Modal } from 'Components'

import selectors from './selectors'
import actions from './actions'


export class GuestList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      hide_checked:false
    }
    this.campaign_id = this.props.match.params.campaignId
  }
                    
  render() {
    const has_tickets = this.props.tickets ? this.props.tickets.length > 0 : false
    const tickets = has_tickets && this.state.hide_checked 
                    ? this.props.tickets.filter(ticket => !ticket.attended) 
                    : this.props.tickets

    return (
      <App no_ui>
        <Modal show onClose={() => this.props.history.goBack()}>
          <MobileWrapper style={{position:'relative'}}>
            <div style={{padding:'5vmin'}}>
              <Title title="Attendee List" summary="Who bought tickets & merch?" />
              <div style={{textAlign:'right'}}>
                <AddButton onClick={() => this.updateState({hide_checked:!this.state.hide_checked})} color={RP_GREEN} hoverColor={SPOTIFY_GREEN}>
                  {this.state.hide_checked?<i className="fa fa-eye-slash"/>:<i className="fa fa-eye"/>}&nbsp;&nbsp;
                  <span>{this.state.hide_checked?'Show ':'Hide '}Checks</span>
                </AddButton>
                <AddButton onClick={() => this.props.loadData(this.campaign_id)} color={RP_PINK} hoverColor={RP_RED}>
                  <i className="fa fa-refresh"/>
                </AddButton>
                <ReactToPrint
                  trigger={() => <AddButton color={RP_BLUE} hoverColor={RP_DARKBLUE}>
                                  <i className="fa fa-print"/>
                                 </AddButton>}
                  content={() => this.componentRef}/>
              </div>
            </div>
            {/*PRINT DIV*/}
            <div ref={el => (this.componentRef = el)} style={{padding:'5vmin'}}>
              <div style={{textAlign:'right',fontSize:'2.5vmin'}}>
                <i className="fa fa-refresh"/>&nbsp;&nbsp;{ moment().format('MMM DD, h:mm A') }
              </div>
              <LoadingIndicator loading={this.props.guestlist_loading}>
                { has_tickets
                  ? tickets.map((ticket) => {
                      const _User = RP_User(ticket.pledge.user)
                      return <TicketRow key={ticket.id} onClick={() => this.props.toggleAttended(this.campaign_id,ticket.id,!ticket.attended)}>
                              <Details>
                                <Name checked={ticket.attended}>
                                  <span style={{color:ticket.attended?RP_GREY:RP_BLACK}}>{_User.full_name}</span>
                                </Name>
                                <Description>
                                  <span style={{color:ticket.attended?RP_DDD:RP_BLACK}}>
                                    { ticket.details.is_ticket
                                      ? <i className="fa fa-ticket" style={{color:RP_GREEN}}/>
                                      : <i className="fa fa-shopping-cart" style={{color:RP_BLUE}}/> }&nbsp;&nbsp;
                                    { ticket.details.name }
                                  </span>
                                </Description>
                              </Details>
                              <CheckWrap>
                                <BasicCheckbox check={ticket.attended}/>
                              </CheckWrap>
                             </TicketRow> })
                  : <Name style={{fontWeight:'normal'}}>
                      Guest names will be shown here, once they have purchased tickets.
                    </Name> }
              </LoadingIndicator>
              <div style={{marginTop:'15vmin'}}>
                <Title title="Ticketing Page" summary="Fans may scan this barcode to purchase tickets using a credit card. Their name will appear on the guest list once they have finished." />
                <div style={{textAlign:'center'}}>
                  <QRCode value={paths.baseURL()+paths.shows(this.campaign_id)} size={256} renderAs="svg" level="H"/>
                </div>
              </div>
            </div>
          </MobileWrapper>
        </Modal>
      </App>
    )
  }

  componentDidMount(){
    const id = this.props.match.params.campaignId
    if (id){
      this.props.loadData(id)
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    tickets: selectors.selectTickets(state, props),
    guestlist_loading: selectors.selectGuestListLoading(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: (show) => {
      dispatch(actions.loadData(show))
    },
    toggleAttended: (show,ticket,attended) => {
      dispatch(actions.toggleAttended(show,ticket,attended))
    },
    showHub: (campaign_id) => {
      dispatch(push(paths.showHub(campaign_id)))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestList)

const TicketRow = styled.div`
  display: block;
  position: relative;
  padding: 0.5vmin 2vmin;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
  cursor: pointer;

  &:hover {
    background: ${RP_LIGHTGREY};
  }
`
const Details = styled.div`
  display: inline-block;
  width: calc(100% - 6vmin);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Name = styled.div`
  font-size: 3vmin;
  color: ${props => props.checked ? RP_GREEN : 'inherit'};

  @media (max-width: 768px) { 
    font-size: 3.5vmin;
  }
`
const Description = styled.div`
  padding-left: 1vmin;
  font-weight: 200;

  @media (max-width: 768px) { 
    font-size: 3.5vmin;
  }
`
const Buttons = styled.div`
  position: absolute;
  display: block;
  text-align: right;
  min-width: 20%;
  top: 0.5vmin;
  right: 2vmin;
`
const Warning = styled.div`
  display: inline-block;
  font-style: italic;
  color: ${RP_RED};
`
const AddButton = styled(BaseButton)`
  color: #FFF;
  font-weight: bold;
  background: ${props => props.color || RP_BLUE};
  line-height: 1.5;
  min-width: 1.8vmin;
  min-height: 1.8vmin;
  padding: 2vmin 4vmin;
  transition: background ease 0.25s;
  margin-left: 1.5vmin;
  margin-top: 1.5vmin;
  border-radius: 0.5vmin;

  &:hover {
    background: ${props => props.hoverColor || RP_DARKBLUE};
  }

  @media (max-width: 768px) { 
    font-size: 3.5vmin;
  }

  @media (min-width: 1024px) { 
    font-size: 2.5vmin;
  }
`
const MobileWrapper = styled.div`
  display: block;
  width: 60vw;
  margin: 0 auto;
  padding: 12vmin 0 10vmin 0;

  @media (max-width: 1024px) { 
    padding: 12vmin 0 10vmin 0;
    width: 90vw;
  }
`
const CheckWrap = styled.div`
  position:absolute;
  top:2vmin;
  right:2vmin;

  @media (max-width: 1024px) { 
    top:2.5vmin;
    right:2.5vmin;
  }
`