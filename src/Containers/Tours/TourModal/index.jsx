//Libraries
import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'

//General Components
import { Modal, SidePanel, ModalSection, ModalHeading, ModalSubheading, ModalButtons, PositiveButton, NegativeButton } from 'Components' // MODAL
import { Input } from 'Components' //INPUT

export class TourModal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  render() {
    return (
      <Modal show={this.props.is_visible} onClose={this.props.onClose} transparent>
        <SidePanel>
          <ModalSection top>
            <ModalHeading>Start a Tour</ModalHeading>
            <ModalSubheading>Just give your tour a name, and you can start adding shows!</ModalSubheading>
          </ModalSection>
          <ModalSection>
            <Input
              value={this.state.title}
              validate={validators.KEYBOARD()}
              onValidate={text => this.updateState({title: text})}
              placeholder='Tour Title'
              image='checklist'
              focusImage='checklist-focus'
              maxLength='200'/>
          </ModalSection>
          <ModalSection>
            <ModalButtons>
              <NegativeButton onClick={() => this.cancelCreate()}>
                <i className='fa fa-arrow-left'></i>&nbsp;&nbsp;Cancel
              </NegativeButton>
              <PositiveButton onClick={() => this.props.createTour({title:this.state.title})}>
                <i className='fa fa-plane'></i>&nbsp;&nbsp;Create
              </PositiveButton>
            </ModalButtons>
          </ModalSection>
        </SidePanel>
      </Modal>
    )
  }

  cancelCreate() {
    this.updateState({title: ''})
    this.props.onClose()
  }

  updateState(update){
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}