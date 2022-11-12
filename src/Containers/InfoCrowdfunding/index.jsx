import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { paths } from 'globals'

import { App } from 'Containers' 
import appSelectors from 'Containers/App/selectors'

import { RP_FONT, Bold, Clear } from 'Components' // GLOBALS
import { Link } from 'Components' // LINK
import { Image } from 'Components' // IMAGE
import { TotalLandingWrapper, LandingInfoWrapper, InnerContentWrapper, InnerContent, 
          ContentMinorHeading, ContentMajorHeading, ContentSummary, ContentAction, LandingInfoDetails, 
          HowToSectionWrapper, DetailsSection, DetailsSectionStepCount, DetailsHeading, DetailsSubheading, 
          DetailsSubsection, SubsectionHeading, SubsectionSummary, LandingInfoFooter, FooterHeading } from 'Components' // MODAL AND MODALOTHERS


export class InfoCrowdfunding extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const user      = this.props.user
    const is_artist = user && user.profile.is_artist || false

    return (
      <App>
        <MobileFirstDiv>
          <TotalLandingWrapper>
            
            {/* LANDING INFO BANNER */}
            <LandingInfoWrapper image="/Assets/images/background/bg12.jpg" mobileImage="/Assets/images/background/bg12.jpg">
              <InnerContentWrapper>
                <InnerContent>
                  <ContentMinorHeading>CROWDFUND YOUR SHOW</ContentMinorHeading>
                  <ContentMajorHeading>Don't wait for success to find you. Book your concert in under one minute.</ContentMajorHeading>
                  <ContentSummary>
                    We put you in direct contact with local venues and artists to make your concerts happen. Connect, communicate, monitor sales, and track your show-over-show success all in one place. Scroll down to learn how our tools help you build your musical career.
                  </ContentSummary>
                  {
                      user
                      ? is_artist
                        ? <Link href={paths.showCreate()}>
                            <ContentAction>Get Started</ContentAction>
                          </Link>
                        : <Link href={paths.settings()}>
                            <ContentAction>Become an artist</ContentAction>
                          </Link>
                      : <Link redirectToLogin>
                          <ContentAction>Log in to get started</ContentAction>
                        </Link>
                    }
                </InnerContent>
              </InnerContentWrapper>
            </LandingInfoWrapper>

            {/* LANDING INFO DETAILS */}
            <LandingInfoDetails>
              <InnerContentWrapper width="auto">

                {/* WHAT'S A CAMPAIGN */}
                <DetailsSection>
                  <DetailsHeading>Show booking made easy</DetailsHeading>
                  <DetailsSubheading>
                    Gone are the days of searching for venues in one tab, supporting acts in another, and contacting both parties over different platforms. Tackle everything in one place with RedPine.
                  </DetailsSubheading>

                  <DetailsSubsection display>
                    <i className="fa fa-calendar-check-o" />
                    <SubsectionHeading>Book your venue</SubsectionHeading>
                    <SubsectionSummary>
                      We are in direct communication with our venues, so you can be confident that their information is current. Search based on location and capacity, and once you're ready, submit a booking request with a few clicks.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display>
                    <i className="fa fa-handshake-o" />
                    <SubsectionHeading>Connect with other performers</SubsectionHeading>
                    <SubsectionSummary>
                      If you always perform with the same people, you won't grow your fan base. Find new supporting acts through our community! Our artists' profiles include reviews, concert history, social media links, and bios.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display>
                    <i className="fa fa-thumbs-o-up" />
                    <SubsectionHeading>
                      Call the shots
                    </SubsectionHeading>
                    <SubsectionSummary>
                     You determine your set times and ticket prices. Choose to include tiered pricing, perks, or keep it simple. Outside of any venue-specific fees, there is no cost to you for ticketing.
                    </SubsectionSummary>
                  </DetailsSubsection>
                </DetailsSection>

                {/* STEPS TO CREATING A SUCCESSFUL CAMPAIGN */}
                <HowToSectionWrapper>
                  What you'll need for a great show
                </HowToSectionWrapper>

                {/* CREATING A CAMPAIGN */}
                <DetailsSection>
                  <DetailsSectionStepCount>1</DetailsSectionStepCount>
                  <DetailsHeading>Choose your venue wisely</DetailsHeading>
                  <DetailsSubheading>We've made it simple to find the perfect place for your next show.</DetailsSubheading>

                  <DetailsSubsection display>
                    <i className="fa fa-list" />
                    <SubsectionHeading>It's all in the details</SubsectionHeading>
                    <SubsectionSummary>
                      Filter by capacity and location to suit your requirements. Next, refer to the amenities, past concerts, and artist reviews to help you make your decision.  
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display>
                    <i className="fa fa-mouse-pointer" />
                    <SubsectionHeading>Click to book</SubsectionHeading>
                    <SubsectionSummary>
                      Submit a booking request to your chosen venue in a matter of seconds. Don't worry about drafting an email - answer a few simple questions and let our submission form do the talking.
                    </SubsectionSummary>
                  </DetailsSubsection>
                </DetailsSection>

                {/* MARKETING YOUR CAMPAIGN */}
                <DetailsSection>
                  <DetailsSectionStepCount>2</DetailsSectionStepCount>
                  <DetailsHeading>Find your supporting acts</DetailsHeading>
                  <DetailsSubheading>You're ready to perform; now, let us help you find accompanying musicians to round out your show.</DetailsSubheading>

                  <DetailsSubsection display>
                    <i className="fa fa-search" />
                    <SubsectionHeading>Quick search</SubsectionHeading>
                    <SubsectionSummary>
                      Search by genre and location to find suitable artists for your show. At a glance, see who a given artist has performed with previously.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  
                  <DetailsSubsection display="true">
                    <i className="fa fa-users" style={{marginRight: '2vmin'}} />
                    <SubsectionHeading>Know your co-performers</SubsectionHeading>
                    <SubsectionSummary>
                      Our artists' profiles include media links, past concerts, and reviews from other performers. If only dating was this transparent!
                    </SubsectionSummary>
                  </DetailsSubsection>
                  
                  <DetailsSubsection display="true">
                    <i className="fa fa-envelope-o" style={{marginRight: '2vmin'}} />
                    <SubsectionHeading>Invite external artists</SubsectionHeading>
                    <SubsectionSummary>
                      Do you have a supporting act in mind who is not yet on RedPine? We make it easy to send invitations. Once the invite is accepted, the artist is seamlessly added to your concert.
                    </SubsectionSummary>
                  </DetailsSubsection>
                </DetailsSection>

                {/* WORKING WITH  CAMPAIGN */}
                <DetailsSection>
                  <DetailsSectionStepCount>3</DetailsSectionStepCount>
                  <DetailsHeading>Your concert, your way</DetailsHeading>
                  <DetailsSubheading>You have control over how you'd like your show to play out.</DetailsSubheading>

                  <DetailsSubsection display>
                    <i className="fa fa-money" />
                    <SubsectionHeading>Payout options</SubsectionHeading>
                    <SubsectionSummary>
                      You decide how the revenue will be distributed. Our unique checkout system lets fans identify who they are paying to see, so you may split up ticket sales based on these selections.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  
                  <DetailsSubsection display>
                    <i className="fa fa-gift" />
                    <SubsectionHeading>Add perks</SubsectionHeading>
                    <SubsectionSummary>
                      We give you the freedom to get creative with your ticketing. Add early bird pricing, merchandise bundles, meet-and-greet packages, and more!
                    </SubsectionSummary>
                  </DetailsSubsection>
                  
                  <DetailsSubsection display>
                    <i className="fa fa-line-chart" />
                    <SubsectionHeading>Learn about your sales</SubsectionHeading>
                    <SubsectionSummary>
                      We provide you with guest lists for every show so you know who is turning up. As you perform in more concerts, we provide you with analytics to track your sales growth over time.
                    </SubsectionSummary>
                  </DetailsSubsection>
                </DetailsSection>
              </InnerContentWrapper>
            </LandingInfoDetails>

            {/* LANDING INFO FOOTER */}
            <LandingInfoFooter image="/Assets/images/background/bg4.jpg">
              <FooterHeading>Take control of your career - headline a show today!</FooterHeading>
              <Clear></Clear>
              {
                user
                ? is_artist
                  ? <Link href={paths.showCreate()}>
                      <ContentAction>Get Started</ContentAction>
                    </Link>
                  : <Link href={paths.settings()}>
                      <ContentAction>Become an artist</ContentAction>
                    </Link>
                : <Link redirectToLogin>
                    <ContentAction>Log in to get started</ContentAction>
                  </Link>
              }
            </LandingInfoFooter>
          </TotalLandingWrapper>
        </MobileFirstDiv>
      </App>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCrowdfunding)


//*** APP CONTAINER ***
const MobileFirstDiv = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`