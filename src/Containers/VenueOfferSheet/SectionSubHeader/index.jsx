import React from 'react'
import styled from 'styled-components'

export class SectionSubHeader extends React.PureComponent {
  render() {
    const bold         = this.props.bold || false
    const is_print     = this.props.is_print
    const columns      = this.props.columns
    const num_columns  = columns && columns.length || 1

    const column_width = (100/num_columns) + '%'

    return <div style={{paddingBottom:is_print ? '0.25vmin':'1vmin'}}>
            {
              columns.map((column,index) => {
                return <div 
                        key={index}
                        style={{display:'inline-block',width:column_width,fontWeight:bold ? 'bold':'normal'}}>
                        {column}
                       </div>
              })
            }
           </div>
  }
}