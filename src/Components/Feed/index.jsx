import React from 'react'
import styled from 'styled-components'
import { Waypoint } from 'react-waypoint';

import { RP_RED, RP_BLACK, RP_DARKGREY, RP_SUPER_LIGHT } from 'Components' //GLOBALS


export class Feed extends React.PureComponent {
  render() {
    const next_page     =  (this.props.page + 1)
    const has_next_page = (this.props.page < (this.props.results_count / this.props.page_size))

    return <div>
      { this.props.children }
      { has_next_page
        ? <Waypoint onEnter={() => this.props.infinite ? this.props.reload(next_page) : null}>
            <ViewMore show 
              infinite={this.props.infinite}
              onClick={() => this.props.infinite ? null : this.props.reload(next_page)}>
              { this.props.infinite
                ? <span>scroll to load more...</span>
                : <i className="fa fa-arrow-down"/> }
            </ViewMore>
          </Waypoint>
        : null }
    </div>
  }
}
export default Feed


export const ViewMore = styled.div`
  cursor: pointer;
  display: ${(props) => props.show ? 'block' : 'none'};
  position: relative;
  width: auto;
  height: auto;
  padding: 1vmin;
  margin: 2vmin auto 0 auto;
  background: ${props => props.infinite ? '#FFF' : RP_SUPER_LIGHT};
  text-align: center;
  border-radius: 3px;
  transition: all .25s ease;

  i {
    color: ${RP_BLACK};
    font-size: 2vmin;
  }

  &:hover {
    i {
      color: ${RP_RED};
    }
  }

  @media (max-width: 1024px) and (orientation: portrait) {
    &:hover {
      i {
        color: ${RP_DARKGREY};
      }
    }
  }
`