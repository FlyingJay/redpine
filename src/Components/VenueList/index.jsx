import React from 'react' 
import styled from 'styled-components'

import { RP_Venue } from 'Models'

import { paths } from 'globals' 
                
import { RP_FONT, RP_BLACK, RP_RED } from 'Components'
import { ModalSubheading } from 'Components' //MODAL
import { LoadingIndicator } from 'Components'
import { ActBioImage } from 'Components' //IMAGE
import { Link } from 'Components'


export class VenueList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
    	<LoadingIndicator loading={this.props.is_loading}>
        { this.props.venues.length > 0 
          ? this.props.venues.map((venue,index) => {
              const _Venue = RP_Venue(venue)
              return  <VenueOption key={_Venue.id} onClick={() => this.props.venueSelected(venue)}>
                        <ActBioImage image={_Venue.picture} inline="inline-block" width="5vmin" height="5vmin" radius="0.5vmin" style={{cursor: 'pointer'}}/>
                        <VenueName>{_Venue.title}</VenueName>
                        <br/>
                      </VenueOption>
            })
          : <NoVenues>
              Uh oh, looks like you haven't added any venues.
              <br/>
              <br/>  
              You can add one <Link href={paths.venueCreate()} style={{fontWeight:'bold'}}>here</Link>, or search for an existing one.
            </NoVenues> }
      </LoadingIndicator>
    )
  }
}
export default VenueList

const VenueOption = styled.div`
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
const VenueName = styled.div`
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
const NoVenues = styled(ModalSubheading)`
  font-weight: normal;
`
