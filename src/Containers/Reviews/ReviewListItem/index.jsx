import React from 'react'
import styled from 'styled-components'

import { RP_DDD, RP_PINK, RP_SUPER_LIGHT, RP_DARK_GREY } from 'Components' // GLOBALS
import { CampaignImage } from 'Components' // IMAGE


// REVIEW TYPES
const BAND_REVIEW = 0
const VENUE_REVIEW = 1

export class Review extends React.PureComponent {
  constructor(props){
    super(props);

    this.onClick = this.props.onClick.bind(this);
  }

  render() {
    return (
      <ReviewWrapper onClick={this.props.onClick}>
        <div className="openLink"><i className="fa fa-arrow-right" /></div>
        <ReviewImage background={this.props.image}/>
        <ReviewInfo>
          <ReviewName>{this.props.name}</ReviewName>
          {
            this.props.past 
            ? [<ReviewOther key={0}>
                You: {this.props.comment}
               </ReviewOther>
              ,
               <ReviewOther key={1}>
                Response (public): {this.props.public_response || 'No response.'}
               </ReviewOther>
              ,
               <ReviewOther key={2}>
                Response (private): {this.props.private_response || 'No response.'}
               </ReviewOther>]
            : <ReviewOther>
                {
                  this.props.toWrite
                  ? 'Share your experience'
                  : 'Response opportunity'
                }
              </ReviewOther>
          }

        </ReviewInfo>
      </ReviewWrapper>  
    )
  }
}

const ReviewWrapper = styled.div`
  cursor: pointer;
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 2vmin;
  border-bottom: 1px solid #E5E5E5;
  transition: 0.25s all ease;

  .openLink {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 3vmin;
    height: 100%;
    padding: 0 1vmin;
    background: ${RP_DDD};
    color: ${RP_PINK};
    font-size: 1.8vmin;
    font-weight: 400;
    text-align: center;

    i {
      display: inline-block;
      vertical-align: middle;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      width: 2vmin;
      height: 2vmin;
      margin: auto;
      line-height: 2vmin;
    }
  }

  &:hover {
    background: ${RP_SUPER_LIGHT};

    .openLink {
      display: block;
    }
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    &:hover {
      background: inherit;

      .openLink {
        display: none;
      }
    }
  }
`

const ReviewImage = styled(CampaignImage)`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: 7vmin;
  height: 7vmin;
  margin-right: 3vmin;
  background: ${props => props.background ? `url(${props.background})` : `url('/Assets/images/defaults/defaultCampaign.png')`};
  background-size: cover;
  background-position: center;
  border-radius: 0.5vmin;
  box-shadow: 0 1px 2px #B3B3B3;
`

const ReviewInfo = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: CALC(100% - 10vmin);
  height: auto;
  text-align: left;
`

const ReviewName = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 0 0 0.5vmin 0;
  color: ${RP_DARK_GREY};
  font-size: 2.3vmin;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ReviewOther = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  margin-right: 1vmin;
  background: transparent;
  font-size: 2.25vmin;
  font-weight: 300;
  border-radius: 3vmin;

  padding: ${props => props.bgColor ? '0.5vmin 2vmin': '0'};
  margin-top: ${props => props.bgColor ? '1vmin': '0'};
  background: ${props => props.bgColor ? props.bgColor : 'transparent'};
  color: ${props => props.bgColor ? '#FFF' : RP_DARK_GREY};
  border: 1px solid ${props => props.bgColor ? props.bgColor : 'transparent'};
`