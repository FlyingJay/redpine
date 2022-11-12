import sinon from 'sinon'
import { shallow } from 'enzyme'
import { Modal } from './index.jsx'
import { paths } from 'globals'

describe('Components/Modal', () => {
  it('should trigger onClose when close btn is clicked', () => {
    const test = sinon.stub()
    const component = shallow(<Modal onClose={() => test()} />)
    helpers.findByKey(component, 'close-btn').simulate('click')
    expect(test.callCount).toEqual(1)
  })

  it('should be displayed when the `show` prop is true', () => {
    const component = shallow(<Modal show={true}><div data-test-key="inner" /></Modal>)
    expect(helpers.findByKey(component, 'container').length).toEqual(1)
    expect(helpers.findByKey(component, 'close-btn').length).toEqual(1)
    expect(helpers.findByKey(component, 'inner').length).toEqual(1)
    const container = helpers.findByKey(component, 'container')
    expect(container.props().show).toEqual(true)
  })

  it('should be hidden when the `show` prop is false', () => {
    const component = shallow(<Modal show={false}><div data-test-key="inner" /></Modal>)
    expect(helpers.findByKey(component, 'container').length).toEqual(1)
    expect(helpers.findByKey(component, 'close-btn').length).toEqual(1)
    expect(helpers.findByKey(component, 'inner').length).toEqual(1)
    const container = helpers.findByKey(component, 'container')
    expect(container.props().show).toEqual(false)
  })
})