import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import BigCalendar from 'react-big-calendar'

import { paths } from 'globals'

import { RP_DARKGREY, RP_DDD, RP_BLACK, Clear } from 'Components' // GLOBALS

import { Link } from 'Components' // LINK
import { Select } from 'Components' // INPUT
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, PositiveButton } from 'Components' //MODAL & MODALOTHERS

import constants from './constants.js'

BigCalendar.momentLocalizer(moment)


export class Tab1City extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      city: this.props.city,
      showCities: (this.props.city == null)
    }
  }

  render() {
    const is_opening    = this.props.is_opening
    const cities        = ([{id:-1,name:'I don\'t know / Somewhere Else ...'}]).concat(this.props.cities || [])

    const showCities    = this.state.showCities
    const showNext      = !showCities

    const can_edit_city = !is_opening

    return (
      <SidePanel>
        <ModalSection style={{marginTop:'12vmin'}}>
          <Heading>
            { this.state.city
              ? this.state.city.name
              : 'Where would you like to play?' }
            { can_edit_city
              ? <Change show={() => this.updateState({city:null,showCities:true})} hidden={showCities}/>
              : null }
          </Heading>
          { this.state.showCities
            ? <Select
                name='city-select'
                options={
                  cities.map(city => {
                    return {
                      value: city.id,
                      label: city.name
                    }
                  })
                }
                onChange={(e) => this.citySelected(e.value,e.label)}
                placeholder={ this.state.city && this.state.city.name || 'Pick One..' } />  
            : null }
        </ModalSection>
        <ModalSection style={{textAlign:'right'}}>
          { showNext 
            ? <PositiveButton onClick={() => this.props.next(this.state.city)}>
                Next&nbsp;&nbsp;
                <i className="fa fa-arrow-right"/>
              </PositiveButton>
            : null }
        </ModalSection>
      </SidePanel>
    )
  }

  citySelected(id,name) {
    if(id == -1){
      name = 'Venue TBD'
    }
    let city = {id:id,name:name}
    this.updateState({city:city,showCities:false})
    this.props.next(city)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const Change = ({show,hidden}) => (
  <ChangeButton onClick={() => show()} hidden={hidden}>
    Edit&nbsp;&nbsp;
    <i className="fa fa-arrow-right"/>
  </ChangeButton>
)

const Heading = styled(ModalHeading)`
  position: relative;
  text-align: center;
  padding-bottom: 3vmin;
`
const ChangeButton = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
  font-size: 2vmin;
  color: ${RP_DARKGREY};
  cursor: pointer;
`
const CheckContainerizer = styled(ModalSection)`
  border-top: 1px solid ${RP_DDD};
  margin: 2vmin 0 2vmin 0;
  padding-top: 2vmin;
  text-align: center;
`
const Checkbox = styled.input`
  display: inline-block;
  vertical-align: middle;
  width: 3vmin;
  height: 3vmin;
  line-height: 3vmin;
  margin-bottom: 0;
`
const CheckboxValue = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: auto;
  height: 3vmin;
  line-height: 3vmin;
  font-size: 2vmin;
  color: ${RP_BLACK};
`
const LearnMore = styled(Link)`
  font-weight: bold;
  font-size: 1.75vmin;
  text-align: right;
`