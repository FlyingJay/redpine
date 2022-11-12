import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { App } from 'Containers'
import { MyPageWrapper, RP_BLUE, RP_SUPER_LIGHT } from 'Components' // GLOBALS
import { Title } from 'Components' //TITLE
import { Image } from 'Components' //TITLE

const PROFILES = [
  {
    name:'Dylan Rosen',
    bio: 'Dylan Rosen holds the position of CEO and focuses on our vision, execution, and long-term success. He is the architect of our marketing and business development strategies and oversees the overall user experience. Dylan obtained his BComm at Ryerson University with specialties in Marketing and Accounting. Over the first two years of RedPine’s operations, Dylan worked in tandem at a high-growth technology company and received direct mentorship from its executive team. Through this exposure, he learned the philosophy of servant leadership which he employs every day. His passion for entrepreneurship spawned several business ventures in his youth, and now, tirelessly drives the team forward.',
    role: 'FOUNDER, EXECUTIVE OFFICER',
    image: 'Dylan.jpg'
  },
  {
    name:'Jason Rivers',
    bio: 'Jason Rivers holds the position of CTO and has meticulously engineered the infrastructure of the RedPine platform since the company\'s inception. Jason has phenomenal problem solving skills and a natural ability to drive efficiency and innovation. He developed software now in use by nearly all of Canada’s financial institutions, and recently graduated from the University of Ottawa with a BSc (Hons) in Computer Science, Management, and Entrepreneurship, and built RedPine’s Data Mart system as his final graduation project.',
    role: 'FOUNDER, TECHNOLOGY OFFICER',
    image: 'Jason.jpg'
  },
  {
    name:'Basil Eleftheriades',
    bio: 'Basil Eleftheriades holds the position of COO and is responsible for the day-to-day execution of RedPine’s business strategy. His obsession for sound, data-based decisions was fundamental to the company’s creation. Our platform was and continues to be built on the findings from his research and feedback from artists. He completed a BSc in Electrical and Computer Engineering, a master’s in Photonics, and is pursuing his PhD in Electrical Engineering at the University of Toronto.',
    role: 'FOUNDER, OPERATIONS OFFICER',
    image: 'Basil.jpg'
  },
  {
    name:'Jody Tompkins',
    bio: 'Jody Tompkins is an experienced audio engineer and relentless advocate for artists. Recently, he produced the single “Come Over” with pop artist Francesco Yates which entered Spotify Canada’s Viral 50 chart and was performed during Justin Timberlake’s Man of the Woods Tour. Jody’s love of music and dedication to artist success shape his decisions as Director of Business Development.',
    role: 'PRODUCER, BUSINESS DEVELOPMENT'
  },
  {
    name:'Mairi McGowan',
    bio: 'Mairi does stuff with the operations team and has an actual bio coming soon.',
    role: 'OPERATIONS'
  },
  {
    name:'Terry Tompkins',
    bio: 'Terry Tompkins is an emmy-winning songwriter and Juno nominee who brings to the table decades of experience in music production and strong knowledge of performance rights and copyright laws. Terry founded Eggplant Studios in 2001 where he has been producing award-winning series for the likes of Comedy Central and Disney. He is well established in the music industry and has been pivotal in connecting our team with potential investors and expanding our network. He is a composer and advisor to RedPine by day and performing musician by night.',
    role: 'ADVISOR, EMMY WINNER'
  },
  {
    name:'Janet Eger',
    bio: 'Janet Eger is a RedPine advisor, bringing 20 years of progressive management and communications experience. She spent a decade with Indigo as the VP, Public Affairs and Communications, a role that included launching the eReading start up Kobo from its inception in 2009. Following Kobo’s spin off from Indigo, she partnered to help drive its global position in eReading until Kobo’s sale to Rakuten in 2012. For six years prior to joining Indigo, Janet oversaw advertising and public relations at Holt Renfrew.  She began her career in communications with Canadian Pacific/Fairmont Hotels. Janet currently serves as a director on the board of The Writers’ Trust and is a former director on the Board of the Indigo Love of Reading Foundation.',
    role: 'ADVISOR'
  }
]


export class RedPineTeam extends React.PureComponent {
  constructor(props) {
    super(props) 
	}

  render() {
    return (
      <App>
        <MyPageWrapper>
          <Title title="The hands and hearts behind RedPine" summary="We're working tirelessly to bring new possibilities to the music industry!" />
          {
            PROFILES.map(profile => <Profile 
                                      name={profile.name}
                                      bio={profile.bio}
                                      role={profile.role}
                                      image={profile.image}/>)
          }
        </MyPageWrapper>
      </App>
    )
  }

}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RedPineTeam)

const Profile = ({name,bio,role,image}) => (
  <ProfileWrap>
    <Picture inline
      image={image ? "/Assets/images/team/"+image : "/Assets/images/panel/indie.jpg"}
      height="22vmin"
      width="15vmin"/>
    <InfoWrap>
      <Name>{name}</Name>
      <br/>
      <Bio>{bio}</Bio>
    </InfoWrap>
    <Role>{role}</Role>
  </ProfileWrap>
)

const ProfileWrap = styled.div`
  display: inline-block;
  position: relative;
  padding: 2vmin;
  margin: 2vmin;
`
const Picture = styled(Image)`
  border-radius: 0.5vmin;
  background-size: cover;
`
const InfoWrap = styled.div`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 50vmin;
  padding: 0 2vmin 1vmin 2vmin;
`
const Name = styled.div`
  line-height: 3vmin;
  font-size: 2vmin;
  font-weight: bold;
`
const Bio = styled.div`
  font-size: 1.75vmin;
`
const Role = styled.div`
  position: absolute;
  top: 2vmin;
  right: 2vmin;
  background: ${RP_BLUE};
  font-size: 1.4vmin;
  font-weight: bold;
  color: #FFF;
  border-radius: 0.5vmin;
  padding: 0.4vmin 0.65vmin 0.4vmin 0.65vmin;
`