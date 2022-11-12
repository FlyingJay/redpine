import React from 'react'
import styled from 'styled-components'
import { paths } from 'globals'
import { RP_Act } from 'Models'
import { RP_FONT, RP_BLACK, RP_RED } from 'Components' // GLOBALS
import { SidePanel, ModalSection, ModalHeading, ModalSubheading } from 'Components' //MODAL & MODALOTHERS
import { LoadingIndicator } from 'Components' //IMAGE
import { ActBioImage } from 'Components' //IMAGE
import { Link } from 'Components' //LINK

export class Tab0YourAct extends React.PureComponent {
  constructor(props){
    super(props)
  }

  render() {
    const acts         = this.props.acts || []
    const acts_loading = this.props.acts_loading

    return (
      <SidePanel> 
        <ModalSection style={{padding: '12vmin 0'}}>
          <ModalHeading style={{textAlign:'center'}}>Which act is performing?</ModalHeading>
        </ModalSection>
        <ModalSection>
          <LoadingIndicator loading={acts_loading}>
          {
            acts.length > 0 
            ? acts.map((act,index) => {
                const _Act = RP_Act(act)
                return  <ActOption key={_Act.id} onClick={() => this.props.next(act)}>
                          <ActBioImage image={_Act.picture} inline="inline-block" width="5vmin" height="5vmin" radius="0.5vmin" style={{cursor: 'pointer'}}/>
                          <ActName>{_Act.name}</ActName>
                          <br/>
                        </ActOption>
              })
            : <NoActs>
                Uh oh, looks like you haven't added an act yet.
                <br/>
                <br/>  
                No worries, you can make one <Link href={paths.myActs()} style={{fontWeight:'bold'}}>here!</Link>
              </NoActs>
          }
          </LoadingIndicator>
        </ModalSection>
      </SidePanel>
    )
  }
}

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

