import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { paths } from 'globals'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'

import { MyPageWrapper, RP_BLUE, RP_DARKBLUE, RP_PINK, RP_DARKGREY } from 'Components' // GLOBALS
import { Modal, SidePanel, ModalSection, ModalHeading, ModalSubheading } from 'Components' // MODAL
import { SexiestPanelEver, PanelHeading, PanelContent } from 'Components' // PROFILE
import { FormButton } from 'Components' // BUTTON
import { FiveStar } from 'Components' // REVIEW
import { TextBox } from 'Components' // INPUT
import { Title } from 'Components' // TITLE

import { Review } from './ReviewListItem/index.jsx'

import selectors from './selectors'
import actions from './actions'


// REVIEW TYPES
const BAND_REVIEW = 0
const VENUE_REVIEW = 1

const BAND_QUESTIONS = {
  overall: 'How was your overall experience with the act?',
  communication: 'Did the act communicate well?',
  ease_of_working: 'Was the act easy to work with?',
  draw: 'Was the act honest about their draw?'
}

const VENUE_QUESTIONS = {
  overall: 'How was your overall experience with the venue?',
  communication: 'Did the venue communicate well?',
  ease_of_working: 'Was the venue easy to work with?',
  equipment: 'Did the venue accurately represent their equipment?'
}

