import React from 'react'
import styled from 'styled-components'
import { RP_RED, RP_BLACK, RP_WHITE, RP_DDD, RP_LIGHTGREY } from 'Components' // GLOBALS

const ProgressWrap = styled.div`
  z-index: ${(props) => props.fixedOnTop ? '1' : '0'};
  display: block;
  position: ${(props) => props.fixedOnTop ? 'fixed' : 'relative'};
  background: ${(props) => props.color || RP_LIGHTGREY };
  width: 100%;
`

const SmallWrap = styled(ProgressWrap)`
  height: 0.7vmin;
  background: ${RP_DDD};
`

const HugeWrap = styled(ProgressWrap)`
  height: 5vmin;
  background: ${RP_DDD};

  @media (max-width: 500px) { 
    height: 7vmin;
  }
`

const Bar = styled.div`
  background: ${(props) => props.color || '-webkit-linear-gradient(left, #F93D66, #FF1312)'};
  background: ${(props) => props.color || 'linear-gradient(to right, #F93D66 , #FF1312)'};
  width: ${(props) => props.progress + '%' || '0%' };
  height: 100%;
  transition: width 1.69s;
  -webkit-transition: width 1.69s;
`

const BarText = styled.div`
  position: absolute;
  top:0;
  width: 100%;
  font-size: 3vmin;
  color: ${RP_WHITE};
  font-weight: bold;
  line-height: 5vmin;
  text-align: center;
  text-shadow: 1px 1px ${RP_BLACK};

  @media (max-width: 500px) { 
    line-height: 7vmin;
  }
`

export class ProgressBar extends React.PureComponent {
  render() {
    const parsedProgress = parseInt(this.props.progress)
    const progress = parsedProgress > 100 ? 100 : parsedProgress // progress shouldn't exceed 100
    return (
    this.props.huge ? 
      <HugeWrap {...this.props}>
        <Bar progress={progress} color={this.props.color} />
        <BarText>{this.props.message}</BarText>
      </HugeWrap>
        :
      <SmallWrap {...this.props}>
        <Bar progress={progress} color={this.props.color} />
      </SmallWrap>
    )
  }
}
export default ProgressBar