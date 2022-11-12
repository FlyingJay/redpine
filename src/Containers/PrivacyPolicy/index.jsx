import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { App } from 'Containers'
import { RP_RED, RP_BLACK, RP_FONT } from 'Components' //GLOBALS
import { RedLink } from 'Components' //LINK

import Scroll from 'react-scroll'
const scroll = Scroll.animateScroll


export class PrivacyPolicy extends React.PureComponent {

  scrollTo(div) {
    const offset = document.getElementById(div).offsetTop - 50
    scroll.scrollTo(offset, {
      smooth: true
    })
  }

  render() {
    return (
      <App>
        <Header />
        <br/>  
        <ContentWrap>
          <LeftSide>
            <Heading>
              Welcome to RedPine, a service provided by RedPine Music Inc.
              <br/>
              <div style={{fontWeight:400}}>(“RedPine”, “we” “our”, “us”, “Platform”)</div>
            </Heading>
            <Comment>
              By using the Website, the Apps or any of the Services, and in particular by registering a RedPine account, you are consenting to the use of your information in the manner set out in this Privacy Policy.
              <br/>
              <br/>
              Please take some time to read this Privacy Policy, and additionally, our <RedLink href={paths.termsOfUse()} target="_blank">Terms of Use</RedLink>, and make sure you are happy with what is expected of you as a user and what is expected from Us when it comes to handling your information.
              <br/>
              <br/>
              <b>If you do not agree to any of the provisions of this Privacy Policy or our <RedLink href={paths.termsOfUse()} target="_blank">Terms of Use</RedLink>, you should not use the Website, the Apps or any of the Services.</b> If you have any questions or concerns, you can contact us <RedLink href={paths.supportMail()}>here</RedLink>.
              <br/>
              <br/>
              Please note that this Privacy Policy only applies to the Website, the Apps and the Services (together, the “Platform”). When using the Platform, you may find links to other websites, apps and services, or tools that enable you to share information with other websites, apps and services. RedPine is not responsible for the privacy practices of these other websites, apps and services and we recommend that you review the privacy policies of each of these websites, apps or services before connecting to your RedPine account or sharing any personal data.
              <br/>
              <br/>
              Our Privacy Policy is divided into the following sections:
              <ol>
                <li>
                  <ListLink onClick={() => this.scrollTo('dataCollectStoreProtect')}>Data Collection, Storage and Protection:</ListLink> How your information is dealt with internally, throughout the Platform.
                </li>
                <li>
                  <ListLink onClick={() => this.scrollTo('infoDisclosure')}>Information Disclosure and Sharing:</ListLink> How your information is handled when it comes to sharing said information with parties external to the Platform.
                </li>
                <li>
                  <ListLink onClick={() => this.scrollTo('cookiesAndSimTech')}>Cookies and Similar Technology:</ListLink> How do we use cookies to tailor our Platform for you.
                </li>
                <li>
                  <ListLink onClick={() => this.scrollTo('changesToPrivacy')}>Changes to Privacy Policy:</ListLink> What happens in the case of changes to our Privacy Policy.
                </li>
                <li>
                  <ListLink onClick={() => this.scrollTo('lawsAndReg')}>Laws and Regulation:</ListLink> How are we in compliance with the Canadian Law.
                </li>
              </ol>
            </Comment>
          </LeftSide>
          <RightSide>
            <QuoteWrap>
              <i className="fa fa-quote-left" style={{fontSize:"5vmin",color:RP_RED}} />
              &nbsp;Please take some time to read this Privacy Policy, and additionally, our <RedLink href={paths.termsOfUse()} target="_blank">Terms of Use</RedLink>, and make sure you are happy with what is expected of you as a user and what is expected from Us when it comes to handling your information.
            </QuoteWrap>
          </RightSide>
        </ContentWrap>
        <ContentWrap id="dataCollectStoreProtect">
          <LeftSide>
            <Heading>
              Data Collection, Storage and Protection
            </Heading>
            <SubHeading>
              What information do we collect?
            </SubHeading>
            <Comment>
              We begin collecting information from you when you register on our site.
              <br/><br/>
              When ordering or registering on our site, as appropriate, you may be asked to provide certain personal information. This can include but is not limited to your, name, e—mail address, or mailing address. Additionally, when appropriate, you will be given the option to opt out of providing such information.
              <br/><br/>
              If you registered using Facebook, then you provide us the authorization necessary to access your Facebook profile and related information. This information can include but is not limited to your Facebook name, email, friends list, likes, preferences, groups and photos.
            </Comment>
            <SubHeading>
              What information is stored?
            </SubHeading>
            <Comment>
              We store all information collected on you, on our servers. The information stored on our servers includes but is not limited to the following:
              <ol>
                <li>Full Name</li>
                <li>Email</li>
                <li>Mailing Address</li>
                <li>Social Media</li>
              </ol>
              As of July 1st, 2017 the only aspect of your information which is not stored on our servers is your Credit Card information. This is to ensure that your transactions are kept safe and secured with third parties. In our case, all credit card related information is applicable to terms and guidelines of <RedLink href={paths.square()} target="_blank">Square</RedLink>; our payment processing partner.
            </Comment>
            <SubHeading>
              How do we protect your information?
            </SubHeading>
            <Comment>
              We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
              <br/><br/>
              We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems, and are required to keep the information confidential.
              <br/><br/>
              After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be kept on file. All credit card information is stored by our payment processing partner, <RedLink href={paths.square()} target="_blank">Square</RedLink>.
            </Comment>
          </LeftSide>
          <RightSide>
            <Quote text="We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information."/>
          </RightSide>
        </ContentWrap>
        <ContentWrap id="infoDisclosure">
          <LeftSide>
            <Heading>
              Information Disclosure and Sharing
            </Heading>
            <SubHeading>
              Do we disclose any information to outside parties?
            </SubHeading>
            <Comment>
              We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
              <br/><br/>
              There are circumstances where we may need to share some of the information we collect about you or which you provide to us for the purposes set out above - these circumstances are as follows:
              <ol>
                <li>
                  Other users: Any information in your public profile (other than your email address) will be accessible by other users of the Platform, who may view your profile information, create a show with you, add you to an act, or send you messages. If you decide to provide your personal information to other users of the Platform via your profile, or through other means, then you shall be solely responsible.
                </li>
                <li>
                  With your consent: We will disclose your information if you have explicitly agreed that we may do so. We will make this clear to you at the point at which we collect your information.
                </li>
                <li>
                  Service providers: We use certain reputable third parties, some of whom may be located outside of Canada, to provide us with certain specialized services related to the Platform. These third parties will have access to certain information about you, but only where this is necessary in order for those third parties to provide their services to us. Where we transfer personal data to these third parties, we ask and require these third parties to implement appropriate organizational and technical security measures to protect against unauthorized disclosure of personal data, and only to process personal data in accordance with our instructions and to the extent necessary to provide their services to us.
                </li>
                <li>
                  As aggregated data: We may aggregate your personal data with similar data relating to other users of the Platform in order to create statistical information regarding the Platform and its use, which we may then share with third parties or make publicly available. However, none of this information would include any email address or other contact information, or anything that could be used to identify you individually, either online or in real life.
                </li>
                <li>
                  If required by law: We will disclose your information if we believe in good faith that we are permitted or required to do so by law, including in response to a court order, subpoena or other legal demand or request.
                </li>
                <li>
                  To protect our interests: We may disclose your information if we feel this is necessary in order to protect or defend our legitimate rights and interests, or those of our users, employees, directors or shareholders, and/or to ensure the safety and security of the Platform and/or the RedPine community.
                </li>
                <li>
                  In the context of a business transfer: We may transfer your information to any person or company that acquires all or substantially all of the assets or business of RedPine, or on a merger of our business, or in the event of our insolvency.
                </li>
              </ol>
            </Comment>    
          </LeftSide>
          <RightSide>
             <Quote text="We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential."/>     
          </RightSide>
        </ContentWrap>
        <ContentWrap id="cookiesAndSimTech">
          <LeftSide>
            <Heading>
              Cookies and Similar Technology
            </Heading>
            <SubHeading>
              Do we use Cookies?
            </SubHeading>
            <Comment>
              This is common with most websites. As standard practice, we use cookies to help us improve the Website and the Apps and Services we provide. Cookies are small files that a site or its service provider transfers to your computers hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information. We use cookies to help us understand and save your preferences for future visits, keep track of advertisements and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.
            </Comment>  
          </LeftSide>
          <RightSide>
            <Quote text="We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business."/>      
          </RightSide>
        </ContentWrap>
        <ContentWrap id="changesToPrivacy">
          <LeftSide>
            <Heading>
              Changes to our Privacy Policy
            </Heading>
            <SubHeading>
              What happens when we change our Privacy Policy?
            </SubHeading>
            <Comment>
              We maintain the right to change our Privacy Policy or <RedLink href={paths.termsOfUse()} target="_blank">Terms of Use</RedLink> at any given point in time. The date of last modification is stated at the end of this Privacy Policy. It is your responsibility to check this page from time to time for updates.
              <br/><br/>
              When we make any updates to the Privacy Policy, we will highlight this fact on the Website. In addition, if you register an account and Privacy Policy is subsequently changed in any material respect (for example, for security, legal, or regulatory reasons), we will notify you in advance by sending a message to your RedPine account and/or an email to the email address that you have provided to us, and the revised Privacy Policy will become effective six (6) weeks after such notification. You will have no obligation to continue using the Platform following any such notification, but if you do not terminate your account as described in the Termination section below during such six (6) week period, your continued use of the Platform after the end of that six (6) week period will constitute your acceptance of the revised Privacy Policy.
            </Comment>  
          </LeftSide>
          <RightSide>
            <Quote text="When we make any updates to the Privacy Policy, we will highlight this fact on the Website. In addition, you will be notified via your RedPine account and/or an email to the email address that you provided to us."/>      
          </RightSide>
        </ContentWrap>
        <ContentWrap id="lawsAndReg">
          <LeftSide>
            <Heading>
              Laws and Regulations
            </Heading>
            <SubHeading>
              Third party links
            </SubHeading>
            <Comment>
              Occasionally, at our discretion, we may include or offer third party products or services on our website. These third party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about third parties.
            </Comment>  
            <SubHeading>
              Childrens Online Privacy Protection Act Compliance
            </SubHeading>
            <Comment>
              We are in compliance with the requirements of COPPA (Childrens Online Privacy Protection Act), we do not collect any information from anyone under 13 years of age. Our website, products and services are all directed to people who are at least 13 years old or older.
            </Comment>  
            <SubHeading>
              Online Privacy Policy Only
            </SubHeading>
            <Comment>
              This online privacy policy applies only to information collected through our website and not to information collected offline.
            </Comment>  
            <SubHeading>
              Terms and Conditions
            </SubHeading>
            <Comment>
              In order to use the contents of our Platform, you must agree with our <RedLink href={paths.termsOfUse()} target="_blank">Terms of Use</RedLink>.
            </Comment>  
            <SubHeading>Your Consent</SubHeading>
            <Comment>
              By using our site, you consent to our web site Privacy Policy and <RedLink href={paths.termsOfUse()} target="_blank">Terms of Use</RedLink>.
            </Comment>  
            <SubHeading>
              Contacting Us
            </SubHeading>
            <Comment>
              If you still want to learn more about the Privacy Policy, or if you have any questions/concerns, you can reach us via 
              &nbsp;<RedLink href={paths.redpineFacebook()} target="_blank">facebook</RedLink>, 
              &nbsp;<RedLink href={paths.redpineTwitter()} target="_blank">twitter</RedLink> or 
              &nbsp;<RedLink href={paths.supportMail()} target="_blank">email</RedLink>.
            </Comment>             
          </LeftSide>
          <RightSide>
             <QuoteWrap>
              <i className="fa fa-quote-left" style={{fontSize:"5vmin",color:RP_RED}} />
              &nbsp;If you still want to learn more about the Privacy Policy, or if you have any questions/concerns, you can reach us via 
              &nbsp;<RedLink href={paths.redpineFacebook()} target="_blank">facebook</RedLink>, 
              &nbsp;<RedLink href={paths.redpineTwitter()} target="_blank">twitter</RedLink> or 
              &nbsp;<RedLink href={paths.supportMail()} target="_blank">email</RedLink>.
             </QuoteWrap>
          </RightSide>
        </ContentWrap>
        <ContentWrap>
          <LeftSide>
            <Comment>
              <b style={{fontWeight:600}}>Date of last modification:</b> July 1st, 2017.
            </Comment>
            <Comment>
              <b style={{fontWeight:600}}>RedPine Music Inc.</b>
              <br/>
              55 Scarborough Heights Blvd
              <br/>
              Toronto, Ontario. M1M 2V5
              <br/>
              Canada
            </Comment>
          </LeftSide>
          <RightSide />
        </ContentWrap>
      </App>
    )
  }
}

