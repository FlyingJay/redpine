import os
from shutil import copyfile
os.chdir('..')

def write_index_jsx(name,path):
    index_jsx = """import React from 'react' 
import styled from 'styled-components'

                
export class """+name+""" extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }
                    
  render() {
    return <div/>
  }
}
export default """+name

    os.mkdir(path)
    with open(path+'\index.jsx','w+') as new_file:
        new_file.writelines(index_jsx)

def add_export(name):
    exported = False
    lines = open(os.path.abspath(os.curdir) + '\src\Components\index.js','r').readlines()
    for i, line in enumerate(lines):
        if line == '\n' and not exported:
            lines[i] = "export * from './"+name+"/index.jsx'\n\n"
            exported = True
    open(os.path.abspath(os.curdir) + '\src\Components\index.js','w').writelines(lines)



#PROGRAM START
path_ending = input('What\'s the component path? \n')

path = os.path.abspath(os.curdir) + '\src\Components\\' + path_ending
name = path_ending if not path_ending.rfind('\\') else path_ending[path_ending.rfind('\\')+1:]

write_index_jsx(name,path)
add_export(name)







