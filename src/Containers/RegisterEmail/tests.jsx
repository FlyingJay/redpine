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
    store = helpers.buildStore(constants.REDUCER_ROOT, initialState, true)
    component = helpers.buildConnectedComponent(<ConnectedEmailRegister />, store)
  })

  it('should transition to register page when register is clicked', () => {
    const register = component.find('[name="register"]')
    register.simulate('click')
    const actions = store.getActions()
    expect(actions[0]).toEqual(push(paths.register()))
  })

  it('should transition to login page', () => {
    const login = component.find('[name="login"]')
    login.simulate('click')
    const actions = store.getActions()
    expect(actions[0]).toEqual(push(paths.login()))
  })

  it('should call submit with the form content', () => {
    api.register = {
      create: sinon.stub().returns(Promise.resolve(true)),
    }

    api.logIn = sinon.stub().returns(Promise.resolve(true))
    const firstName = component.find('[name="first-name"]')
    const lastName = component.find('[name="last-name"]')
    const email = component.find('[name="email"]')
    const username = component.find('[name="username"]')
    const password = component.find('[name="password"]')
    const isArtist = component.find('[name="is-artist"]')
    const isVenue = component.find('[name="is-venue"]')
    firstName.simulate('change', { target: { value: 'firstName' }})
    lastName.simulate('change', { target: { value: 'lastName' }})
    email.simulate('change', { target: { value: 'email' }})
    username.simulate('change', { target: { value: 'username' }})
    password.simulate('change', { target: { value: 'password' }})
    isArtist.simulate('click')
    isVenue.simulate('click')

    const submit = component.find('[name="submit-registration"]')
    submit.simulate('click')

    expect(api.register.create.args[0]).toEqual([{
      first_name:  'firstName',
      last_name: 'lastName',
      email: 'email',
      username: 'username',
      password: 'password',
      is_artist: true,
      is_venue: true,
      first_section_vis: true,
      second_section_vis: false
    }])
  })

  it('should log user in after submission', () => {
    const firstName = component.find('[name="first-name"]')
    const lastName = component.find('[name="last-name"]')
    const email = component.find('[name="email"]')
    const username = component.find('[name="username"]')
    const password = component.find('[name="password"]')
    api.register = {
      create: sinon.stub().returns(Promise.resolve(true))
    }

    api.logIn = sinon.stub().returns(Promise.resolve(true))

    firstName.simulate('change', { target: { value: 'firstName' }})
    lastName.simulate('change', { target: { value: 'lastName' }})
    email.simulate('change', { target: { value: 'email' }})
    username.simulate('change', { target: { value: 'username' }})
    password.simulate('change', { target: { value: 'password' }})

    const submit = component.find('[name="submit-registration"]')
    submit.simulate('click')

    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1)
    })

    return promise.then(() => {
      const actionHistory = store.getActions()
      expect(api.logIn.args[0]).toEqual(['email', 'password'])
      expect(actionHistory).toEqual([
        actions.startRegistration(),
        actions.registrationSuccess(),
        appActions.setAuth(true),
        push(paths.home())
      ])
    })
  })

  it('should redirect user to login page if login fails', () => {
    const firstName = component.find('[name="first-name"]')
    const lastName = component.find('[name="last-name"]')
    const email = component.find('[name="email"]')
    const username = component.find('[name="username"]')
    const password = component.find('[name="password"]')

    api.register = {
      create: sinon.stub().returns(Promise.resolve(true))
    }

    api.logIn = sinon.stub().returns(Promise.reject(true))
    firstName.simulate('change', { target: { value: 'firstName' }})
    lastName.simulate('change', { target: { value: 'lastName' }})
    email.simulate('change', { target: { value: 'email' }})
    username.simulate('change', { target: { value: 'username' }})
    password.simulate('change', { target: { value: 'password' }})

    const submit = component.find('[name="submit-registration"]')
    submit.simulate('click')

    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 1)
    })

    return promise.then(() => {
      const actionHistory = store.getActions()
      expect(actionHistory).toEqual([
        actions.startRegistration(),
        actions.registrationSuccess(),
        push(paths.login())
      ])
    })
  })

  it('should dispatch actions on registration failure', () => {
    api.register = {
      create: sinon.stub().returns(Promise.reject(true))
    }
    const firstName = component.find('[name="first-name"]')
    const lastName = component.find('[name="last-name"]')
    const email = component.find('[name="email"]')
    const username = component.find('[name="username"]')
    const password = component.find('[name="password"]')

    firstName.simulate('change', { target: { value: 'firstName' }})
    lastName.simulate('change', { target: { value: 'lastName' }})
    email.simulate('change', { target: { value: 'email' }})
    username.simulate('change', { target: { value: 'username' }})
    password.simulate('change', { target: { value: 'password' }})

    const submit = component.find('[name="submit-registration"]')
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