export default PrivacyPolicy

const Header = () =>
(
  <HeaderWrap>
    <FancyOverlay>
      <HeaderTextWrap>
        <HeaderText style={{fontSize:"5vmin"}}>
          Everything you need to know about your privacy
        </HeaderText>
        <HeaderText style={{fontSize:"2vmin"}}>
          Get familiar with how we collect and use your information
        </HeaderText>
        <br/>
        <br/>
        <i className="fa fa-angle-double-down" style={{fontSize:"3vmin",color:"#FFF"}}/>
      </HeaderTextWrap>
    </FancyOverlay>
  </HeaderWrap>
);

const Quote = ({text}) => 
(
  <QuoteWrap>
    <i className="fa fa-quote-left" style={{fontSize:"5vmin",color:RP_RED}} />
    &nbsp;{text}
  </QuoteWrap>
);

const HeaderWrap = styled.div`
  display: block;
  position: relative;
  top: 0;
  width: 100%;
  height: 40vmin;
  background: 0 -250px #354f88 url('Assets/images/background/mainBG12.jpg');
  background-size: cover;
`
const FancyOverlay = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: 100%;
  background: -webkit-linear-gradient(30deg, rgba(53, 46, 184, .90) 0%, rgba(233, 81, 249, .90) 70%, rgba(248, 77, 237, .90) 100%);
  background: linear-gradient(30deg, rgba(53, 46, 184, .90) 0%, rgba(233, 81, 249, .90) 70%, rgba(248, 77, 237, .90) 100%);
