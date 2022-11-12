import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { RP_Campaign } from 'Models'

import { RP_GREEN, SPOTIFY_GREEN } from 'Components' //GLOBALS
import { ModalHeading, PositiveButton } from 'Components' //MODAL
import { Input, TextBox } from 'Components' //INPUT
import { FormButton } from 'Components' //INPUT

import { Heading } from './../Heading/index.jsx'


export class Checklist extends React.PureComponent {
  constructor(props) {
    super(props) 

    const _Campaign = RP_Campaign(this.props.campaign)
    this.state = {
      facebook_event: _Campaign.facebook_event || '',
      discuss_doors: _Campaign.discuss_doors || '',
      discuss_sound: _Campaign.discuss_sound || '',
      discuss_equipment: _Campaign.discuss_equipment || ''
    }
  }

  render() {
    return (
      <ChecklistWrap>
        <Heading text="Ready to play?" icon="fa fa-check-square-o"/>

        <CheckHeading title="Facebook Event" is_complete={this.state.facebook_event}/>
        <Input
          width="calc(100% - 4vmin)"
          placeholder="add link.."
          image={"facebook"} 
          focusImage={"facebook-focus"}
          style={{margin:'0 2vmin'}}
          value={this.state.facebook_event}
          onFocus={() => this.updateState({show_save_facebook:true})}
          onChange={(e) => this.updateState({facebook_event:e.target.value})}/>
        <ButtonWrap>
          { this.state.show_save_facebook && this.state.facebook_event
            ? <SaveButton onClick={() => {
                this.props.updateShow({facebook_event:this.state.facebook_event})
                this.updateState({show_save_facebook:false})
              }}>
                Save&nbsp;&nbsp;<i className="fa fa-check"/>
              </SaveButton>
            : null }
        </ButtonWrap>

        <CheckHeading title="Doors" is_complete={this.state.discuss_doors}/>
        <TextBox
          width="calc(100% - 4vmin)"
          placeholder="Who is responsible for the doors?"
          image={"dot"} 
          focusImage={"dot-focus"}
          style={{margin:'2vmin',resize:'vertical'}}
          value={this.state.discuss_doors}
          onFocus={() => this.updateState({show_save_doors:true})}
          onChange={(e) => this.updateState({discuss_doors:e.target.value})}/>
        <ButtonWrap>
          { this.state.show_save_doors && this.state.discuss_doors
            ? <SaveButton onClick={() => {
                this.props.updateShow({discuss_doors:this.state.discuss_doors})
                this.updateState({show_save_doors:false})
              }}>
                Save&nbsp;&nbsp;<i className="fa fa-check"/>
              </SaveButton>
            : null }
        </ButtonWrap>

        <CheckHeading title="Sound Tech" is_complete={this.state.discuss_sound}/>
        <TextBox
          width="calc(100% - 4vmin)"
          placeholder="Who is responsible for sound tech?"
          image={"dot"} 
          focusImage={"dot-focus"}
          style={{margin:'2vmin',resize:'vertical'}}
          value={this.state.discuss_sound}
          onFocus={() => this.updateState({show_save_sound:true})}
          onChange={(e) => this.updateState({discuss_sound:e.target.value})}/>
        <ButtonWrap>
          { this.state.show_save_sound && this.state.discuss_sound
            ? <SaveButton onClick={() => {
                this.props.updateShow({discuss_sound:this.state.discuss_sound})
                this.updateState({show_save_sound:false})
              }}>
                Save&nbsp;&nbsp;<i className="fa fa-check"/>
              </SaveButton>
            : null }
        </ButtonWrap>

        <CheckHeading title="Gear & Equipment" is_complete={this.state.discuss_equipment}/>
        <TextBox
          width="calc(100% - 4vmin)"
          placeholder="Is anyone responsible for gear?"
          image={"dot"} 
          focusImage={"dot-focus"}
          style={{margin:'2vmin',resize:'vertical'}}
          value={this.state.discuss_equipment}
          onFocus={() => this.updateState({show_save_equipment:true})}
          onChange={(e) => this.updateState({discuss_equipment:e.target.value})}/>
        <ButtonWrap>
          { this.state.show_save_equipment && this.state.discuss_equipment
            ? <SaveButton onClick={() => {
                this.props.updateShow({discuss_equipment:this.state.discuss_equipment})
                this.updateState({show_save_equipment:false})
              }}>
                Save&nbsp;&nbsp;<i className="fa fa-check"/>
              </SaveButton>
            : null }
        </ButtonWrap>
      </ChecklistWrap>
    )
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const CheckHeading = ({title,is_complete}) => (
  <ModalHeading style={{margin:'2vmin'}}>&nbsp;
    { is_complete
      ? <i className="fa fa-check" style={{color:RP_GREEN}}/> 
      : <i className="fa fa-circle-thin"/> }
    &nbsp;{title}
  </ModalHeading>
)

const ChecklistWrap = styled.div`
  text-align: right;
`
const ButtonWrap = styled.div`
  padding: 2vmin 2vmin 0 0;
`
const SaveButton = styled(FormButton)`
  display: inline-block;
  position: relative;
  width: auto;
  background: ${RP_GREEN};

  &:hover {
    background: ${SPOTIFY_GREEN};
  }
`