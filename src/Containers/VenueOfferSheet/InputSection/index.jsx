import React from 'react'
import styled from 'styled-components'

import { validators } from 'globals'

import { Bold, RP_GREEN, SPOTIFY_GREEN } from 'Components' //GLOBALS

import { Input, Select } from 'Components' //INPUT
import { FormButton } from 'Components' //BUTTON


export class InputSection extends React.PureComponent {
  constructor(props) {
    super(props)
    this.rate_types = ['Flat','Percentage']
   }

  render() {
    const row          = this.props.row
    const values       = this.props.values
    const placeholders = this.props.placeholders
    const num_columns  = values && values.length || 1

    const column_width = (90/num_columns) + '%'
    const margin_width = (10/num_columns) + '%'

   	const quantity_col = placeholders.indexOf('Quantity')
   	const price_col 	 = placeholders.indexOf('Price')
   	const quantity 		 = quantity_col != -1 ? values[quantity_col] : 0
   	const price 			 = price_col != -1 ? values[price_col] : 0
   	const row_total 	 = isNaN(price*quantity) ? 'Qty/Price should be numbers.' : '$'+(price*quantity).toFixed(2)

    return <div style={{textAlign:'right'}}>
            {
              values.map((value,column) => {
                return <div key={placeholders[column]+'value'} style={{width:column_width,marginRight:margin_width,display:'inline-block',verticalAlign:'middle'}}>
		                		{
		                			placeholders[column] == 'Rate Type'
		                			? <Select
					                    options={
					                      this.rate_types.map((text,index) => {
					                        return {
					                          value: index,
					                          label: text
					                        }
					                      })
					                    }
					                    onChange={(e) => this.props.onUpdate(e.label,column)}
					                    placeholder={values[column]} />
		                			: placeholders[column] == 'Total'
		                				? <Bold>{row_total}</Bold>
		                				: <Input
			                          placeholder={placeholders[column]}
			                          value={values[column]}
			                          validate={{
			                          		'Name':validators.ALL_THE_SHIT(),
			                          		'Ticket Type':validators.EXTENDED_LETTERS(),
			                          		'Price':validators.POSITIVE_DOLLAR(),
			                          		'Amount':validators.POSITIVE_NUMBER(),
			                          		'Quantity':validators.POSITIVE_INTEGER()
			                          	}[placeholders[column]]}
			                          onValidate={text => this.props.onUpdate(text,column)}
			                          image="dot"
			                          focusImage="dot-focus"
			                          maxLength="500"/>
		                		}
                       </div>
              })
            }
            {
              this.props.last
              ? <AddButton onClick={() => this.props.add()} marginRight={margin_width}>
                  Add&nbsp;&nbsp;
                  <i className="fa fa-plus"/>
                </AddButton>
              : null
            }
           </div>
  }
}

const AddButton = styled(FormButton)`
  display: inline-block;
  background: ${RP_GREEN};
  margin-right: ${props => props.marginRight || '0'};

  &:hover {
    background: ${SPOTIFY_GREEN};
  }
`