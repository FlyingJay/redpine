import sinon from 'sinon'
import { Checkbox } from './index.jsx'
import { paths } from 'globals'

describe('Components/Checkbox', () => {
  it('should fire the callback when clicked', () => {
    const callback = sinon.spy()
    const component = helpers.buildComponent(<Checkbox name='checkbox-container' onChange={callback} />)
    const container = component.find('[name="checkbox-container"]')
    expect(container.root.state().checked).toEqual(false)
    container.simulate('click')
    expect(callback.callCount).toEqual(1)
    expect(container.root.state().checked).toEqual(true)
    expect(callback.calledWith(true)).toEqual(true)
    container.simulate('click')
    expect(callback.callCount).toEqual(2)
    expect(container.root.state().checked).toEqual(false)
    expect(callback.calledWith(false)).toEqual(true)
  })
})