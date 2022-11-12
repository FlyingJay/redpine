import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import React from 'react'
import renderer from 'react-test-renderer'
import RedPineAPIClient from 'redpine-api-client'
import nock from 'nock'
import sinon from 'sinon'
import { mount, shallow } from 'enzyme'
import { Provider } from 'react-redux'

import appConstants from 'Containers/App/constants'
import { initialState } from 'Containers/App/reducer'

function mock(method, func) {
  this[method] = sinon.stub().callsFake(func)
}

global.api = {
  mock
}

api.ready = Promise.resolve()

global.__STRIPE_PUBLISHABLE_KEY__ = 'pk_test_KFqS96RD6vOPjgBZwUhCPxJi'
global.__WEBAPP_BASE_URL__ = 'http://base.domain'
global.__FACEBOOK_APP_ID__ = ''
global.__GOOGLE_ANALYTICS_PROPERTY__ = ''

global.stripe = {
  mock
}

global.Stripe = function () {
  return stripe
}

window.location.assign = sinon.stub()

const middlewares = [thunk.withExtraArgument(api)]
const mockStore = configureMockStore(middlewares)

global.React = React
global.helpers = {
  buildStore(reducerRoot, _initialState, isWrappedInApp) {
    let state = {}
    state[reducerRoot] = _initialState

    if (isWrappedInApp) {
      state[appConstants.REDUCER_ROOT] = initialState
    }

    return mockStore(state)
  },

  buildComponent(component) {
    return mount(component)
  },

  buildConnectedComponent(component, store) {
    const wrapped = React.createElement(Provider, {store: store}, component)
    const rendered = mount(wrapped)
    return rendered
  },

  buildTreeReducer(reducerRoot, reducer) {
    const wrapped = (state, action) => {
      const nextState = {
        [reducerRoot]: reducer(state, action)
      }
      return nextState
    }
    return wrapped
  },

  getProps(component) {
    const element = React.createElement(component)
    const rendered = shallow(element)
    return rendered.props()
  },

  nock() {
    return nock(API_ROOT)
  },

  findByKey(component, key) {
    return component.find(`[data-test-key="${key}"]`)
  },

  wait(callback) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          callback()
          resolve()
        } catch (err) {
          reject(err)
        }
      }, 1)
    })
  },

  mockStore: mockStore
}
