import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { paths } from 'globals'
import appActions from 'Containers/App/actions'

import { RP_BLACK, RP_RED, RP_DARKGREY } from 'Components'

export { ImageLink } from './ImageLink/index.jsx'

const baseURL = paths.baseURL()


export class _Link extends React.PureComponent {
  render() {
    const LinkComponent = this.props.linkComponent || CleanLink
    const loadFunc = this.props.redirectToLogin ? this.redirectToLogin.bind(this) : this.loadLink.bind(this)
    const href = this.props.redirectToLogin ? paths.login() : this.props.href
    const openInNewTab = this.props.newTab ? true : false

    return (
      <LinkComponent onClick={(e) => loadFunc(e, this.props.href, openInNewTab)} href={href} target="_blank" {...this.props}>
        {this.props.children}
      </LinkComponent>
    )
  }
  
  loadLink (e, href, openInNewTab) {
    // if the link is internal (part of the app), we cancel
    // the native link functionality of <a href="">
    if (href.substring(0, 1) === '/') {
      e.stopPropagation()
      e.preventDefault()

      if (openInNewTab){
        window.open(href, '_blank');
      }else{
        this.props.loadLink(href)        
      }
      return false
    }

    else {
      // if the link is external, then we'll do nothing & the
      // anchor will function normally.
    }
  }

  redirectToLogin (e, href) {
    e.stopPropagation()
    e.preventDefault()
    this.props._redirectToLogin()
    return false
  }
}

const mapStateToProps = (state, props) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadLink: (href) => {
      dispatch(push(href))
    },

    _redirectToLogin: () => {
      dispatch(appActions.redirectToLogin())
    }
  }
}

export const Link = connect(mapStateToProps, mapDispatchToProps)(_Link)

export const CleanLink = styled.a`
  text-decoration: none;
  color: ${props => props.red ? RP_RED : RP_BLACK};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
 
  &:hover{
    cursor: pointer !important;
    color: ${RP_RED};
    text-decoration: ${props => props.red ? 'underline' : 'none'};
  }
`
export const RedLink = styled.a`
  text-decoration: none;
  cursor: pointer !important;
  color: ${RP_RED} !important;
`
