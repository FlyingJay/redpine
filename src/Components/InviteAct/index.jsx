import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'

import { RP_RED, RP_BLUE, RP_DARKBLUE, RP_SUPER_LIGHT, RP_DARK_GREY } from 'Components' // GLOBALS
import { Input } from 'Components' // INPUT
import { SidePanel, ModalSection, PositiveButton } from 'Components' //MODAL & MODALOTHERS

import { SelectSocialLink } from 'Components'
import { SelectMusicLink } from 'Components'

import constants from './constants'


export class InviteAct extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      name_1: '',
      email_1: '',
      name_2: '',
      email_2: '',
      name_3: '',
      email_3: ''
    }
  }

  render() {
    return (
      <div>
        <Form>
          <Input
            placeholder={this.props.multi_field ? "Act Name 1" : "Act Name"}
            value={this.state.name_1}
            validate={validators.ALL_THE_SHIT()}
            onValidate={(text) => this.updateState({name_1: text})}
            image='capacity'
            focusImage='capacity-focus'
            maxLength="200"/>
          { this.state.name_1
            ? <div>
                <Input
                  placeholder={this.props.multi_field ? "Email Address 1" : "Email Address"}
                  value={this.state.email_1}
                  validate={validators.KEYBOARD()}
                  onValidate={(text) => this.updateState({email_1: text})}
                  image='email'
                  focusImage='email-focus'
                  maxLength="200"/>
                { this.props.require_links
                  ? <div>
                      <Notice style={{marginTop: '0'}}>
                        Add a handle for one social media service, and one music source.
                        <br/>
                        { this.state.music_option === 0
                          ? <b style={{fontWeight: 'bold'}}>To add Spotify, include the complete profile link.</b>
                          : <b style={{fontWeight: 'bold'}}>We'll encourage them to add the rest later.</b> }
                      </Notice>
                      <Spacer/>
                      <SelectSocialLink updateState={(state) => this.updateState(state)}/>
                      <SelectMusicLink updateState={(state) => this.updateState(state)}/>
                    </div>
                  : null }
              </div>
            : null }

          { this.props.multi_field
            ? <Input
                placeholder="Act Name 2"
                value={this.state.name_2}
                validate={validators.ALL_THE_SHIT()}
                onValidate={(text) => this.updateState({name_2: text})}
                image='capacity'
                focusImage='capacity-focus'
                maxLength="200"/>
            : null }
          { this.state.name_2 && this.props.multi_field
            ? <Input
                placeholder="Email Address 2"
                value={this.state.email_2}
                validate={validators.KEYBOARD()}
                onValidate={(text) => this.updateState({email_2: text})}
                image='email'
                focusImage='email-focus'
                maxLength="200"/>
            : null }
          { this.props.multi_field
            ? <Input
                placeholder="Act Name 3"
                value={this.state.name_3}
                validate={validators.ALL_THE_SHIT()}
                onValidate={(text) => this.updateState({name_3: text})}
                image='capacity'
                focusImage='capacity-focus'
                maxLength="200"/>
            : null }
          { this.state.name_3 && this.props.multi_field
            ? <Input
                placeholder="Email Address 3"
                value={this.state.email_3}
                validate={validators.KEYBOARD()}
                onValidate={(text) => this.updateState({email_3: text})}
                image='email'
                focusImage='email-focus'
                maxLength="200"/>
            : null }
          <PositiveButton onClick={() => this.trySendAll()}>
            <i className="fa fa-envelope"/>&nbsp;&nbsp;<i className="fa fa-arrow-right"/>
          </PositiveButton>
        </Form>
      </div>
    )
  }

  trySendAll(){
    if(this.state.name_1 && this.state.email_1){
      this.trySend(1,this.state.name_1, this.state.email_1)
    }
    if(this.state.name_2 && this.state.email_2){
      this.trySend(2,this.state.name_2, this.state.email_2)
    }
    if(this.state.name_3 && this.state.email_3){
      this.trySend(3,this.state.name_3, this.state.email_3)
    }
  }

  validate_email(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
  }

  socialLinks(){
    return Object.assign({}, 
      this.state.facebook && { facebook:'https://www.facebook.com/'+this.state.facebook },
      this.state.twitter && { twitter:'https://www.twitter.com/'+this.state.twitter },
      this.state.instagram && { instagram:'https://www.instagram.com/'+this.state.instagram },

      this.state.spotify && { spotify:this.state.spotify },
      this.state.youtube && { youtube:'https://www.youtube.com/user/'+this.state.youtube },
      this.state.soundcloud && { soundcloud:'https://www.soundcloud.com/'+this.state.soundcloud },
      this.state.bandcamp && { bandcamp:'https://'+this.state.bandcamp+'.bandcamp.com' }
    )
  }

  trySend(fieldset,name,email){
    if(!this.validate_email(email)){
      this.props.error(constants.ERROR_EMAIL_INVALID)
    }else if(!name){
      this.props.error(constants.ERROR_NO_ACT_NAME)
    }else{
      if(this.props.require_links){
        this.props.sendInvite(name,email,this.socialLinks())
      }else{
        this.props.sendInvite(name,email)
      }
      
      switch(fieldset){
        case 1:
          this.updateState({name_1:'',email_1:''})
          break
        case 2:
          this.updateState({name_2:'',email_2:''})
          break
        case 3:
          this.updateState({name_3:'',email_3:''})
          break
      }
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Form = styled.div`
  text-align: right;
  background: ${RP_SUPER_LIGHT};
  padding: 2vmin;
`
const Message = styled.div`
  position: relative;
  height: 10vmin;
  background: url(/Assets/images/background/cta0.jpg);
  color: #FFF; 
  transition: 0.5s ease;

  &:hover {
    cursor: pointer;
  }
`
const Text = styled.div`
  font-size: 2.5vmin;
  font-weight: bold;
  text-align: left;
  padding: 1vmin 0 0 1vmin;
`
const Arrow = styled.div`
  position: absolute;
  bottom: 1vmin;
  right: 2vmin;
  font-size: 2vmin;
  text-align: right;
`
const Spacer = styled.div`
  width: 100%
  height: 15px
`
const Notice = styled.div`  
  font-size: 2vmin;
  margin-top: 15px;
  color: ${RP_DARK_GREY};
  text-align: left;
  padding-left: 1vmin;

  span {
    color: ${RP_RED};

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`