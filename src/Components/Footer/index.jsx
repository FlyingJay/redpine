import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths } from 'globals'

import { RP_BLACK, RP_ORANGE, RP_DARKGREY, RP_RED, RP_LIGHTGREY, RP_DARK_GREY, INSTAGRAM, TWITTER, FACEBOOK, LogoBlack, RedBlackLogo, CenterText } from 'Components' // GLOBALS
import { BasePanel } from 'Components' // PANEL
import { SocialMediaButton } from 'Components' // BUTTON
import { Link, CleanLink } from 'Components' // LINK


export class Footer extends React.PureComponent {
  render() {
    return (
      <FooterPanel style={{border:0}} inline>
        <FooterPanel style={{padding:'2vmin 0'}}>
          <span style={{marginLeft: '5vmin'}}><RedBlackLogo size="4vmin" inline/></span>
          <SocialMediaLink href={paths.supportMail()} style={{marginRight: '5vmin'}} width="5vmin" height="5vmin" background="#FFF" hoverBackground={RP_ORANGE} icon={'envelope-o'} /> 
          <SocialMediaLink href={paths.redpineFacebook()} width="5vmin" height="5vmin" background="#FFF" hoverBackground={FACEBOOK} icon={'facebook'} />
          <SocialMediaLink href={paths.redpineTwitter()} width="5vmin" height="5vmin" background="#FFF" hoverBackground={TWITTER} icon={'twitter'} />
          <SocialMediaLink href={paths.redpineInstagram()} width="5vmin" height="5vmin" background="#FFF" hoverBackground={INSTAGRAM} icon={'instagram'} />
          <ConnectWithUsText>Connect with us via, </ConnectWithUsText>
        </FooterPanel>
        <FooterPanel style={{padding: '1vmin 0'}}>
          <FooterText style={{color: RP_DARK_GREY, padding: '1vmin 0'}}>
            RedPine connects artists to venues. Browse and book hundreds of venues across Canada. Make organizing your next show easier on RedPine.
          </FooterText>
          <FooterText>
            {
              this.props.authenticated 
              ? null 
              : <span>
                  <FooterLink href={paths.login()}>Login</FooterLink>
                  <FooterLink href={paths.register()}>Signup</FooterLink>
                  <FooterLink href={paths.forgotPassword()}>Forgot Password</FooterLink>
                </span>
            }
            {/*<FooterLink href={paths.redPineTeam()}>Our Team</FooterLink>*/}
            <FooterLink href={paths.privacyPolicy()}>Privacy Policy</FooterLink>
            <FooterLink href={paths.termsOfUse()}>Terms of Use</FooterLink>
            <FooterLink href={paths.blog()}>Blog</FooterLink>
          </FooterText>
        </FooterPanel>
        <FooterPanel>
          <FooterText>
             {/*<FooterLink href={paths.venueCreate()}><i className="fa fa-home" />&nbsp;&nbsp;List your Venue</FooterLink>*/}
            {/*<FooterLink href={paths.showCreate()}><i className="fa fa-flag" />&nbsp;&nbsp;Play a Show</FooterLink>*/}
          </FooterText>
        </FooterPanel>
        <FooterPanel style={{padding:'2vmin 0', background: RP_LIGHTGREY}}>
          <FooterText style={{color: RP_DARK_GREY}}>
            RedPine Music © {(new Date().getFullYear())}. All rights reserved.
            <br/>
            Toronto, On. Canada
          </FooterText>
        </FooterPanel>
      </FooterPanel>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)


class SocialMediaLink extends React.Component {
  render() {
    return (
      <Link href={this.props.href}>
        <SocialMediaButton style={this.props.style} width={this.props.width} height={this.props.height} background={this.props.background} hoverBackground={this.props.hoverBackground}>
          <i className={`fa fa-${this.props.icon}`}/>
        </SocialMediaButton>
      </Link>
    )
  }
}

class FooterLink extends React.PureComponent {
  render() {
    return (
      <Link {...this.props} linkComponent={_FooterLink}>
        {this.props.children}
      </Link>
    )
  }
}

const _FooterLink = styled(CleanLink)`
  display: inline-block;
  position: relative;
  color: ${RP_DARKGREY} !important;
  padding: 2vmin;
  transition: all 0.5s ease;

  &:hover {
    text-decoration: none;
    color: ${RP_RED} !important;
  }
`
const FooterSocialMedia = styled.div`
  position:relative;
  float:right;
`
const ConnectWithUsText = styled.span`
  display: inline-block;
  font-size: 1.8vmin;
  color: ${RP_DARK_GREY};
  line-height: 5vmin;
  margin-top: 1.1vmin;
  padding-right: 2vmin;
  float: right;
`
const FooterText = styled(CenterText)`
  width:80vw;
  font-size: 1.7vmin;
  line-height: normal;
`
const FooterPanel = styled(BasePanel)`
  width: 100%;
  line-height: 7vmin;
  border-radius: 0;
  border-bottom: 0; 
  border-right: 0; 
  border-left: 0; 
`