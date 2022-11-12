import React from 'react'
import styled from 'styled-components'
import { paths } from 'globals'

import { RP_Act } from 'Models'

import { RP_FONT, RP_BLACK, RP_RED, Bold } from 'Components' // GLOBALS
import { SidePanel, ModalSection, ModalHeading, ModalSubheading } from 'Components' //MODAL & MODALOTHERS
import { LoadingIndicator } from 'Components' //IMAGE
import { ActList } from 'Components' //LINK
import { Link } from 'Components' //LINK

import { ActCreate } from './ActCreate/index.jsx'

/*
  Nearly identical to "ShowCreate/Tab0YourAct".
  Consider abstraction if this needs duplication.
  Check both for text changes.
*/

export class SelectAct extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const acts = this.props.acts || []

    return (
      <SidePanel> 
        <ModalSection style={{paddingBottom:'8vmin'}} top>
          <ModalHeading style={{textAlign:'center'}}>Which of your acts will apply to play?</ModalHeading>
        </ModalSection>
        { this.props.user
          ? <ModalSection>
              <ActList 
                acts={acts} 
                is_loading={this.props.acts_loading}
                actSelected={(act) => this.validateSocials(act)}/>
            </ModalSection>
          : <ActCreate
              cities={this.props.cities}
              genres={this.props.genres}
              error={(text) => this.props.error(text)} 
              onCreate={(act) => this.props.actCreated(act)}/> }
      </SidePanel>
    )
  }

  validateSocials(act){
    if(RP_Act(act).hasSocialLink()){
      this.props.actSelected(act)
    }else{
      this.props.error('Acts require at least one social media or website link to play a show. To change these, check out "My Acts".')
    }
  }
}
export default SelectAct

const ActOption = styled.div`
  display: block;
  position: relative;
  width: auto;
  margin: 0 auto 3vmin auto;
  padding: 0;
  background: #FFF;
  border-bottom: 1px solid rgb(247,247,247);
  box-shadow: 0;
  text-align: left;
`
const ActName = styled.div`
  display: inline-block;
  position: relative;
  font-size: 2vmin;
  padding-left: 1.5vmin;
  text-align: left;
  font-family: ${RP_FONT};
  font-weight: bold;
  color: ${RP_BLACK};
  line-height: 5vmin;
  vertical-align: top;

  &:hover {
    cursor: pointer;
    color: ${RP_RED};
  }
`
const NoActs = styled(ModalSubheading)`
  font-weight: normal;
`

