import React from 'react' 
import styled from 'styled-components'

import { RP_Organization } from 'Models'
import { validators } from 'globals'

import { Modal, SidePanel, ModalSection, ModalHeading, ModalSubheading,  
          DescriptionTextBox, ModalButtons, PositiveButton, NegativeButton } from 'Components'  // MODAL & MODALOTHER
import { UploadImage } from 'Components' // UPLOADIMAGE   
import { FormError } from 'Components' // ERROR
import { Input } from 'Components' // INPUT  


export class EditOrganization extends React.PureComponent {
  constructor(props) {
    super(props)
  	const _Organization = RP_Organization(this.props.organization)

    this.state = {
			title:_Organization.title,
      description:_Organization.description,
      picture:_Organization.picture,
      picture_is_new: false,
      badge:_Organization.badge,
      badge_is_new: false,
      country:_Organization.country_name,
      province:_Organization.province_name,
      city:_Organization.city_name,
      postal_code: _Organization.postal_code,
      address:_Organization.address,
    }
  }

  render() {
    return (
			<Modal show transparent onClose={(e) => this.props.onClose()}>
	      <SidePanel>
	        {/* ORGANIZATION PICTURE */}
	        <ModalSection top>
	          <ModalHeading>Organization Info</ModalHeading>
	          <ModalSubheading>
	            Change your organization details
	          </ModalSubheading>
						<FormError error={this.props.error && this.props.error.address ? 'The provided address seems to be invalid...' : null} />
	          <UploadImage
              default_image={this.state.picture}
              onChange={(data) => this.updateState({ picture: data, picture_is_new:true })}
              text="Update organization photo"
              height="26vmin"
              disablePictureRemove/>
	        </ModalSection>
	        {/* ORGANIZATION NAME AND DESCRIPTION */}
	        <ModalSection>
	          <div style={{textAlign: 'right'}}>
              <Input
                value={this.state.title}
                validate={validators.STANDARD_CHARACTERS()}
                onValidate={(text) => this.updateState({title: text})}
                placeholder="Organization Title"
                maxLength="200"/>
            </div>
	          <div style={{textAlign: 'right'}}>
              <DescriptionTextBox value={this.state.description} onChange={(e) => this.updateState({description: e.target.value})} placeholder="Organization Description" maxLength="5000"></DescriptionTextBox>
            </div>
	        </ModalSection>

	        <ModalSection>
	          <ModalHeading>Badge</ModalHeading>
	          <ModalSubheading>Shown on each member's profile</ModalSubheading>
	          <UploadImage square
              default_image={this.state.badge}
              onChange={(data) => this.updateState({ badge: data, badge_is_new:true })}
              text="Update badge photo"
              height="26vmin"
              disablePictureRemove/>
	        </ModalSection>

	        {/* ORGANIZATION LOCATION AND CAPACITY */}
	        <ModalSection>
	          <ModalHeading>Location</ModalHeading>
	          <ModalSubheading>Street address and postal code</ModalSubheading>
	          {/* STREET ADDRESS */}
	          <Input 
	            value={this.state.address} 
	            validate={validators.STANDARD_CHARACTERS()}
	            onValidate={(text) => this.updateState({address: text})}
	            image="location" 
	            focusImage="location-focus"
	            placeholder="Street Address" 
	            maxLength="200"/>
	          {/* CITY/TOWN 
	          <Input disabled 
	            value={this.state.city}
	            onChange={(e) => this.updateState({city: e.target.value})}
	            style={{marginRight:'2vmin'}}
	            image="dot" 
	            focusImage="dot-focus"
	            placeholder="City / Town" 
	            maxLength="100"
	            inline/> */}
	          {/* PROVINCE/STATE 
	          <Input disabled 
	            value={this.state.province}
	            onChange={(e) => this.updateState({province: e.target.value})}
	            image="dot" 
	            focusImage="dot-focus"
	            placeholder="Province / State" 
	            maxLength="100"
	            inline/> */}
	          {/* COUNTRY 
	          <Input disabled 
	            value={this.state.country}
	            onChange={(e) => this.updateState({country: e.target.value})}
	            image="dot" 
	            focusImage="dot-focus"
	            placeholder="Country" 
	            maxLength="100"/> */}
	          {/* POSTAL CODE */}
	          <Input 
	            value={this.state.postal_code}
	            validate={validators.LETTERS_NUMBERS()}
	            onValidate={(text) => this.updateState({postal_code: text})}
	            image="dot" 
	            focusImage="dot-focus"
	            placeholder="Postal / ZIP" 
	            maxLength="7"/>
	        </ModalSection>

	        {/* MODAL EDITOR BUTTONS */}
	        <ModalSection>
	          <ModalButtons>
	            <NegativeButton onClick={() => this.props.onClose()}>
	              <i className="fa fa-arrow-left"></i>&nbsp;&nbsp;&nbsp;Cancel
	            </NegativeButton>
	            <PositiveButton onClick={() => this.save()}>Save</PositiveButton>
	          </ModalButtons>
	        </ModalSection>
	      </SidePanel>
	    </Modal>
    )
  }

  save(){
    const organization = Object.assign((this.props.organization || {}), {
      title: this.state.title,
      description: this.state.description,
      picture: this.state.picture,
      badge: this.state.badge,
      address: this.state.address,
      postal_code: this.state.postal_code
    })

    //Don't submit {picture: null} if no picture was uploaded, it will remove the existing pic from the user's account.
    if (!this.state.picture_is_new) {
      delete organization['picture']
    }
    //Don't submit {badge: null} if no badge was uploaded, it will remove the existing pic from the user's account.
    if (!this.state.badge_is_new) {
      delete organization['badge']
    }

    this.props.organization && this.props.organization.id
    ? this.props.onUpdate(organization)
    : this.props.onCreate(organization)

  	this.props.onClose()
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}
export default EditOrganization