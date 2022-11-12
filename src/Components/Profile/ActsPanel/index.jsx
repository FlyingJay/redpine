import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals' 
import { RP_Act } from 'Models'

import { SPOTIFY_GREEN, RP_BLACK } from 'Components' // GLOBALS
import { SexiestPanelEver, PanelHeading, PanelContent, SexifyPersonality, ViewAllData } from 'Components' //PROFILE
import { ProfileBandPic } from 'Components' //IMAGE
import { Link } from 'Components' //LINK


export class ActsPanel extends React.PureComponent {
  render() {
    const title             = this.props.title
    const acts              = this.props.acts
    const acts_count        = this.props.acts_count
    const act_has_performed = this.props.act_has_performed
    const is_expanded       = this.props.is_expanded
    const onClickExpand     = this.props.onClickExpand
    const max_display_count = this.props.max_display_count
    const null_message      = this.props.null_message

    return <SexiestPanelEver>
            <PanelHeading color={SPOTIFY_GREEN}>
              <i className="fa fa-circle-o" />
              <span>{title}</span>
            </PanelHeading>
            {
              act_has_performed
              ? <PanelContent>
                  {
                    acts.map((act, index) => <ActCircle key={act.id} act={act} is_hidden={index > max_display_count && !is_expanded}/>)
                  }
                  {
                    acts_count > max_display_count && !is_expanded
                    ? <ViewAllData show={!is_expanded} onClick={onClickExpand}><i className="fa fa-ellipsis-h" /></ViewAllData>
                    : null
                  }
                </PanelContent>
              : <SexifyPersonality>{null_message}</SexifyPersonality>
            }           
          </SexiestPanelEver>
  }
}

export const ActCircle= ({act}) => {
  const _Act = RP_Act(act)

  return <Link href={paths.acts(_Act.id)}>
          <ActCircleWrapper>
            <BandPicture pic={_Act.picture} />
            <BandName>{_Act.name}</BandName>
          </ActCircleWrapper>
         </Link>
}
const ActCircleWrapper = styled.div`
  cursor: pointer;
  display: ${props => props.is_hidden ? 'none' : 'inline-block'};
  position: relative;
  width: 14.66%;
  height: auto;
  padding: 1vmin;

  text-align: center;
  border-radius: 3px;
  text-align: center;
`
const BandPicture = styled(ProfileBandPic)`
  cursor: pointer !important;
  display: block;
  position: relative;
  width: 9vmin;
  height: 9vmin;
  border-radius: 100%;
  box-shadow: 0 0.5px 0 0 #FFFFFF inset, 0 1px 2px 0 #B3B3B3;
  margin: 0 auto;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 9vmin;
  }

  @media (min-width: 767px) and (max-width: 1024px) and (orientation: portrait) { 
    width: 8vmin;
    height: 8vmin;
  }
`
const BandName = styled.div`
  display: block;
  position: relative;
  width: 9vmin;
  height: auto;
  margin: 1vmin auto 0 auto;
  color: ${RP_BLACK};
  font-size: 1.7vmin;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;

  @media (min-width: 767px) and (max-width: 1024px) and (orientation: portrait) { 
    width: 8vmin;
  }
`

export default ActsPanel