import { replace } from 'react-router-redux'

import App from './index.jsx'
import actions from './actions'
import constants from './constants'
import selectors from './selectors'
import { initialState, reducer } from './reducer'
import { paths } from 'globals'

describe('App', () => {
  let treeReducer

  beforeEach(() => {
    treeReducer = helpers.buildTreeReducer(constants.REDUCER_ROOT, reducer)
  })

  it('redirects to login if an unauthenticated user visits a "requireAuth" Container', () => {
    const testPath = '/test'

    Object.defineProperty(window.location, 'pathname', {
      writable: true,
      value: testPath
    })
    const state = initialState.set('authenticated', false)
    const store = helpers.buildStore(constants.REDUCER_ROOT, state)
    const component = helpers.buildConnectedComponent((<App requireAuth />), store)
    const executedActions = store.getActions()
    const expected = [actions.setRedirect(testPath), replace(paths.login())]
    expect(executedActions).toEqual(expected)
  })

  it('redirects to dashboard if an authenticated user visits a "forbidAuth" Container', () => {
    const state = initialState.set('authenticated', true)
    const store = helpers.buildStore(constants.REDUCER_ROOT, state)
    const component = helpers.buildConnectedComponent((<App forbidAuth />), store)
    const executedActions = store.getActions()
    const expected = [replace(paths.home())]
    expect(executedActions).toEqual(expected)
  })

  it('redirects to stored redirect if an authenticated user visits a "forbidAuth" Container', () => {
    const redirect = '/test'
    const state = initialState.set('authenticated', true).set('redirect', redirect)
    const store = helpers.buildStore(constants.REDUCER_ROOT, state)
    const component = helpers.buildConnectedComponent((<App forbidAuth />), store)
    const executedActions = store.getActions()
    const expected = [replace(redirect)]
    expect(executedActions).toEqual(expected)
  })

  it('should handle authenticating a user', () => {
    const createdAction = actions.setAuth(true)
    const nextState = treeReducer(initialState, createdAction)
    const selected = selectors.selectAuthenticated(nextState)
    expect(selected).toEqual(true)
  })

  it('should handle unauthenticating a user', () => {
    const createdAction = actions.setAuth(false)
    const nextState = treeReducer(initialState, createdAction)
    const selected = selectors.selectAuthenticated(nextState)
    expect(selected).toEqual(false)
  })

  it('should log user in when the page refreshes', () => {
    api.me = {
      query: () => Promise.resolve('me')
    }
    api.token = 'wat'
    const state = initialState.set('authenticated', true)
    const store = helpers.buildStore(constants.REDUCER_ROOT, state)
    const component = helpers.buildConnectedComponent((<App  />), store)

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const storeActions = store.getActions()
          expect(storeActions).toEqual([actions.setUser('me')])
          resolve()
        } catch (err) {
          reject(err)
        }
      }, 1)
    })
  })

  it('should clear user details on logout', () => {
    const initialUser = { username: 'wat' }
    const state = initialState
      .set('authenticated', true)
      .set('user', initialUser)
    const rootState = {
      [constants.REDUCER_ROOT]: state
    }
    expect(selectors.selectUser(rootState)).toEqual(initialUser)
    const nextState = treeReducer(initialState, actions.logout())
    expect(selectors.selectUser(nextState)).toEqual(null)
  })
})