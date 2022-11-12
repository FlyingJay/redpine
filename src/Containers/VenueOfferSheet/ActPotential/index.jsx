import React from 'react'
import styled from 'styled-components'

import { Bold } from 'Components' //GLOBALS

export class ActPotential extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const payouts         = this.props.payouts
    const act_names       = payouts && payouts.act_names || []
    const act_guarantees  = payouts && payouts.act_guarantees || []
    const act_variables   = payouts && payouts.act_variables || []
    const act_percentages = payouts && payouts.act_percentages || []

    const no_acts = (act_names.length == 0)
    
    return no_acts
            ? <div>Add some acts to fill this section.</div>
            : <div>
                {
                  act_names.map((name,i) => {
    								const guarantee = act_guarantees[i].toFixed(2)
    								const variable = act_variables[i].toFixed(2)
                    
    								return <DetailsSection key={name}>
    								         <Row name label={name} value=""/>
    								         {
    								         	 guarantee > 0
    								         	 ? <Row label="Guarantee" value={'$'+guarantee}/>
    								         	 : null
    								         }
    								         {
    								         	 variable > 0
    								         	 ? <Row label="Earnings" value={'$'+variable} note={act_percentages[i].toFixed(0)+'% of split amount.'}/>
    								         	 : null
    								         }
    								         <br/>
    								       </DetailsSection>
    				      })
                }
              </div>
	}
}

const DetailsSection = styled.div`
  width: 50%;

  @media (max-width: 767px) and (orientation: portrait) { 
    width: 100%;
  }
`

const Row = ({name,label,value,note}) => {
  return <div>
  				{
  					name
  					? <Bold style={{display:'inline-block',width:'50%'}}>{label}</Bold>
  					: <div style={{display:'inline-block',width:'50%'}}>{label}</div>
  				}
          <Bold style={{display:'inline-block',width:'50%'}}>{value}</Bold>
          {
            note
            ? <div style={{fontSize:'1.5vmin'}}>&nbsp;&nbsp;*{note}</div>
            : null
          }
         </div>
}