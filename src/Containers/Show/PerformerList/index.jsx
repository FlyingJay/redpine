import React from 'react'
import styled from 'styled-components'

import { helpers } from 'globals'
import { RP_Campaign } from 'Models'

import { RP_SUPER_LIGHT, RP_DDD, RP_BLACK, RP_DARK_GREY } from 'Components' //GLOBALS
import { FormSeparator } from 'Components'
import { FormNotice } from 'Components'

import { Apply } from './Apply/index.jsx'
import { Performer } from './Performer/index.jsx'


export class PerformerList extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const _Campaign       = RP_Campaign(this.props.campaign)
    const acts = helpers.headliners_first(_Campaign.confirmed_acts(true))

    return (
      <CampaignPerformers>
        { _Campaign.is_open_mic && _Campaign.is_open
          ? <Apply onClick={() => this.props.showSelectAct()} is_open_mic/>
          : _Campaign.is_open && this.props.is_artist
            ?  <Apply onClick={() => this.props.showSelectAct()}/>
            : null
        }
        <FormSeparator text="Artists"/>
        <PerformersDetails>
          { acts.length > 0
            ? acts.map(campaign_band => <Performer key={campaign_band.id} act={campaign_band.band} is_headliner={campaign_band.is_headliner}/>)
            : <NoResults>The acts for this event have not yet been confirmed.</NoResults> }
        </PerformersDetails>
      </CampaignPerformers>
    )
  }
}

const CampaignPerformers = styled.div`
  display: block;
  position: relative;
  margin: 0 auto;
  background: #FFF;

  @media (max-width: 768px) and (orientation: portrait) {
    border: none;
    border-radius: 0 0 0.5vmin 0.5vmin;
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    border: none;
    border-radius: 0 0 0.5vmin 0.5vmin;
  }
`
const PerformersDetails = styled.div`
  position: relative;
  display: block;
  vertical-align: top;
  margin: 1.25vmin 0 0 2vmin;
  color: ${RP_DARK_GREY};
  font-size: 1.8vmin;

  @media (max-width: 768px) and (orientation: portrait) {
    font-size: 3.5vmin!important;
    margin: 0 0 0 2vmin;
    padding: 2vmin 0;
  }
`
const NoResults = styled(FormNotice)`
  display: block;
  padding: 2vmin 0 2vmin 0;
  color: ${RP_DARK_GREY};
  font-size: 1.8vmin;
  font-weight: 400;
`