import sinon from 'sinon'
import { push } from 'react-router-redux'

import ConnectedRegister, { Register } from './index.jsx'
import appActions from 'Containers/App/actions'
import constants from './constants'
import initialState from './reducer'
import { paths } from 'globals'

describe('Register', () => {
  let store
  let component

  beforeEach(() => {
    store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
    component = helpers.buildConnectedComponent(<ConnectedRegister />, store)
  })

  it('should transition to login page when login is clicked', () => {
    const login = component.find('[name="login"]')
    login.simulate('click')
    const actions = store.getActions()
    expect(actions[0]).toEqual(push(paths.login()))
  })

  it('should transition to email registration when link is clicked', () => {
    const registerEmail = component.find('[name="register-email"]')
    registerEmail.simulate('click')
    const actions = store.getActions()
    expect(actions[0]).toEqual(push(paths.registerEmail()))
  })

  it('should transition to facebook oauth when link is clicked', () => {
    Object.defineProperty(window.location, 'assign', {
      writable: true,
      value: sinon.stub()
    })

    const facebook = helpers.findByKey(component, 'facebook-btn')
    facebook.simulate('click')
    expect(window.location.assign.callCount).toEqual(1)
    expect(window.location.assign.getCall(0).args).toEqual([paths.facebookRegistrationOAuth()])
  })
})