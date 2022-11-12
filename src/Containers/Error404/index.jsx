import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { PageError } from 'Components' // NOTIFICATION

export class Error404 extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    return (
      <PageError 
        errorType={404} 
        errorHeading="Error 404 - Page not found"
        errorSummary="Oh no! Looks like you've punctured the space-time fabric... In other words, the page you were looking for no longer exists." />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Error404)
