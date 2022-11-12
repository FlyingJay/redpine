import React from 'react'
import styled from 'styled-components'
import { RP_GREY, RP_DARK_GREY } from 'Components'

export const BasePanel = styled.div`
  position: relative;
  display: ${props => props.inline ? 'inline-block' : 'block'};
  height: ${props => props.height || 'auto' };
  width: ${props => `calc(${props.width} - 2px)` || 'auto' };
  margin: 0 auto;
  background: ${props => props.background || '#FFF' };
  white-space: normal;

  border: 1px solid ${RP_GREY};
  border-radius: 1vmin;
  box-shadow: 2px 1px 2px rgba(0,0,0,0.1);
`;

const ThinPanel = styled(BasePanel)`
	padding: 1vmin;
`;

export const ThickPanel = styled(BasePanel)`
	padding: 7vmin 10vmin;
`

export const BackgroundPanel = styled.div`
  background: url(/Assets/images/background/${props => props.background});
  background-size: cover;
  padding: 18vmin 0 18vmin 0;
  display: block;
  position: relative;
  top: 0;
  left: 0;
  border: 0;
  width: 100%;
  height: auto;
`

export const LoginPanel = styled(ThickPanel)`
  margin-top: 20vmin;
  width: 60vmin;
  position: relative;
  width: 50vmin;
  height: auto;
  padding: 7vmin 10vmin;
  margin: 0 auto;
  background: #FFF;
  border: 0vmin solid rgb(213,213,213);
  border-radius: 1vmin;
  box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.1);
`;

export const LoginPanelText = styled.div`
  color: ${RP_DARK_GREY};
  font-size:1.6vmin;
  padding:0.5vmin 0;
`;

export const PageSection = styled.div`
  display: block;
  margin: 0px auto;
  width: ${props => props.width || '80%'};
  margin-top: ${props => props.marginTop || '5vh'};
  text-align: center;
  height: ${props => props.height || 'auto'};
  background: ${props => props.background || '#FFF'}
  overflow-x: auto;
  overflow-y: hidden;
  white-space:nowrap;
`

export class Panel extends React.PureComponent {
  render() {
    return (<BasePanel {...this.props}>{this.props.children}</BasePanel>);
  }
}

export default Panel