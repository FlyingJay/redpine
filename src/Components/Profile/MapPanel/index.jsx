import React from 'react'
import styled from 'styled-components'

import { TWITTER, RP_BLACK } from 'Components' // GLOBALS
import { SexiestPanelEver, PanelHeading, PanelContent } from 'Components' //PROFILE
import { Map } from 'Components' // MAP

export class MapPanel extends React.PureComponent {
  render() {
    const address_string = this.props.address_string
    const location       = this.props.location

    return <SexiestPanelEver>
            <PanelHeading color={TWITTER}>
              <i className="fa fa-map-marker" />
              <span>Map</span>
            </PanelHeading>
            <MapContent>
              <Map location={location} />
            </MapContent>
            <VenueAddr>
              <i className="fa fa-map-marker" />&nbsp;&nbsp;
              {address_string}.
            </VenueAddr>
          </SexiestPanelEver>
  }
}
export default MapPanel

const MapContent = styled(PanelContent)`
  height: 30vmin;
`
const VenueAddr = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 3vmin 0 0 0;
  color: ${RP_BLACK};
  font-size: 1.8vmin;
  font-weight: 400;
  text-align: left;
`