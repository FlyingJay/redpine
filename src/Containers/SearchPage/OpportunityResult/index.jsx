import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Venue } from 'Models'

import { RP_RED, TopRight } from 'Components' //GLOBALS
import { SearchResultsContainer, SearchResultThumb, SearchResultInfo, SearchResultHeading, 
  SearchResultSubHeading, SearchResultStatValue, SearchResultStatFocus } from 'Components' // SEARCH => SearchResults
import { ImageIcon } from 'Components' //IMAGE
import { Link } from 'Components' //LINK

export class OpportunityResult extends React.PureComponent {
  this
  render() {
    const opening = this.props.opening 
    const _Venue  = RP_Venue(opening.timeslot.venue)

    const day        = moment(opening.timeslot.start_time).format('MMM Do')
    const start_time = moment(opening.timeslot.start_time).format('h:mm A')
    const end_time   = moment(opening.timeslot.end_time).format('h:mm A')

    return (
      <SearchResultsContainer onClick={() => this.props.onClick()}>
        <SearchResultThumb image={_Venue.picture} fullSearch={true} />
        <SearchResultInfo fullSearch={true}>
          <SearchResultHeading>{opening.title}</SearchResultHeading>
          <SearchResultSubHeading>
            <SearchResultStatFocus>{`${day} from ${start_time} to ${end_time}`}</SearchResultStatFocus>
            <br/>
            <SearchResultStatValue>{opening.extra_details}</SearchResultStatValue>
          </SearchResultSubHeading>
          <TopRight>
            <Link href={paths.venues(_Venue.id)} red bold>
              <ImageIcon src="\Assets\images\apps\venues.png"/>&nbsp;
              {_Venue.title}
            </Link>
          </TopRight>
        </SearchResultInfo>
      </SearchResultsContainer>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.opening == null) return true
    if (nextProps.opening != this.props.opening) return true
    return false
  }
}

const Highlight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2vmin;
  line-height: 3vmin;
  font-weight: 600;
  color: ${RP_RED};
`