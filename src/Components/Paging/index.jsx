import React from 'react'
import styled from 'styled-components'

import { RP_RED } from 'Components' //GLOBALS


export class Paging extends React.PureComponent {
  render() {
    const previous_page = ((this.props.page - 1) || 1)
    const next_page     =  (this.props.page + 1)

    const has_next_page = (this.props.page < (this.props.results_count / this.props.page_size))

    return <div>
      { this.props.results_count > this.props.page_size
        ? <Navigation page={this.props.page}>
            { this.props.page === 1 ? ' ' : <i className="fa fa-arrow-left" onClick={() => this.props.reload(previous_page)}/> }
            <span>&nbsp;&nbsp;{this.props.page}&nbsp;&nbsp;</span>
            { has_next_page ? <i className="fa fa-arrow-right" onClick={() => this.props.reload(next_page)}/> : ' ' }
          </Navigation>
        : null }
      { this.props.children }
    </div>
  }

  next(){
    this.props.reload(this.props.page + 1)
  } 

  back(){
    this.props.reload((this.props.page - 1) || 0)
  }
}
export default Paging


const Navigation = styled.div`
  text-align: center;
  padding: 4vmin 0;
  font-size: 3vmin;
  font-weight: 200;

  margin-left: ${props => props.page === 1 ? 0 : '-20px'};

  i {
    &:hover { 
      color: ${RP_RED};
      cursor: pointer;
    }
  }

`