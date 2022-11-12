import React from 'react' 
import styled from 'styled-components'

import { Select } from 'Components'
import { Input } from 'Components'

                
export class SelectSocialLink extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      social_option: null
    }
    this.social_options = ['Facebook','Twitter','Instagram']
  }
                    
  render() {
    return <div>
      <Select
        style={{marginBottom:'1vmin'}}
        name='social-select'
        options={this.social_options.map((name,i) => { return {value:i,label:name} })}
        onChange={(e) => {
        	this.updateState({social_option:e.value,social_option_text:e.label})
        	this.props.updateState({social_option:e.value})
        }}
        placeholder={ this.state.social_option_text || 'Link a profile..' } />

      { this.state.social_option === 0
        ? <Input type='text' placeholder="@handle" image='facebook' focusImage='facebook-focus' onUpdate={(e) => this.props.updateState({facebook: this.trimHandle(e.target.value), social_option:this.state.social_option })} />
        : null }
      { this.state.social_option === 1
        ? <Input type='text' placeholder='@handle' image='twitter' focusImage='twitter-focus' onUpdate={(e) => this.props.updateState({twitter: this.trimHandle(e.target.value), social_option:this.state.social_option })} />
        : null }
      { this.state.social_option === 2
        ? <Input type='text' placeholder='@handle' image='instagram' focusImage='instagram-focus' onUpdate={(e) => this.props.updateState({instagram: this.trimHandle(e.target.value), social_option:this.state.social_option })} />
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
export default SelectSocialLink