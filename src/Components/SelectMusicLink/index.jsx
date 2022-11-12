import React from 'react' 
import styled from 'styled-components'

import { Select } from 'Components'
import { Input } from 'Components'

                
export class SelectMusicLink extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      music_option: null
    }
    this.music_options = ['Spotify','YouTube','SoundCloud','Bandcamp']
  }
                    
  render() {
    return <div>
			<Select
        style={{marginBottom:'1vmin'}}
        name='music-select'
        options={this.music_options.map((name,i) => { return {value:i,label:name} })}
        onChange={(e) => {
        	this.updateState({music_option:e.value,music_option_text:e.label})
        	this.props.updateState({music_option:e.value})
        }}
        placeholder={ this.state.music_option_text || 'Link music..' } />

      { this.state.music_option === 0
        ? <Input type='text' placeholder='paste link..' image='spotify' focusImage='spotify-focus' onUpdate={(e) => this.props.updateState({spotify: e.target.value, music_option:this.state.music_option })} />
        : null }
      { this.state.music_option === 1
        ? <Input type='text' placeholder='@handle' image='youtube' focusImage='youtube-focus' onUpdate={(e) => this.props.updateState({youtube: this.trimHandle(e.target.value), music_option:this.state.music_option })} />
        : null }
      { this.state.music_option === 2
        ? <Input type='text' placeholder='@handle' image='soundcloud' focusImage='soundcloud-focus' onUpdate={(e) => this.props.updateState({soundcloud: this.trimHandle(e.target.value), music_option:this.state.music_option })} />
        : null }
      { this.state.music_option === 3
        ? <Input type='text' placeholder='@handle' image='bandcamp' focusImage='bandcamp-focus' onUpdate={(e) => this.props.updateState({bandcamp: this.trimHandle(e.target.value), music_option:this.state.music_option })} />
        : null }
    </div>
  }

  trimHandle(handle){
    if(handle.startsWith('@') || handle.startsWith('#')){
      return handle.substr(1)
    }
    return handle
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}
export default SelectMusicLink