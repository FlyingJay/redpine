import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

//import { paths } from 'globals'
import { App } from 'Containers'

import { RedBlackLogo, Clear, Bold, RP_LOGOFONT, RP_FONT, RP_DARK_GREY, RP_SUPER_LIGHT, RP_GREY, RP_BLACK, RP_BLUE, RP_DARKBLUE, RP_RED, RP_PINK, RP_GREEN, SPOTIFY_GREEN } from 'Components'
import { ModalHeading, ModalSubheading } from 'Components'
import { ListTile, FormButton } from 'Components' //BUTTON
import { FormSeparator } from 'Components'
import { SelectGenres } from 'Components'
import { Input, Select, TextBox } from 'Components'
import { Slider, PrevArrow, NextArrow } from 'Components' // SLIDER
import { Link } from 'Components'
import { DetailsSection, DetailsSectionStepCount, DetailsHeading, DetailsSubheading, 
          DetailsSubsection, SubsectionHeading, SubsectionSummary } from 'Components'

import selectors from './selectors'
import actions from './actions'


export class Booking extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      price: 0,
      price_text: '',
      message:''
    }
  }
                    
  render() {
    const settings = {
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {breakpoint: 768, settings: {slidesToShow: 1, slidesToScroll: 1}}, 
        {breakpoint: 1024, settings: {slidesToShow: 1, slidesToScroll: 1}}, 
        {breakpoint: 1920, settings: {slidesToShow: 2, slidesToScroll: 2}}, 
        {breakpoint: 3000, settings: {slidesToShow: 2, slidesToScroll: 2}},
        {breakpoint: 4000, settings: {slidesToShow: 2, slidesToScroll: 2}}
      ],
      swipeToSlide: true,
      autoplay: true,
      autoplaySpeed: 2500,
      rows: 1,
      infinite: true  
    }

    return <App no_ui>
     <div style={{padding:'0 10vw',margin:'15vmin 0',position:'relative'}}>
      <SearchCaption style={{textAlign:'center',margin:'5vmin 0 10vmin 0',fontSize:'4vmin'}}>
        Solo acts, bands, duos, or "anything acoustic" - we'll find them for you.
      </SearchCaption>
      <SearchCaption style={{textAlign:'center',margin:'0 0 5vmin 0',fontSize:'2.25vmin'}}>
        ...looking for DJs? <Bold><Link href="/djs">Check here!</Link></Bold>
      </SearchCaption>
      <TestimonialBlock
        image="http://music.fabrestaurants.ca/wp-content/uploads/2019/09/021-charlie-edit-small.jpg"
        quote="Charlie the Kid???s high energy and upbeat style, along with youthful flavour and humour is what make him one of the GTA's most unique singer-songwriters."
        act="CHARLIE THE KID"/>
      <FormSeparator/>
      <TestimonialBlock
        image="http://music.fabrestaurants.ca/wp-content/uploads/2019/09/JamesSheehan.jpg"
        quote="Magnetic energy as a solo acoustic entertainer, front-man for The Morning Caesars, master songwriter for symphonic metal icon, Amplitusion; and composer of cinematic soundtracks on networks such as Showtime, The History Channel and Animal Planet."
        act="JAMES SHEEHAN"/>
      <FormSeparator/>
      <TestimonialBlock
        image="http://music.fabrestaurants.ca/wp-content/uploads/2020/01/JESSIE-T-BORDER-2.jpg"
        quote="Playing over 200 shows per year, Jessie has been expanding her fan base performing at a wide variety of venues across Canada. Booking solo, duo, trio and full band shows, Jessie???s making her own footprint in the country music market."
        act="JESSE T"/>
      <FormSeparator/>
      <TestimonialBlock
        image="http://music.fabrestaurants.ca/wp-content/uploads/2019/11/James-Stephens.jpg"
        quote="James Stephens takes songs by Red Hot Chili Peppers, Chet Faker, The Killers, and even Johnny Cash and successfully offers a fresh alternative perspective. He's an artist/producer/Audio Engineer who handles technical problems with ease."
        act="FOURTH BORN"/>
      <FormSeparator/>
      <TestimonialBlock
        image="http://music.fabrestaurants.ca/wp-content/uploads/2019/11/Woody.png"
        quote="The music is much more than Top 40. The kind of melodies that linger in your head well after you???ve heard them. He gives life to your own struggles. Like listening to an old friend. Woody is an unassuming, humble guy that will surprise you with his powerful voice."
        act="WOODY WOODBURN"/>
      <SearchCaption style={{textAlign:'center',margin:'4vmin 0',fontSize:'2.25vmin'}}>
        ...and many more!
      </SearchCaption>

      <FormSeparator/>
      <SearchCaption style={{textAlign:'center',margin:'5vmin 0 10vmin 0',fontSize:'4vmin'}}>
        We're honoured to book top Toronto venues!
      </SearchCaption>
      <Slider {...settings}>
        {[{ id:0, name:'Brickworks Ciderhouse', image:'/Assets/images/promo/brickworks_ciderhouse.jpg'},
          { id:3, name:'Mill St. Beer Hall', image:'/Assets/images/promo/mill_st_beer_hall.jpg'},
          { id:1, name:'East of Brunswick', image:'/Assets/images/promo/east_of_brunswick.jpg'},
          { id:2, name:'Dominion', image:'/Assets/images/promo/dominion.jpg'},
          { id:4, name:'Mill St. Brew Pub', image:'/Assets/images/promo/mill_st_brew_pub.png'},
          { id:5, name:'Goodman Pub', image:'/Assets/images/promo/goodman_pub.jpg'},
          { id:6, name:'Pogue Mahone', image:'/Assets/images/promo/pogue_mahone.jpg'},
          { id:7, name:'Pour House', image:'/Assets/images/promo/pour_house.jpg'}
          ].map((venue) => <div key={venue.id}>
                            <ImagePanel image={venue.image} style={{borderRadius:'2vmin',margin:'2vmin 1vmin',position:'relative',fontWeight:'bold'}}>
                              <Overlay/>
                              <BottomLeftText>{venue.name}</BottomLeftText>
                            </ImagePanel>
                           </div>)}
      </Slider>
      <FormSeparator/>

      <WelcomeText style={{textAlign:'center',paddingTop:'20vmin'}}>
        Share your needs & budget, and we'll handle the rest!<br/>
        <SearchCaption style={{textAlign:'center'}}>
          You always keep the final word, and we'll adjust from your feedback after every event.
        </SearchCaption>
        
        <Register>
          <Input type='text' placeholder='Enter your email..' image='email' focusImage='email-focus' onUpdate={(e) => this.updateState({email: e.target.value })} />
          <FormSeparator />
          <Select
            style={{marginBottom:'1vmin',fontSize:'2.25vmin'}}
            name='price-select'
            options={[
                { value:0, label:'< $200' },
                { value:1, label:'$200-$350' },
                { value:2, label:'$350-$500' },
                { value:3, label:'$500+' },
              ]}
            onChange={(e) => this.updateState({price:e.label,price_text:e.label})}
            placeholder={ this.state.price_text || 'Ideal nightly budget?' } />
          <TextBox placeholder="What are you looking for?" value={this.state.message} image='dot' focusImage='dot-focus' onChange={(e) => this.updateState({message:e.target.value})} style={{resize:'vertical'}}/>
        </Register>
      </WelcomeText>
      <div style={{width:'300px',margin:'0 auto'}}>
        <Start onClick={() => this.learnMore()}>LEARN MORE</Start>
      </div>

     </div>
    </App>
  }

  learnMore(){
    if(!this.state.email){
      alert('Please enter your email.')
    }else if(!this.state.price){
      alert('Please add a budget estimate.')
    }else if(!this.state.message){
      alert('Tell us about your ideal music program!')
    }else{
      this.props.notifyCoverLead({email:this.state.email,message:this.state.message,price:this.state.price})
    }
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    notifyCoverLead: (lead) => {
      dispatch(actions.notifyCoverLead(lead))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Booking)

const TestimonialBlock = ({image,quote,act,subtitle}) => (
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
const BottomLeftText = styled.span`
  position: absolute;
  bottom: 3vmin;
  left: 3vmin;
  color: #FFF;
  font-size: 3vmin;
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
const WelcomeText = styled.div`
  display: block;
  vertical-align: top;
  text-align: left;
  color: ${RP_BLACK};
  font-size: 4vmin;
  margin-bottom: 5vmin;
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
const Register = styled.div`
  display: inline-block;
  width: 50%;
  padding: 5vmin 0 0 2.5vmin;

  @media (max-width: 768px) {
    width: 100%;
  }
`
const Overlay = styled.div`
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
`