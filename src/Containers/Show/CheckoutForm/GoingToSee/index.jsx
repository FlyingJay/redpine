import React from 'react'
import styled from 'styled-components'

import { RP_BLACK } from 'Components'


export class GoingToSee extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      seeingEveryone: false,
      goingToSee: {}
    }
  }

  render() {
    const bands = this.props.bands // 'CampaignBand' objects, not 'Band'
    
    return (
      <div>
        {
          bands.map((band) => {
            return (
              <div key={band.id} data-test-key={band.id}>
                <GoingToSeeInputCheckBox 
                  type="checkbox" 
                  onChange={() => this.goingToSee(band.id, bands.length)} 
                  checked={this.state.seeingEveryone || (this.state.goingToSee[band.id] ? true : false)}/>
                <GoingToSeeBandName>
                  &nbsp;{band.band.name}
                </GoingToSeeBandName>
              </div>
            )
          })
        }
        {
          bands.length > 1
          ? <div data-test-key="everyoneSelector">
              <GoingToSeeInputCheckBox 
                type="checkbox" 
                onClick={() => this.seeingEveryone(bands)} 
                checked={this.state.seeingEveryone}/>
              <GoingToSeeBandName>Everyone</GoingToSeeBandName>
            </div>
          : null
        }
      </div>
    )
  }

  // CHECK IF THE USER HAS SELECTED ALL ARTISTS MANUALLY.
  checkEveryoneSelectedStatus(totalArtists) {

    // CURRENTLY SELECTED ARTISTS.
    let bands = this.state.goingToSee
    var gongToSeeArr = Object.values(bands)
    var numberOfSelectedArtists = gongToSeeArr.filter((value) => value === true).length
    
    // UPDATE SEEING EVERYONE STATE.
    if (numberOfSelectedArtists === totalArtists){

      // EVERYONE HAS BEEN CHECKED.
      this.updateState({ seeingEveryone: true })
    }else if (numberOfSelectedArtists === totalArtists && this.state.seeingEveryone){

      // SOMETHING HAS BEEN UNCHECKED, UNCHECK EVERYONE.
      this.updateState({ seeingEveryone: false })
    }
  }

  // EVENT HANDLER FOR WHEN THE USER CLICKS ON A PERFORMING ARTIST FOR GOING TO SEE.
  goingToSee(bandId, totalArtists) {

    // CURRENTLY SELECTED ARTISTS.
    let bands = this.state.goingToSee

    // RECORD THE PREFERENCE FOR THE CLICKED ARTIST.
    if (bands[bandId] !== undefined) {

      // SOMETHING HAS BEEN UNCHECKED, UNCHECK EVERYONE.
      bands[bandId] = undefined
      this.updateState({ seeingEveryone: false })
    } else {
      bands[bandId] = true
    }
    
    // UPDATE PREFERENCES.
    this.updateState({ goingToSee: bands })

    if (this.props.onChange) {
      let seeingBands = this.props.bands.reduce((seeing, curr) => {
        if (this.state.goingToSee[curr.id]) {
          seeing.push(curr)
        }
        return seeing
      }, [])
      this.props.onChange(seeingBands)
    }

    // CHECK IF THE USER HAS SELECTED ALL ARTISTS MANUALLY.
    this.checkEveryoneSelectedStatus(totalArtists)
  }

  // EVENT HANDLER FOR WHEN THE USER CLICKS ON EVERYONE FOR GOING TO SEE.
  seeingEveryone(campaignBands) {

    // CURRENTLY SELECTED ARTISTS.
    let bands = this.state.goingToSee
    let bandId = null

    // WHETHER TO CHECK OR UNCHECK ALL SELECTIONS.
    let toCheckOrNotToCheck = !this.state.seeingEveryone ? true : undefined

    // LOOP THROUGH AND RECORD ALL ARTIST PREFERENCES.
    for(var i = 0; i < campaignBands.length; i++) {
      bandId = campaignBands[i].id
      bands[bandId] = toCheckOrNotToCheck
    }
    
    // UPDATE PREFERENCES AND CHECKED ALL STATUS.
    this.updateState({ 
      goingToSee: bands, 
      seeingEveryone: !this.state.seeingEveryone 
    })

    if (this.props.onChange) {
      let seeingBands = this.props.bands.reduce((seeing, curr) => {
        if (this.state.goingToSee[curr.id]) {
          seeing.push(curr)
        }
        return seeing
      }, [])
      this.props.onChange(seeingBands)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.bands == null) return true
    if (nextProps.bands != this.props.bands) return true
    return false
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const GoingToSeeInputCheckBox = styled.input`
  display: inline-block;
  vertical-align: middle;
  width: 3vmin;
  height: 3vmin;
  line-height: 3vmin;
  margin-bottom: 0;
`
const GoingToSeeBandName = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: auto;
  height: 3vmin;
  line-height: 3vmin;
  font-size: 1.8vmin;
  color: ${RP_BLACK};
`