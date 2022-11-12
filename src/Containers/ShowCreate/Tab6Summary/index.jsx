import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { RP_BLUE, RP_PINK, RP_GREEN, RP_SUPER_LIGHT } from 'Components' // GLOBALS
import { SidePanel, ModalSection, ModalHeading, NegativeButton, PositiveButton } from 'Components' //MODAL & MODALOTHERS
import { TextBox } from 'Components' //INPUT


export class Tab6Summary extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      extra_info: this.props.extra_info
    }
  }

  render() {
    const my_act         = this.props.my_act || null
    const date           = this.props.date || null
    const acts           = this.props.acts || []
    const empty_slots    = this.props.empty_slots || null
    const venue          = this.props.venue || null
    const ticket_price   = this.props.ticket_price || null
    const extra_info     = this.props.extra_info || null
    const is_opening     = this.props.is_opening

    const venue_TBD = (venue == null)
                        
    return (
      <SidePanel>
        <ModalSection style={{marginTop:'12vmin'}}>
          <Heading>Your Show</Heading>
        </ModalSection>
        { venue_TBD
          ? <ModalSection>
              <Subheading>
                <i className="fa fa-home" style={{color:RP_BLUE}}/>
                &nbsp;When and Where?
              </Subheading>
              <Row>
                <Important>{moment(date).format('MMMM Do, YYYY')}</Important> 
              </Row>
              <Row bottom>
                <Detail>We will follow up with you soon to determine a venue for your show.</Detail>
              </Row>
            </ModalSection>
          : <ModalSection>
              <Subheading>
                <i className="fa fa-home" style={{color:RP_BLUE}}/>
                &nbsp;When and Where?
              </Subheading>
              <Row bottom={is_opening}>
                <Important>{moment(date).format('MMMM Do, YYYY')}</Important> 
                <Detail>&nbsp;at&nbsp;</Detail>
                <Important>{venue && venue.title}</Important>
              </Row>
              { !is_opening
                ? <Row bottom>
                    <Detail>Tickets will sell for&nbsp;</Detail>
                    <Important>${Number(ticket_price).toFixed(2)}</Important>
                  </Row>
                : null }
            </ModalSection>
        }
        <ModalSection>
          <Subheading>
            <i className="fa fa-users" style={{color:RP_PINK}}/>
            &nbsp;Who's Performing?
          </Subheading>
          { acts.map((act,index) => {
              return <Row key={act.id || index}>
                       <Important>{act.name}&nbsp;</Important>
                       <Detail style={{fontSize:'1.5vmin'}}>
                       {
                         act.id === my_act.id
                         ? null
                         : act.is_redpine 
                           ? '*They will be invited to join the show.' 
                           : '*They will be invited to join RedPine, then the show.'
                       }
                       </Detail>
                     </Row>
            })
          }
        </ModalSection>
        <ModalSection>
          <ExtraInfo
            value={this.state.extra_info}
            onChange={(e) => this.updateState({extra_info: e.target.value})}
            placeholder={`Type something here to tell ${venue_TBD ? 'us' : 'the venue'} more about your show`} 
            maxLength="50000"
            style={{marginTop:'2vmin'}}/>
        </ModalSection>
        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.props.back()} style={{float:'left'}}>
            <i className="fa fa-arrow-left"/>
            &nbsp;&nbsp;Back
          </NegativeButton>
          <PositiveButton onClick={() => this.props.next(this.state.extra_info)}>
            Send Request&nbsp;&nbsp;
            <i className="fa fa-envelope"/>
          </PositiveButton>
        </ModalSection>
      </SidePanel>
    )
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Heading = styled(ModalHeading)`
  position: relative;
  text-align: center;
  padding-bottom: 3vmin;
`
const Subheading = styled(ModalHeading)`
  position: relative;
  text-align: left;
  padding-bottom: 1vmin;
`
const Row = styled.div`
  text-align: left;
  padding-left: 2vmin;
  padding-bottom: ${props => props.bottom ? '1vmin' : '0'};
  border-bottom: ${props => props.bottom ? '1px solid '+RP_SUPER_LIGHT : 'none'};
`
const Detail = styled.div`
  display: inline-block;
  text-align: left;
  font-size: 2vmin;
`
const Important = styled(Detail)`
  font-weight: bold;
  font-size: 2.25vmin;
`
const ExtraInfo = styled(TextBox)`
  display: block;
  position: relative;
  max-height: 40vmin;
  padding: 2vmin 3vmin;
  resize: vertical;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 100%;
    max-width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    max-width: 100%;
  }
`