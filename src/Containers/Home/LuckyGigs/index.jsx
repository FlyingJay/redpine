import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { paths } from 'globals'

import { RP_Venue } from 'Models'

import { RP_RED, RP_PINK, RP_BLACK, RP_DARK_GREY, RP_SUPER_LIGHT, Bottom } from 'Components' 
import { Slider, PrevArrow, NextArrow } from 'Components' // SLIDER
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { Link } from 'Components'


export class LuckyGigs extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openings: []
    }
  }

  render() {
    const openings_count = this.state.openings.length
    const has_openings = (openings_count > 0)

    const settings = {
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {breakpoint: 768, settings: {slidesToShow: Math.min(2,openings_count), slidesToScroll: 2}}, 
        {breakpoint: 1024, settings: {slidesToShow: Math.min(3,openings_count), slidesToScroll: 3}}, 
        {breakpoint: 1920, settings: {slidesToShow: Math.min(4,openings_count), slidesToScroll: 4}},
        {breakpoint: 3000, settings: {slidesToShow: Math.min(6,openings_count), slidesToScroll: 3}},
        {breakpoint: 4000, settings: {slidesToShow: Math.min(8,openings_count), slidesToScroll: 4}}
      ],
      swipeToSlide: true
    }

    return <LoadingIndicator loading={this.props.loading}>
            {
              has_openings
              ? <Slider {...settings}>
                  {
                    this.state.openings.map((opening, index) => {
                      const _Venue = RP_Venue(opening.timeslot.venue)

                      const date   = moment(opening.timeslot.start_time).format('MMM Do')
                      return <Link key={index} href={paths.showCreate()+'?opening='+opening.id}>
                              <Opening>
                                <VenuesImage image={_Venue.picture}>
                                  <Overlay className="venueImageOverlay" />
                                  <BookNow>
                                    PAID GIG
                                  </BookNow>
                                  <Bottom>
                                    <BookDate>{date} - {opening.title}</BookDate>
                                    <VenueName>{_Venue.title}</VenueName>
                                    <VenueCity>{_Venue.city_name}, {_Venue.province_name}</VenueCity>
                                  </Bottom>
                                </VenuesImage>
                                <VenueInfo>
                                </VenueInfo>
                              </Opening>
                             </Link>
                    })
                  }
                </Slider>
              : null
            }
           </LoadingIndicator>
  }

  componentWillReceiveProps(props) {
    if (props.openings && (props.openings.length !== this.state.openings.length)) {
      this.updateState({ openings: props.openings.sort((a, b) => {
        return Math.random() > .5 ? 1 : -1
      })})
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const Opening = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 40vmin;
  height: auto;
  margin: 3vmin 2vmin 0 0;
  border: 1px solid #FFF;
  color: ${RP_DARK_GREY};

  &:hover {
    .venueImageOverlay {
      background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
      background: linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    }
  }
`

const VenuesImage = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 30vmin;
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.image});
  border-radius: 3px;
`

const VenueInfo = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin-top: 1vmin;
`

const VenueInfoBasis = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.8vmin;
  font-weight: bold;
`
const VenueOtherInfo = styled(VenueInfoBasis)`
  font-size: 1.8vmin;
  font-weight: 100;
`
const Overlay = styled.div`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.35);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.5) 100%) !important;
  border-radius: inherit;
`
const BookNow = styled.div`
  padding: 1vmin 1.5vmin 0 0;
  text-align: right;
  color: #FFF;
  font-weight: bold;

  @media (max-width: 768px) and (orientation: portrait){
    font-size: 2vmin;
  }
`
const BookDate = styled.div`
  display: block;
  width: 40vmin;
  height: auto;
  margin: 0 auto;
  padding: 0.5vmin 1.5vmin;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  color: #FFF;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.8vmin;
  font-weight: bold;
`
const VenueName = styled(VenueInfoBasis)`
  font-size: 2.3vmin;
  font-weight: 600;
  padding: 0 1.5vmin;
  color: #FFF;
`
const VenueCity = styled(VenueInfoBasis)`
  color: ${RP_PINK};
  font-size: 1.7vmin;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 2vmin;
  padding: 1vmin 1.5vmin;
`
const NoOpenings = styled.div`
  padding-left: 5vmin;
`