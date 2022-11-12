import React from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'


export class Tooltip extends React.PureComponent {
  render() {
    const id = Math.random().toString()

    return <span>
            <a data-tip data-for={id} id="tooltip_item" style={this.props.style}>
              {this.props.children}
            </a>
            <ReactTooltip id={id} border
              place={this.props.place || "top"} 
              type={this.props.type || "light"} 
              delayHide={this.props.delayHide}
              effect={this.props.effect}>
              {this.props.tip}
            </ReactTooltip>
           </span>
  }
}

export default Tooltip