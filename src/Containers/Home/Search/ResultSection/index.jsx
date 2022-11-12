import React from 'react'
import styled from 'styled-components'

import { RP_DARK_GREY, RP_BLACK, RP_SUPER_LIGHT, RP_PINK, Bold, Clear, FormNotice } from 'Components' //GLOBALS
import { LoadingIndicator } from 'Components' //LOADINGINDICATOR
import { Link } from 'Components' //LINK

export class ResultSection extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const label = this.props.label
    return this.props.show
            ? <LoadingIndicator loading={this.props.loading}>
                {
                  this.props.count > 0
                  ? <div>
                      {
                        this.props.count > this.props.max_count
                        ? <Link href={this.props.showMoreResults}>
                            <ResultCountActive>
                              <span>{this.props.count}</span> {label}s were found. <Bold>Click here to see all of them...</Bold>
                            </ResultCountActive>
                          </Link>
                        : this.props.count === 1 
                          ? <ResultCountInactive>
                              <span>1</span> {label} was found.
                            </ResultCountInactive>
                          : <ResultCountInactive>
                              <span>{this.props.count}</span> {label}s were found.
                            </ResultCountInactive>
                      } 
                      <Clear/>
                      {this.props.children}
                    </div>
                  : <NoResults>No {label}s were found. Try a different phrase...</NoResults>
                }
              </LoadingIndicator>
            : null
  }
}

const ResultCountActive = styled(FormNotice)`
  display: block;
  padding: 1vmin;
  margin-bottom: 1vmin;
  background: ${RP_SUPER_LIGHT};
  color: ${RP_BLACK};
  font-size: 1.8vmin;
  font-weight: 400;

  cursor: pointer;
  width: auto;
  height: auto;
  border-radius: 3px;

  span {
    font-weight: bold;
  }

  &:hover {
    background: ${RP_PINK};
    color: #FFF;
  }
`
const ResultCountInactive = styled(FormNotice)`
  display: block;
  padding: 1vmin;
  margin-bottom: 1vmin;
  background: ${RP_SUPER_LIGHT};
  color: ${RP_DARK_GREY};
  font-size: 1.8vmin;
  font-weight: 400;

  span {
    font-weight: bold;
  }
`
const NoResults = styled(FormNotice)`
  display: block;
  padding: 1vmin;
  margin-bottom: 1vmin;
  background: ${RP_SUPER_LIGHT};
  color: ${RP_DARK_GREY};
  font-size: 1.8vmin;
  font-weight: 400;
`