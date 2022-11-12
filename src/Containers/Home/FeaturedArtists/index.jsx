import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_BLACK } from 'Components' // GLOBALS
import { Slider, PrevArrow, NextArrow } from 'Components' // SLIDER
import { LoadingIndicator } from 'Components' // LOADINGINDICATOR
import { Link } from 'Components' // LINK


export class FeaturedArtists extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      acts: []
    }
  }

  render() {
    const acts = this.state.acts || []
    const acts_count = acts.length

    const settings = {
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {breakpoint: 768, settings: {slidesToShow: Math.min(4,acts_count), slidesToScroll: 2}}, 
        {breakpoint: 1024, settings: {slidesToShow: Math.min(6,acts_count), slidesToScroll: 3}}, 
        {breakpoint: 1920, settings: {slidesToShow: Math.min(8,acts_count), slidesToScroll: 4}}, 
        {breakpoint: 3000, settings: {slidesToShow: Math.min(12,acts_count), slidesToScroll: 6}},
        {breakpoint: 4000, settings: {slidesToShow: Math.min(16,acts_count), slidesToScroll: 8}}
      ],
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 1500,
      rows: 1
    }

    return <LoadingIndicator loading={this.props.loading}>
            <Slider {...settings}>
              {
                acts.map((act) => <Link key={act.id} href={paths.acts(act.id)}>
                                    <BandContainer image={act.picture}>
                                       <Overlay>
                                         <BandName>{act.name}</BandName>
                                       </Overlay>
                                     </BandContainer>
                                   </Link>)
              }
            </Slider>
           </LoadingIndicator>
  }

  componentWillReceiveProps(props) {
    if (props.bands && (props.bands.length !== this.state.acts.length)) {
      this.updateState({ acts: props.bands.sort((a, b) => {
        return Math.random() > .5 ? 1 : -1
      })})
    }
  }

  updateState(update) {
    this.setState(Object.assign({}, this.state, update))
  }
}

const BandContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 23vmin;
  height: 23vmin;
  background-size: cover;
  background-position: center center; 
  background-image: url(${props => props.image});
  border: 1px solid #F1EEEA;
  border-radius: 3px;
  margin-right: 1vmin;
`
const BandName = styled.div`
  display: block;
  position: absolute;
  bottom: 0;
  width: 20vmin;
  height: auto;
  margin: 0 auto;
  padding: 1vmin 1.5vmin;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  color: #FFF;
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.8vmin;
  font-weight: bold;
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

  &:hover {
    background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
    background: linear-gradient(transparent 0%, rgba(49,49,49, 0.85) 100%) !important;
  }
`