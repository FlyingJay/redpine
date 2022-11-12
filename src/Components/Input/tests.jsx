import sinon from 'sinon'
import { Input } from 'Components'
import { paths } from 'globals'

describe('Components/Input', () => {
  it('should display an error when rendered with one', () => {
    const callback = sinon.spy()
    const component = helpers.buildComponent(<Input error="error" />)
    const error = helpers.findByKey(component, 'input-error')
    const input = helpers.findByKey(component, 'input')
    expect(error.props()['data-has-error']).toEqual(true)
    expect(error.props().children).toEqual('error')
    expect(input.props()['data-has-error']).toEqual(true)
  })

  // it('should not hide the error div when not rendered', () => {
  //   const callback = sinon.spy()
  //   const component = helpers.buildComponent(<Input />)
  //   expect(component.find('[data-component-ref="input-error"]').length).toEqual(0)
  // })
})