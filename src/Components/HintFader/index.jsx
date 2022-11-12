import React from 'react'
import styled from 'styled-components'

import { RP_BLACK, RP_SUPER_LIGHT } from 'Components' // GLOBALS
import { Slider } from 'Components' // SLIDER


export class HintFader extends React.PureComponent {
  constructor(props) {
    super(props)

    this.settings = {
      prevArrow: null,
      nextArrow: null,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: false,
      autoplay: true,
      autoplaySpeed: 5000,
      fade: true,
      speed: 1000,
      infintite: true
    }
  }

  render() {
    const hints     = this.props.hints || []
    const has_hints = (hints.length > 0)

    return has_hints
           ? <Slider {...this.settings}>
              {
                hints.map(hint => <HintPanel key={hint.id}>
                                    {hint.text}
                                  </HintPanel>)
              }
             </Slider>
           : null
  }
}

const HintPanel = styled.div`
  color: ${RP_BLACK};
  text-align: center;
  font-size: 2vmin;
  padding: 2vmin 0.25vmin 0 0.25vmin;
  margin: 2vmin 0;
  letter-spacing: 1.25px;
  font-weight: 200;
  border-top: 1px solid ${RP_SUPER_LIGHT};
`