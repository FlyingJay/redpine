import React from 'react' 
import styled from 'styled-components'

import { RP_RED, RP_DARK_GREY } from 'Components' //GLOBALS

                
export class TabBox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    	tab: 0
    }
  }
                    
  render() {
  	const tab_count = (this.props.titles || []).length

    return (
    	<div>
				{ this.props.titles.map((title, index) => {
						return <ToggleDisplay tab_count={tab_count} key={index}>
										<ToggleButton selected={this.state.tab === index} onClick={() => this.updateState({tab:index})}>
									 		{title}
										</ToggleButton>
								 	 </ToggleDisplay> 
					}) }
				{ this.props.tabs.map((tab, index) => {
						return <div style={{display:this.state.tab == index ? 'block' : 'none'}} key={index}>
										{tab}
								 	 </div> 
					}) }
    	</div>
    )
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}
export default TabBox

const ToggleDisplay = styled.div`
  display: inline-block;
  position: relative;
  width: calc(${props => props.tab_count ? 100/props.tab_count : 100}% - 8vmin);
  vertical-align: top;
  text-align: center;
  padding: 0 4vmin 0.5vmin 4vmin;

  @media (max-width: 767px) and (orientation: portrait) {
    width: calc(${props => props.tab_count ? 100/props.tab_count : 100}% - 4vmin);
    padding: 0 2vmin;
  }
`
const ToggleButton = styled.div`
  display: inline-block;
  width: calc(100% - 8vmin);
  padding: 2vmin 4vmin;
  background: #FFF;
  color: ${props => props.selected ? RP_RED : RP_DARK_GREY};
  border-bottom: ${props => props.selected ? `1px solid ${RP_RED}` : '0'};
  transition: background ease 0.25s;
  font-size: 2.5vmin;
  font-weight: 200;

  &:hover {
  	border-bottom: 1px solid ${RP_RED};
  	cursor: pointer;
  }

  @media (max-width: 767px) and (orientation: portrait) {
    width: calc(100% - 4vmin);
    padding: 2vmin 2vmin;
  }
`