export class Reviews extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      details_open: false,
      review_type: BAND_REVIEW,
      review_comment: '',
      review_public_response: '',
      review_private_response: '',
      star_questions: [],
      star_ratings: []
    }

    this.loadReviews()
  }

  render() {
    // The user's bands/venues
    const bands = this.props.bands || []
    const venues = this.props.venues || []

    // The band/venue for the active review which is not the user's
    const review_band = this.props.review_band || null
    const review_venue = this.props.review_venue || null

    var review_name = this.getName(review_band,review_venue)
    var review_comment = this.getComment(this.state.review)

    var to_write_count = 0
    var to_respond_count = 0
    var old_count = 0

    return (
      <App requireAuth>
        {/* MAIN WINDOW */}
        <Modal onClose={() => this.closeModal()} show>
          <ReviewWrapper>
            <Title title="Reviews" summary="Review your show partners, and respond to their reviews." />
            <SexiestPanelEver>
              <PanelHeading color={RP_BLUE}>
                <i className="fa fa-pencil" />
                <span>
                  Write
                </span>
              </PanelHeading>
              { (bands || []).map(band => {
                  return (band.band_reviews || []).map(review => {
                    if (!review.is_completed) {
                      to_write_count++
                      return <Review 
                              key={review.id} 
                              name={band.name} 
                              image={band.picture} 
                              type={BAND_REVIEW} 
                              onClick={() => this.writeReview(BAND_REVIEW,review,BAND_REVIEW)} 
                              toWrite/>
                    } }) 
                }) }

              { (venues || []).map(venue => {
                  return (venue.band_reviews || []).map(review => {
                    if (!review.is_completed) {
                      to_write_count++
                      return <Review 
                              key={review.id} 
                              name={venue.title} 
                              image={venue.picture} 
                              type={BAND_REVIEW} 
                              onClick={() => this.writeReview(BAND_REVIEW,review,VENUE_REVIEW)} 
                              toWrite/>
                    } })
                }) }

              { (bands || []).map(band => {
                  return (band.venue_reviews || []).map(review => {
                    if (!review.is_completed) {
                      to_write_count++
                      return <Review 
                              key={review.id} 
                              name={band.name} 
                              image={band.picture} 
                              type={VENUE_REVIEW} 
                              onClick={() => this.writeReview(VENUE_REVIEW,review,BAND_REVIEW)} 
                              toWrite/>
                    } })
                }) }

              { to_write_count == 0
                ? <NoResults>You have no reviews to write.</NoResults>
                : null }
            </SexiestPanelEver>
            <SexiestPanelEver>
              <PanelHeading color={RP_PINK}>
                <i className="fa fa-share" />
                <span>
                  Respond
                </span>
              </PanelHeading>
              { (bands || []).map(band => {
                  return (band.reviews_by_bands || []).map(review => {
                    if (review.is_completed && !review.is_responded) {
                      to_respond_count++
                      return <Review 
                              key={review.id} 
                              name={band.name} 
                              image={band.picture} 
                              type={BAND_REVIEW} 
                              onClick={() => this.respondReview(BAND_REVIEW,review,BAND_REVIEW)}/>
                    } })
                }) }
              
              { (bands || []).map(band => {
                  return (band.reviews_by_venues || []).map(review => {
                    if (review.is_completed && !review.is_responded) {
                      to_respond_count++
                      return <Review 
                              key={review.id} 
                              name={band.name} 
                              image={band.picture} 
                              type={BAND_REVIEW} 
                              onClick={() => this.respondReview(BAND_REVIEW,review,VENUE_REVIEW)}/>
                    } })
                }) }
              
              { (venues || []).map(venue => {
                  return (venue.reviews_by_bands || []).map(review => {
                    if (review.is_completed && !review.is_responded) {
                      to_respond_count++
                      return <Review 
                              key={review.id} 
                              name={venue.title} 
                              image={venue.picture} 
                              onClick={() => this.respondReview(VENUE_REVIEW,review,BAND_REVIEW)}/>
                    } })
                }) }  
              
              { to_respond_count == 0
                ? <NoResults>You have no reviews to respond to.</NoResults>
                : null }         
            </SexiestPanelEver>
            <SexiestPanelEver>
              <PanelHeading color={RP_DARKGREY}>
                <i className="fa fa-list" />
                <span>
                  Past Reviews
                </span>
              </PanelHeading>
              {
                (bands || []).map(band => {
                  return (band.band_reviews || []).map(review => {
                    if (review.is_completed && review.is_responded) {
                      old_count++
                      return <Review 
                              key={review.id}
                              name={band.name} 
                              image={band.picture} 
                              comment={review.comment} 
                              public_response={review.public_response} 
                              private_response={review.private_response} 
                              onClick={() => this.props.redirectToBand(review.band)}
                              past/>
                    }
                  })
                })
              }
              {
                (venues || []).map(venue => {
                  return (venue.band_reviews || []).map(review => {
                    if (review.is_completed && review.is_responded) {
                      old_count++
                      return <Review 
                              key={review.id}
                              name={venue.title} 
                              image={venue.picture} 
                              comment={review.comment} 
                              public_response={review.public_response} 
                              private_response={review.private_response} 
                              onClick={() => this.props.redirectToBand(review.band)}
                              past/>
                    }
                  })
                })
              }
              {
                (bands || []).map(band => {
                  return (band.venue_reviews || []).map(review => {
                    if (review.is_completed && review.is_responded) {
                      old_count++
                      return <Review 
                              key={review.id}
                              name={band.name} 
                              image={band.picture} 
                              comment={review.comment} 
                              public_response={review.public_response} 
                              private_response={review.private_response} 
                              onClick={() => this.props.redirectToVenue(review.venue)}
                              past/>
                    }
                  })
                })
              }
              {
                old_count == 0
                ? <NoResults>You have no reviews to write.</NoResults>
                : null
              }
            </SexiestPanelEver>
          </ReviewWrapper>
        </Modal>
        {/* REVIEW DETAILS */}
        <Modal show={this.state.details_open} onClose={(e) => this.closeModal()} transparent>
          <SidePanel>
            <ModalSection style={{padding:'12vmin 0 1.5vmin 0',width:'80%'}}>
              <ModalHeading>
                {
                  this.state.is_response 
                  ? "Reply to " + review_name
                  : "Review " + review_name
                }
              </ModalHeading>
              <ModalSubheading>
                {
                  this.state.is_response
                  ? 'You have a chance to respond to their review, if you want to.'
                  : 'Only your overall rating will be public.'
                }
              </ModalSubheading>
            </ModalSection>
            {
              this.state.is_response
              ? <ModalSection style={{width:'80%'}}>
                  {
                    review_comment
                    ? <Comment>"{review_comment}"</Comment>
                    : <Comment>The reviewer did not leave a comment.</Comment>
                  }
                </ModalSection>
              : null
            }
            <ModalSection style={{padding:'1.5vmin 0 1.5vmin 0',width:'80%'}}>
              { this.state.is_response
                ? <FiveStar 
                    key={null} 
                    question={this.state.star_questions['overall']} 
                    rating={this.state.star_ratings['overall']} 
                    onRated={(rating) => this.ratingChanged('overall',rating)} 
                    disabled={this.state.is_response} />
                : Object.keys(this.state.star_questions).map(key => {
                    return <FiveStar 
                            key={key} 
                            question={this.state.star_questions[key]} 
                            rating={this.state.star_ratings[key]} 
                            onRated={(rating) => this.ratingChanged(key,rating)} 
                            disabled={this.state.is_response} />
                  }) }
            </ModalSection>
            {
              !this.state.is_response
              ? <ModalSection style={{width:'80%'}}>
                  <TextBox 
                    placeholder="Comment (optional)" 
                    onChange={(e) => this.updateState({review_comment: e.target.value})} 
                    image="dot" 
                    focusImage="dot-focus" 
                    style={{resize:'vertical'}}/>
                </ModalSection>
              : null
            }
            {
              this.state.is_response
              ? <ModalSection style={{width:'80%'}}>
                  <TextBox 
                    placeholder="Public Response (optional)" 
                    onChange={(e) => this.updateState({review_public_response: e.target.value})} 
                    image="dot" 
                    focusImage="dot-focus" 
                    style={{resize:'vertical'}}/>
                </ModalSection>
              : null
            }
            {/*
              this.state.is_response
              ? <ModalSection style={{width:'80%'}}>
                  <TextBox 
                    placeholder="Private Response (Only for the reviewer, optional)" 
                    onChange={(e) => this.updateState({review_private_response: e.target.value})} 
                    image="dot" 
                    focusImage="dot-focus" 
                    style={{resize:'vertical'}}/>
                </ModalSection>
              : null
            */}
            <ModalSection style={{textAlign:'right'}}>
              {
                this.state.is_response
                ? <SubmitButton onClick={() => this.submitResponse()}>Submit</SubmitButton>
                : <SubmitButton onClick={() => this.submitReview()}>Submit</SubmitButton>
              }
            </ModalSection>
          </SidePanel>
        </Modal>
      </App>
    )
  }

  loadReviews(user) {
    // CHECK USER TYPE
    this.props.loadBandReviews()
    this.props.loadVenueReviews()
  }

  getQuestions(review_type) {
    return (review_type == BAND_REVIEW ? BAND_QUESTIONS : VENUE_QUESTIONS)
  }

  closeModal() {
    if (this.state.details_open) {
      this.updateState({details_open:!this.state.details_open})
    } else {
      this.props.history.goBack()
    }
  }

  writeReview(review_type,review,reviewer_type) {
    const questions = this.getQuestions(review_type)
    var ratings =  {}
    Object.keys(questions).forEach(key => { ratings[key] = 2 })

    if (review_type == BAND_REVIEW) {
      this.props.getReviewBand(review.band)
    } 
    else if (review_type == VENUE_REVIEW) {
      this.props.getReviewVenue(review.venue)
    }

    this.updateState({
      review_type: review_type,
      reviewer_type: reviewer_type,
      review: review,
      star_questions: questions,
      star_ratings: ratings,
      details_open: true,
      is_response: false
    })
  }

  respondReview(review_type,review,reviewer_type) {
    const questions = this.getQuestions(review_type)
    var ratings =  {}
    Object.keys(questions).forEach(key => { ratings[key] = review[key] })

    if (reviewer_type == BAND_REVIEW) {
      this.props.getReviewBand(review.reviewer)
    } 
    else if (reviewer_type == VENUE_REVIEW) {
      this.props.getReviewVenue(review.reviewer)
    }

    this.updateState({
      review_type: review_type,
      reviewer_type: reviewer_type,
      review: review,
      star_questions: questions,
      star_ratings: ratings,
      details_open: true,
      is_response: true
    })
  }

  submitReview() {
    var state = this.state
    var review = {
      id: state.review.id,
      overall: state.star_ratings.overall,
      comment: state.review_comment,
      is_completed: true,
      reviewer: state.review.reviewer
    }

    if (state.review_type == BAND_REVIEW ) {
      review['band'] = state.review.band
      review['draw'] = state.star_ratings.draw
      review['communication'] = state.star_ratings.communication
      review['ease_of_working'] = state.star_ratings.ease_of_working

      if (state.reviewer_type == BAND_REVIEW) {
        this.props.submitBandToBandReview(review)
      }
      if (state.reviewer_type == VENUE_REVIEW) {
        this.props.submitVenueToBandReview(review)
      }
    } 

    if (state.review_type == VENUE_REVIEW) {
      review['venue'] = state.review.venue
      review['equipment'] = state.star_ratings.equipment
      review['communication'] = state.star_ratings.communication
      review['ease_of_working'] = state.star_ratings.ease_of_working

      this.props.submitBandToVenueReview(review)
    }

    this.updateState({details_open:false})
  }

  submitResponse() {
    var state = this.state
    var review = {
      id: state.review.id,
      is_responded: true,
      public_response: state.review_public_response,
      private_response: state.review_private_response,
      reviewer: state.review.reviewer
    }

    if (state.review_type == BAND_REVIEW) {
      review['band'] = state.review.band

      if (state.reviewer_type == BAND_REVIEW) {
        this.props.respondBandToBandReview(review)
      }

      if (state.reviewer_type == VENUE_REVIEW) {
        this.props.respondVenueToBandReview(review)
      }
    } 

    if (state.review_type == VENUE_REVIEW) {
      review['venue'] = state.review.venue

      this.props.respondBandToVenueReview(review)
    } 

    this.updateState({details_open:false})
  }

  ratingChanged(question,rating) {
    var ratings = this.state.star_ratings
    ratings[question] = rating
    this.updateState({star_ratings:ratings})
  }

  getName(review_band,review_venue) {
    var review_name = ""
    if (this.state.review_type == BAND_REVIEW && review_band != null) { review_name = review_band.name }
    if (this.state.review_type == VENUE_REVIEW && review_venue != null) { review_name = review_venue.title }

    if (this.state.is_response && this.state.reviewer_type == BAND_REVIEW && review_band != null) { review_name = review_band.name }
    if (this.state.is_response && this.state.reviewer_type == VENUE_REVIEW && review_venue != null) { review_name = review_venue.title }
    return review_name
  }

  getComment(review) {
    if (review != null) {
      return review.comment
    }
    return null
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state),
    bands: selectors.selectBands(state,props),
    venues: selectors.selectVenues(state,props),
    review_band: selectors.selectReviewBand(state,props),
    review_venue: selectors.selectReviewVenue(state,props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBandReviews: () => {
      dispatch(actions.loadBandReviews())
    },

    loadVenueReviews: () => {
      dispatch(actions.loadVenueReviews())
    },

    getReviewBand: (id) => {
      dispatch(actions.getReviewBand(id))
    },

    getReviewVenue: (id) => {
      dispatch(actions.getReviewVenue(id))
    },

    submitBandToBandReview: (review) => {
      dispatch(actions.submitBandToBandReview(review))
    },

    submitBandToVenueReview: (review) => {
      dispatch(actions.submitBandToVenueReview(review))
    },

    submitVenueToBandReview: (review) => {
      dispatch(actions.submitVenueToBandReview(review))
    },

    respondBandToBandReview: (review) => {
      dispatch(actions.respondBandToBandReview(review))
    },

    respondBandToVenueReview: (review) => {
      dispatch(actions.respondBandToVenueReview(review))
    },

    respondVenueToBandReview: (review) => {
      dispatch(actions.respondVenueToBandReview(review))
    },

    redirectToBand: (id) => {
      dispatch(push(paths.acts(id)))
    },

    redirectToVenue: (id) => {
      dispatch(push(paths.venues(id)))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reviews)

const ReviewWrapper = styled(MyPageWrapper)`
  width: 60vw;
  padding: 50px 0 0 0;
`

const Comment = styled.div`
  display: block;
  text-align:center;
  font-size: 2vmin;
  font-style: italic;
  line-height: 3vmin;
`
const SubmitButton = styled(FormButton)`
  display: inline-block;
  position: relative;
  width: auto;
  background: ${RP_BLUE};

  &:hover {
    background: ${RP_DARKBLUE};
  }
`
const NoResults = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding-top: 3vmin;
  color: ${RP_DARKGREY};
  font-size: 1.8vmin;
  font-weight: 300;
  text-align: center;
`