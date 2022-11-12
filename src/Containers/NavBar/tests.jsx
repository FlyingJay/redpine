import sinon from 'sinon'
import { push } from 'react-router-redux'

import ConnectedNavBar, { NavBar } from './index.jsx'
import appActions from 'Containers/App/actions'
import appConstants from 'Containers/App/constants'
import { initialState, reducer } from 'Containers/App/reducer'
import { paths } from 'globals'

describe('NavBar', () => {
  let treeReducer, component, store, pledges, campaigns
  let dom
  let setUp

  beforeEach(() => {
    treeReducer = helpers.buildTreeReducer(appConstants.REDUCER_ROOT, reducer)
    dom = {
      LOGGED_IN_SELECTOR: '[data-test-key="logged-in-nav"]',
      LOGGED_OUT_SELECTOR: '[data-test-key="logged-out-nav"]',
      
      //DESKTOP BUTTONS
      SIGNUP_BTN_D: '[data-test-key="signup-btn-desktop"]',
      LOGIN_BTN_D: '[data-test-key="login-btn-desktop"]',
      LOGOUT_BTN_D: '[data-test-key="logout-btn-desktop"]', // NOT TESTED
      BANDS_BTN_D: '[data-test-key="bands-btn-desktop"]',
      ADDCAMPAIGN_BTN_D: '[data-test-key="addcampaign-btn-desktop"]',
      SHOWS_BTN_D: '[data-test-key="shows-btn-desktop"]',
      ADDVENUE_BTN_D: '[data-test-key="addvenue-btn-desktop"]',
      VENUES_BTN_D: '[data-test-key="venues-btn-desktop"]',
      PLEDGES_BTN_D: '[data-test-key="pledges-btn-desktop"]',
      TICKETS_BTN_D: '[data-test-key="tickets-btn-desktop"]',
      SETTINGS_BTN_D: '[data-test-key="settings-btn-desktop"]',
      FAQ_BTN_D_OUT: '[data-test-key="faq-btn-desktop-out"]', // NOT TESTED
      FAQ_BTN_D_IN: '[data-test-key="faq-btn-desktop-in"]', // NOT TESTED
      PRIVACY_BTN_D_IN: '[data-test-key="pol-btn-desktop-in"]', 
      TERMS_BTN_D_IN: '[data-test-key="tos-btn-desktop-in"]', 
      
      //MOBILE BUTTONS
      SIGNUP_BTN_M: '[data-test-key="signup-btn-mobile"]',
      LOGIN_BTN_M: '[data-test-key="login-btn-mobile"]',
      LOGOUT_BTN_M: '[data-test-key="logout-btn-mobile"]', // NOT TESTED
      BANDS_BTN_M: '[data-test-key="bands-btn-mobile"]',
      ADDCAMPAIGN_BTN_M: '[data-test-key="addcampaign-btn-mobile"]',
      SHOWS_BTN_M: '[data-test-key="shows-btn-mobile"]',
      ADDVENUE_BTN_M: '[data-test-key="addvenue-btn-mobile"]',
      VENUES_BTN_M: '[data-test-key="venues-btn-mobile"]',
      PLEDGES_BTN_M: '[data-test-key="pledges-btn-mobile"]',
      TICKETS_BTN_M: '[data-test-key="tickets-btn-mobile"]',
      SETTINGS_BTN_M: '[data-test-key="settings-btn-mobile"]',
      PRIVACY_BTN_M: '[data-test-key="privacy-btn-mobile"]',
      TERMS_BTN_M: '[data-test-key="terms-btn-mobile"]',
      FAQ_BTN_M_OUT: '[data-test-key="faq-btn-mobile-out"]',
    }

    setUp = (authenticated) => {
      const user = {
        username: 'test',
        profile: {
          is_artist: true,
          is_venue: true
        }
      }
      const state = initialState.set('authenticated', authenticated).set('user', authenticated ? user : null)
      store = helpers.buildStore(appConstants.REDUCER_ROOT, state)
      component = helpers.buildConnectedComponent(<ConnectedNavBar />, store)
    }
  })

  it('should display logged in nav if the user is logged in', () => {
    setUp(true)
    expect(component.find(dom.LOGGED_OUT_SELECTOR).length).toEqual(0)
    expect(component.find(dom.LOGGED_IN_SELECTOR).length).toEqual(1)
  })

  it('should display logged out nav if the user is logged out', () => {
    setUp(false)
    expect(component.find(dom.LOGGED_OUT_SELECTOR).length).toEqual(1)
    expect(component.find(dom.LOGGED_IN_SELECTOR).length).toEqual(0)
  })

  it('should display logged out nav if the api is not yet ready', () => {
    setUp(null)
    expect(component.find(dom.LOGGED_OUT_SELECTOR).length).toEqual(1)
    expect(component.find(dom.LOGGED_IN_SELECTOR).length).toEqual(0)
  })

  // DESKTOP LINKS
  it('should transition to register', () => {
    setUp(false)
    component.find(dom.SIGNUP_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.register())])
  })

  it('should transition to login', () => {
    setUp(false)
    component.find(dom.LOGIN_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.login())])
  })
  
  it('should transition to my acts', () => {
    setUp(true)
    component.find(dom.BANDS_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.myActs())])
  })

  it('should transition to my campaigns', () => {
    setUp(true)
    component.find(dom.SHOWS_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.myShows())])
  })
    
  it('should transition to add venue', () => {
    setUp(true)
    component.find(dom.ADDVENUE_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.venueCreate())])
  })  
  
  it('should transition to my venues', () => {
    setUp(true)
    component.find(dom.VENUES_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.myVenues())])
  })  
  
  it('should transition to my pledges', () => {
    setUp(true)
    component.find(dom.PLEDGES_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.pledges())])
  })

  it('should transition to my tickets', () => {
    setUp(true)
    component.find(dom.TICKETS_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.tickets())])
  })

  it('should transition to my settings', () => {
    setUp(true)
    component.find(dom.SETTINGS_BTN_D).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.settings())])
  })

  it('should transition to privacy policy', () => {
    setUp(true)
    component.find(dom.PRIVACY_BTN_D_IN).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.privacyPolicy())])
  })
  
  it('should transition to terms and conditions', () => {
    setUp(true)
    component.find(dom.TERMS_BTN_D_IN).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.termsOfUse())])
  })
  
  // MOBILE LINKS
  it('should transition to register', () => {
    setUp(false)
    component.find(dom.SIGNUP_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.register())])
  })

  it('should transition to login', () => {
    setUp(false)
    component.find(dom.LOGIN_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.login())])
  })
  
  it('should transition to my acts', () => {
    setUp(true)
    component.find(dom.BANDS_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.myActs())])
  })

  it('should transition to my campaigns', () => {
    setUp(true)
    component.find(dom.SHOWS_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.myShows())])
  })
    
  it('should transition to add venue', () => {
    setUp(true)
    component.find(dom.ADDVENUE_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.venueCreate())])
  })  
  
  it('should transition to my venues', () => {
    setUp(true)
    component.find(dom.VENUES_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.myVenues())])
  })  
  
  it('should transition to my pledges', () => {
    setUp(true)
    component.find(dom.PLEDGES_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.pledges())])
  })

  it('should transition to my tickets', () => {
    setUp(true)
    component.find(dom.TICKETS_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.tickets())])
  })

  it('should transition to my settings', () => {
    setUp(true)
    component.find(dom.SETTINGS_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.settings())])
  })
  
  it('should transition to privacy policy', () => {
    setUp(false)
    component.find(dom.PRIVACY_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.privacyPolicy())])
  })
  
  it('should transition to terms and conditions', () => {
    setUp(false)
    component.find(dom.TERMS_BTN_M).simulate('click')
    const actions = store.getActions()
    expect(actions).toEqual([push(paths.termsOfUse())])
  })
})