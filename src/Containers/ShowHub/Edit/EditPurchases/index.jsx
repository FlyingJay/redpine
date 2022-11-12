import React from 'react'
import styled from 'styled-components'

import { SidePanel,ModalSection,ModalHeading,ModalSubheading,NegativeButton,PositiveButton } from 'Components' //MODAL

import { PurchaseItem } from './PurchaseItem/index.jsx'


export class EditPurchases extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      purchase_options: this.props.purchase_options
    }
  }

  render() {
    const purchase_options = this.state.purchase_options || []

    return (
      <SidePanel>
        <ModalSection top>
          <ModalHeading>Tickets & Merch</ModalHeading>
          <ModalSubheading>Add early-bird tickets, VIP passes, or something of your own!</ModalSubheading>
          {
            purchase_options.map((item, i) => {
              return  <PurchaseItem 
                        key={'item_'+i}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        quantity={item.quantity}
                        is_ticket={item.is_ticket}
                        is_hidden={item.is_hidden}
                        updateItem={this.props.updateItem}
                        onDelete={this.props.onDelete}/>
            })
          }
          <PurchaseItem 
            addItem={(details) => this.addItem(details)}
            error={(text) => this.props.error(text)}
            can_edit/>
        </ModalSection>
        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.props.back()}>
            <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Cancel
          </NegativeButton>
          <PositiveButton onClick={() => this.props.save(this.state.purchase_options)}>
            Save
          </PositiveButton>
        </ModalSection>
      </SidePanel>
    )
  }

  addItem(details) {
    var items = this.state.purchase_options.slice()
    const new_item = {
      campaign: null,
      name: details.name,
      description: details.description,
      price: Number(details.price).toFixed(2),
      quantity: details.quantity,
      is_ticket: details.is_ticket
    }
    items.push(new_item)
    this.updateState({purchase_options:items})
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}
