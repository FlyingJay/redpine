import sinon from 'sinon'
import { push } from 'react-router-redux'
import { shallow } from 'enzyme'

import ConnectedResetPassword, { ResetPassword } from './index.jsx'
import appActions from 'Containers/App/actions'
import actions from './actions'
import constants from './constants'
import selectors from './selectors'
import { initialState, reducer } from './reducer'
import { paths } from 'globals'

describe('ResetPassword', () => {
  let treeReducer

  beforeAll(() => {
    treeReducer = helpers.buildTreeReducer(constants.REDUCER_ROOT, reducer)

    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?token=token&email=email'
    })
  })

  describe('state', () => {
    it('should digest token', () => {
      const component = shallow(<ResetPassword />)
      expect(component.state('token')).toEqual('token')
    })

    it('should digest email', () => {
      const component = shallow(<ResetPassword />)
      expect(component.state('email')).toEqual('email')
    })
  })

  describe('actions', () => {

    it('should transition to reset password page when "login" button is clicked', () => {
      const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
      const component = helpers.buildConnectedComponent(<ConnectedResetPassword />, store)
      const login = component.find('[data-test-key="reset-password-login-btn"]')

      login.simulate('click')

      const actions = store.getActions()
      expect(actions[0]).toEqual(push(paths.login()))
    })

    it('should handle successful submission', () => {
      api.resetPassword = {
        create: sinon.stub().returns(Promise.resolve())
      }

      const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
      const component = helpers.buildConnectedComponent(<ConnectedResetPassword />, store)
      const submit = component.find('[data-test-key="submit-btn"]')
      const email = component.find('[data-test-key="email-field"]')
      const password = helpers.findByKey(component, 'password-field')
      const token = helpers.findByKey(component, 'token-field')
      const emailValue = 'test@fake.domain'
      email.simulate('change', { target: { value: emailValue }})
      token.simulate('change', { target: { value: 'token' }})
      password.simulate('change', { target: { value: 'password' }})
      submit.simulate('click')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const storeActions = store.getActions()
            expect(storeActions).toEqual([actions.submitSuccess()])
            expect(api.resetPassword.create.callCount).toEqual(1)
            expect(api.resetPassword.create.getCall(0).args).toEqual([{email: emailValue, password: 'password', token: 'token' }])
            resolve()
          } catch (err) {
            reject(err)
          }
        }, 1)
      })
    })

    it('should handle failed submission', () => {
      api.resetPassword = {
        create: sinon.stub().returns(Promise.reject({error: 'wat'}))
      }

      const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
      const component = helpers.buildConnectedComponent(<ConnectedResetPassword />, store)
      const submit = component.find('[data-test-key="submit-btn"]')
      const email = component.find('[data-test-key="email-field"]')
      const password = helpers.findByKey(component, 'password-field')
      const token = helpers.findByKey(component, 'token-field')
      const emailValue = 'test@fake.domain'
      email.simulate('change', { target: { value: emailValue }})
      token.simulate('change', { target: { value: 'token' }})
      password.simulate('change', { target: { value: 'password' }})
      submit.simulate('click')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const storeActions = store.getActions()
            expect(storeActions).toEqual([actions.submitError({ error: 'wat'})])
            expect(api.resetPassword.create.callCount).toEqual(1)
            expect(api.resetPassword.create.getCall(0).args).toEqual([{email: emailValue, password: 'password', token: 'token' }])
            resolve()
          } catch (err) {
            reject(err)
          }
        }, 1)
      })
    })
  })

  describe('reducers', () => {
    it('should handle errors properly', () => {
      const state = initialState
      const nextState = treeReducer(state, actions.submitError('err'))
      const err = selectors.selectError(nextState)
      expect(err).toEqual('err')
    })

    it('should handle success properly', () => {
      const state = initialState
      const nextState = treeReducer(state, actions.submitSuccess())
      const success = selectors.selectSuccess(nextState)
      expect(success).toEqual(true)
    })
  })
})