`
const HeaderTextWrap = styled.div`
  display: block;
  position: absolute;
  width: 80vw;
  height: 15vmin;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`
const HeaderText = styled.div`
  display: block;
  position: relative;
  width: auto;
  margin: 0 auto;
  height: auto;
  color: #FFF;
  font-family: ${RP_FONT};
  font-weight: 100;
  text-align: center;
`
const ContentWrap = styled.div`
  display: block;
  position: relative;
  top: 0;
  width: 80vw;
  height: auto;
  margin: 0 auto;
  padding: 2vmin 2vmin;
  background: #FFF;
  text-align: center;
`
const LeftSide = styled.div`
  display: inline-block;
  position: relative;
  width: 45vw;
  padding-right: 5vmin;
  height: auto;
  margin: 0 auto;
  text-align: left;
  vertical-align: top;

  @media (max-width: 1024px) and (orientation: portrait) {
    display: block;
    padding-right: 0vmin;
    width: 75vw;
`
const RightSide = styled.div`
  display: inline-block;
  position: relative;
  width: 30vw;
  height: auto;
  margin: 0 auto;
  text-align: left;
  vertical-align: top;

  @media (max-width: 1024px) and (orientation: portrait) {
    display: block;
    width: 75vw;
`
const Heading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 1vmin;
  color: ${RP_RED};
  font-family: ${RP_FONT};
  font-size: 2.1vmin;
  font-weight: bold;
`
const SubHeading = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 1vmin;
  color: ${RP_BLACK};
  font-family: ${RP_FONT};
  font-size: 1.9vmin;
  font-weight: 600;  
`
const Comment = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 1vmin;
  color: ${RP_BLACK};
  font-family: ${RP_FONT};
  font-size: 1.8vmin;
  font-weight: 300;  
`
const QuoteWrap = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: auto;
  padding: 2vmin 1vmin;
  font-family: ${RP_FONT};
  font-size: 2vmin;
  color: ${RP_BLACK};
  font-weight: bold;
`
const ListLink = styled.span`
  cursor: pointer;
  color: ${RP_RED};
  font-weight: 400;
`