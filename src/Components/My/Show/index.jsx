import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Campaign, RP_Venue } from 'Models'

import { RP_BLACK, RP_SUPER_LIGHT, RP_RED, Bold } from 'Components' // GLOBALS
import { Image } from 'Components'
import { Link } from 'Components'


export class Show extends React.PureComponent {
  render () {

    const _Campaign  = RP_Campaign(this.props.campaign)
    const has_acts   = _Campaign.bands ? _Campaign.bands.length : false

    const _Venue     = RP_Venue(this.props.venue)

    const date       = moment(_Campaign.timeslot ? _Campaign.timeslot.start_time : null).format('MMM Do, YYYY')
    const start_time = moment(_Campaign.timeslot ? _Campaign.timeslot.start_time : null).format('LT')
    const end_time   = moment(_Campaign.timeslot ? _Campaign.timeslot.end_time : null).format('LT')

    return <Wrapper>
             <Image image={_Campaign.picture} height="9vmin" width="9vmin" inline style={{borderRadius:'0.75vmin 0 0 0',backgroundSize:'cover'}}/>
             <Heading>
	             <Link href={paths.shows(_Campaign.id)}>
                 <Title>{_Campaign.title}</Title>
               </Link>
                { has_acts
                  ? <Subtitle>
                      <Bold> 
                        { _Campaign.confirmed_acts().map((act,i) => {
                            return <Link key={i} href={paths.acts(act.id)}>
                                    {act.name}
                                    {i < (_Campaign.confirmed_acts().length-1) ? ', ' : ''}
                                   </Link>}) }
                      </Bold>
                    </Subtitle>
                  : null }
             </Heading>
            
            {this.props.children}
            
            { this.props.venue
              ? <Link href={paths.venues(_Venue.id)}>
                  <Venue>
                    <OneQuarter>
                      <InfoTitle><i className="fa fa-calendar"/>&nbsp;&nbsp;{date}</InfoTitle>
                      <span><i className="fa fa-clock-o"/>&nbsp;&nbsp;{start_time} - {end_time}</span>
                    </OneQuarter>
                    <ThreeQuarters>
                      <VenueTitle>@ {_Venue.title}</VenueTitle>
                      { _Venue.address_string
                        ? <Subtitle>
                            &nbsp;&nbsp;<i className="fa fa-map-marker"/>&nbsp;&nbsp;
                            {_Venue.address_string}
                          </Subtitle>
                        : null }
                    </ThreeQuarters>
                  </Venue>
                </Link>
              : <br/> }
    	  	 </Wrapper>
  }
}

const Wrapper = styled.div`
	display: inline-block;
	vertical-align: top;
	width: calc(50% - 2vmin - 2px);
	margin: 0 2vmin 2vmin 0;
  font-size: 1.8vmin;

  border: 1px solid ${RP_SUPER_LIGHT};
  border-radius: 0.75vmin;

  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.17);

  @media (max-width: 1024px) and (orientation: portrait) {
  	display: block;
  	width: 100%;
  	margin: 0 0 4vmin 0;
  }
`
const ThreeQuarters = styled.div`
	display: inline-block;
	width: calc(70% - 2vmin - 1px);

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  padding-left: 2vmin;
  border-left: 1px solid ${RP_SUPER_LIGHT};
  vertical-align: top;
`
const OneQuarter = styled.div`
	display: inline-block;
  max-width: calc(30% - 2vmin);
  text-align: left;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  padding-right: 2vmin;
  vertical-align: top;
`
const Heading = styled.div`
  display: inline-block;
  width: calc(100% - 16vmin);
	position: relative;
  border-bottom: 1px solid ${RP_SUPER_LIGHT};
	padding: 1vmin 5vmin 1.5vmin 2vmin;
  margin-bottom: 1vmin;
  vertical-align: top;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    color: ${RP_BLACK};
  }
`
const BaseText = styled.div`
  font-weight: 100;
`
const Title = styled(BaseText)`
  display: inline-block;
  vertical-align: top;
  position: relative;
  font-size: 3.3vmin;
  text-align: left;

  &:hover {
    color: ${RP_RED};
  }
`
const Subtitle = styled.div`
  font-size: 2.2vmin;
  text-align: left;
  font-weight: 200;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const Info = styled(BaseText)`
	position: absolute;
	display: inline-block;
  font-size: 2.25vmin;
  text-align: center;
  top: 2vmin;
  left: 2vmin;

  padding: 0 2vmin;
  border-right: 1px solid ${RP_SUPER_LIGHT};
`
const InfoTitle = styled.div`
  font-size: 2vmin;
  line-height: 3vmin;
  font-weight: 600;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const Venue = styled.div`
	position: relative;
  margin-top: 1vmin;
  padding: 2vmin;

  border-top: 1px solid ${RP_SUPER_LIGHT};

  &:hover {
    color: ${RP_BLACK};
  }
`
const VenueTitle = styled(BaseText)`
  display: inline-block;
  vertical-align: top;
  position: relative;
  font-size: 2.5vmin;
  text-align: left;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    color: ${RP_RED};
  }
`
export default Show