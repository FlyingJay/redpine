import React from 'react'
import styled from 'styled-components'

import { validators, paths } from 'globals' 

import { RP_BLUE, RP_DARKBLUE, RP_ORANGE, RP_DARKORANGE, RP_GREEN, SPOTIFY_GREEN, RP_GREY, RP_DARK_GREY, RP_SUPER_LIGHT, RP_DARKGREY, RP_BLACK, RP_RED, RP_PINK, RP_FONT, FormNotice, Bold } from 'Components' //GLOBALS
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, NegativeButton, PositiveButton, SearchModal } from 'Components' //MODAL
import { LoadingIndicator } from 'Components'
import { FormSeparator } from 'Components'
import { FormButton, ListTile } from 'Components'
import { InviteAct } from 'Components'
import { ActList } from 'Components'
import { Link } from 'Components'

import { ActResult } from './ActResult/index.jsx'
import { ActItem } from './ActItem/index.jsx'
import { SelectedAct } from './SelectedAct/index.jsx'


export class AddActs extends React.PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      selected_acts: [],
      query: '',
      
      showSearchModal: false,
      category: null
    }
  }

  render() {
    const acts           = this.props.acts || []
    const user_acts      = this.props.user_acts || []
    const search_acts    = this.props.search_acts || []
    const selected_acts  = this.state.selected_acts || []
    const verify_acts    = this.props.verify_acts || []

    const addAct         = this.addAct.bind(this)
    const removeAct      = this.removeAct.bind(this)

    const search_results = search_acts.filter((act) => { 
                             return (acts.filter((a) => a.band.id === act.id).length === 0 && this.state.selected_acts.filter((a) => a.id === act.id).length === 0)
                           })
    const user_act_results = user_acts.filter((act) => { 
                              return (acts.filter((a) => a.band.id === act.id).length === 0 && this.state.selected_acts.filter((a) => a.id === act.id).length === 0)
                             })
    const verify_acts_results = verify_acts.filter((act) => { 
                              return (acts.filter((a) => a.band.id === act.id).length === 0 && this.state.selected_acts.filter((a) => a.id === act.id).length === 0)
                             })

    const acts_selected     = (selected_acts.length > 0)
    const search_acts_count = (search_results || []).length
    const verify_acts_count = (verify_acts_results || []).length

    return (
      <SidePanel>
        {{ [null]: <ModalSection top>
                    <ListTile background={RP_GREEN} hoverBackground={SPOTIFY_GREEN} onClick={() => this.showMyActs()}>
                      <i className="fa fa-list"/>
                      <div>My Acts</div>
                    </ListTile>
                    <ListTile background={RP_PINK} hoverBackground={RP_RED} onClick={() => this.updateState({category:'SEARCH'})}>
                      <i className="fa fa-search"/>
                      <div>Search RedPine</div>
                    </ListTile>
                    <ListTile background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.updateState({category:'INVITE'})}>
                      <i className="fa fa-envelope-open-o"/>
                      <div>Invite</div>
                    </ListTile>
                   </ModalSection>,
      ['MY_ACTS']: <ModalSection top>
                    <ModalHeading>My Acts</ModalHeading>
                    <ModalSubheading style={{marginBottom:'4vmin'}}>Add one or more of your acts and hit "save"</ModalSubheading>
                    <ActList 
                      acts={user_act_results} 
                      is_loading={this.props.user_acts_loading}
                      actSelected={(act) => this.addAct(act)}/>
                   </ModalSection>,
       ['SEARCH']: <ModalSection top>
                    <ModalHeading>Search</ModalHeading>
                    <ModalSubheading>Looking for a RedPine member? Search their act name and we'll add them to the show.</ModalSubheading>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      this.showSearch()
                    }}>
                      <ActSearch 
                        onChange={(e) => this.updateState({query: e.target.value})}
                        placeholder="Search all acts on RedPine.." />
                      <SearchButton onClick={() => this.showSearch()}><i className="fa fa-search"/></SearchButton>
                      <SearchModal show={this.state.showSearchModal} onClose={() => this.updateState({showSearchModal: false})} ESCLettering="NONE">
                        <Results>
                          <LoadingIndicator loading={this.props.search_acts_loading}>
                            { search_acts_count > 0
                              ? search_acts.map((act) => <ActResult key={act.id} act={act} onSelectAct={(act) => this.addAct(act)}/> )
                              : <NoResults>No acts were found. Try a different phrase...</NoResults> }
                          </LoadingIndicator>
                        </Results>
                      </SearchModal>
                    </form>
                   </ModalSection>,
       ['INVITE']: verify_acts_count > 0
                   ? <ModalSection top>
                      <ModalHeading>Invite</ModalHeading>
                      <ModalSubheading>The email you've invited already has some acts listed! Select the one you wish to add, or DM them if you can't find it.</ModalSubheading>
                      <ActList 
                        acts={verify_acts_results}
                        is_loading={this.props.verify_acts_loading}
                        actSelected={(act) => this.addAct(act)}/>
                     </ModalSection>
                   : <ModalSection top>
                      <ModalHeading>Invite</ModalHeading>
                      <ModalSubheading>Invite an act by email and we'll add them to the show when they sign up!</ModalSubheading>
                      <InviteAct 
                        sendInvite={(name,email) => this.props.inviteAct(name,email)}
                        success={(text) => this.props.success(text)}
                        error={(text) => this.props.error(text)}/>
                     </ModalSection>
        }[this.state.category]}

        { this.state.category
          ? <ModalSection>
              <ModalSubheading>The following acts will be added when you hit "Save":</ModalSubheading>
              { this.state.selected_acts.map((act,i) => {
                  return <ActItem
                          key={act.id} 
                          act={act} 
                          is_user={false}
                          onClick={() => this.removeAct(act.id)}/>
                }) }
              <TextRight>
                { acts_selected
                  ? <PositiveButton onClick={() => this.props.save(this.state.selected_acts)}>
                      <i className="fa fa-check" />&nbsp;&nbsp;
                      Save
                    </PositiveButton>
                  : <NegativeButton>
                      No acts selected.
                    </NegativeButton> }
              </TextRight>
            </ModalSection>
          : null }

        { this.state.category !== null
          ? <ModalSection style={{textAlign:'left'}}>
              <FormButton onClick={() => this.updateState({category:null})} color={RP_BLACK} background="#FFF" hoverBackground={RP_SUPER_LIGHT} bold>
                <Bold><i className="fa fa-arrow-left"/>&nbsp;&nbsp;BACK</Bold>
              </FormButton>
            </ModalSection>
          : null }
      </SidePanel>
    )
  }

  showMyActs() {
    this.props.loadUserActs()
    this.updateState({category:'MY_ACTS'})    
  }

  showSearch() {
    if (this.state.act_query === '') return

    this.updateState({showSearchModal: true})
    this.props.searchActs(this.state.query)
  }

  addAct(act) {
    let acts = this.state.selected_acts
    const is_new = acts.filter(selected => selected.id === act.id).length === 0

    if(is_new){
      acts.push(act)

      this.updateState({selected_acts:acts,showSearchModal:false})
    }else{
      this.props.error('Can\'t select the same act more than once.')
    }
  }

  removeAct(id) {
    var acts = this.state.selected_acts.slice()
    acts = acts.filter(act => act.id != id)
    this.updateState({selected_acts:acts})
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }
}

