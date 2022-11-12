import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { helpers, paths } from 'globals'

import { RP_Campaign, RP_Venue } from 'Models'
import { RP_FONT, RP_RED, RP_PINK, RP_BLACK, RP_SUPER_LIGHT, RP_LIGHTGREY, RP_DARK_GREY, RP_GREY, Clear, Bold, TopRight } from 'Components' // GLOBALS
import { PledgeButton } from 'Components' // BUTTON
import { Link } from 'Components' // LINK
import { Image } from 'Components' // IMAGE


class ShowResult extends React.PureComponent {
	render () {
    const _Campaign  = RP_Campaign(this.props.campaign)
    const bands      = _Campaign.confirmed_acts()
		const picture 	 = _Campaign.picture

    const _Venue     = _Campaign._Venue
    const date       = moment(_Campaign.event_start).format('MMM Do, YYYY') || 'Date TBD'
    const start_time = moment(_Campaign.event_start).format('LT') || ''
    const end_time   = moment(_Campaign.event_end).format('LT') || ''

    const bands_string = bands && this.bandsString(bands) || ''
    const bands_count  = bands && bands.length || 0
    const time_string  = start_time && start_time + ' - ' + end_time || 'Time TBD'

		return (
		  <Row>
		  	<Link href={_Campaign.is_redpine_approved ? paths.showHub(_Campaign.id) : null}
          onClick={() => _Campaign.is_redpine_approved ? null : this.props.errorMessage('The Show Hub will be available as soon as we\'ve reviewed your request.')}>
	        <Wrapper>
	          <Picture image={picture} />
	          <Details>
              <Highlight upper={!this.props.show_venue_name }>
                {
                  this.props.show_venue_name 
                  ? _Venue.title
                  : _Venue.city
                    ? _Venue.city_name
                    : '-'
                }
                { _Campaign.is_redpine_approved ? '' : ' - Under Review' }
              </Highlight>
	            <Title>{_Campaign.title}</Title>
	            <Subtitle>
                {
                  bands_count
                  ? bands_string
                  : 'Acts have not yet been added.'
                }
              </Subtitle>
              { _Campaign.is_hold && !_Campaign.is_venue_approved
                ? <TopRight style={{padding:'1vmin',fontWeight:'bold'}}>
                    <i className="fa fa-lock"/>&nbsp;HOLD
                  </TopRight>
                : null }
	        	</Details>
	          <Arrow>Show Hub&nbsp;<i className="fa fa-arrow-right"/></Arrow>
	        </Wrapper>
       	</Link>
        <ExtraInfo>
          <ExtraInfoTitle>{date}</ExtraInfoTitle>
          <span>{time_string}</span>
          <Clear />
          <SexyButtons>
            <Link href={paths.shows(_Campaign.id)}>
              <PledgeButton background="#FFF" hoverBackground={RP_LIGHTGREY}>
                <i className="fa fa-ticket" />
              </PledgeButton>
            </Link>
            <Link href={paths.guestList(_Campaign.id)}>
              <PledgeButton background="#FFF" hoverBackground={RP_LIGHTGREY}>
                <i className="fa fa-users" />
              </PledgeButton>
            </Link>
            { this.props.can_delete
            	? <PledgeButton onClick={() => this.props.onDelete()} background="#FFF" hoverBackground={RP_RED} hoverColor="#FFF">
			            <i className="fa fa-times" />
			          </PledgeButton>
			        : null }
            
            {this.props.children}
          </SexyButtons>
        </ExtraInfo>
      </Row>
		);
	}

	bandsString (bands) {
		if(bands){
			var str = " "
      bands.forEach((band,i) => {
        str += band.name
        if(i+1 != bands.length){
          str += " | "
        }
      })
		}
		return str
	}
}

const Text = styled.div`
  color: ${RP_BLACK};
  height: auto;
  font-family: ${RP_FONT};
  font-weight: 100;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const Row = styled.div`
  display: block;
  position: relative;
  height: 14vmin;
  margin-bottom: 1vmin;
  box-shadow: 2px 2px 3px ${RP_GREY};
`
const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: calc(100% - 24vmin);
  height: 100%;
  white-space: nowrap;
  overflow: hidden;

  span { 
    display: none;
  }

  &:hover {
    background: ${RP_SUPER_LIGHT};
    cursor: pointer;
  
    span {
      display: block;
      color: ${RP_BLACK};
    }
  }
`
const ExtraInfo = styled(Text)`
  display: inline-block;
  vertical-align: top;
  position: absolute;
  right: 0;
  width: auto;
  min-width: 20vmin;
  height: 10vmin;
  padding: 2vmin;
  background: ${RP_SUPER_LIGHT};
  font-size: 2.25vmin;
  line-height: 2vmin;
`
const Picture = styled(Image)`
  display: inline-block;
  vertical-align: middle;
  height: 15vmin;
  width: 15vmin;
`
const Details = styled.div`
  display: inline-block;
  width: calc(100% - 21vmin);
  position: relative;
  vertical-align: top;
  padding: 1.5vmin 3vmin;

  text-overflow: ellipsis;
`
const Title = styled(Text)`
  display: block;
  vertical-align: top;
  position: relative;
  font-size: 3.3vmin;
  text-align: left;
`
const Subtitle = styled(Text)`
  display: block;
  vertical-align: bottom;
  position: relative;
  font-size: 2.25vmin;
  text-align: left;
`
const Arrow = styled.span`
  position: absolute;
  right: 2vmin;
  bottom: 1vmin;
  font-size: 3vmin;
  color: #FFF;
`
const Highlight = styled(Text)`
  font-size: 2vmin;
  line-height: 3vmin;
  font-weight: 600;
  color: ${RP_RED};
  ${props => props.upper ? 'text-transform: uppercase;' : ''}
`
const ExtraInfoTitle = styled(Text)`
  font-size: 2.25vmin;
  line-height: 3vmin;
  font-weight: 600;
`
const SexyButtons = styled.div`
  margin-top: 0.75vmin;
  text-align: right;
`
export default ShowResult