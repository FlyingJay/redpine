import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'

import { RP_BLACK, RP_RED, RP_GREEN, SPOTIFY_GREEN, RP_DARKGREY, RP_BLUE, RP_SUPER_LIGHT, TopRight } from 'Components' //GLOBALS
import { ModalHeading, ModalSubheading } from 'Components' //MODAL
import { Input } from 'Components' //INPUT
import { Checkbox } from 'Components' //CHECKBOX
import { FormButton } from 'Components' //BUTTON

import constants from './constants'

export class PurchaseItem extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      id: this.props.id,
      name: this.props.name,
      initial_name: this.props.name,
      description: this.props.description,
      initial_description: this.props.description,
      price: this.props.price,
      initial_price: this.props.price,
      quantity: this.props.quantity,
      initial_quantity: this.props.quantity,
      is_ticket: this.props.is_ticket,
      can_edit: this.props.can_edit,
      begin_editable: this.props.can_edit
    }
  }

  render() {
    const can_edit    = this.state.can_edit

    const name        = this.state.name
    const description = this.state.description
    const price       = this.state.price
    const quantity    = this.state.quantity
    const is_ticket   = this.state.is_ticket

    //update vs creation
    const is_edit = (can_edit && !this.state.begin_editable)

    return (
      can_edit
      ? <Wrap>
          { !is_edit 
            ? <ModalHeading style={{paddingBottom:'2vmin'}}>Add</ModalHeading> 
            : <ModalSubheading onClick={() => this.updateState({can_edit:false})} clickable>
                <i className="fa fa-arrow-left"/>&nbsp;&nbsp;Cancel
                { !this.props.is_hidden 
                  ? <TopRight onClick={() => this.props.onDelete(this.state.id)}
                      style={{color:RP_RED,fontSize:'2.25vmin',fontWeight:'bold'}}>Hide/Remove</TopRight> 
                  : null}
              </ModalSubheading> }
          <Input
            value={name}
            validate={validators.STANDARD_CHARACTERS()}
            onValidate={(text) => this.updateState({name: text})}
            placeholder="Item Name"
            image="dot"
            focusImage="dot-focus"
            maxLength="200"/>
          <Input
            value={description}
            validate={validators.KEYBOARD()}
            onValidate={(text) => this.updateState({description: text})}
            placeholder="Description"
            image="dot"
            focusImage="dot-focus"
            maxLength="500"/>
          <TwoColumn>
            <Input
              value={price}
              validate={validators.POSITIVE_DOLLAR()}
              onValidate={(text) => this.updateState({price: text})}
              placeholder="Price"
              image="usd"
              focusImage="usd-focus"
              width="30vmin"/>
          </TwoColumn>
          <TwoColumn>
            <Input
              value={quantity}
              validate={validators.POSITIVE_INTEGER()}
              onValidate={(text) => this.updateState({quantity: text})}
              placeholder="Quantity"
              image="people"
              focusImage="people-focus"/>
          </TwoColumn>
          { !is_edit
            ? <Checkbox 
                label="Provides entry to the show  (Ticket)"
                onChange={(val) => this.updateState({is_ticket: val})}/>
            : null }
          <AddButton onClick={() => is_edit ? this.updateItem() : this.addItem()}>
            {is_edit?'Save':'Add'}&nbsp;&nbsp;
            <i className="fa fa-plus"/>
          </AddButton>
        </Wrap>
      : <Wrap>
          <Title>
            {name}&nbsp;&nbsp;
            <i className={is_ticket ? 'fa fa-ticket' : 'fa fa-shopping-cart'} style={{color:(is_ticket ? RP_GREEN : RP_BLUE)}}/>
          </Title>
          <Description>{description}</Description>
          <Price>${price}</Price>
          <Quantity>{quantity} left</Quantity>
          { !this.state.begin_editable && !this.props.is_hidden
            ? <ChangeButton onClick={() => this.updateState({can_edit:true})}>
                Edit&nbsp;&nbsp;<i className="fa fa-arrow-right"/>
              </ChangeButton>
            : this.props.is_hidden
              ? <Hidden>HIDDEN</Hidden>
              : null }
        </Wrap>
    )
  }

  validated(){
    if(isNaN(this.state.price)){
      this.props.error(constants.PRICE_NOT_VALID)
      return false
    }
    else if(isNaN(this.state.quantity)){
      this.props.error(constants.QUANTITY_NOT_VALID)
      return false
    }
    else if(!this.state.name){
      this.props.error(constants.NAME_NOT_VALID)
      return false
    }
    else if(!this.state.description){
      this.props.error(constants.DESCRIPTION_NOT_VALID)
      return false
    }
    return true
  }

  updateItem(){
    const item = {
      id:this.state.id
    }
    Object.assign(item, this.state.name != this.state.initial_name && { name: this.state.name },
          this.state.description != this.state.initial_description && { description: this.state.description },
                      this.state.price != this.state.initial_price && { price: Number(this.state.price).toFixed(2) },
                this.state.quantity != this.state.initial_quantity && { quantity: this.state.quantity }
            )

    this.props.updateItem(item)
    this.updateState({can_edit:false})
  }

  addItem(){
    if(this.validated()){
      this.props.addItem(this.state)
      this.updateState({name:'',description:'',price:'',quantity:'',is_ticket:false})
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Wrap = styled.div`
  position: relative;
  margin-bottom: 2vmin;
  padding: 2vmin;
  border-top: 1px solid ${RP_SUPER_LIGHT};
`
const Title = styled.div`
  text-align: left;
  font-weight: bold;
  fontSize: 2.5vmin;
`
const Description = styled.div`
  text-align: left;
  font-size: 2vmin;
  padding: 1vmin;
`
const Price = styled.div`
  display: inline-block;
  width: 50%;
  color: ${RP_RED};
  text-align: center;
  font-weight: bold;
  fontSize: 2.5vmin;
`
const Quantity = styled.div`
  display: inline-block;
  width: 50%;
  font-weight: bold;
  text-align: center;
  fontSize: 2.5vmin;
`
const AddButton = styled(FormButton)`
  display: block;
  position: relative;
  width: auto;
  background: ${RP_GREEN};

  &:hover {
    background: ${SPOTIFY_GREEN};
  }
`
const TwoColumn = styled.div`
  display: inline-block;
  width: 50%;
  vertical-align:bottom;
`
const ChangeButton = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
  font-size: 2.5vmin;
  color: ${RP_DARKGREY};
  cursor: pointer;
`
const Hidden = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
  font-size: 2.5vmin;
  color: ${RP_RED};
  cursor: pointer;
`