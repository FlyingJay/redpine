import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'
import { RP_Act } from 'Models'

import { RP_RED } from 'Components' //GLOBALS
import { Link } from 'Components'


export class Performer extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    const _Act = RP_Act(this.props.act)

    return (
      <Link href={paths.acts(_Act.id)}>
        <PerformersImage image={_Act.picture} is_headliner={this.props.is_headliner}>
          <Overlay>
            <Center>
              <Name>{_Act.name}</Name>
              <City>{_Act.hometown_name}</City>
            </Center>
          </Overlay>
        </PerformersImage>
      </Link>
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.act == null) return true
    if (nextProps.act != this.props.act) return true
    return false
  }
}
export default Performer

const Center = styled.div`
  text-align: center;
  padding-top: 5vmin;
`
const Name = styled.div`
  font-size: 3vmin;
  color: #FFF;
  font-weight: 200;
`
const City = styled.div`
  font-size: 2vmin;
  color: ${RP_RED};
  text-transform: uppercase;
  font-weight: bold;
`
const PerformersImage = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 0 2vmin 2vmin 0;
  border-radius: 0.5vmin;

  background: url('${props => props.image || '/Assets/images/panel/instruments.jpg' }');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  min-width: calc(50% - 6vmin);
  width: auto;
  height: 12vmin;

  padding: 5vmin 2vmin 2vmin 2vmin;

  &:hover {
    cursor: pointer;
  }

  @media (min-width: 1024px) { 
    min-width: calc(33% - 6vmin);
  }
`
const Overlay = styled.div`
  cursor: pointer;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  background: -webkit-linear-gradient(transparent 0%, rgba(49,49,49, 0.8) 100%) !important;
  background: -moz-linear-gradient(transparent 0%, rgba(49,49,49, 0.8) 100%) !important;
  background: linear-gradient(transparent 0%, rgba(49,49,49, 0.8) 100%) !important;
  border-radius: inherit;
  border-radius: 0.5vmin;
`