import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths } from 'globals'
import { App } from 'Containers'
import appActions from 'Containers/App/actions'

import { RedBlackLogo, Clear, Bold, RP_LOGOFONT, RP_FONT, RP_DARK_GREY, RP_SUPER_LIGHT, RP_GREY, RP_BLACK, RP_BLUE, RP_DARKBLUE, RP_RED, RP_PINK, RP_GREEN, SPOTIFY_GREEN } from 'Components'
import { ModalHeading, ModalSubheading } from 'Components'
import { ListTile, FormButton } from 'Components' //BUTTON
import { FormSeparator } from 'Components'
import { Link } from 'Components'
import { DetailsSection, DetailsSectionStepCount, DetailsHeading, DetailsSubheading, 
          DetailsSubsection, SubsectionHeading, SubsectionSummary } from 'Components'

import selectors from './selectors'
import actions from './actions'


export class LandingPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      category: null
    }
  }
                    
  render() {
    return <App>
      {{[null]:<div style={{padding:'0 10vw',margin:'10vmin 0'}}>
                <HalfWidth>
                  <WelcomeText>
                    <span style={{fontWeight:'bold',fontSize:'4.25vmin'}}>
                      Book a Venue, Easier than ever
                    </span>
                    <br/>
                    <SearchCaption>
                      RedPine is built for artists who organize their own shows
                    </SearchCaption>
                  </WelcomeText>
                  <ListTile thin left background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.updateState({category:'TESTIMONIALS'})}>
                    <ImageButtonIcon src="\Assets\images\apps\acts.png"/>
                    <div>&nbsp;How Artists use RedPine</div>
                  </ListTile>
                  <ListTile thin left background={'#25ACF6'} hoverBackground={'#2592F6'} onClick={() => this.updateState({category:'VENUES'})}>
                    <ImageButtonIcon src="\Assets\images\apps\venues.png"/>
                    <div>&nbsp;Venues on RedPine</div>
                  </ListTile>
                  <WelcomeText>
                    <SearchCaption style={{marginTop:'5vmin'}}>
                      <i>RedPine is free to use!</i> &nbsp;Share your art, not your earnings.
                    </SearchCaption>
                  </WelcomeText>
                </HalfWidth>
                <HalfWidth image>
                  <HideMe>
                    <ImagePanel image="/Assets/images/promo/booked.png" style={{borderRadius:'2vmin',width:'90%'}}/>
                  </HideMe>
                </HalfWidth>

                <FormSeparator/>
                
                <StoryBlock 
                  image="/Assets/images/promo/findvenue_transparent.png"
                  title="Book a Venue"
                  bold="Search venues by location, capacity and genre."
                  description="Once you're ready, submit a booking request with a few clicks."/>
                
                <StoryBlock2
                  image="/Assets/images/promo/tickets_transparent.png"
                  title="Ticket your Show"
                  bold="Submit your request."
                  description="Tell the venue about your show, send the request and chat with the booker."
                  bold2="We know venues don't always reply on the first email."
                  description2="If you don't hear from the venue in a few days, we follow up with the booker to remind them about your request."/>
                <FormSeparator/>

                <TestimonialBlock
                  image="/Assets/images/promo/sweettooth.jpg"
                  quote="RedPine is an incredible company that is not only reliable, helpful, and intuitive, but also exciting. We got our first headlining gig using their platform, and the entire experience, from setting it up to putting on the show, was amazing."
                  link="https://app.redpinemusic.com/acts/1970"
                  subtitle="Used the RedPine app to book Junction City Music Hall for their EP Release."
                  act="SWEET TOOTH"/>
                <FormSeparator/>

                <div style={{margin:'10vmin 0'}}>
                  <WelcomeText style={{textAlign:'center'}}>
                    Our Friends
                    <br/>
                    <SearchCaption style={{textAlign:'center'}}>
                      It takes a village to bring the music industry together
                    </SearchCaption>
                  </WelcomeText>
                  <div style={{textAlign:'center'}}>
                    <Link href="https://www.universalmusic.com/company/">
                      <PartnerImage image="/Assets/images/partners/umg_wide.jpg" inline/>
                    </Link>
                    <Link href="https://www.transmediazone.ca/about">
                      <PartnerImage image="/Assets/images/partners/ryerson.png" inline/>
                    </Link>
                    <Link href="https://launchyu.ca/">
                      <PartnerImage image="/Assets/images/partners/york.jpg" inline/>
                    </Link>
                    <Link href="https://startupheretoronto.com/">
                      <PartnerImage image="/Assets/images/partners/startuphere.png" inline/>
                    </Link>
                    <Link href="https://www.toronto.ca/business-economy/industry-sector-support/music/">
                      <PartnerImage image="/Assets/images/partners/toronto.jpg" inline/>
                    </Link>
                    <Link href="http://www.socan.com/">
                      <PartnerImage image="/Assets/images/partners/socan2.png" inline/>
                    </Link>
                    <Link href="https://www.smashmouthentertainment.com/">
                      <PartnerImage image="/Assets/images/partners/smashmouth.jpg" inline/>
                    </Link>
                    <Link href="https://royalmountainrecords.com/">
                      <PartnerImage image="/Assets/images/partners/royalmountain.jpg" inline/>
                    </Link>
                  </div>
                </div>
                <FormSeparator/>
                <WelcomeText style={{textAlign:'center'}}>
                    Ready to get started?
                    <br/>
                    <SearchCaption style={{textAlign:'center'}}>
                      Sign up for FREE, and find your perfect venue.
                    </SearchCaption>
                </WelcomeText>
                <div style={{width:'300px',margin:'0 auto'}}>
                  <Start onClick={() => this.props.register()}>SIGN UP</Start>
                </div>
              </div>,
        ['TESTIMONIALS']:<div style={{padding:'0 10vw',margin:'10vmin 0',position:'relative'}}>
                          <div style={{textAlign:'right'}}>
                            <FormButton onClick={() => this.updateState({category:null})} color={RP_BLACK} background="#FFF" hoverBackground={RP_SUPER_LIGHT} bold>
                              <Bold><i className="fa fa-arrow-left"/>&nbsp;&nbsp;BACK</Bold>
                            </FormButton>
                          </div>

                          <SearchCaption style={{textAlign:'center',margin:'10vmin 0 10vmin 0',fontSize:'4vmin'}}>
                            Over 800 acts are registered with <RedBlackLogo inline size="4vmin"/>. Welcome to our network.
                          </SearchCaption>

                          <TestimonialBlock
                            image="/Assets/images/promo/wesfowler.png"
                            quote="As an indie artist, RedPine has been one of the most valuable tools at my disposal."
                            link="https://app.redpinemusic.com/acts/1664"
                            act="WES FOWLER"
                            subtitle="Regularly books Toronto venues using the RedPine app."/>
                          <FormSeparator/>
                          <TestimonialBlock
                            image="/Assets/images/promo/aftertide.png"
                            quote="As booking shows at appropriate venues become harder and less affordable, the passionate people behind RedPine kept info super clear from the getgo, and made booking the easiest I’ve ever experienced!"
                            link="https://app.redpinemusic.com/acts/2036"
                            act="AFTERTIDE"
                            subtitle="Discovered a new venue on RedPine and booked it right away."/>
                          <FormSeparator/>
                          <TestimonialBlock
                            image="/Assets/images/promo/alyssatess.jpg"
                            quote="RedPine made my experience of booking a show easier than ever! I'm an artist who does a lot of things for myself and it was refreshing to have someone helping me out. They really care about the artists who use their platform. I look forward to working with them again!"
                            link=""
                            act="ALYSSA TESS"
                            subtitle="Booked a venue for her headlining show."/>
                          <FormSeparator/>
                          <TestimonialBlock
                            image="/Assets/images/promo/sweettooth.jpg"
                            quote="RedPine is an incredible company that is not only reliable, helpful, and intuitive, but also exciting. We got our first headlining gig using their platform, and the entire experience, from setting it up to putting on the show, was amazing."
                            link="https://app.redpinemusic.com/acts/1970"
                            act="SWEET TOOTH"
                            subtitle="Used the RedPine app to book Junction City Music Hall for their EP Release."/>
                          <FormSeparator/>
                          <TestimonialBlock
                            image="/Assets/images/promo/amberlea.jpg"
                            quote="RedPine is one of the greatest assets for any artist looking to grow their career. I cannot say enough about how grateful I am for the team and resources that RedPine has provided. Y'all are the reason I can preform and the reason I've built up the audience I have."
                            link="https://app.redpinemusic.com/acts/1191"
                            act="AMBERLEA BRUCH"
                            subtitle="Used the RedPine app to book her first venue ever."/>

                          <WelcomeText style={{textAlign:'center',paddingTop:'10vmin'}}>
                            Ready to get started?
                            <br/>
                            <SearchCaption style={{textAlign:'center'}}>
                              Sign up for FREE and find your perfect venue.
                            </SearchCaption>
                          </WelcomeText>
                          <div style={{width:'300px',margin:'0 auto'}}>
                            <Start onClick={() => this.props.register()}>SIGN UP</Start>
                          </div>

                         </div>,
        ['VENUES']: <div style={{padding:'0 10vw',margin:'10vmin 0',position:'relative'}}>
                          <div style={{textAlign:'right'}}>
                            <FormButton onClick={() => this.updateState({category:null})} color={RP_BLACK} background="#FFF" hoverBackground={RP_SUPER_LIGHT} bold>
                              <Bold><i className="fa fa-arrow-left"/>&nbsp;&nbsp;BACK</Bold>
                            </FormButton>
                          </div>
                          
                          <SearchCaption style={{textAlign:'center',margin:'10vmin 0 15vmin 0',fontSize:'4vmin'}}>
                            Book 400+ Canadian venues with <RedBlackLogo inline size="4vmin"/>, we're adding more each day.
                          </SearchCaption>

                          <VenueBlock
                            image="/Assets/images/promo/junctioncity.png"
                            quote="A community and music oriented arts and performance space, dedicated to serving the best neighbourhood in Toronto, The Junction."
                            venue="JUNCTION CITY MUSIC HALL"
                            city="Toronto"/>
                          <FormSeparator/>
                          <VenueBlock
                            image="/Assets/images/promo/cavern.jpg"
                            quote="The Cavern Bar is many things: a cool coffee spot, a place to meet travelers from all over, a nice venue for events and the place to be for live music."
                            venue="THE CAVERN"
                            city="Toronto"/>
                          <FormSeparator/>
                          <VenueBlock
                            image="/Assets/images/promo/burdock.jpg"
                            quote="Microbrewery, music venue & restaurant. Our acoustically treated Music Hall is an innovative, artist-driven performance space that provides audiences and performers with a remarkable experience."
                            venue="THE BURDOCK"
                            city="Toronto"/>
                          <FormSeparator/>
                          <VenueBlock
                            image="/Assets/images/promo/babyg.jpg"
                            quote="One of Toronto's most important new venues, hosting great talent in an intimate setting."
                            venue="THE BABY G"
                            city="Toronto"/>
                          <FormSeparator/>
                          <VenueBlock
                            image="/Assets/images/promo/bourbonroom.jpg"
                            quote="The Bourbon Room is one of Ottawa's largest nightclubs, located right downtown next to the Rideau Centre."
                            venue="THE BOURBON ROOM"
                            city="Ottawa"/>

                          <WelcomeText style={{textAlign:'center',paddingTop:'10vmin'}}>
                              Ready to browse venues?
                              <br/>
                              <SearchCaption style={{textAlign:'center'}}>
                                Sign up for FREE and find your perfect venue.
                              </SearchCaption>
                          </WelcomeText>
                          <div style={{width:'300px',margin:'0 auto'}}>
                            <Start onClick={() => this.props.register()}>SIGN UP</Start>
                          </div>

                         </div>,
      }[this.state.category]}
    </App>
  }

  componentDidMount(){
    //this.props.loadData()
  }

  componentWillReceiveProps(nextProps) {
    
  }

  componentWillUnmount() {
    
  }  

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

}

