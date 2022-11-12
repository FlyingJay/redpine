import sinon from 'sinon'
import { push } from 'react-router-redux'

import ConnectedLogin, { Login } from './index.jsx'
import appActions from 'Containers/App/actions'
import actions from './actions'
import constants from './constants'
import selectors from './selectors'
import { initialState, reducer } from './reducer'
import { paths } from 'globals'

describe('Login', () => {
  let treeReducer

  beforeAll(() => {
    treeReducer = helpers.buildTreeReducer(constants.REDUCER_ROOT, reducer)
  })

  it('should forbid authentication', () => {
    const props = helpers.getProps(Login)
    expect(props.forbidAuth).toEqual(true)
  })

  it('should not require authentication', () => {
    const props = helpers.getProps(Login)
    expect(props.requireAuth).toEqual(undefined)
  })

  it('should submit appropriate actions and API calls for successful login', () => {
    const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
    const component = helpers.buildConnectedComponent(<ConnectedLogin />, store)
    const email = component.find('[name="email"]')
    const password = component.find('[name="password"]')
    const login = component.find('[name="login"]')

    api.mock('logIn', () => Promise.resolve(true))

    api.me = {
      query: () => Promise.resolve('user')
    }

    email.simulate('change', {
      target: {
        value: 'testuser'
      }
    })

    password.simulate('change', {
      target: {
        value: 'testpass'
      }
    })

    login.simulate('click')

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(store.getActions())
      }, 1)
    })

    return promise.then((actionHistory) => {
      expect(api.logIn.lastCall.args).toEqual(['testuser', 'testpass'])
      expect(actionHistory[0]).toEqual(actions.loginStart())
      expect(actionHistory[1]).toEqual(appActions.setAuth(true))
      expect(actionHistory[2]).toEqual(appActions.setUser('user'))
    })
  })

  it('should submit appropriate actions for failed login', () => {
    const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
    const component = helpers.buildConnectedComponent(<ConnectedLogin />, store)
    const email = component.find('[name="email"]')
    const password = component.find('[name="password"]')
    const login = component.find('[name="login"]')

    api.mock('logIn', () => Promise.reject(true))

    email.simulate('change', {
      target: {
        value: 'testuser'
      }
    })

    password.simulate('change', {
      target: {
        value: 'testpass'
      }
    })

    login.simulate('click')

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(store.getActions())
      }, 1)
    })

    return promise.then((actionHistory) => {
      expect(actionHistory[0]).toEqual(actions.loginStart())
      expect(actionHistory[1]).toEqual(actions.loginError('Invalid username/password.'))
    })
  })

  it('should set error on failed login', () => {
    const action = actions.loginError('Invalid username/password.')
    const nextState = treeReducer(initialState, action)
    expect(selectors.selectError(nextState)).toEqual('Invalid username/password.')
  })

  it('should clear the error on form submission', () => {
    const action = actions.loginStart()
    const nextState = treeReducer(initialState.set('error', 'wat'), action)
    expect(selectors.selectError(nextState)).toEqual(null)
  })

  it('should initiate facebook login when facebook button is clicked', () => {
    Object.defineProperty(window.location, 'assign', {
      writable: true,
      value: sinon.stub()
    })

    const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
    const component = helpers.buildConnectedComponent(<ConnectedLogin />, store)
    const login = component.find('[name="facebook-login"]')

    login.simulate('click')

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(store.getActions())
      }, 1)
    })

    return promise.then((actionHistory) => {
      expect(actionHistory[0]).toEqual(actions.startFacebookLogin())
      expect(window.location.assign.lastCall.args).toEqual([paths.facebookLoginOAuth()])
    })
  })

  it('should transition to register page when register is clicked', () => {
    const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
    const component = helpers.buildConnectedComponent(<ConnectedLogin />, store)
    const register = component.find('[name="register"]')

    register.simulate('click')

    const actions = store.getActions()
    expect(actions[0]).toEqual(push(paths.register()))
  })

  it('should transition to forgot password page when button is clicked', () => {
    const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
    const component = helpers.buildConnectedComponent(<ConnectedLogin />, store)
    const register = component.find('[data-test-key="forgot-password-btn"]')

    register.simulate('click')

    const actions = store.getActions()
    expect(actions[0]).toEqual(push(paths.forgotPassword()))
  })
})
