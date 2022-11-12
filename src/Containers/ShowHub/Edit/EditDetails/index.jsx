import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'

import { SidePanel, ModalSection, ModalHeading, NegativeButton, PositiveButton } from 'Components' //MODAL
import { UploadImage } from 'Components' // UPLOADIMAGE
import { Input, TextBox } from 'Components' // INPUT


export class EditDetails extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      title: this.props.title,
      picture: this.props.picture,
      description: this.props.description,
      hashtag: this.props.hashtag || 'redpineshow'
    }
  }

  render() {
    return (
      <SidePanel>
        {/* CAMPAIGN BANNER CONTAINER */}
        <ModalSection top>
          <ModalHeading>Show Details</ModalHeading>
        </ModalSection>

        <ModalSection>
          <UploadImage
            default_image={this.state.picture}
            onChange={(data) => this.updateState({ picture: data, pictureData: data })}
            height="26vmin"
            text="Update Show Photo"
            disablePictureRemove/>
        </ModalSection>

        <ModalSection style={{textAlign:'right'}}>
          {/* CAMPAIGN NAME */}
          <Input
            value={this.state.title}
            validate={validators.KEYBOARD()}
            onValidate={(text) => this.updateState({title: text})}
            placeholder="Show Title"
            image="dot" 
            focusImage="dot-focus"  
            maxLength="200"/>

          {/* CAMPAIGN DESCRIPTION */}
          <TextBox 
            value={this.state.description} 
            onChange={(e) => this.updateState({description: e.target.value})} 
            placeholder="Description"
            image="dot" 
            focusImage="dot-focus"  
            maxLength="2000"
            style={{resize:'vertical'}}/>

          {/* HASHTAG */}
          <Input
            value={this.state.hashtag}
            validate={validators.ALL_THE_SHIT()}
            onValidate={(text) => this.updateState({hashtag: text})}
            placeholder="Hashtag"
            image="hash" 
            focusImage="hash-focus" 
            maxLength="50"/>
        </ModalSection>

        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.props.back()}>
            <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;Cancel
          </NegativeButton>
          <PositiveButton onClick={() => this.saveDetails()}>
            Save
          </PositiveButton>
        </ModalSection>
      </SidePanel>
    )
  }

  saveDetails(){
    let data = {
      title: this.state.title,
      description: this.state.description,
      hashtag: this.state.hashtag
    }
    if (this.state.pictureData) {
      data['picture'] = this.state.pictureData
    }
    this.props.save(data)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const BestResults = styled.div`
  font-weight: bold;
  padding: 0.5vmin;
  text-align: right;
`