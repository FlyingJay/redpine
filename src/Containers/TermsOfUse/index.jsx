import React from 'react'
import styled from 'styled-components'
import { App } from 'Containers'
import { paths } from 'globals'
import { RP_RED, RP_BLACK, RP_FONT } from 'Components' //GLOBALS
import { RedLink } from 'Components' //LINK

import Scroll from 'react-scroll'
const scroll = Scroll.animateScroll


export class TermsOfUse extends React.PureComponent {
  scrollTo(id) {
    const offset = document.getElementById(id).offsetTop - 50
    scroll.scrollTo(offset, {
      smooth: true
    })
  }
  render() {
    return (
      <App>
        <Header />
        <br/>
        <Introduction scrollTo={this.scrollTo} />
        <Acceptance />
        <Changes />
        <Description />
        <YourAccount />
        <Termination />
        <UseOfPlatform />
        <Content />
        <Liabilities />
        <Disclaimers />
        <ExtraInfo />
      </App>
    )
  }
}

export default TermsOfUse

const Header = () =>
(
  <HeaderWrap>
    <FancyOverlay>
      <HeaderTextWrap>
        <HeaderText style={{fontSize:"5vmin"}}>
          Everything you need to know about our Terms of Use
        </HeaderText>
        <HeaderText style={{fontSize:"2vmin"}}>
          Get familiar with your responsibilities as a user and how you can fulfill them
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

const Introduction = ({scrollTo}) =>
(
  <ContentWrap>
    <LeftSide>
      <Heading>
        Welcome to RedPine, a service provided by RedPine Music Inc.
        <br/>
        <div style={{fontWeight:400}}>(“RedPine”, “we” “our”, “us”, “Platform”)</div>
      </Heading>
      <Comment>
        By using the Website, the Apps or any of the Services, and in particular by registering a RedPine account, you are consenting to the use of our Platform in the manner set out in this Terms of Use. 
        <br/>
        <br/>
        Please take some time to read this Terms of Use, and additionally, our <RedLink href={paths.privacyPolicy()} target="_blank">Privacy Policy</RedLink>, and make sure you are happy with what is expected of you as a user and what is expected from Us when it comes to handling your information.
        <br/>
        <br/>
        <b style={{fontWeight:"bold"}}>If you do not agree to any of the provisions of this Terms Of Use or our <RedLink href={paths.privacyPolicy()} target="_blank" style={{fontWeight:"bold"}}>Privacy Policy</RedLink>, you should not use the Website, the Apps or any of the Services.</b> If you have any questions or concerns, you can contact us <RedLink href={paths.supportMail()}>here</RedLink>.
        <br/>
        <br/>
        Please note that this Terms of Use only applies to the Website, the Apps and the Services (together, the “Platform”). When using the Platform, you may find links to other websites, apps and services, or tools that enable you to share information with other websites, apps and services. RedPine is not responsible for providing guidelines to practices of these other websites, apps and services and we recommend that you review the Terms of Use of each of these websites, apps or services before connecting to your RedPine account or sharing any personal data.
        <br/>
        <br/>
        Our Terms of Use are divided into the following sections:
        <ol>
          <li>
            <ListLink onClick={() => scrollTo('acceptance')}>Acceptance of Terms of Use:</ListLink> By using RedPine you accept our Terms of Use and <RedLink href={paths.privacyPolicy()} target="_blank">Privacy Policy</RedLink>, and agree to abide by them.
          </li>
          <li>
            <ListLink onClick={() => scrollTo('changes')}>Changes to the Terms of Use:</ListLink> What happens when we make changes to our Terms of Use.
          </li>
          <li>
            <ListLink onClick={() => scrollTo('description')}>Description of the Platform:</ListLink> What is the Platform comprised of and what are the limitations, if any.
          </li>
          <li>
            <ListLink onClick={() => scrollTo('yourAccount')}>Your account on RedPine:</ListLink> This section explains your responsibilities should you choose to register for a RedPine account.
          </li>
          <li>
            <ListLink onClick={() => scrollTo('termination')}>Account Termination:</ListLink> This section explains how you can terminate your RedPine account, and the grounds on which we can terminate your use of RedPine.
          </li>
          <li>
            <ListLink onClick={() => scrollTo('useOfPlatform')}>Use of the Platform by You:</ListLink> This section sets out your right to use the Platform, and the conditions that apply to your use of the Platform.
          </li>
          <li>
            <ListLink onClick={() => scrollTo('content')}>Your Content:</ListLink> How do we handle your content.
          </li>
          <li>
            <ListLink onClick={() => scrollTo('liability')}>Liability of Content:</ListLink> Responsibilities when it comes to all content present on the Platform.
          </li>
          <li>
            <ListLink onClick={() => scrollTo('disclaimers')}>Disclaimers and Disclosures:</ListLink> Important disclaimers, disclosures, remarks and reminders.
          </li>
        </ol>
      </Comment>
    </LeftSide>
    <RightSide>
      <QuoteWrap>
        <i className="fa fa-quote-left" style={{fontSize:"5vmin",color:RP_RED}} />
        &nbsp;Please take some time to read this Terms of Use, and additionally, our <RedLink href={paths.privacyPolicy()} target="_blank">Privacy Policy</RedLink>, and make sure you are happy with what is expected of you as a user and what is expected from Us when it comes to handling your information.
      </QuoteWrap>
    </RightSide>
  </ContentWrap>
);

const Acceptance = () =>
(
  <ContentWrap id="acceptance">
    <LeftSide>
      <Heading>
        Acceptance of the Terms of Use
      </Heading>
      <SubHeading>
        You must accept our Terms of Use in order to use the RedPine Platform
      </SubHeading>
      <Comment>
        Please read these Terms of Use along with our <RedLink href={paths.privacyPolicy()} target="_blank">Privacy Policy</RedLink> very carefully. If you do not agree to any of the provisions set out in these documents, you should not use the Website, Apps or any of the Services. By accessing or using the Platform, registering an account, or by viewing, accessing, uploading or downloading any information or content from or to the Platform, you represent and warrant that you have read and understood the Terms of Use and <RedLink href={paths.privacyPolicy()} target="_blank">Privacy Policy</RedLink>, and that you will abide by them, and that you are either 18 years of age or more, or the applicable age of majority in your jurisdiction, or if you are under 18 years of age or the age of majority in your jurisdiction, you are 13 years of age or more and have your parent(s)’ or legal guardian(s)’ permission to use the Platform.
      </Comment>  
    </LeftSide>
    <RightSide>
      <QuoteWrap>
        <i className="fa fa-quote-left" style={{fontSize:"5vmin",color:RP_RED}} />
        &nbsp;Please take some time to read this Terms of Use, and additionally, our <RedLink href={paths.privacyPolicy()} target="_blank">Privacy Policy</RedLink>, and make sure you are happy with what is expected of you as a user and what is expected from Us when it comes to handling your information.
      </QuoteWrap>    
    </RightSide>
  </ContentWrap>
);

const Changes = () =>
(
  <ContentWrap id="changes">
    <LeftSide>
      <Heading>
        Changes to the Terms of Use
      </Heading>
      <SubHeading>
        What happens in the case of changes to the Terms of Use?
      </SubHeading>
      <Comment>
        We reserve the right to change, alter, replace or otherwise modify these Terms of Use or <RedLink href={paths.privacyPolicy()} target="_blank">Privacy Policy</RedLink> at any given point in time. The date of last modification is stated at the end of these Terms of Use. It is your responsibility to check this page from time to time for updates. 
        <br/>
        <br/>
        When we make any updates to these Terms of Use, we will highlight this fact on the Website. In addition, if you register an account and these Terms of Use are subsequently changed in any material respect (for example, for security, legal, or regulatory reasons), we will notify you in advance by sending a message to your RedPine account and/or an email to the email address that you have provided to us, and the revised Terms of Use will become effective six (6) weeks after such notification. You will have no obligation to continue using the Platform following any such notification, but if you do not terminate your account as described in the Termination section below during such six (6) week period, your continued use of the Platform after the end of that six (6) week period will constitute your acceptance of the revised Terms of Use.
      </Comment>  
    </LeftSide>
    <RightSide>
      <Quote text="When we make any updates to the Terms of Use, we will highlight this fact on the Website. In addition, you will be notified via your RedPine account and/or an email to the email address that you provided to us."/>      
    </RightSide>
  </ContentWrap>
);

const Description = () =>
(
  <ContentWrap id="description">
    <LeftSide>
      <Heading>
        Description of the Platform
      </Heading>
      <SubHeading>
        What is the Platform comprised of?
      </SubHeading>
      <Comment>
        The Platform is a hosting service. Registered users of the Platform may submit, upload and post audio, text, photos, pictures, graphics, comments, and other content, data or information (“Content”), which will be stored by RedPine at the direction of such registered users, and may be shared and distributed by such registered users, and other users of the Platform, using the tools and features provided as part of the Platform and accessible via the Website, Apps and elsewhere. The Platform also enables registered users to interact with one another and to contribute to discussions, and enables any user of the Website, Apps or certain Services (who may or may not be registered users of the Platform) to view, listen to and share Content uploaded and made available by registered users. 
        <br/>
        <br/>
        We may, from time to time, release new tools and resources on the Website, release new versions of our Apps, or introduce other services and/or features for the Platform. Any new services and features will be subject to these Terms of Use as well as any additional terms of use that we may release for those specific services or features.
      </Comment>  
    </LeftSide>
    <RightSide>
      <Quote text="We may, from time to time, release new tools and resources on the Website, release new versions of our Apps, or introduce other services and/or features for the Platform. Any new services and features will be subject to these Terms of Use as well as any additional terms of use that we may release for those specific services or features."/>      
    </RightSide>
  </ContentWrap>
);

const YourAccount = () =>
(
  <ContentWrap id="yourAccount">
    <LeftSide>
      <Heading>
        Your Account
      </Heading>  
      <SubHeading>
        Your responsibilities as an owner of a RedPine account
      </SubHeading>
      <Comment>
        You are not obliged to register to use the Platform. However, access to the Apps and certain Services is only available to registered users. As an example, the Platform, RedPine and its components, enable registered users, who upload and make available their Content to other users, to receive instant feedback on their campaigns, concerts, comments and/or venues. 
        <br/>
        <br/>
        When you register to use the Platform, you will provide us with your email address, and will choose a username and password for your account. You must ensure that the email address that you provide is, and remains, valid. Your email address and any other information you chose to provide about yourself will be treated in accordance with our Privacy Policy. In addition, the provided email address will be used to maintain communication with you in case of changes to any of the content to the Platform. 
        <br/>
        <br/>
        You are solely responsible for maintaining the confidentiality and security of your username and password, and you will remain responsible for all use of your username and password, and all activity emanating from your account, whether or not such activity was authorized by you. 
        <br/>
        <br/>
        If your username or password is lost or stolen, or if you believe that your account has been accessed by unauthorized third parties, you are advised to notify RedPine in writing, and should change your password via the <RedLink href={paths.forgotPassword()} target="_blank">Forgot Password</RedLink> form at the earliest possible opportunity. 
        <br/>
        <br/>
        We reserve the right to disallow, cancel, remove or reassign certain usernames and permalinks in appropriate circumstances, as determined by us in our sole discretion, and may, with or without prior notice, suspend or terminate your account if activities occur on that account which, in our sole discretion, would or might constitute a violation of these Terms of Use or an infringement or violation of the rights of any third party, or of any applicable laws or regulations. 
      </Comment>  
    </LeftSide>
    <RightSide>
      <Quote text="You are solely responsible for maintaining the confidentiality and security of your username and password, and you will remain responsible for all use of your username and password, and all activity emanating from your account, whether or not such activity was authorized by you."/>      
    </RightSide>
  </ContentWrap>
);

const Termination = () =>
(
  <ContentWrap id="termination">
    <LeftSide>
      <Heading>
        Account Termination
      </Heading>
      <SubHeading>
        RedPine and your right to terminate your account and services
      </SubHeading>
      <Comment>
        You may terminate this Agreement at any time by sending notice in writing to RedPIne at 55 Scarborough Heights Blvd. Toronto, Ontario. M1M 2V5. Canada, confirming such termination, by removing all of Your Content from your account, or by deleting your account and thereafter by ceasing to use the Platform. If you have a Subscription, and terminate this Agreement before the end of such Subscription, we are unable to offer any refund for any unexpired period of your Subscription. 
        <br/>
        <br/>
        RedPine may suspend your access to the Platform and/or terminate this Agreement at any time if (i) you are deemed to be in repeat violations of our Terms of Use,(ii) you are in breach of any of local laws, regulations or guidelines, including without limitation, the provisions mentioned in these Terms of Use, (iii) RedPine elects at its discretion to cease providing access to the Platform in the jurisdiction where you reside or from where you are attempting to access the Platform, or (iv) in other reasonable circumstances as determined by RedPine at its discretion. If you have a Subscription and your account is suspended or terminated by RedPine pursuant to (i) or (ii) above, you will not be entitled to any refund for any unexpired period of your subscription. If your account is terminated pursuant to (iii) or (iv), refunds may be payable at the reasonable discretion of RedPine. 
        <br/>
        <br/>
        Once your account has been terminated, any and all Content residing in your account, or pertaining to activity from your account (for example, data relating to a concert or venue created by you the user of the Platform), will be irretrievably deleted by RedPine, except to the extent that we are obliged or permitted to retain such content, data or information for a certain period of time in accordance with applicable laws and regulations and/or to protect our legitimate business interests. You are advised to save or back up any material that you have uploaded to your account before terminating your account, as RedPine assumes no liability for any material that is irretrievably deleted following any termination of your account. RedPine is not able to provide you with any .csv or other similar file(s) of data relating to activity associated with your account, whether before or after termination or cancellation. This data is provided and is accessible only for viewing via your account page on the Website for as long as your account is active.
        <br/>
        <br/>
        If you access the Platform via any of our Apps or via any third party app connected to your account, deleting that app will not delete your account. If you wish to delete your account, you will need to do so via writing to RedPIne at 55 Scarborough Heights Blvd. Toronto, Ontario. M1M 2V5. Canada. The provisions of these Terms of Use that are intended by their nature to survive the termination or cancellation of this Agreement will survive the termination of this Agreement, including, but not limited to, those Sections entitled Your RedPine Account, Your Content, Liability for Content, Disclaimers, Entire Agreement, and Applicable Law and Jurisdiction, respectively.
      </Comment>  
    </LeftSide>
    <RightSide>
      <Quote text="Once your account has been terminated, any and all Content residing in your account, or pertaining to activity from your account (for example, data relating to a concert or venue created by you the user of the Platform), will be irretrievably deleted by RedPine, except to the extent that we are obliged or permitted to retain such content, data or information for a certain period of time in accordance with applicable laws and regulations and/or to protect our legitimate business interests."/>      
      <Quote text="If you access the Platform via any of our Apps or via any third party app connected to your account, deleting that app will not delete your account." />
    </RightSide>
  </ContentWrap>
);

const UseOfPlatform = () =>
(
  <ContentWrap id="useOfPlatform">
    <LeftSide>
      <Heading>
        Use of the Platform by You
      </Heading>
      <SubHeading>
        Your right to use the Platform, and all conditions and limitations, if any
      </SubHeading>
      <Comment>
        Subject to your strict compliance with these Terms of Use at any and all times during your use of the Platform, RedPine grants you a limited, personal, non-exclusive, revocable, non-assignable and non-transferable right and license to use the Platform in order to view Content uploaded and posted to the Website, to view and pledge to campaigns, attend concerts at venues, and to download tickets using the features of the Platform where the appropriate functionality has been enabled by the user who uploaded the relevant Content (the “Uploader”), and subject to the territorial availability of that feature and Content. 
        <br/>
        <br/>
        In addition, if you register to use the Platform, and subject to your strict compliance with these Terms of Use at any and all times during your use of the Platform, RedPine grants you a limited, personal, non-exclusive, revocable, non-assignable and non-transferable right and license to:
        <br/>
        <ol>
          <li>
            submit, upload or post Content to and keep such Content available on the Platform strictly as permitted in accordance with these Terms of Use and any other applicable terms posted on the Website from time to time.
          </li>
          <li>
            participate in the community areas and communicate with other members of the RedPine community strictly in accordance with these Terms of Use.
          </li>
          <li>
            use Apps and other Services provided as part of the Platform strictly as permitted in accordance with these Terms of Use and any other terms applicable to those Apps or Services from time to time.
            <br/>
            <br/>
            The above licenses are conditional upon your strict compliance with these Terms of Use at any and all times during your use of the Platform, including, without limitation, the following:
            <br/>
            <br/>
            (i) You must not copy, rip or capture, or attempt to copy, rip or capture, any Content from the Platform or any part of the Platform, other than by means of download in circumstances where the relevant download may be declared appropriate.
            <br/>
            <br/>
            (ii) You must not adapt, copy, republish, make available or otherwise communicate to the public, display, perform, transfer, share, distribute or otherwise use or exploit any Content on or from the Platform at any and all times, except (i) where such Content is Your Content at any and all times during your use of the applicable Content, or (ii) as permitted under these Terms of Use, and within the parameters set by the Uploader (for example, downloading of tickets to a concert).
            <br/>
            <br/>
            (iii) You must not use any Content (other than Your Content) in any way that is designed to create a separate content service or that replicates any part of the Platform offering. 
            <br/>
            <br/>
            (iv) You must not employ scraping or similar techniques to aggregate, repurpose, republish or otherwise make use of any Content.
            <br/>
            <br/>
            (v) You must not employ any techniques or make use of any services, automated or otherwise, designed to misrepresent the popularity of Your Content on the Platform, or to misrepresent your activity on the Platform, including without limitation by the use of bots, botnets, scripts, apps, plugins, extensions or other automated means to register accounts, log in, create campaigns, create venues, follow or unfollow other users, send messages, post comments, or otherwise to act on your behalf, particularly where such activity occurs in a multiple or repetitive fashion. You must not offer or promote the availability of any such techniques or services to any other users of the Platform.
            <br/>
            <br/>
            (vi) You must not alter or remove, or attempt to alter or remove, any trademark, copyright or other proprietary or legal notices contained in, or appearing on, the Platform or any Content appearing on the Platform (other than Your Content).
            <br/>
            <br/>
            (vii) You must not, and must not permit any third party to, copy or adapt the object code of the Website or any of the Apps or Services, or reverse engineer, reverse assemble, decompile, modify or attempt to discover any source or object code of any part of the Platform, or circumvent or attempt to circumvent or copy any copy protection mechanism or territorial restrictions or access any rights management information pertaining to Content other than Your Content.
            <br/>
            <br/>
            (viii) You must not use the Platform to upload, post, store, transmit, display, copy, distribute, promote, make available, continue to make available or otherwise communicate to the public:
            <br/>
            <br/>
            any Content that is abusive, libellous, defamatory, pornographic or obscene, that promotes or incites violence, terrorism, illegal acts, or hatred on the grounds of race, ethnicity, cultural identity, religious belief, disability, gender, identity or sexual orientation, or is otherwise objectionable in RedPine's reasonable discretion;
            any information, Content or other material that violates, plagiarizes, misappropriates or infringes the rights of third parties including, without limitation, copyright, trademark rights, rights of privacy or publicity, confidential information or any other right; or
            <br/>
            <br/>
            any Content that violates, breaches or is contrary to any law, rule, regulation, court order or is otherwise is illegal or unlawful in RedPine's reasonable opinion;
            any material of any kind that contains any virus, Trojan horse, spyware, adware, malware, bot, time bomb, worm, or other harmful or malicious component, which or might overburden, impair or disrupt the Platform or servers or networks forming part of, or connected to, the Platform, or which does or might restrict or inhibit any other user's use and enjoyment of the Platform; or
            <br/>
            <br/>
            any unsolicited or unauthorized advertising, promotional messages, spam or any other form of solicitation.
            <br/>
            <br/>
            (ix) You must not commit or engage in, or encourage, induce, solicit or promote, any conduct that would constitute a criminal offense, give rise to civil liability or otherwise violate any law or regulation.
          </li>
          <li>
            You must not rent, sell or lease access to the Platform, or any Content on the Platform, although this shall not prevent you from including links from Your Content to any legitimate online download store from where any item of Your Content may be purchased.
          </li>
          <li>
            You must not deliberately impersonate any person or entity or otherwise misrepresent your affiliation with a person or entity, for example, by registering an account in the name of another person or company, or sending messages or making comments using the name of another person.
          </li>
          <li>
            You must not stalk, exploit, threaten, abuse or otherwise harass another user, or any RedPine employee.
          </li>
          <li>
            You must not use or attempt to use another person's account, password, or other information, unless you have express permission from that other person.
          </li>
          <li>
            You must not sell or transfer, or offer to sell or transfer, any RedPine account to any third party without the prior written approval of RedPine.
          </li>
          <li>
            You must not collect or attempt to collect personal data, or any other kind of information about other users, including without limitation, through spidering or any form of scraping.
          </li>
          <li>
            You must not violate, circumvent or attempt to violate or circumvent any data security measures employed by RedPine or any Uploader; access or attempt to access data or materials which are not intended for your use; log into, or attempt to log into, a server or account which you are not authorized to access; attempt to scan or test the vulnerability of RedPine's servers, system or network or attempt to breach RedPine's data security or authentication procedures; attempt to interfere with the Website or the Services by any means including, without limitation, hacking RedPine's servers or systems, submitting a virus, overloading, mail-bombing or crashing. Without limitation to any other rights or remedies of RedPine under these Terms of Use, RedPine reserves the right to investigate any situation that appears to involve any of the above, and may report such matters to, and co-operate with, appropriate law enforcement authorities in prosecuting any users who have participated in any such violations.
          </li>
        </ol>
        <br/>
        You agree to comply with the above conditions at any and all times during your use of the Platform, and acknowledge and agree that RedPine has the right, in its sole discretion, to terminate your account or take such other action as we see fit if you breach any of the above conditions or any of the other terms of these Terms of Use. This may include taking court action and/or reporting offending users to the relevant authorities.ty for Content, Disclaimers, Entire Agreement, and Applicable Law and Jurisdiction, respectively.
      </Comment>  
    </LeftSide>
    <RightSide>
      <Quote text="If you register to use the Platform, and subject to your strict compliance with these Terms of Use at any and all times during your use of the Platform, RedPine grants you a limited, personal, non-exclusive, revocable, non-assignable and non-transferable right and license to the items listed in this section."/>      
      <Quote text="You agree to comply with the conditions listed in this section at any and all times during your use of the Platform, and acknowledge and agree that RedPine has the right, in its sole discretion, to terminate your account or take such other action as we see fit if you breach any of the above conditions or any of the other terms of these Terms of Use. This may include taking court action and/or reporting offending users to the relevant authorities.ty for Content, Disclaimers, Entire Agreement, and Applicable Law and Jurisdiction, respectively."/> 
    </RightSide>
  </ContentWrap>
);

const Content = () =>
(
  <ContentWrap id="content">
    <LeftSide>
      <Heading>
        Your Content
      </Heading>
      <SubHeading>
        How do we handle your content.
      </SubHeading>
      <Comment>
        Any and all audio, text, photos, pictures, graphics, comments, and other content, data or information that you upload, store, transmit, submit, exchange or make available to or via the Platform (hereinafter "Your Content") is generated, owned and controlled solely by you, and not by RedPine.
        <br/>
        <br/>
        RedPine does not claim any ownership rights in Your Content, and you hereby expressly acknowledge and agree that Your Content remains your sole responsibility. 
        <br/>
        <br/>
        Without prejudice to the conditions set forth in Your Use of the Platform you must not upload, store, distribute, send, transmit, display, perform, make available, continue to make available or otherwise communicate to the public any Content to which you do not hold the necessary rights. In particular, any unauthorized use of copyright protected material within Your Content (including by way of reproduction, distribution, modification, adaptation, public display, public performance, preparation of derivative works, making available or otherwise communicating to the public via the Platform), independent of wheteher it is or becomes unauthorized at a later point, may constitute an infringement of third party rights and is strictly prohibited. Any such infringements may result in termination of your access to the Platform as described in the Repeat Offenders, and may also result in civil litigation or criminal prosecution by or on behalf of the relevant rightsholder. 
        <br/>
        <br/>
        We may, from time to time, invite or provide you with means to provide feedback regarding the Platform, and in such circumstances, any feedback you provide will be deemed non-confidential and RedPine shall have the right, but not the obligation, to use such feedback on an unrestricted basis.
      </Comment>  
    </LeftSide>
    <RightSide>
      <Quote text='Any and all audio, text, photos, pictures, graphics, comments, and other content, data or information that you upload, store, transmit, submit, exchange or make available to or via the Platform (hereinafter "Your Content") is generated, owned and controlled solely by you, and not by RedPine... We may, from time to time, invite or provide you with means to provide feedback regarding the Platform, and in such circumstances, any feedback you provide will be deemed non-confidential and RedPine shall have the right, but not the obligation, to use such feedback on an unrestricted basis.'/>      
    </RightSide>
  </ContentWrap>
);

const Liabilities = () =>
(
  <ContentWrap id="liabilities">
    <LeftSide>
      <Heading>
        Liability of Content
      </Heading>
      <SubHeading>
        Your responsibilities as an owner of a RedPine account
      </SubHeading>
      <Comment>
        You hereby acknowledge and agree that RedPine (i) stores Content and other information at the direction, request and with the authorization of its users, (ii) acts merely as a passive conduit and/or host for the uploading, storage and distribution of such Content, and (iii) plays no active role and gives no assistance in the presentation or use of the Content. You are solely responsible for all of Your Content that you upload, post or distribute to, on or through the Platform, and to the extent permissible by law, RedPine excludes all liability with respect to all Content (including Your Content) and the activities of its users with respect thereto. 
        <br/>
        <br/>
        You hereby acknowledge and agree that RedPine cannot and does not review the Content created or uploaded by its users, and neither RedPine nor its subsidiaries, affiliates, successors, assigns, employees, agents, directors, officers and shareholders has any obligation, and may, but does not undertake or assume any duty to, monitor the Platform for Content that is inappropriate, that does or might infringe any third party rights, or has otherwise been uploaded in breach of these Terms of Use or applicable law. 
RedPine and its subsidiaries, affiliates, successors, assigns, employees, agents, directors, officers and shareholders hereby exclude, to the fullest extent permitted by law, any and all liability which may arise from any Content uploaded to the Platform by users, including, but not limited to, any claims for infringement of intellectual property rights, rights of privacy or publicity rights, any claims relating to publication of abusive, defamatory, pornographic, or obscene material, or any claims relating to the completeness, accuracy, currency or reliability of any information provided by users of the Platform. By using the Platform, you irrevocably waive the right to assert any claim with respect to any of the foregoing against RedPine or any of its subsidiaries, affiliates, successors, assigns, employees, agents, directors, officers or shareholders.
      </Comment>  
    </LeftSide>
    <RightSide>
      <Quote text="You hereby acknowledge and agree that RedPine cannot and does not review the Content created or uploaded by its users, and neither RedPine nor its subsidiaries, affiliates, successors, assigns, employees, agents, directors, officers and shareholders has any obligation, and may, but does not undertake or assume any duty to, monitor the Platform for Content that is inappropriate, that does or might infringe any third party rights, or has otherwise been uploaded in breach of these Terms of Use or applicable law."/>      
    </RightSide>
  </ContentWrap>
);

const Disclaimers = () =>
(
  <ContentWrap id="disclaimers">
    <LeftSide>
      <Heading>
        Disclaimers and Disclosures
      </Heading>
      <SubHeading>
        Disclaimer
      </SubHeading>
      <Comment>
        THE PLATFORM, INCLUDING, WITHOUT LIMITATION, THE WEBSITE, THE APPS AND ALL CONTENT AND SERVICES ACCESSED THROUGH OR VIA THE WEBSITE, THE APPS, THE SERVICES OR OTHERWISE, ARE PROVIDED “AS IS”, “AS AVAILABLE”, AND “WITH ALL FAULTS”. 
        <br/>
        <br/>
        WHILST REDPINE USES REASONABLE ENDEAVORS TO CORRECT ANY ERRORS OR OMISSIONS IN THE PLATFORM AS SOON AS PRACTICABLE ONCE THEY HAVE BEEN BROUGHT TO REDPINE'S ATTENTION, REDPINE MAKES NO PROMISES, GUARANTEES, REPRESENTATIONS OR WARRANTIES OF ANY KIND WHATSOEVER (EXPRESS OR IMPLIED) REGARDING THE WEBSITE, THE APPS, THE SERVICES OR ANY PART OR PARTS THEREOF, ANY CONTENT, OR ANY LINKED SERVICES OR OTHER EXTERNAL SERVICES. REDPINE DOES NOT WARRANT THAT YOUR USE OF THE PLATFORM WILL BE UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE PLATFORM OR ANY PART OR PARTS THEREOF, THE CONTENT, OR THE SERVERS ON WHICH THE PLATFORM OPERATES ARE OR WILL BE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. REDPINE DOES NOT WARRANT THAT ANY TRANSMISSION OF CONTENT UPLOADED TO THE PLATFORM WILL BE SECURE OR THAT ANY ELEMENTS OF THE PLATFORM DESIGNED TO PREVENT UNAUTHORIZED ACCESS, SHARING OR DOWNLOAD OF CONTENT WILL BE EFFECTIVE IN ANY AND ALL CASES, AND DOES NOT WARRANT THAT YOUR USE OF THE PLATFORM IS LAWFUL IN ANY PARTICULAR JURISDICTION.
        <br/>
        <br/>
        REDPINE AND ITS SUBSIDIARIES, AFFILIATES, SUCCESSORS, AND ASSIGNS, AND THEIR RESPECTIVE EMPLOYEES, AGENTS, DIRECTORS, OFFICERS AND SHAREHOLDERS, SPECIFICALLY DISCLAIM ALL OF THE FOREGOING WARRANTIES AND ANY OTHER WARRANTIES NOT EXPRESSLY SET OUT HEREIN TO THE FULLEST EXTENT PERMITTED BY LAW, INCLUDING WITHOUT LIMITATION ANY EXPRESS OR IMPLIED WARRANTIES REGARDING NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
        <br/>
        <br/>
        WHERE THE LAW OF ANY JURISDICTION LIMITS OR PROHIBITS THE DISCLAIMER OF IMPLIED OR OTHER WARRANTIES AS SET OUT ABOVE, THE ABOVE DISCLAIMERS SHALL NOT APPLY TO THE EXTENT THAT THE LAW OF SUCH JURISDICTION APPLIES TO THIS AGREEMENT. 
      </Comment>  
      <SubHeading>
        Disclosures
      </SubHeading>
      <Comment>
        The services hereunder are offered by RedPine Music Inc., a company incorporated under the laws of Canada and with its main place of business at 55 Scarborough Heights Blvd. Toronto, Ontario. M1M 2V5. Canada. You may contact us by sending correspondence to the foregoing address or you can reach us via 
        &nbsp;<RedLink href={paths.redpineFacebook()} target="_blank">facebook</RedLink>, 
        &nbsp;<RedLink href={paths.redpineTwitter()} target="_blank">twitter</RedLink> or 
        &nbsp;<RedLink href={paths.supportMail()} target="_blank">email</RedLink>.
      </Comment>
    </LeftSide>
    <RightSide />
  </ContentWrap>
);

const ExtraInfo = () =>
(
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
);

const HeaderWrap = styled.div`
  display: block;
  position: relative;
  top: 0;
  width: 100%;
  height: 40vmin;
  background: 0 -250px #354f88 url('Assets/images/background/mainBG13.jpg');
  background-size: cover;
`
const FancyOverlay = styled.div`
  display: block;
  position: relative;
  width: auto;
  height: 100%;
  background: -webkit-linear-gradient(30deg, rgba(237, 63, 164,0.7) 0%, rgba(255, 19, 18,0.6) 70%, rgba(237, 63, 164, .90) 100%) !important;
  background: linear-gradient(30deg, rgba(237, 63, 164,0.7) 0%, rgba(255, 19, 18,0.6) 70%, rgba(237, 63, 164, .90) 100%) !important;
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