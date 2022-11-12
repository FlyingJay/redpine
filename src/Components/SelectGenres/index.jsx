import React from 'react' 
import styled from 'styled-components'

import { RP_GREEN, RP_SUPER_LIGHT } from 'Components'
import { Select } from 'Components'


export class SelectGenres extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      genres:[],
      selectedGenres:this.props.selectedGenres
    }
  }
                
  render() {
  	const genres = this.props.genres

    return <div>
            { !this.props.disabled
              ? <Select
                  name='form-field-name'
                  options={
                    genres.filter((genre) => {
                      return this.state.selectedGenres.filter((g) => g.id === genre.id).length === 0
                    }).map((genre) => {
                      return {
                        value: genre.id,
                        label: genre.name
                      }
                    })
                  }
                  onChange={(selectedId) => this.addGenre(selectedId)}
                  placeholder='Add genres..' />
              : null }
            <TagWrap>
              { this.state.selectedGenres.map((genre) => {
                  return <GenreWrap key={genre.id}>
                          {genre.name}
                          { !this.props.disabled 
                            ? <GenreX className='fa fa-times' onClick={() => this.removeGenre(genre)}/> 
                            : null }
                        </GenreWrap>
                })}
            </TagWrap>
          </div>
  }

  addGenre(selectedGenre) {
    if(selectedGenre){
      var genres = this.state.selectedGenres
      var added = { id:selectedGenre.value,
                    name:selectedGenre.label }
      genres.push(added)
      this.updateState({selectedGenres: genres})
      this.props.onChange(genres)
    }
  }

  removeGenre(genre) {
    var nextGenres = []
    this.state.selectedGenres.forEach((_genre) => {
      if(_genre.id !== genre.id){
        nextGenres.push(_genre)
      }
    })
    this.updateState({selectedGenres: nextGenres})
    this.props.onChange(nextGenres)
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }  
}
export default SelectGenres


const TagWrap = styled.div`
  display: block;
  height: auto;
  background: #FFF;
  margin-top: 2vmin;
  margin-bottom: 2vmin;
  text-align: left;
`
const GenreWrap = styled.div`
  display: inline-block;
  margin-top: 1vmin;
  margin-right: 1vmin;
  padding: 1vmin;
  background: ${RP_GREEN};
  color: #FFF;
  border-radius: 0.5vmin;
  line-height: 2.5vmin;
  font-size: 2.25vmin;

  &:last-child {
    margin-right: 0;
  }
`
const GenreX = styled.i`
  display: inline-block;
  font-size: 2vmin;
  padding-left: 1vmin;

  &:hover {
    cursor: pointer;
    color: ${RP_SUPER_LIGHT};
  }
`