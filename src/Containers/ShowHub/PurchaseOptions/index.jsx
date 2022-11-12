import React from 'react'
import styled from 'styled-components'

import { RP_BLACK, RP_RED, RP_BLUE, RP_GREEN, RP_SUPER_LIGHT, Bold } from 'Components' //GLOBALS

import { Heading } from './../Heading/index.jsx'


export class PurchaseOptions extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const purchase_options = this.props.purchase_options
    const is_active        = this.props.is_active

    const ticket_options = purchase_options.filter(option => { return option.is_ticket === true })
    const merch_options = purchase_options.filter(option => { return option.is_ticket === false })

    const has_tickets = (ticket_options.length > 0)
    const has_merch = (merch_options.length > 0)

    return (
      <Wrap>
        <Heading text="Ticket Options & Merch" icon="fa fa-ticket" />
        <HalfWidth>
          <UserGroup icon="fa fa-ticket" color={RP_GREEN} text="Tickets"/>   
          {
            ticket_options.map(purchase => {
               return purchase.is_hidden ? null 
                      : <Panel key={purchase.id}>
                          <Bold style={{width:'100%'}}>
                            &nbsp;{purchase.name}
                            &nbsp;&nbsp;
                            <i className="fa fa-ticket" style={{color:RP_GREEN}} />
                          </Bold>
                          <Description>{purchase.description}</Description>
                          <Price>${purchase.price}</Price>
                          <Quantity>{purchase.quantity} left.</Quantity>
                        </Panel>
            })
          }
          {
            is_active
            ? <Panel hoverColor={RP_GREEN} style={{lineHeight:'3vmin',fontSize:'2.5vmin'}} onClick={() => this.props.editPurchases()} hoverSolid>
                <Add className="fa fa-plus"/>
              </Panel>
              : null
          }
        </HalfWidth>
        <HalfWidth>
          <UserGroup icon="fa fa-shopping-cart" color={RP_BLUE} text="Merch Packages"/>   
          {
            merch_options.map(purchase => {
               return purchase.is_hidden ? null 
                      : <Panel key={purchase.id}>
                          <Bold style={{width:'100%'}}>
                            &nbsp;{purchase.name}
                            &nbsp;&nbsp;
                            <i className="fa fa-shopping-cart" style={{color:RP_BLUE}} />
                          </Bold>
                          <Description>{purchase.description}</Description>
                          <Price>${purchase.price}</Price>
                          <Quantity>{purchase.quantity} left.</Quantity>
                        </Panel>
            })
          }
          {
            is_active
            ? <Panel hoverColor={RP_GREEN} style={{lineHeight:'3vmin',fontSize:'2.5vmin'}} onClick={() => this.props.editPurchases()} hoverSolid>
                <Add className="fa fa-plus"/>
              </Panel>
              : null
          }
        </HalfWidth>
      </Wrap>
    )
  }
}
const UserGroup = ({icon,color,text}) => { return <UserGroupWrap color={color}><i className={icon}/>{text}</UserGroupWrap> }
const UserGroupWrap = styled.div`
  background: ${props => props.color || '#FFF'};
  padding: 1vmin 0;
  color: #FFF;
  margin-top: 2vmin;
  border-radius: 0.5vmin;
  font-size: 2.5vmin;

  i {
    padding: 0 1vmin 0 2vmin;
  }

  @media (max-width: 500px) and (orientation: portrait) {
    width: calc(100% - 4vmin);
  }
`
const Wrap = styled.div`
  padding-right: 2vmin;
`
const Panel = styled.div`
  width: calc(100% - 2vmin);
  display: inline-block;
  position: relative;
  background: ${props => props.color || 'rgba(255,255,255,0.9)'};
  color: ${RP_BLACK};
  text-align: center;
  margin: 0 0 0.25vmin 0.25vmin;
  padding: 1vmin;
  font-size: 2vmin;

  border-bottom: 1px solid ${RP_SUPER_LIGHT};
  vertical-align: top;

  &:hover {
    color: ${props => props.hoverColor || RP_BLACK};
    cursor: ${props => props.hoverColor ? 'pointer' : 'default'};
    background: ${props => props.hoverSolid ? '#FFF' : 'rgba(255,255,255,0.9)'};
  }

  @media (max-width: 768px) and (orientation: portrait){
    font-size: 2.5vmin;
  }
`
const HalfWidth = styled.div`
  display: inline-block;
  padding-left: 2vmin;
  width: calc(50% - 2vmin);
  vertical-align: top;
  text-align: left;

  @media (max-width: 767px) and (orientation: portrait) {
    display: block;
    padding-left: 2vmin;
    width: calc(100% - 2vmin);
  }
`
const Add= styled.i`
  line-height: 3vmin;
  transition: background ease 0.25s;

  &:hover {
    cursor: pointer;
  }
`
const Description = styled.div`
  width: 100%;
  font-size: 2vmin;
  font-style: italic;
  padding-bottom: 0.5vmin;

  @media (max-width: 768px) and (orientation: portrait){
    font-size: 2.5vmin;
  }
`
const Price = styled.div`
  width: 50%;
  display: inline-block;
  color: ${RP_RED};
  font-weight: bold;
  text-align: center;
`
const Quantity = styled.div`
  width: 50%;
  display: inline-block;
  font-weight: bold;
  text-align: center;
`