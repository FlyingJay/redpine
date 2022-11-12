import React from 'react'
import styled from 'styled-components'


export class Toggle extends React.PureComponent {
  render() {
    return (
      <input 
        type="checkbox" 
        checked={!!this.props.enabled}
        onChange={this.props.onChange} />
    )
  }
}

export default Toggle