const TextRight = styled.div`
  textAlign: right;
`
const SearchButton = styled.div`
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  position: relative;
  width: calc(20% - 4vmin);
  padding: 2vmin 2vmin;
  margin: 0 auto;
  border-radius: 0 0.5vmin 0.5vmin 0;
  background: ${RP_RED};
  color: #FFF;
  text-align: center;
  transition: all 0.25s ease;
  font-size: 1.8vmin;
  font-weight: 400;

  &:hover {
    background: ${RP_PINK};
  }
`
const Results = styled.div`
  padding: 0 3vmin 0 3vmin;
  margin: 0 -3vmin;

  width: CALC(33vw - 6vmin);
  max-height: 400px;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {cursor: pointer;width: 1vmin;}
  &::-webkit-scrollbar-track {background: ${RP_SUPER_LIGHT};border-radius:3px;}
  &::-webkit-scrollbar-thumb {background: ${RP_DARKGREY};border-radius:3px;}
  &::-webkit-scrollbar-thumb:hover {}

  @media (max-width: 767px) and (orientation: portrait) { 
    width: CALC(50vw - 6vmin + 11vmin + 17vmin + 2px);
    max-height: 500px;
    max-width: 500px;
  }

  @media (min-width: 768px) and (max-width: 1024px) { 
    width: CALC(40vw - 6.2vmin + 11vmin + 17vmin + 2px);
    max-height: 600px;
    max-width: 600px;
  }
`
const NoResults = styled(FormNotice)`
  display: block;
  padding: 1vmin;
  margin-bottom: 1vmin;
  color: ${RP_DARK_GREY};
  font-size: 1.8vmin;
  font-weight: 400;
`
const ActSearch = styled.input`
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: calc(80% - 11vmin);
  max-width: 700px;
  padding: 2vmin 5vmin 2vmin 6vmin;
  border-radius: 0.3vmin;
  background: #FFF url(/Assets/images/image-input/search.png) no-repeat;
  background-position: 2vmin center;
  background-size: 3vmin;
  margin: 0 auto;
  border: none;
  outline: none;
  color: ${RP_BLACK};
  transition: all 0.25s ease;
  box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-family: ${RP_FONT};
  font-size: 1.8vmin;
  font-weight: 400;
  outline: none;

  &:hover {
    color: ${RP_BLACK};
    border-color: #FFF;
  }

  &:focus {
    color: ${RP_BLACK};
    border-color: #FFF;
    background: #FFF url(/Assets/images/image-input/search-focus.png) no-repeat;
    background-position: 2vmin center;
    background-size: 3vmin;
  }
`
export default AddActs