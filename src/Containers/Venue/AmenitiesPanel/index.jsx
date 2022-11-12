import React from 'react'
import styled from 'styled-components'

import { RP_PINK, RP_BLACK, RP_DARK_GREY } from 'Components' // GLOBALS
import { SexiestPanelEver, PanelHeading, PanelContent, SexifyPersonality } from 'Components' //PROFILE
import { AmenityImage } from 'Components' // IMAGE

export class AmenitiesPanel extends React.PureComponent {
  render() {
    const venue        = this.props.venue
    const venue_title  = venue ? venue.title : ''

    const has_essential_ammenities = venue ? (venue.has_wifi || venue.is_accessible_by_transit || venue.has_atm_nearby || 
                                              venue.has_free_parking_nearby || venue.has_paid_parking_nearby || venue.is_wheelchair_friendly || 
                                              venue.allows_smoking || venue.allows_all_ages || venue.has_merch_space || 
                                              venue.has_drink_tickets || venue.has_meal_vouchers || venue.has_cash_box || venue.has_float_cash) : false
    const has_music_ammenities     = venue ? (venue.has_stage || venue.has_microphones || venue.has_drum_kit || venue.has_piano || 
                                              venue.has_wires_and_cables || venue.has_front_load_in || venue.has_back_load_in || 
                                              venue.has_soundtech || venue.has_lighting) : false

    const has_ammenities = (has_essential_ammenities || has_music_ammenities)

     return has_ammenities
            ? <SexiestPanelEver>
                <PanelHeading color={RP_PINK}>
                  <i className="fa fa-asterisk" />
                  <span>
                    Amenities at {venue_title}
                  </span>
                </PanelHeading>
                <PanelContent>

                  {/* ESSENTIAL AMENITIES */
                    has_essential_ammenities
                    ? <PanelHeading style={{border: 'none', paddingBottom: '3vmin'}}>
                        <span style={{color: RP_BLACK, fontWeight: 'bold'}}>
                          Essentials
                        </span>
                      </PanelHeading>
                    : null
                  }
                  <Amenity 
                    icon="/Assets/images/amenities/1_location/1_01_wifi.png" 
                    name="WiFi available"
                    status={venue.has_wifi} />
                  <Amenity 
                    icon="/Assets/images/amenities/1_location/1_02_public_transit.png" 
                    name="Accessible by transit"
                    status={venue.is_accessible_by_transit} />
                  <Amenity 
                    icon="/Assets/images/amenities/1_location/1_16_atm.png" 
                    name="ATM nearby"
                    status={venue.has_atm_nearby} />
                  <Amenity 
                    icon="/Assets/images/amenities/1_location/1_06_parking_free_street.png" 
                    name="Free parking nearby"
                    status={venue.has_free_parking_nearby} />
                  <Amenity 
                    icon="/Assets/images/amenities/1_location/1_08_parking_free_off.png" 
                    name="Paid parking nearby"
                    status={venue.has_paid_parking_nearby} />
                  <Amenity 
                    icon="/Assets/images/amenities/1_location/1_17_disabled.png" 
                    name="Wheelchair friendly"
                    status={venue.is_wheelchair_friendly} />
                  <Amenity 
                    icon="/Assets/images/amenities/1_location/1_15_smoking.png" 
                    name="Smoking allowed"
                    status={venue.allows_smoking} />
                  <Amenity 
                    icon="/Assets/images/amenities/1_location/1_20_all_ages.png" 
                    name="Allows all ages"
                    status={venue.allows_all_ages} />
                  <Amenity 
                    icon="/Assets/images/amenities/5_other/merch-space.png" 
                    name="Merch Space"
                    status={venue.has_merch_space} />
                  <Amenity 
                    icon="/Assets/images/amenities/5_other/drink-tickets.png" 
                    name="Drink Tickets"
                    status={venue.has_drink_tickets} />
                  <Amenity 
                    icon="/Assets/images/amenities/5_other/meal-voucher.png" 
                    name="Meal Vouchers"
                    status={venue.has_meal_vouchers} />
                  <Amenity 
                    icon="/Assets/images/amenities/5_other/cash-box.png" 
                    name="Cash Box"
                    status={venue.has_cash_box} />
                  <Amenity 
                    icon="/Assets/images/amenities/5_other/float-cash.png" 
                    name="Float Cash"
                    status={venue.has_float_cash} />

                  {/* MUSIC AMENITIES */
                    has_music_ammenities
                    ? <PanelHeading style={{border: 'none', padding: '3vmin 0'}}>
                        <span style={{color: RP_BLACK, fontWeight: 'bold'}}>
                          Music Essentials
                        </span>
                      </PanelHeading>
                    : null
                  }
                  <Amenity 
                    icon="/Assets/images/amenities/2_music/2_01_stage.png" 
                    name="Stage"
                    status={venue && venue.has_stage} />
                  <Amenity 
                    icon="/Assets/images/amenities/2_music/2_14_mic_wired.png" 
                    name="Microphone(s)"
                    status={venue && venue.has_microphones} />
                  <Amenity 
                    icon="/Assets/images/amenities/2_music/2_11_drum_kit.png" 
                    name="Drum kit"
                    status={venue && venue.has_drum_kit} />
                  <Amenity 
                    icon="/Assets/images/amenities/2_music/2_12_piano.png" 
                    name="Piano"
                    status={venue && venue.has_piano} />
                  <Amenity 
                    icon="/Assets/images/amenities/2_music/2_22_cords.png" 
                    name="Wires and cables"
                    status={venue && venue.has_wires_and_cables} />
                  <Amenity 
                    icon="/Assets/images/amenities/5_other/sound.png" 
                    name="Sound Tech"
                    status={venue.has_soundtech} />
                  <Amenity 
                    icon="/Assets/images/amenities/5_other/lighting.png" 
                    name="Lighting"
                    status={venue.has_lighting} />
                  <Amenity 
                    icon="/Assets/images/amenities/2_music/2_24_front_load_in.png" 
                    name="Front load in"
                    status={venue && venue.has_front_load_in} />
                  <Amenity 
                    icon="/Assets/images/amenities/2_music/2_24_front_load_in.png" 
                    name="Back load in"
                    status={venue && venue.has_back_load_in} />
                </PanelContent>
              </SexiestPanelEver>
            : null
  }
}
export default AmenitiesPanel

const Amenity = ({icon, name, status}) => (
  status
  ? <AmenityWrapper>
      <AmenityIcon icon={icon} enabled/>
      <AmenityName enabled>{name}</AmenityName>
    </AmenityWrapper>
  : null
);

const AmenityWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: CALC(100% / 3 - 1vmin);
  height: auto;
  padding: 1vmin 0;
  margin: 0 1vmin 0 0;
`

const AmenityIcon = styled(AmenityImage)`
  vertical-align: middle;
  width: 7vmin;
  height: 7vmin;
  margin-right: 3vmin;
`

const AmenityName = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: CALC(100% - 10vmin);
  height: auto;
  color: ${(props) => props.enabled ? RP_BLACK : RP_DARK_GREY};
  font-size: 2vmin;
  font-weight: bold;
  text-decoration: ${(props) => props.enabled ? 'none' : 'line-through'};
`