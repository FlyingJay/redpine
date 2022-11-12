import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ReactToPrint from 'react-to-print'

import { helpers } from 'globals'
import { RP_Venue, RP_Campaign } from 'Models'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import appActions from 'Containers/App/actions'

import { RP_PINK, RP_RED, RP_BLACK, RP_GREEN, SPOTIFY_GREEN, RP_SUPER_LIGHT, MyPageWrapper, FormNotice } from 'Components' // GLOBALS
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { PledgeButton, FormButton } from 'Components' // BUTTON
import { Modal } from 'Components'
import { Title } from 'Components' //TITLE
import { Show } from 'Components' //MY/SHOW
import { Feed } from 'Components'

import { Ticket } from './Ticket/index.jsx'

import selectors from './selectors'
import actions from './actions'


export class Tickets extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      show_index: null,
      ticket_index: null
    }
	}

  render() {
    const show_tickets = this.props.show_tickets || []
    const has_tickets  = (show_tickets.length > 0)

    return (
      <App>
        <MyPageWrapper>
          <Title title="Tickets" summary="View, download, and print your tickets!" />
          <MyTicketsList>
            <Feed infinite page_size={20} page={this.props.page} results_count={this.props.results_count} reload={(page) => this.props.loadTickets(page)}>
              <LoadingIndicator loading={this.props.tickets_loading} is_child_visible={has_tickets} bottom>
                { has_tickets 
                  ? <div>
                      { show_tickets.map((ticket_set, show_index) => {
                          const _Campagin = RP_Campaign(ticket_set[0].pledge.campaign)
                          return <Show 
                                  key={'c_'+_Campagin.id}
                                  campaign={_Campagin.campaign}
                                  venue={_Campagin.venue}>
                                  <ShowActions>
                                    <FormButton onClick={() => this.updateState({show_index})} color={RP_BLACK} background="#FFF" hoverBackground={RP_SUPER_LIGHT}>
                                      <i className="fa fa-ticket"/>&nbsp;&nbsp;VIEW ALL
                                    </FormButton>
                                  </ShowActions>
                                  { ticket_set.map((ticket, ticket_index) => {
                                      return <TicketRow key={'t_'+ticket.id}>
                                              {ticket_index+1}.&nbsp;&nbsp;<Name>{ticket.details && ticket.details.name}</Name>
                                              <Description>{ticket.details && ticket.details.description}</Description>
                                              <Buttons>
                                                <PledgeButton onClick={() => this.updateState({show_index,ticket_index})} background="#FFF" hoverBackground={RP_SUPER_LIGHT}>
                                                  <i className="fa fa-ticket"/>
                                                </PledgeButton>
                                              </Buttons>
                                             </TicketRow> })}
                                 </Show> })}
                    </div>
                  : <FormNotice>
                      <span>
                        You do not have any tickets at this time.
                        <br/>
                        If you just purchased some, it may take some time for them to appear in your account. 
                      </span>
                    </FormNotice> }
              </LoadingIndicator>
            </Feed>
          </MyTicketsList>
        </MyPageWrapper>

        {/* The set of tickets will still need to be formatted nicely on the screen, 
            but it's now possible to at least get them all into the print window setting 
            the state's show_index to a value while leaving the ticket_index as null. */ }
        <Modal ref={el => (this.componentRef = el)} show={this.state.show_index !== null} onClose={() => this.updateState({show_index:null,ticket_index:null})}>
          { this.state.show_index !== null
            ? this.state.ticket_index !== null
              ? <Ticket ticket={this.props.show_tickets[this.state.show_index][this.state.ticket_index]}/>
              : this.props.show_tickets[this.state.show_index].map(ticket => <Ticket key={ticket.id} ticket={ticket} multi/>) 
            : null }

          <BottomRight>
            <ReactToPrint
              trigger={() => <FormButton background={RP_GREEN} hoverBackground={SPOTIFY_GREEN}>
                              <i className="fa fa-print"/>&nbsp;&nbsp;PRINT
                             </FormButton>}
              content={() => this.componentRef}/>
          </BottomRight>
        </Modal>
      </App>
    )
  }

  componentDidMount() {
    this.props.loadTickets()

    if(this.props.user && !this.props.user.profile.welcome_view_my_tickets){
      this.props.tutorialEventCompleted(this.props.user, {welcome_view_my_tickets:true})
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state, props),
    show_tickets: selectors.selectShowTickets(state, props),
    tickets_loading: selectors.selectTicketsLoading(state, props),
    page: selectors.selectPage(state, props),
    results_count: selectors.selectResultsCount(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTickets: (page=1) => {
      dispatch(actions.loadTickets(page))
    },
    tutorialEventCompleted: (user, events) => {
      dispatch(appActions.tutorialEventCompleted(user, events))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Tickets)

const MyTicketsList = styled.div`
  display: block;
  position: relative;
  text-align: left;
  height: auto;
  margin: 0 auto;
  font-size: 1.8vmin;
`
const TicketRow = styled.div`
  display: block;
  position: relative;
  padding: 0.5vmin 2vmin;
`
const Name = styled.div`
  display: inline-block;
  font-weight: bold;
  font-size: 2.5vmin;
`
const Description = styled.div`
  margin-left: 2.5vmin;
  padding-left: 1vmin;
  border-left: 1px solid ${RP_SUPER_LIGHT};
  max-width: 75%;
  font-size: 2.25vmin;
`
const Buttons = styled.div`
  position: absolute;
  display: block;
  text-align: right;
  min-width: 20%;
  top: 0.5vmin;
  right: 2vmin;
`
const BottomRight = styled.div`
  position: fixed;
  display: block;
  text-align: right;
  bottom: 2vmin;
  right: 4vmin;

  @media print {
    visibility: hidden;
  }
`
const ShowActions = styled.div`
  display: block;
  text-align: right;
  padding-right: 1vmin;
`