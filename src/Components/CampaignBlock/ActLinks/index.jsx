import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { Bold } from 'Components' //GLOBALS
import { Link } from 'Components'


export const ActLinks = ({headliner,supporting_acts}) => {

	const has_supporting_acts = supporting_acts && (supporting_acts.length > 0)

	return <span>
				  { headliner
				    ? <Link href={paths.acts(headliner.id)} red bold style={{lineHeight:'3.25vmin'}}>
				        {headliner.name}
				      </Link>
				    : null
				  }

				  {/* FEATURED ARTISTS */}
				  { has_supporting_acts ? ' ft. ' : null }
				  { has_supporting_acts
				    ? supporting_acts.map((band, index) => {
                if(band){
                  return [<Link href={paths.acts(band.id)} key={band.id} red bold>
							            {band.name}
							           </Link>,`${index == (supporting_acts.length - 2)
	                                  ? ' and '
	                                  : index == (supporting_acts.length - 1)
	                                    ? ''
	                                    : ', '}`]
                }
				      }) 
				    : null
				  }
			   </span>
}