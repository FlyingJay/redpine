import sinon from 'sinon'
import { FormError } from './index.jsx'
import { paths } from 'globals'

describe('Components/Error', () => {
  it('should not display initially', () => {
    const component = helpers.buildComponent(<FormError />)
    expect(component.state('show')).toEqual(false)
  })

  it('should display when an error is passed to it', () => {
    const component = helpers.buildComponent(<FormError />)
    component.setProps({
      error: 'error'
    })
    expect(component.state('show')).toEqual(true)
  })

  it('should hide the error after it is clicked', () => {
    const component = helpers.buildComponent(<FormError />)
    component.setProps({
      error: 'error'
    })
    component.simulate('click')
    expect(component.state('show')).toEqual(false)
    expect(component.state('error')).toEqual(null)
  })

  it('should display when the same error has been passed down (after it was hidden)', () => {
    const component = helpers.buildComponent(<FormError />)
    component.setProps({
      error: 'error'
    })
    component.simulate('click')
    component.setProps({
      error: 'error'
    })
    expect(component.state('show')).toEqual(true)
    expect(component.state('error')).toEqual('error')
  })
})