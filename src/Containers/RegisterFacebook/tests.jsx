import sinon from 'sinon'
import { push } from 'react-router-redux'

import ConnectedEmailRegister, { EmailRegister } from './index.jsx'
import appActions from 'Containers/App/actions'
import constants from './constants'
import actions from './actions'
import { initialState } from './reducer'
import { paths } from 'globals'

describe('RegisterEmail', () => {
  let store
  let component

  beforeEach(() => {
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: '?code=code'
    })

    store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
    component = helpers.buildConnectedComponent(<ConnectedEmailRegister />, store)
  })

  it('should call submit with the form content', () => {
    api.facebookRegister = {
      create: sinon.stub().returns(Promise.resolve(true)),
    }

    api.logIn = sinon.stub().returns(Promise.resolve(true))
    const firstName = component.find('[name="first-name"]')
    const lastName = component.find('[name="last-name"]')
    const username = component.find('[name="username"]')
    const isArtist = component.find('[name="is-artist"]')
    const isVenue = component.find('[name="is-venue"]')
    const submit = component.find('[name="submit-registration"]')
    firstName.simulate('change', { target: { value: 'firstName' }})
    lastName.simulate('change', { target: { value: 'lastName' }})
    username.simulate('change', { target: { value: 'username' }})
    isArtist.simulate('click')
    isVenue.simulate('click')
    submit.simulate('click')

    expect(api.facebookRegister.create.args[0]).toEqual([{
      first_name:  'firstName',
      last_name: 'lastName',
      username: 'username',
      is_artist: true,
      is_venue: true,
      code: 'code',
      redirect_uri: paths.facebookRegistrationRedirectURI()
    }])
  })

  it('should log user in after submission', () => {
    Object.defineProperty(window.location, 'assign', {
      writable: true,
      value: sinon.stub()
    })

    const submit = component.find('[name="submit-registration"]')
    api.facebookRegister = {
      create: sinon.stub().returns(Promise.resolve(true))
    }

    api.logIn = sinon.stub().returns(Promise.resolve(true))
    submit.simulate('click')

    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1)
    })

    return promise.then(() => {
      const actionHistory = store.getActions()
      expect(actionHistory).toEqual([
        actions.startRegistration(),
        actions.registrationSuccess(),
      ])
      expect(window.location.assign.callCount).toEqual(1)
      expect(window.location.assign.getCall(0).args).toEqual([paths.facebookLoginOAuth()])
    })
  })

  it('should dispatch actions on registration failure', () => {
    const submit = component.find('[name="submit-registration"]')
    api.facebookRegister = {
      create: sinon.stub().returns(Promise.reject(true))
    }
    submit.simulate('click')

    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1)
    })

    return promise.then(() => {
      const actionHistory = store.getActions()
      expect(actionHistory).toEqual([
        actions.startRegistration(),
        actions.registrationFailure(true),
      ])
    })
  })
})