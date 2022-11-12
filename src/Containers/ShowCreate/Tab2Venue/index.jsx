import React from 'react'
import styled from 'styled-components'

import { RP_User } from 'Models'
import { validators, paths } from 'globals'

import { RP_DARK_GREY, RP_GREY, RP_BLACK, RP_FONT, RP_BLUE, RP_DARKBLUE } from 'Components' // GLOBALS
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, NegativeButton, PositiveButton, WarningModal } from 'Components' //MODAL & MODALOTHERS
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { Button } from 'Components' // BUTTON
import { Input } from 'Components' // INPUT
import { Link } from 'Components' 

import { VenueResult } from './VenueResult/index.jsx'


export class Tab2Venue extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      venue: this.props.venue,
      query: '',
      capacity: 9999999,
      headcount: 9999999,
      fee: 9999999,
      show_warning: false
    }
    this.headcountOptions = [9999999, 0, 20, 50, 100, 200, 500, 1000]
    this.feeOptions = [9999999, 0, 50, 100, 250, 500, 1000]
    this.capacityOptions = [9999999, 25, 50, 75, 100, 150, 250, 500, 750, 1000, 2500, 5000, 10000]
  }

  render() {
    const _User = RP_User(this.props.user)

    const search_venues  = this.props.search_venues || [] 
    const is_opening     = this.props.is_opening

    return (
      <SidePanel>
        <ModalSection style={{marginTop:'12vmin'}}>
          <Heading>
            { this.state.venue
              ? 'You have chosen:'
              : this.props.is_organization
                ? 'Other venues in the area'
                : 'Where would you like to play?' }
          </Heading>
          { this.state.venue
            ?  <VenueResult 
                user={this.props.user}
                venue={this.state.venue} 
                is_opening={is_opening}
                is_crowdfunded={false}
                onClick={() => this.updateState({venue:null})}
                selected/>
            :  <div style={{textAlign:'left'}}>
                <LoadingIndicator loading={this.props.loading}>
                { search_venues.map(venue => {
                    return <VenueResult 
                             key={venue.id} 
                             user={this.props.user}
                             venue={venue} 
                             is_crowdfunded={false}
                             onClick={() => (!_User.is_member_artist && !venue.has_fast_reply) 
                                             ? this.updateState({show_warning:true})
                                             : this.chooseVenue(venue)}/>
                  })}
                { search_venues.length == 0 
                  ? <ModalSubheading>
                      We don't have a listed venue for this city and these criteria, but we're happy to work together to find you one you'll like! Go ahead and hit next, and we'll work this out later.
                    </ModalSubheading>
                  : null }
                </LoadingIndicator>
              </div>
          }
          <ModalSubheading style={{textAlign:'right',paddingTop:'4vmin'}}>
            Can't find what you're looking for? Try a <Link href={paths.search('venues')} style={{fontWeight:'bold'}}>detailed search</Link>
          </ModalSubheading>
        </ModalSection>
        <ModalSection style={{textAlign:'right',marginBottom:'12vmin'}}>
          { is_opening
            ? null
            : <NegativeButton onClick={() => this.props.back(this.state.venue)} style={{float:'left'}}>
                <i className="fa fa-arrow-left"/>
                &nbsp;&nbsp;Back
              </NegativeButton> }
          <PositiveButton onClick={() => this.props.next(this.state.venue)}>
            Next&nbsp;&nbsp;
            <i className="fa fa-arrow-right"/>
          </PositiveButton>
        </ModalSection>

        <WarningModal light_warning
          show={this.state.show_warning}
          description="Sorry, this venue isn't available for your account type - please continue to upgrade your subscription."
          onContinue={() => this.props.showBuyRedPine()}
          onClose={() => this.updateState({show_warning:false})}/>
      </SidePanel>
    )
  }

  chooseVenue(venue) {
    const default_price = 1.00
    this.updateState({venue:venue,default_price:default_price})
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}
const Heading = styled(ModalHeading)`
  position: relative;
  text-align: center;
  padding-bottom: 3vmin;
`
const CriteriaContainer = styled.div`
  display: inline-block;
  width: CALC(100%/3 - 1vmin);
  margin-right: 1vmin;

  &:nth-last-child(2) {
    width: CALC(100%/3);
    margin-right: 0;
  }
`
const CriteriaHeading = styled.div`
  padding: 1vmin 0;
  color: ${RP_DARK_GREY};
  font-size: 1.6vmin;
  font-weight: bold;
  text-align: left;
`
const SelectStyling = styled.select`
  cursor: pointer;
  outline: none;
  highlight: none;
  display: inline-block;
  position: relative;
  width: 100%
  height: auto;
  padding: 0.75vmin 1.5vmin;
  background-color: #FFF;
  border: 1px solid ${RP_GREY};
  color: ${RP_BLACK};
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 1.8vmin;
  border-radius: 0.3vmin 0 0 0.3vmin;
  -webkit-box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 1px 1px rgba(0,0,0,0.1);
  box-shadow: 0px 1px 1px rgba(0,0,0,0.1);

  &:hover {
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.3);
    -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.3);
    box-shadow: 0 1px 1px rgba(0,0,0,0.3);
  }
`
const SubmitVenueSearch = styled(Button)`
  display: block;
  position: relative;
  width: CALC(100% - 9vmin);
  margin: 3vmin auto;
  padding: 1.5vmin 4.5vmin;
  float: none;
  text-align: center;
  background-color: ${RP_BLUE};

  &:hover {
    background-color: ${RP_DARKBLUE};
  }

  @media (max-width: 767px) and (orientation: portrait) {
    font-size: 3vmin;
  }
`