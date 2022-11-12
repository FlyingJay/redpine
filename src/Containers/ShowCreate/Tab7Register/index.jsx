import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import mobiscroll from "@mobiscroll/react"
mobiscroll.settings = {
  theme: 'redpine-default'
}

import { paths } from 'globals'

import { RP_DARK_GREY, RP_RED } from 'Components' // GLOBALS
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, PositiveButton, NegativeButton } from 'Components' //MODAL & MODALOTHERS
import { Input } from 'Components'
import { Link } from 'Components'


export class Tab7Register extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      is_artist: true,
      birthdate: moment()
    }
  }

  render() {
    return (
      <SidePanel> 
        <ModalSection style={{paddingTop: '12vmin'}}>
          <ModalHeading style={{textAlign:'center'}}>Wait, how will the venue contact you?</ModalHeading>
          <ModalSubheading style={{padding: '2vmin 0 0 0'}}>
            You will be able to chat with the venue once your account has been created, and your request is approved. As a performer, RedPine costs nothing for you to use. Apply to as many opportunities as you'd like.
            <br/>
            <br/>
            We just need a few last bits of info to set up your account.
            <br/>
            After submitting this request, a RedPine account will allow you to create ticketing packages, organize tours, apply for opportunities, accept credit cards at the door, and track statistics for every show you play.      
          </ModalSubheading>
        </ModalSection>
        <ModalSection>
          <Input type='text' value={this.state.first_name} placeholder='First Name' name='first-name'  image='first-name' focusImage='first-name-focus' onUpdate={(e) => this.updateState({first_name: e.target.value})} />
          <Input type='text' value={this.state.last_name} placeholder='Last Name' name='last-name'  image='last-name' focusImage='last-name-focus' onUpdate={(e) => this.updateState({last_name: e.target.value })} />
          <Input type='text' value={this.state.email} placeholder='Email' image='email' focusImage='email-focus' onUpdate={(e) => this.updateState({email: e.target.value})} />
          <Input type='text' value={this.state.username} placeholder='Username, make it something cool!' image='username' focusImage='username-focus' onUpdate={(e) => this.updateState({username: e.target.value})} />
          <Input type='password' value={this.state.password} placeholder='Password' image='password' focusImage='password-focus' onUpdate={(e) => this.updateState({password: e.target.value})} />
          {/*
            Nest an input within the mobiscroll.Date tags to use 
            that component instead of the default Mobiscroll one.
          */}
          <mobiscroll.Date
            display="center"
            placeholder="Please Select..."
            value={this.state.birthdate}
            onSet={(value) => this.validateBirthdate(value.valueText)}>
            <Input 
              placeholder="Birthday"
              value={this.state.birthdate}
              image="dot" 
              focusImage="dot-focus"/>
          </mobiscroll.Date>
          <Notice>
            By registering you agree to our <Link href={paths.privacyPolicy()}><span>Privacy Policy</span></Link> and <Link href={paths.termsOfUse()}><span>Terms of Use</span></Link>.
          </Notice>
        </ModalSection>
        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.props.back()} style={{float:'left'}}>
            <i className="fa fa-arrow-left"/>
            &nbsp;&nbsp;Back
          </NegativeButton>
          { this.state.first_name && this.state.last_name && this.state.email && this.state.username && this.state.password && this.state.birthdate
            ? <PositiveButton onClick={() => this.props.next(this.state)}>
                Send Request&nbsp;&nbsp;
                <i className="fa fa-envelope"/>
              </PositiveButton>
            : <NegativeButton onClick={() => this.error('Something is missing!')}>
                Send Request&nbsp;&nbsp;
                <i className="fa fa-envelope"/>
              </NegativeButton> }
        </ModalSection>
      </SidePanel>
    )
  }

  validateBirthdate(birthdate){
    if(moment(birthdate).isAfter(Date.now())){
      this.props.error('Your birthdate should have already happened.')
    }else{
      this.updateState({birthdate:moment.utc(birthdate).toISOString().slice(0,-5)})
    }
  }

  updateState(update){
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }  
}

const Notice = styled.div`  
  font-size: 1.7vmin;
  margin-top: 15px;
  color: ${RP_DARK_GREY};
  text-align: center;

  span {
    color: ${RP_RED};

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`