const mapStateToProps = (state, props) => {
  return {
    landingpage_loading: selectors.selectLandingPageLoading(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showNavJump: () => {
      dispatch(appActions.showNavJump())
    },
    register: () => {
      dispatch(push(paths.register()))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)


const StoryBlock = ({image,title,bold,description}) => (
  <div style={{background:'rgb(230,230,230,0.3)',borderRadius:'2vmin 2vmin 0 0',padding:'2vmin'}}>
    <HalfWidth image>
      <ImagePanel image={image} inline/>
    </HalfWidth>
    <HalfWidth>
      <WelcomeText>
        <StoryText>
          <Bold>{bold}</Bold> {description}
        </StoryText>
      </WelcomeText>
    </HalfWidth>
  </div>
)
const StoryBlock2 = ({image,title,bold,description,bold2,description2}) => (
  <div style={{background:'rgb(230,230,230,0.3)',borderRadius:'0 0 2vmin 2vmin',padding:'2vmin'}}>
    <HalfWidth>
      <WelcomeText>
        <StoryText>
          <Bold>{bold}</Bold> {description}
        </StoryText>
      </WelcomeText>
      <WelcomeText>
        <StoryText>
          <Bold>{bold2}</Bold> {description2}
        </StoryText>
      </WelcomeText>
    </HalfWidth>
    <HalfWidth image>
      <ImagePanel image={image} inline/>
    </HalfWidth>
  </div>
)
const TestimonialBlock = ({image,quote,link,act,subtitle}) => (
  <Testimonial>
    <HalfWidth image top>
      <ImagePanel image={image} style={{borderRadius:'2vmin'}}/>
    </HalfWidth>
    <HalfWidth top>
      <QuoteWrap>
        <i className="fa fa-quote-left" style={{fontSize:"5vmin",color:RP_RED}} />
        &nbsp;{quote}
      </QuoteWrap>
      <div style={{textAlign:'left',paddingTop:'5vmin'}}>
        <span style={{fontWeight:'bold',fontSize:'3vmin'}}>{act}</span>
        <br/>
        <span style={{color:RP_RED,fontStyle:'italic',fontSize:'2.5vmin'}}>{subtitle}</span>
      </div>
    </HalfWidth>
  </Testimonial>
)

const VenueBlock = ({image,quote,venue,city}) => (
  <Testimonial>
    <HalfWidth image top>
      <ImagePanel image={image} style={{borderRadius:'2vmin'}}/>
    </HalfWidth>
    <HalfWidth top>
      <QuoteWrap>
        {quote}
      </QuoteWrap>
      <div style={{textAlign:'left'}}>
        <br/>
        <span style={{fontWeight:'bold',fontSize:'3vmin'}}>{venue}</span>
        <br/>
        <span style={{color:RP_RED,fontSize:'2.5vmin'}}>{city}</span>
      </div>
    </HalfWidth>
  </Testimonial>
)

const WelcomeText = styled.div`
  display: block;
  vertical-align: top;
  text-align: left;
  color: ${RP_BLACK};
  font-size: 4vmin;
  margin-bottom: 5vmin;
`
const SearchCaption = styled.div`
  display: block;
  position: relative;
  width: 100%;
  margin: 0;
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 2.5vmin;
  line-height: 3vmin;
  color: ${RP_BLACK};
  font-weight: 200;

  @media (max-width: 768px) {
    padding-top: 1vmin;
    line-height: 5vmin;
  }
`
const StoryText = styled.div`
  display: block;
  position: relative;
  width: 100%;
  margin: 0;
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 3vmin;
  line-height: 3vmin;
  color: ${RP_BLACK};
  font-weight: 200;

  @media (max-width: 768px) {
    padding-top: 1vmin;
  }
`
const HalfWidth = styled.div`
  display: inline-block;
  position: relative;
  width: ${props => props.image ? '50%' : 'CALC(50% - 16vmin)'};
  vertical-align: ${props => props.top ? 'top' : 'middle'};
  text-align: center;
  padding: ${props => props.image ? '0' : '8vmin'};

  @media (max-width: 768px) {
    display: block;
    width: CALC(100% - 4vmin);

    -webkit-box-shadow: none;
    box-shadow: none;
    padding: 0 2vmin;
  }
`
const PartnerImage = styled.div`
  display: inline-block;
  background: url('${props => props.image || '/Assets/images/defaults/default-thumb.png' }');
  background-size: ${props => props.inline ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center !important;

  height: 120px;
  width: 240px;
  margin: 0 4vmin;

  @media (max-width: 768px) {
    height: 100px;
    width: calc(50% - 8vmin);
  }
`
const ImagePanel = styled.div`
  display: block;
  background: url('${props => props.image || '/Assets/images/defaults/default-thumb.png' }');
  background-size: ${props => props.inline ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center !important;

  height: 360px;
  width: auto;

  @media (max-width: 768px) {
    height: 160px;
  }
`
const HideMe = styled.div`
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`
const ImageButtonIcon = styled.img`
  width: 32px;
  height: 32px;

  @media (max-width: 767px) and (orientation: portrait) {
    width: 20px;
    height: 20px;
  }
`
const Testimonial = styled.div`
  display: block;
  position: relative;
  width: 90%;
  height: auto;
  padding: 2vmin;
  margin: 0 auto;
`
const QuoteWrap = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  font-size: 2.5vmin;
  color: ${RP_BLACK};
  font-weight: 200;
  text-align: left;

  @media (max-width: 768px) {
    margin: 2vmin 0;
  }
`
const Start = styled.div`
  width: 100%;
  background: ${RP_GREEN};
  color: #FFF;
  padding: 0.25vmin 0;
  text-align: center;
  font-size: 3vmin;
  font-weight: 200;
  transition: 0.25s all ease;
  line-height: 8vmin;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,0.17);
  border-radius: 1vmin;

  &:hover {
    background: ${SPOTIFY_GREEN};
    cursor: pointer;
  }
`