import sinon from 'sinon'
import { push } from 'react-router-redux'

import ConnectedForgotPassword, { ForgotPassword } from './index.jsx'
import appActions from 'Containers/App/actions'
import actions from './actions'
import constants from './constants'
import selectors from './selectors'
import { initialState, reducer } from './reducer'
import { paths } from 'globals'

describe('ForgotPassword', () => {
  let treeReducer

  beforeAll(() => {
    treeReducer = helpers.buildTreeReducer(constants.REDUCER_ROOT, reducer)
  })

  describe('actions', () => {
    it('should handle successful submission', () => {
      api.forgotPassword = {
        create: sinon.stub().returns(Promise.resolve())
      }

      const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
      const component = helpers.buildConnectedComponent(<ConnectedForgotPassword />, store)
      const submit = component.find('[data-test-key="submit-btn"]')
      const email = component.find('[data-test-key="email-field"]')
      const emailValue = 'test@fake.domain'
      email.simulate('change', { target: { value: emailValue }})
      submit.simulate('click')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const storeActions = store.getActions()
            expect(storeActions).toEqual([actions.submitSuccess()])
            expect(api.forgotPassword.create.callCount).toEqual(1)
            expect(api.forgotPassword.create.getCall(0).args).toEqual([{email: emailValue}])
            resolve()
          } catch (err) {
            reject(err)
          }
        }, 1)
      })
    })

    it('should handle failed submission', () => {
      api.forgotPassword = {
        create: sinon.stub().returns(Promise.reject({error: 'wat'}))
      }

      const store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
      const component = helpers.buildConnectedComponent(<ConnectedForgotPassword />, store)
      const submit = component.find('[data-test-key="submit-btn"]')
      const email = component.find('[data-test-key="email-field"]')
      const emailValue = 'test@fake.domain'
      email.simulate('change', { target: { value: emailValue }})
      submit.simulate('click')

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const storeActions = store.getActions()
            expect(storeActions).toEqual([actions.submitError({ error: 'wat'})])
            expect(api.forgotPassword.create.callCount).toEqual(1)
            expect(api.forgotPassword.create.getCall(0).args).toEqual([{email: emailValue}])
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
