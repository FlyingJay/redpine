import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { CAMPAIGN_STATUS } from 'enums'
import { RP_Tour, RP_Campaign, RP_Act } from 'Models'

import { RP_DDD, RP_GREEN, RP_RED, RP_BLUE, RP_SUPER_LIGHT } from 'Components' // GLOBALS
import { SpecialRedPineHeading } from 'Components' // MY
import { ProgressBar } from 'Components'
import { Link } from 'Components' // LINK
import { Map } from 'Components' // MAP

export class TourSummary extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const _Tour = RP_Tour(this.props.tour)
    const campaigns = this.props.campaigns || []
    const campaigns_count = campaigns.length

    const locations = _Tour.locations()

    return (
      <div>
        <SpecialRedPineHeading style={{borderBottom:`1px solid ${RP_SUPER_LIGHT}`}}>
          {_Tour.title}
        </SpecialRedPineHeading>
        <Left height={8+campaigns_count*8}>
          <Map location={locations} multi_marker id={_Tour.id} zoom={5}/>
        </Left>
        <Right>
          {
            campaigns.map((campaign, i) => {
              const _Campaign = RP_Campaign(campaign)
              return <div key={_Campaign.id} style={{position:'relative'}}>
                      <ShowRow is_venue_approved={_Campaign.is_venue_approved}>
                        <Link href={paths.showHub(_Campaign.id)}>
                          {`${i+1}.  `}
                          {{
                            [CAMPAIGN_STATUS.PENDING_APPROVAL]: <i className="fa fa-question-circle-o"/>,
                            [CAMPAIGN_STATUS.IN_PROGRESS]: <i className="fa fa-check-circle"/>,
                            [CAMPAIGN_STATUS.SUCCESSFUL]: <i className="fa fa-check-circle"/>,
                            [CAMPAIGN_STATUS.FINISHED]: <i className="fa fa-check-circle"/>,
                            [CAMPAIGN_STATUS.FAILED]: <i className="fa fa-times-circle"/>,
                            [CAMPAIGN_STATUS.CANCELLED]: <i className="fa fa-times-circle"/>,
                            [CAMPAIGN_STATUS.REJECTED]: <i className="fa fa-times-circle"/>,
                            [CAMPAIGN_STATUS.PENDING_FOREVER]: <i className="fa fa-question-circle-o"/>
                          }[_Campaign.status()]}&nbsp;&nbsp;
                          {_Campaign.title}
                        </Link>
                        <Actions>
                          <Action className="fa fa-times" hoverColor={RP_RED} onClick={() => this.props.removeCampaign(campaign.delete_id)}/>&nbsp;&nbsp;
                        </Actions>
                      </ShowRow>
                      <ProgressBar progress={_Campaign.progress()} style={{position:"absolute",bottom:0}}/>
                     </div>
            })
          }
          <Link href={`${paths.showCreate()}?tour=${_Tour.id}&headliner=${_Tour._Headliner.id}`} style={{marginBottom:'2vmin'}}>
            <Add>
              <i className="fa fa-plus"/>
            </Add>
          </Link>
        </Right>
      </div>
    )
  }
}

const Left = styled.div`
  display: inline-block;
  width: 50%;
  height: ${props => props.height}vmin;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
    height: ${props => props.height/3}vmin;
  }
`
const Right = styled.div`
  display: inline-block;
  width: 50%;
  vertical-align: top;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
  }
`

const Add = styled.div`
  position: relative;
  color: ${RP_SUPER_LIGHT};
  font-size: 4vmin;
  text-align: center;
  line-height: 8vmin;

  &:hover {
    background: ${RP_SUPER_LIGHT};  
    color: ${RP_GREEN};
    cursor: pointer;
  }
`
const ShowRow = styled.div`
  position: relative;
  padding: 0 2vmin;
  line-height: 8vmin;
  font-size: 3vmin;
  overflow-x: hidden;
  white-space: nowrap;

  i {
    color: ${props => props.is_venue_approved ? RP_GREEN : RP_RED};
  }

  &:hover {
    cursor: pointer;
  }
`
const Actions = styled.div`
  display: inline-block;
  position: absolute;
  right: 0;
`
const Action = styled.div`
  color: ${RP_DDD};
  font-size: 4vmin;

  &:hover {
    color: ${props => props.hoverColor};
    cursor: pointer;
  }
`
