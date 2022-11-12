import os
from shutil import copyfile
os.chdir('..')

def add_export(name):
    imported = False
    exported = False
    lines = open(os.path.abspath(os.curdir) + '\src\Containers\index.js','r').readlines()
    for i, line in enumerate(lines):
        if line == '\n' and not imported:
            lines[i] = "import "+name+" from './"+name+"/index.jsx'\n\n"
            imported = True
        if '}' in line and not exported:
            lines[i-1] = lines[i-1].strip('\n')+',\n'
            print(lines[i-1])
            lines[i] = "  "+name+"\n}\n"
            exported = True
    open(os.path.abspath(os.curdir) + '\src\Containers\index.js','w').writelines(lines)


#PROGRAM START
path_ending = input('What\'s the component path? \n')

path = os.path.abspath(os.curdir) + '\src\Containers\\' + path_ending
name = path_ending if not path_ending.rfind('\\') else path_ending[path_ending.rfind('\\')+1:]

index = """import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

//import { paths } from 'globals'
//import { } from 'Components'

import selectors from './selectors'
import actions from './actions'


export class """+name+""" extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
                    
  render() {
    return <div/>
  }

/*
  componentDidMount(){
    //this.props.loadData()
  }

  componentWillReceiveProps(nextProps) {
    
  }

  componentWillUnmount() {
    
  }  

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
*/
}

const mapStateToProps = (state, props) => {
  return {
    """+name.lower()+"""_loading: selectors.select"""+name+"""Loading(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    /*
    loadData: () => {
      dispatch(actions.loadData())
    }
    */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)("""+name+""")

"""

actions = """import { push } from 'react-router-redux'

import { paths } from 'globals'
import { errorMessage } from 'Components/errors'

import constants from './constants'


const actions = {
/*
  loadData: () => {
    return (dispatch, getState, api) => {
      dispatch(actions."""+name.lower()+"""Loading()) 
      api.ready.then(() => {
        api.PICK_SOMETHING.query().then((res) => {
          console.log(res)
          dispatch(actions."""+name.lower()+"""Loaded())
        })
      })
    }
  },
 
  """+name.lower()+"""Loading: () => { 
    return { 
      type: constants."""+name.upper()+"""_LOADING
    }
  },

  """+name.lower()+"""Loaded: () => { 
    return { 
      type: constants."""+name.upper()+"""_LOADED
    }
  }
*/
}

export default actions

"""

reducer = """import {fromJS} from 'immutable'
import constants from './constants'

export const initialState = fromJS({
  """+name.lower()+"""_loading: false
})

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants."""+name.upper()+"""_LOADING:
      return state
        .set('"""+name.lower()+"""_loading', true)

    case constants."""+name.upper()+"""_LOADED:
      return state
        .set('"""+name.lower()+"""_loading', false)

    default:
      return state
  }
}

export default reducer

"""

selectors = """import constants from './constants'

const c = (state, props) => {
  return state[constants.REDUCER_ROOT]
}
	
const selectors = {
  select"""+name+"""Loading: (state, props) => {
    return c(state, props).get('"""+name.lower()+"""_loading')
  }
}
	
export default selectors

"""

constants = """const constants = {
  REDUCER_ROOT: '"""+name[0].lower()+name[1:]+"""',

  //ACTIONS
  """+name.upper()+"""_LOADING: 'app/"""+name[0].lower()+name[1:]+"""/"""+name.upper()+"""_LOADING',
  """+name.upper()+"""_LOADED: 'app/"""+name[0].lower()+name[1:]+"""/"""+name.upper()+"""_LOADED'
}

export default constants

"""

os.mkdir(path)
with open(path+'\\index.jsx','w+') as new_file:
    new_file.writelines(index)
with open(path+'\\actions.js','w+') as new_file:
    new_file.writelines(actions)
with open(path+'\\reducer.js','w+') as new_file:
    new_file.writelines(reducer)
with open(path+'\\selectors.js','w+') as new_file:
    new_file.writelines(selectors)
with open(path+'\\constants.js','w+') as new_file:
    new_file.writelines(constants)

add_export(name)







