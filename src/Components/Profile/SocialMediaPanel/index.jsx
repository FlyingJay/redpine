import React from 'react'
import styled from 'styled-components'

import { FACEBOOK, TWITTER, SOUNDCLOUD_ORANGE, INSTAGRAM, YOUTUBE_RED, SPOTIFY_GREEN, RP_SUPER_LIGHT, RP_DARK_GREY, RP_PINK } from 'Components' // GLOBALS
import { SexiestPanelEver, PanelHeading, PanelContent, SexifyPersonality } from 'Components' //PROFILE
import { Link } from 'Components' //LINK

export class SocialMediaPanel extends React.PureComponent {
  render() {
    const entity = this.props.entity

    return <SexiestPanelEver>
            <PanelHeading color={SOUNDCLOUD_ORANGE}>
              <i className="fa fa-share" />
              <span>Connect with them</span>
            </PanelHeading>
            <PanelContent>
              {
                entity && entity.website
                ? <Link href={entity.website}>
                    <ConnectOption>
                      <i className="fa fa-link" />
                    </ConnectOption>
                  </Link>
                : null
              }
              {
                entity && entity.email
                ? <Link href={entity.email}>
                    <ConnectOption bgColor={SOUNDCLOUD_ORANGE}>
                      <i className="fa fa-envelope" />
                    </ConnectOption>
                  </Link>
                : null
              }
              {
                entity && entity.facebook
                ? <Link href={entity.facebook}>
                    <ConnectOption bgColor={FACEBOOK}>
                      <i className="fa fa-facebook" />
                    </ConnectOption>
                  </Link>
                : null
              }
              {
                entity && entity.twitter
                ? <Link href={entity.twitter}>
                    <ConnectOption bgColor={TWITTER}>
                      <i className="fa fa-twitter" />
                    </ConnectOption>
                  </Link>
                : null
              }
              {
                entity && entity.instagram
                ? <Link href={entity.instagram}>
                    <ConnectOption bgColor={INSTAGRAM}>
                      <i className="fa fa-instagram" />
                    </ConnectOption>
                  </Link>
                : null
              }
              {
                entity && entity.youtube
                ? <Link href={entity.youtube}>
                    <ConnectOption bgColor={YOUTUBE_RED}>
                      <i className="fa fa-youtube-play" />
                    </ConnectOption>
                  </Link>
                : null
              }
              {
                entity && entity.soundcloud
                ? <Link href={entity.soundcloud}>
                    <ConnectOption bgColor={SOUNDCLOUD_ORANGE}>
                      <i className="fa fa-soundcloud" />
                    </ConnectOption>
                  </Link>
                : null
              }
              {
                entity && entity.spotify
                ? <Link href={entity.spotify}>
                    <ConnectOption bgColor={SPOTIFY_GREEN}>
                      <i className="fa fa-spotify" />
                    </ConnectOption>
                  </Link>
                : null
              }
              {
                !(entity && (entity.website || entity.email || entity.facebook || entity.twitter || entity.instagram || entity.youtube || entity.soundcloud || entity.spotify))
                ? <SexifyPersonality>They have not added any socials.</SexifyPersonality>
                : null
              }
            </PanelContent>            
          </SexiestPanelEver>
  }
}
export default SocialMediaPanel

const ConnectOption = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 2vmin;
  height: 2vmin;
  padding: 1vmin;
  margin-bottom: 1vmin;
  margin-right: 1vmin;
  background: ${RP_SUPER_LIGHT};
  color: ${RP_DARK_GREY};
  font-size: 2vmin;
  text-align: center;
  line-height: 2vmin;
  border-radius: 100%;
  box-shadow: 0 0.5px 0 0 #FFFFFF inset, 0 1px 2px 0 #B3B3B3;
  transition: 0.25s all ease;

  &:hover {
    background: ${(props) => props.bgColor ? props.bgColor : RP_PINK};
    color: #FFF;
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    &:hover {
      background: ${RP_SUPER_LIGHT};
      color: ${RP_DARK_GREY};
    }
  }
`