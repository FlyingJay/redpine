import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { HELP_TOPIC } from 'enums'

import appActions from 'Containers/App/actions'

import { MobileFirstDiv } from 'Components' //GLOBALS
import { Modal, ModalSection, ModalHeading, ModalSubheading } from 'Components' //MODAL


export class Help extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const show_video = (this.props.topic !== null)

    return show_video
           ? <Modal onClose={() => this.props.hideHelp()} show transparent>
              {{ 
                    [HELP_TOPIC.PLAY_SHOW]: <Topic 
                                              title="Play a Show" 
                                              subtitle="What does it take to play a show? It's easy!"
                                              image="/Assets/images/help/show-feed.png">
                                              It's time to play!  
                                              <br/>
                                              Just answer a couple questions about your show, then we will submit your request.
                                              <br/>
                                              <br/>
                                              Don't know all the details?  That's okay! 
                                              <br/>
                                              Once you have submitted a request you will gain access to the Show Hub, which is shared between you, the venue, and all other acts in the show.
                                              <br/>
                                              <br/>
                                              Now it's easy to see show details, ask questions, upload documents, or make changes to performers, dates, and ticketing options!
                                            </Topic>,

                 [HELP_TOPIC.CREATE_VENUE]: <Topic 
                                              title="Add a Venue" 
                                              subtitle="The very first step for any venue manager."
                                              image="/Assets/images/help/create-venue.png">
                                              Sometimes a single person manages multiple venues, or a single venue has multiple stages.
                                              <br/>
                                              <br/>
                                              RedPine gives venue managers the power to manage any number of performance locations. 
                                              <br/>
                                              <br/>
                                              Hosting a festival? Create a venue with the same name and book every act!
                                            </Topic>,

               [HELP_TOPIC.REQUEST_PAYOUT]: <Topic 
                                              title="Request a Payout" 
                                              subtitle="How do I get paid?"
                                              image="/Assets/images/help/request-payout.png">
                                              To withdraw your money, select "Pay Me" on your My Acts page.
                                              <br/>  
                                              As an individual, you may also request payment from the Settings page.  
                                            </Topic>,

                 [HELP_TOPIC.SELL_TICKETS]: <Topic 
                                              title="Sell Tickets" 
                                              subtitle="How can I sell tickets for my event?"
                                              image="/Assets/images/help/just-tickets.png">
                                              Already planning an event, and just want to use RedPine for ticketing? No problem! 
                                              <br/>
                                              <br/>
                                              RedPine offers artists a ticketing service that is completely free for you to use.  
                                              <br/>
                                              Sold a $10 ticket? You get $10. 
                                              <br/>
                                              What could be easier?
                                            </Topic>,

                      [HELP_TOPIC.REVIEWS]: <Topic 
                                              title="Reviews" 
                                              subtitle="We value openness and honesty."
                                              image="/Assets/images/help/reviews.png">
                                              Great shows take work, so strengthen the community by speaking up when someone goes that extra mile!
                                              <br/> 
                                              <br/>
                                              Let's recognize those people who give it their all, and help them find others who feel the same way.
                                            </Topic>
              }[this.props.topic]}
             </Modal>
           : null
  }
} 

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideHelp: () => {
      dispatch(appActions.showHelp(null))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Help)


class Topic extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    return (
      <MobileFirstDiv style={{color:'#FFF'}}>
        <ModalSection top>
          <ModalHeading style={{color:'#FFF'}}>{this.props.title}</ModalHeading>
          <ModalSubheading style={{color:'#FFF'}}>{this.props.subtitle}</ModalSubheading>
        </ModalSection>
        <ModalSection>
          <HelpImage background={this.props.image}/>  
        </ModalSection>
        <ModalSection style={{paddingBottom:'12vmin'}}>
          <ModalHeading style={{color:'#FFF'}}>What's this?</ModalHeading>
          <HelpText>
            {this.props.children}
          </HelpText>
        </ModalSection>
      </MobileFirstDiv>
    )
  }
}

const HelpText = styled.div`
  @media (max-width: 1024px) and (orientation: portrait){ 
    font-size: 2.5vmin;
  }
`
const Image = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`
const HelpImage = styled.div`
  position: relative;
  max-width: 100%;
  height: 400px;
  background: url('${(props) => props.background}');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.5vmin 0.5vmin 0 0;
`