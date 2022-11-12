import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { RP_BLUE, RP_PINK, RP_GREEN, RP_SUPER_LIGHT } from 'Components' // GLOBALS
import { SidePanel, ModalSection, ModalHeading, NegativeButton, PositiveButton } from 'Components' //MODAL & MODALOTHERS


export class Tab4Summary extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const title  = this.props.title || ''
    const my_act = this.props.my_act || null
    const date   = this.props.date || null
    const acts   = this.props.acts || []
    const venue  = this.props.venue || null

    const ticket_price    = this.props.ticket_price || null
    const ticket_quantity = this.props.ticket_quantity || null

    return (
      <SidePanel>
        <ModalSection style={{marginTop:'12vmin'}}>
          <Heading>Your Show</Heading>
        </ModalSection>
        <ModalSection>
          <Subheading>
            <i className="fa fa-home" style={{color:RP_BLUE}}/>
            &nbsp;{title}
          </Subheading>
          <Row>
            <Important>{moment(date).format('MMMM Do, YYYY')}</Important> 
          </Row>
          <Row bottom>
            <Important>{ticket_quantity}&nbsp;</Important>
            <Detail>tickets will sell for&nbsp;</Detail>
            <Important>${Number(ticket_price).toFixed(2)}&nbsp;</Important>
            <Detail>each.</Detail>
          </Row>
        </ModalSection>
        <ModalSection>
          <Subheading>
            <i className="fa fa-users" style={{color:RP_PINK}}/>
            &nbsp;Who's Performing?
          </Subheading>
          {
            acts.map(act => {
              return <Row key={act.id}>
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
        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.props.back()} style={{float:'left'}}>
            <i className="fa fa-arrow-left"/>
            &nbsp;&nbsp;Back
          </NegativeButton>
          <PositiveButton onClick={() => this.props.next()}>
            <i className="fa fa-ticket"/>
            &nbsp;&nbsp;Sell Tickets!
          </PositiveButton>
        </ModalSection>
      </SidePanel>
    )
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