import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals'

import { RP_BLUE, RP_DARKBLUE, RP_BLACK, RP_DDD, RP_RED, RP_FONT, RP_PINK, RP_SUPER_LIGHT, RP_DARKGREY, RP_DARK_GREY, FormNotice, Clear } from 'Components' //GLOABLS
import { SidePanel, ModalSection, ModalHeading, ModalSubheading, PositiveButton, NegativeButton, SearchModal } from 'Components' //MODAL & MODALOTHERS
import { LoadingIndicator } from 'Components'
import { FormSeparator } from 'Components'
import { InviteAct } from 'Components'
import { ListTile } from 'Components' //BUTTON
import { ActList } from 'Components'
import { Link } from 'Components'

import { ActItem } from './ActItem/index.jsx'
import { ActResult } from './ActResult/index.jsx'


export class Tab5Acts extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      selectedActs: this.props.acts,
      empty_slots: this.props.empty_slots,
      is_open: this.props.is_open,
      act_query: '',
      showSearchModal: false,
      show_ask_more_performers: false,
      show_search: true,
      show_invite: false
    }
  }

  render() {
    const userAct           = this.props.act
    
    const search_acts       = this.props.search_acts || []
    const search_acts_count = search_acts ? search_acts.length : 0

    const selected_acts       = this.state.selectedActs || []
    const selected_acts_count = selected_acts ? selected_acts.length : 0

    const verify_acts    = this.props.verify_acts || []
    const verify_acts_results = verify_acts.filter((act) => { 
                              return (acts.filter((a) => a.band.id === act.id).length === 0 && this.state.selected_acts.filter((a) => a.id === act.id).length === 0)
                             })
    const verify_acts_count = (verify_acts_results || []).length

    const showNext = (this.state.selectedActs.length > 0)

    return (
      <SidePanel>
        { !this.state.show_ask_more_performers
          ? <div>
              <ModalSection top>
                <ModalHeading>Invite Supporting Acts</ModalHeading>
                <ModalSubheading>Not sure who you'll be playing with? You may invite acts later.</ModalSubheading>
                { !this.state.show_search
                  ? <ListTile background={RP_PINK} hoverBackground={RP_RED} onClick={() => this.updateState({show_search:true})}>
                      <i className="fa fa-search"/>
                      <div>Search RedPine</div>
                    </ListTile>
                  : <form onSubmit={(e) => {
                      e.preventDefault()
                      this.showSearch()
                    }}>
                      <ActSearch 
                        onChange={(e) => this.updateState({act_query: e.target.value})}
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
                    </form> }
              </ModalSection>

              <ModalSection style={{paddingTop:0,paddingBottom:0}}>
                <FormSeparator text="or"/>
              </ModalSection>

              { verify_acts_count > 0
                ? <ModalSection>
                    <ModalHeading>Invite by email</ModalHeading>
                    <ModalSubheading>The email you've invited already has some acts listed! Select the one you wish to add, or DM them if you can't find it.</ModalSubheading>
                    <ActList 
                      acts={verify_acts_results}
                      is_loading={this.props.verify_acts_loading}
                      actSelected={(act) => this.addAct(act)}/>
                   </ModalSection>
                : <ModalSection>
                    <ModalHeading>Invite by email</ModalHeading>
                    <ModalSubheading>If they're not signed up on RedPine, enter their email and they'll be invited to your show.</ModalSubheading>
                    { !this.state.show_invite
                      ? <ListTile background={RP_BLUE} hoverBackground={RP_DARKBLUE} onClick={() => this.updateState({show_invite:true})}>
                          <i className="fa fa-envelope-open-o"/>
                          <div>Invite</div>
                        </ListTile>
                      : <InviteAct require_links
                          sendInvite={(name,email,socials) => this.sendInvite(name,email,socials)}
                          success={(text) => this.props.success(text)}
                          error={(text) => this.props.error(text)}/> }
                  </ModalSection> }

              {/*SELECTED ACTS*/}
              <ModalSection top>
                <ModalSubheading>The following acts will be included:</ModalSubheading>
                { this.state.selectedActs.map((act,i) => {
                    return <ActItem
                            key={i} 
                            act={act} 
                            is_user={act === userAct}
                            onClick={() => this.removeAct(act)}/>
                  }) }
              </ModalSection>
            </div>
          : null }

        { this.state.show_ask_more_performers
          ? <ModalSection top>
              <ModalHeading>So far <span style={{'color':RP_RED}}>{selected_acts_count}</span> act{selected_acts_count > 1 ? 's are':' is'} playing!</ModalHeading>
              <ModalSubheading>
                Looking for more supporting acts?
              </ModalSubheading>
              <FormSeparator/>
              <ModalSubheading>
                A cool feature on RedPine is that artists can discover and ask to join your show. By default, your show will be visible for others to see; you can keep your show private by opting out below.
              </ModalSubheading>
              <div style={{'textAlign':'center','margin':'10vmin 0'}}>
                <Checkbox type="checkbox" 
                  onChange={(e) => this.updateState({is_open:!this.state.is_open})} 
                  checked={!this.state.is_open}/>
                <CheckboxValue>&nbsp;&nbsp; I am not interested in having acts apply to my show.</CheckboxValue>
              </div>
            </ModalSection>
          : null }

        <ModalSection style={{textAlign:'right'}}>
          <NegativeButton onClick={() => this.state.show_ask_more_performers
                                         ? this.updateState({show_ask_more_performers:false})
                                         : this.props.back(this.state.selectedActs,this.state.empty_slots,this.state.is_open)} style={{float:'left'}}>
            <i className="fa fa-arrow-left"/>
            &nbsp;&nbsp;Back
          </NegativeButton>
          { showNext 
            ? this.state.show_ask_more_performers
              ? <PositiveButton onClick={() => this.props.next(this.state.selectedActs,this.state.empty_slots,this.state.is_open)}>
                  Next&nbsp;&nbsp;
                  <i className="fa fa-arrow-right"/>
                </PositiveButton>
              : <PositiveButton onClick={() => this.updateState({show_ask_more_performers:true})}>
                  Next&nbsp;&nbsp;
                  <i className="fa fa-arrow-right"/>
                </PositiveButton>
            : null }
        </ModalSection>

      </SidePanel>
    )
  }

  showSearch() {
    if (this.state.act_query === '') return

    this.updateState({showSearchModal: true})
    this.props.searchActs(this.state.act_query)
  }

  sendInvite(name,email,socials) {
    const tempAct = {
      name: name,
      is_redpine: false,
      email: email
    }
    Object.assign(tempAct,socials)
    this.addAct(tempAct)
  }

  addAct(act) {
    let acts = this.state.selectedActs
    const is_new = acts.filter(selected => selected.id === act.id).length === 0

    if(is_new || !act.id){
      acts.push(act)
      this.updateState({selectedActs:acts,showSearchModal:false})
    }else{
      this.props.error('Can\'t select the same act more than once.')
    }
  }

  removeAct(act) {
    let acts = this.state.selectedActs
    acts = acts.filter(a => a !== act)

    let empty_slots = this.state.empty_slots
    empty_slots = empty_slots < 9 ? empty_slots+1 : empty_slots

    this.updateState({selectedActs:acts,empty_slots:empty_slots})
  }

  updateState(update) {
    const nextState = Object.assign(this.state, update)
    this.setState(nextState)
    this.forceUpdate()
  }

  componentDidMount() {
    if(this.state.selectedActs.length == 0){
      this.updateState({selectedActs:[this.props.act]})
    }
  }
}
const ApplicationImage = styled.img`
  max-width: 100%;
  height: auto;
`
const Checkbox = styled.input`
  display: inline-block;
  vertical-align: middle;
  width: 3vmin;
  height: 3vmin;
  margin-bottom: 0;

  @media (max-width: 768px) { 
    width: 4vmin;
    height: 4vmin;
  }
`
const CheckboxValue = styled.span`
  display: inline-block;
  position: relative;
  vertical-align: middle;
  width: auto;
  font-size: 2vmin;

  @media (max-width: 768px) { 
    font-size: 3vmin;
  }
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