import React from 'react'
import styled from 'styled-components'

import { Image } from 'Components'


export class ColourSquare extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.colours = [
      'blue.png',
      'purple.png',
      //'green.png',
      //'red.png',
      'orange.png',
      //'pink.png',
      'yellow.png'
    ]
  }

  render() {
    return <Wrapper clickable={this.props.clickable} inline={this.props.inline}>
            <ImagePanel image={"/Assets/images/colours/"+ this.colours[Math.floor(Math.random()*4)]} inline={this.props.inline}/>
            <ImagePanel image="/Assets/images/colours/red_with_green.png" inline={this.props.inline}/>
           </Wrapper>
  }
}
export default ColourSquare


const Wrapper = styled.div`
  display: ${props => props.inline ? 'inline-block' : 'block'};
  width: 100px;
  height: 100px;
  position: relative;

  &:hover {
    cursor: ${props => props.clickable ? 'pointer' : 'default'};
  }

  background: transparent;
`
const ImagePanel = styled.div`
  position: absolute;
  top: 0;
  left: 0
  height: ${props => props.height || '100%' };
  width: ${props => props.width || '100%' };
  background: url('${props => props.image || '/Assets/images/defaults/default-thumb.png' }');
  background-size: ${props => props.inline ? 'contain' : 'cover'};
  background-repeat: no-repeat;
  background-position: center !important;
`