import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'
import { HELP_TOPIC } from 'enums'

import { HelpLink } from 'Containers' // LINK

import { ModalSubheading } from 'Components' //MODAL & MODALOTHERS
import { Notification } from 'Components' // NOTIFICATION
import { Link } from 'Components' // LINK


export class ActionMessage extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const has_bands = this.props.has_bands || null

    return (
      has_bands
      ? <ModalSubheading style={{textAlign:'center',marginBottom:'3vmin'}}>
          <HelpLink topic={HELP_TOPIC.PLAY_SHOW} shift={{right:-10,top:-15}} inline>
            You've added an act!  Head over to the<Link href={paths.showCreate()} style={{fontWeight:'bold'}}> play a show </Link>page, and get your show on the road!
          </HelpLink>
        </ModalSubheading>
      : <Notification
          sectional={true}
          notifIcon='info'
          notifText='To play a show, you will need to add your act here. We just need a name and short bio and you are ready to go! If you already added an act, try refreshing the page.' />
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.has_bands == null) return true
    if (nextProps.has_bands != this.props.has_bands) return true
    return false
  }
}