import React from 'react'
import styled from 'styled-components'

import { RP_RED, RP_LIGHTGREY, RP_YELLOW } from 'Components' // GLOBALS


export class FiveStar extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      rating: this.props.rating
    }
  }

  render() {
    return (
      <ReviewItem>
        <Question>{this.props.question}</Question>
        {
          [0,1,2,3,4].map(num => {
            return <StarWrap key={num} onClick={(e) => this.updateRating(num)}>
                     {
                       this.props.rating == num
                       ? <Star className="fa fa-star" selected={this.props.rating == num} disabled={this.props.disabled}/>
                       : <Star className="fa fa-star-o" disabled={this.props.disabled}/>
                     }
                   </StarWrap>
          })
        }
      </ReviewItem>
    )
  }

  updateRating(num){
    this.props.disabled 
    ? null
    : this.props.onRated(num)
  }
}

const ReviewItem = styled.div`
  display: block;
  text-align: center;
  margin-bottom: 3vmin;
`
const Question = styled.div`
  display: block;
  text-align:center;
  font-Size: 2vmin;
  line-height: 3vmin;
`
const StarWrap = styled.div`
  display: inline-block;
  font-size: 4vmin;
`
const Star = styled.i`
  margin: 1vmin;
  color: ${props => props.selected ? RP_YELLOW : RP_LIGHTGREY};

  &:hover {
    color: ${props => props.disabled ? RP_LIGHTGREY : RP_YELLOW};
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
  }
`


export class ProfileReview extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      show_comment: false,
      show_response: false
    }
  }

  render() {
    return (
      <ProfileReviewWrap>
        <Stars>
          { [0,1,2,3,4].map(num => {
              if (num <= this.props.rating) {
                return <SimpleStar key={'star'+num} className="fa fa-star" />
              }
            }) }
        </Stars>
        
        { this.props.comment
          ? this.state.show_comment
            ? <Comment>"{this.props.comment}"</Comment>
            : <ShowResponse onClick={() => this.updateState({show_comment:true})}>
                Full Review&nbsp;&nbsp;<i className="fa fa-arrow-right" />
              </ShowResponse>
          : null }
        
        { this.props.response && this.state.show_comment
          ? this.state.show_response 
            ? <Response show={this.state.show_response}>
                { this.props.name + ": \"" + this.props.response + "\"" }
              </Response>
            : <ShowResponse onClick={() => this.updateState({show_response:true})}>
                Response from {this.props.name} <i className="fa fa-arrow-right" />
              </ShowResponse>
          : null }

      </ProfileReviewWrap>
    )
  } 

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const ProfileReviewWrap = styled.div`
  display: block;
  text-align: center;
  margin-bottom: 1.5vmin;
  padding: 0.5vmin;
  border-bottom: 1px solid ${RP_LIGHTGREY};
`
const Stars = styled.div`
  text-align: right;
  margin-bottom: 1vmin;
`
const SimpleStar = styled.i`
  margin: 0 0 0 0.5vmin;
  color: ${RP_YELLOW};
`
const Comment = styled.div`
  text-align: left;
  padding-bottom: 1vmin;
  font-style: italic;
`
const ShowResponse = styled.div`
  text-align: right;
  padding: 0 0 1vmin 1vmin;
  font-weight: bold;
  font-Size: 1.5vmin;

  &:hover {
    cursor: pointer;
    color: ${RP_RED};
  }
`
const Response = styled.div`
  text-align: left;
  padding-bottom: 1vmin;
`