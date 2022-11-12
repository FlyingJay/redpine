import sinon from 'sinon'
import { shallow } from 'enzyme'
import { Ticket } from './index.jsx'


describe('Ticket', () => {
  it('should return null if there is no ticket passed down', () => {
    const component = shallow(<Ticket ticket={null} />)
    expect(component.type()).toEqual(null)
  })
})