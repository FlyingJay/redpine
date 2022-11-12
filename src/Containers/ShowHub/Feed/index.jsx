import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { RP_BLUE } from 'Components'

import { Heading } from './../Heading/index.jsx'

import { FeedItem } from './FeedItem/index.jsx'
import { CommentBox } from './CommentBox/index.jsx'


export class Feed extends React.PureComponent {
  render() {
    const feed     = this.props.feed || []
    const can_chat = this.props.can_chat
    const is_empty = feed && (feed.length == 0) || false

    return (
      <FeedWrap>
        <Heading text="Show Chat" icon="fa fa-comments-o"/>
        <FeedItems>
          { feed.reverse().map(item => {
              return <FeedItem key={item.id} item={item} campaign={this.props.campaign}/>
            }) }

          { is_empty
            ? <FeedItem empty/>
            : null }

          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </FeedItems>

        { can_chat
          ? <CommentBox 
              sendMessage={this.props.sendMessage} 
              error={this.props.error}/>
          : null }
      </FeedWrap>
    )
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView(false,{ behavior: "smooth",block:'nearest',inline: 'start'});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
}

const FeedWrap = styled.div`
  display: inline-block;
  position: relative;
  height: 100%;
  width: 100%;
  overflow-y: hidden;
`
const FeedItems = styled.div`
  max-height: calc(100vh - 25vmin);
  overflow-y: overlay;
  display: block;
  margin-left: 2vmin;

  @media (max-width: 768px) {
    max-height: calc(100vh - 37.5vmin);
  }

  @media (max-width: 500px) {
    max-height: calc(100vh - 50vmin);
  }
` 