import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { paths } from 'globals'
import { App } from 'Containers' 
import appSelectors from 'Containers/App/selectors'
import { RP_FONT, Bold, Clear, LogoRed, LogoBlack, LogoWhite } from 'Components' // GLOBALS
import { Link } from 'Components' // LINK
import { Image } from 'Components' // IMAGE
import { TotalLandingWrapper, LandingInfoWrapper, InnerContentWrapper, InnerContent, 
          ContentMinorHeading, ContentMajorHeading, ContentSummary, ContentAction, LandingInfoDetails, 
          HowToSectionWrapper, DetailsSection, DetailsSectionStepCount, DetailsHeading, DetailsSubheading, 
          DetailsSubsection, SubsectionHeading, SubsectionSummary, LandingInfoFooter, FooterHeading } from 'Components' // MODAL AND MODALOTHERS


export class InfoBooking extends React.PureComponent {
  constructor(props) {
    super(props) 
  }
  
  render() {
    const user      = this.props.user
    const is_artist = user && user.profile.is_artist || false

    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const is_mobile = (w < 700)

    return (
      <App>
        <MobileFirstDiv>
          <TotalLandingWrapper>
            {/* LANDING INFO BANNER */}
            <LandingInfoWrapper image="/Assets/images/background/bg12.jpg" mobileImage="/Assets/images/background/bg12.jpg">
              <InnerContentWrapper>
                <InnerContent>
                  <ContentMinorHeading>ORGANIZE A SHOW</ContentMinorHeading>
                  <ContentMajorHeading>Book the Perfect Venue on <LogoRed size="4vmin">Red</LogoRed>{is_mobile?<LogoWhite size="4vmin">Pine</LogoWhite>:<LogoBlack>Pine</LogoBlack>}</ContentMajorHeading>
                  <ContentSummary>
                    We put you in direct contact with hundreds of venues across Canada. Once you find the perfect venue for your show, you can reach out and book it with ease through RedPine.
                  </ContentSummary>
                  {
                      user
                      ? is_artist
                        ? <Link href={paths.showCreate()}>
                            <ContentAction>Book a Venue</ContentAction>
                          </Link>
                        : <Link href={paths.settings()}>
                            <ContentAction>Book a Venue</ContentAction>
                          </Link>
                      : <Link redirectToLogin>
                          <ContentAction>Book a Venue</ContentAction>
                        </Link>
                    }
                </InnerContent>
              </InnerContentWrapper>
            </LandingInfoWrapper>

            <LandingInfoDetails>
              <InnerContentWrapper width="auto">

                <DetailsSection>
                  <DetailsHeading>Venue booking made easy</DetailsHeading>
                  <DetailsSubsection display>
                    <i className="fa fa-calendar-check-o" />
                    <SubsectionHeading>Find a venue</SubsectionHeading>
                    <SubsectionSummary>
                     Search venues by location, capacity and genres. Once you're ready, submit a booking request with a few clicks.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display>
                    <i className="fa fa-handshake-o" />
                    <SubsectionHeading>Submit a booking request</SubsectionHeading>
                    <SubsectionSummary>
                      Once you find a venue, send a request directly to the booker. Start by choosing a date, provide some details about your show, and submit your request.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display>
                    <i className="fa fa-thumbs-o-up" />
                    <SubsectionHeading>
                      Finalize your booking
                    </SubsectionHeading>
                    <SubsectionSummary>
                     When you submit your request you're put into a chat with the venue. You can discuss your show, ask questions, and confirm your booking with the venue.
                    </SubsectionSummary>
                  </DetailsSubsection>
                </DetailsSection>
{/* 
                <HowToSectionWrapper>
                  What you'll need for a great show
                </HowToSectionWrapper>

                <DetailsSection>
                  <DetailsSectionStepCount>1</DetailsSectionStepCount>
                  <DetailsHeading>Find a venue</DetailsHeading>
                  <DetailsSubsection display>
                    <i className="fa fa-list" />
                    <SubsectionHeading>Browse venue profiles</SubsectionHeading>
                    <SubsectionSummary>
                      Filter venues by city and capacity. You can also check out what amenities they offer and who else has played there before. 
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display>
                    <i className="fa fa-mouse-pointer" />
                    <SubsectionHeading>Click to book</SubsectionHeading>
                    <SubsectionSummary>
                      Submit a booking request in seconds. Tell the venue a bit about the show and we'll send your request to the venue.
                    </SubsectionSummary>
                  </DetailsSubsection>
                </DetailsSection>

                <DetailsSection>
                  <DetailsSectionStepCount>2</DetailsSectionStepCount>
                  <DetailsHeading>Find your supporting acts</DetailsHeading>
                  <DetailsSubsection display>
                    <i className="fa fa-search" />
                    <SubsectionHeading>Search for acts</SubsectionHeading>
                    <SubsectionSummary>
                      Search by genre and location to find suitable artists for your show. Artist profiles include their music and social media links.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display="true">
                    <i className="fa fa-users" style={{marginRight: '2vmin'}} />
                    <SubsectionHeading>Connect with acts</SubsectionHeading>
                    <SubsectionSummary>
                      When you've found an act you want to perform with you can message and invite them to your show.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display="true">
                    <i className="fa fa-envelope-o" style={{marginRight: '2vmin'}} />
                    <SubsectionHeading>Invite acts to your show</SubsectionHeading>
                    <SubsectionSummary>
                      Do you have an act in mind who isn't signed up on RedPine? Enter their band name and email and we'll invite them to the show.
                    </SubsectionSummary>
                  </DetailsSubsection>
                </DetailsSection>

                <DetailsSection>
                  <DetailsSectionStepCount>3</DetailsSectionStepCount>
                  <DetailsHeading>After your show is booked</DetailsHeading>
                  <DetailsSubsection display>
                    <i className="fa fa-money" />
                    <SubsectionHeading>Review your ticketing page</SubsectionHeading>
                    <SubsectionSummary>
                      We set up a ticketing page for you once the show is booked. You can add options like early bird tickets or merch packages.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display>
                    <i className="fa fa-gift" />
                    <SubsectionHeading>Coordinate with the bands</SubsectionHeading>
                    <SubsectionSummary>
                      Use the RedPine Show Hub to upload documents, organize load in, set times and gear sharing.
                    </SubsectionSummary>
                  </DetailsSubsection>
                  <DetailsSubsection display>
                    <i className="fa fa-line-chart" />
                    <SubsectionHeading>Promote the show</SubsectionHeading>
                    <SubsectionSummary>
                      RedPine is here to help with booking a show, but we're not promoters. Coordinate with the bands and venue to promote and have a great show.
                    </SubsectionSummary>
                  </DetailsSubsection>
                </DetailsSection>
*/}
              </InnerContentWrapper>
            </LandingInfoDetails>
            <LandingInfoFooter image="/Assets/images/background/bg4.jpg">
              <FooterHeading>Book a Venue Today!</FooterHeading>
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
export default connect(mapStateToProps, mapDispatchToProps)(InfoBooking)

//*** APP CONTAINER ***
const MobileFirstDiv = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`