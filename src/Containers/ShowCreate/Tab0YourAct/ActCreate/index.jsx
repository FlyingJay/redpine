import React from 'react'
import styled from 'styled-components'

import { RP_DARK_GREY, RP_RED } from 'Components' // GLOBALS
import { ModalSection, PositiveButton, NegativeButton } from 'Components' //MODALOTHERS
import { Input, Select } from 'Components' //INPUT


export class ActCreate extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      name: null,
      genre: null,
      genre_text: '',
      hometown: null,
      hometown_text: '',

      show_socials: false,

      social_option: null,
      facebook: null,
      twitter: null,
      instagram: null,
      youtube: null,
      soundcloud: null,
      bandcamp: null
    }

    this.social_options = ['Facebook','Twitter','Instagram','YouTube','SoundCloud','Bandcamp']
  }

  render() {
    const genres = this.props.genres || []
    const cities = this.props.cities || []

    const social_added = (this.state.facebook || this.state.twitter || this.state.instagram || this.state.youtube || this.state.soundcloud || this.state.bandcamp)
    const can_create = (this.state.name && this.state.genre && this.state.hometown && social_added)

    return <div>
            { !this.state.show_socials 
              ? <ModalSection>
                  <Message>
                    Ready to play a show? Add some basic details for your act to get started.
                  </Message>
                  <Input type='text' placeholder='Act Name' image='last-name' focusImage='last-name-focus' onUpdate={(e) => this.updateState({name: e.target.value })} />
                  <Select
                    style={{marginBottom:'1vmin'}}
                    name='genre-select'
                    options={
                      genres.map((genre) => {
                        return {
                          value: genre.id,
                          label: genre.name
                        }
                      })
                    }
                    onChange={(e) => this.updateState({genre:e.value,genre_text:e.label})}
                    placeholder={ this.state.genre_text || 'Pick the closest genre..' } />
                  <Select
                    name='city-select'
                    options={
                      cities.map((city) => {
                        return {
                          value: city.id,
                          label: city.name
                        }
                      })
                    }
                    onChange={(e) => this.updateState({hometown:e.value,hometown_text:e.label})}
                    placeholder={ this.state.hometown_text || 'Pick your nearest city..' } />
                </ModalSection>
              : null }

            { this.state.show_socials 
              ? <ModalSection>
                  <Message>
                    Please add your handle for one of these services.
                    <br/>
                    <b style={{fontWeight: 'bold'}}>Don't include and '@', '#', or similar prefixes.</b>
                  </Message>
                  <Select
                    style={{marginBottom:'1vmin'}}
                    name='social-select'
                    options={this.social_options.map((name,i) => { return {value:i,label:name} })}
                    onChange={(e) => this.updateState({social_option:e.value,social_option_text:e.label})}
                    placeholder={ this.state.social_option_text || 'Link a profile..' } />

                  { this.state.social_option === 0
                    ? <Input type='text' placeholder="facebook.com/your_handle" image='facebook' focusImage='facebook-focus' onUpdate={(e) => this.updateState({facebook: e.target.value })} />
                    : null }
                  { this.state.social_option === 1
                    ? <Input type='text' placeholder='twitter.com/your_handle' image='twitter' focusImage='twitter-focus' onUpdate={(e) => this.updateState({twitter: e.target.value })} />
                    : null }
                  { this.state.social_option === 2
                    ? <Input type='text' placeholder='instagram.com/your_handle' image='instagram' focusImage='instagram-focus' onUpdate={(e) => this.updateState({instagram: e.target.value })} />
                    : null }
                  { this.state.social_option === 3
                    ? <Input type='text' placeholder='youtube.com/user/your_handle' image='youtube' focusImage='youtube-focus' onUpdate={(e) => this.updateState({youtube: e.target.value })} />
                    : null }
                  { this.state.social_option === 4
                    ? <Input type='text' placeholder='soundcloud.com/your_handle' image='soundcloud' focusImage='soundcloud-focus' onUpdate={(e) => this.updateState({soundcloud: e.target.value })} />
                    : null }
                  { this.state.social_option === 5
                    ? <Input type='text' placeholder='your_handle.bandcamp.com' image='bandcamp' focusImage='bandcamp-focus' onUpdate={(e) => this.updateState({bandcamp: e.target.value })} />
                    : null }
                </ModalSection>
              : null }

            <ModalSection style={{textAlign:'right'}}>
              { this.state.show_socials && can_create
                ? <PositiveButton onClick={() => this.createAct()}>
                    Next&nbsp;&nbsp;
                    <i className="fa fa-arrow-right"/>
                  </PositiveButton>
                : this.state.show_socials 
                  ? [<NegativeButton key="0" onClick={() => this.updateState({show_socials:false})} style={{float:'left'}}>
                       <i className="fa fa-arrow-left"/>
                       &nbsp;&nbsp;Back
                     </NegativeButton>,
                     <NegativeButton key="1" onClick={() => this.props.error('You are missing some info...')}>
                       Next&nbsp;&nbsp;
                       <i className="fa fa-arrow-right"/>
                     </NegativeButton>]
                  : <PositiveButton onClick={() => this.updateState({show_socials:true})}>
                      Next&nbsp;&nbsp;
                      <i className="fa fa-arrow-right"/>
                    </PositiveButton> }
            </ModalSection>
          </div>
  }

  createAct(){
    const act = {
      name: this.state.name,
      short_bio: this.state.name + ' hasn\'t added a bio yet.',
      genre: this.state.genre,
      hometown: this.state.hometown,
      is_redpine: false,
      is_headliner: true
    }

    Object.assign(act, this.state.facebook && { facebook: 'https://www.facebook.com/'+this.state.facebook},
                        this.state.twitter && { twitter: 'https://www.twitter.com/'+this.state.twitter},
                      this.state.instagram && { instagram: 'https://www.instagram.com/'+this.state.instagram},
                        this.state.youtube && { youtube: 'https://www.youtube.com/user/'+this.state.youtube},
                     this.state.soundcloud && { soundcloud: 'https://www.soundcloud.com/'+this.state.soundcloud},
                       this.state.bandcamp && { bandcamp: 'https://'+this.state.bandcamp+'.bandcamp.com'})

    this.props.onCreate(act)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Message = styled.div`  
  font-size: 2vmin;
  margin: 15px 0;
  color: ${RP_DARK_GREY};

  span {
    color: ${RP_RED};

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`
const Notice = styled.div`  
  font-size: 2vmin;
  margin-top: 15px;
  color: ${RP_DARK_GREY};

  span {
    color: ${RP_RED};

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`