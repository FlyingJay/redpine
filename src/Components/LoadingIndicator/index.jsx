import React from 'react'
import styled from 'styled-components'

import { LoadingImage } from 'Components' //IMAGE


export class LoadingIndicator extends React.PureComponent {
  render() {
    return <LoadingWrapper>
             {
               this.props.loading && this.props.is_child_visible && this.props.bottom
               ? this.props.children
               : null
             }
             {
               this.props.loading
               ? <InternalWrapper {...this.props}>
                   <LoadingImage image="/Assets/images/extra/loading.gif"/>
                 </InternalWrapper>
               : this.props.children
             }
             {
               this.props.loading && this.props.is_child_visible && !this.props.bottom
               ? this.props.children
               : null
             }
           </LoadingWrapper>
  }
}
export default LoadingIndicator

const LoadingWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`
const InternalWrapper = styled.div`
  display: block;
  position: relative;
  width: 10vmin
  height: ${props => props.height || '10vmin'};
  margin: 0 auto;
  text-align: center;
`
const NoConnection = styled.div`
  display: block;
  position: relative;
  text-align: center;
`