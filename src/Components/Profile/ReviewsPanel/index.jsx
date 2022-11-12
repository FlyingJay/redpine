import React from 'react'
import styled from 'styled-components'

import { RP_GREEN } from 'Components' // GLOBALS

import { SexiestPanelEver, PanelHeading, PanelContent, SexifyPersonality } from 'Components' //PROFILE
import { ProfileReview } from 'Components' // REVIEW


export class ReviewsPanel extends React.PureComponent {
  render() {
    const name         = this.props.name
    const reviews      = this.props.reviews
    const has_reviews  = this.props.has_reviews
    const is_visible   = this.props.is_visible
    const null_message = this.props.null_message
    
     return is_visible
            ? <SexiestPanelEver>
                <PanelHeading color={RP_GREEN}>
                  <i className="fa fa-pencil" />
                  <span>Reviews</span>
                </PanelHeading>
                <PanelContent>
                  {
                    has_reviews
                    ? reviews.map(review => {
                        return review.is_completed 
                               ? <ProfileReview 
                                   key={review.id} 
                                   rating={review.overall} 
                                   comment={review.comment} 
                                   response={review.public_response}
                                   name={name}/>
                               : null
                      })
                    : <SexifyPersonality>{null_message}</SexifyPersonality>
                  }
                </PanelContent>            
              </SexiestPanelEver>
            : null
  }
}
export default ReviewsPanel