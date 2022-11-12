import sinon from 'sinon'
import Decimal from 'decimal.js'
import { push } from 'react-router-redux'
import { mount } from 'enzyme'

import ConnectedCampaign, { Show, GoingToSee } from './index.jsx'
import appActions from 'Containers/App/actions'
import actions from './actions'
import constants from './constants'
import selectors from './selectors'
import { initialState as appInitialState } from 'Containers/App/reducer'
import { initialState, reducer } from './reducer'
import { paths } from 'globals'

describe('GoingToSee', () => {

  let treeReducer, store, component, inner

  // it('should call onChange with the appropriate bands', () => {
  //   function band(id, name) {
  //     return {
  //       id,
  //       band: {
  //         name
  //       }
  //     }
  //   }

  //   const bands = [
  //     band(1, '1'),
  //     band(2, '2'),
  //     band(3, '3')
  //   ]

  //   const stub = sinon.stub()

  //   // selects the band and makes an assertion for the onChange event
  //   const clickAndAssert = (id, assertion) => {
  //     component.find(`div[data-test-key="campaign-band-${id}"]`).find('input').simulate('change')
  //     sinon.assert.calledWith(stub, assertion)
  //   }

  //   component = mount(<GoingToSee bands={bands} onChange={stub} />)
  //   clickAndAssert(1, [bands[0]])
  //   clickAndAssert(1, [])
  //   clickAndAssert(2, [bands[1]])
  //   clickAndAssert(3, [bands[1], bands[2]])
  //   clickAndAssert(2, [bands[2]])
  // })
})

// describe('Campaign', () => {
//   let treeReducer, store, component, inner, setUp, defaultState

//   beforeEach(() => {
//     stripe.elements = sinon.stub().returns({
//       create: sinon.stub().returns({
//         mount: sinon.stub()
//       })
//     })

//     api.campaigns = {
//       get: sinon.stub().returns(Promise.resolve({}))
//     }

//     defaultState = initialState
//       .set('campaign', {
//         id: 1,
//         min_ticket_price: '10.00',
//         timeslot: {
//           venue: {}
//         },
//       })

//     setUp = (state) => {
//       treeReducer = helpers.buildTreeReducer(constants.REDUCER_ROOT, reducer)
//       store = helpers.mockStore(state)
//       component = helpers.buildConnectedComponent(<ConnectedCampaign match={{params: { campaignId: 1 }}}/>, store)
//       inner = component.find(Campaign)
//     }

//     setUp({
//       app: appInitialState.set('authenticated', false),
//       [constants.REDUCER_ROOT]: defaultState
//     })
//   })

//   describe('state', () => {

//   })

//   describe('actions', () => {

//     // it('should handle successful pledge', () => {

//     //   setUp({
//     //     app: appInitialState.set('authenticated', true),
//     //     [constants.REDUCER_ROOT]: defaultState
//     //   })
      
//     //   const bands = [{
//     //     id: 1,
//     //     band: {}
//     //   }, {
//     //     id: 2,
//     //     is_headliner: true,
//     //     band: {}
//     //   }]

//     //   component.find(GoingToSee).props().onChange(bands)

//     //   stripe.createToken = sinon.stub().returns(Promise.resolve({
//     //     token: {
//     //       id: 'tok'
//     //     }
//     //   }))

//     //   api.pledges = {
//     //     create: sinon.stub().returns(Promise.resolve())
//     //   }

//     //   helpers.findByKey(component, 'num-tickets').simulate('change', { target: { value: '2' }})
//     //   component.find('[data-test-key="submit-pledge"]').simulate('click')

//     //   const promise = new Promise((resolve, reject) => {
//     //     setTimeout(function () {
//     //       try {
//     //         const call = api.pledges.create.getCall(0).args[0]
//     //         const storeActions = store.getActions()

//     //         expect(call).toEqual({
//     //           total: '20',
//     //           count: 2,
//     //           campaign: 1,
//     //           bands: [1, 2],
//     //           token: 'tok'
//     //         })

//     //         expect(storeActions[storeActions.length - 1]).toEqual(push(paths.pledges()))

//     //         resolve()
//     //       } catch (err) {
//     //         reject(err)
//     //       }
//     //     }, 1)
//     //   })

//     //   return promise
//     // })

//     it('should not submit pledge if there was a stripe error', () => {
//       stripe.createToken = sinon.stub().returns(Promise.resolve({
//         error: {
//           message: 'derp you fucked up'
//         }
//       }))

//       api.pledges = {
//         create: sinon.stub().returns(Promise.resolve())
//       }

//       component.find('[data-test-key="submit-pledge"]').simulate('click')

//       const promise = new Promise((resolve, reject) => {
//         setTimeout(function () {
//           try {
//             expect(api.pledges.create.callCount).toEqual(0)
//             const storeActions = store.getActions()
//             expect(storeActions[storeActions.length - 2]).toEqual(actions.pledgeTokenError({message: 'derp you fucked up'}))
//             expect(storeActions[storeActions.length - 1]).toEqual(actions.pledgeLock(false))
//             resolve()
//           } catch (err) {
//             reject(err)
//           }
//         }, 1)
//       })

//       return promise
//     })

//     it('should handle failed pledge', () => {
//       stripe.createToken = sinon.stub().returns(Promise.resolve({
//         token: {
//           id: 1
//         }
//       }))

//       api.pledges = {
//         create: sinon.stub().returns(Promise.reject('err'))
//       }

//       component.find('[data-test-key="submit-pledge"]').simulate('click')

//       const promise = new Promise((resolve, reject) => {
//         setTimeout(function () {
//           try {
//             const storeActions = store.getActions()
//             expect(storeActions[storeActions.length - 2]).toEqual(actions.pledgeCreationError('err'))
//             expect(storeActions[storeActions.length - 1]).toEqual(actions.pledgeLock(false))
//             resolve()
//           } catch (err) {
//             reject(err)
//           }
//         }, 1)
//       })

//       return promise
//     })

//     it('should set the pledge lock if user has already submitted the pledge', () => {
//       stripe.createToken = sinon.stub().returns(Promise.resolve({
//         token: {
//           id: 'tok'
//         }
//       }))

//       api.pledges = {
//         create: sinon.stub().returns(Promise.resolve())
//       }

//       component.find('[data-test-key="submit-pledge"]').simulate('click')

//       const storeActions = store.getActions()
//       expect(storeActions[storeActions.length - 1]).toEqual(actions.pledgeLock(true))
//     })

//     it('should not allow user to submit a pledge if pledge lock is enabled', () => {
//       const initState = initialState
//         .set('pledgeLock', true)

//       store = helpers.buildStore(constants.REDUCER_ROOT, initState, true)
//       component = helpers.buildConnectedComponent(<ConnectedCampaign match={{params: { campaignId: 1 }}}/>, store)
//       store.dispatch(actions.pledgeLock(true))

//       stripe.createToken = sinon.stub().returns(Promise.resolve({
//         token: {
//           id: 1
//         }
//       }))

//       api.pledges = {
//         create: sinon.stub().returns(Promise.resolve('wat'))
//       }

//       component.find('[data-test-key="submit-pledge"]').simulate('click')
//       expect(stripe.createToken.callCount).toEqual(0)
//     })

//     it('should transition to headliner band profile', () => {
//       const initState = initialState
//         .set('campaign', {
//           bands: [{
//             is_headliner: true,
//             id: 1,
//             band: {
//               id: 2
//             }
//           }],
//           timeslot: {
//             venue: {}
//           }
//         })

//       store = helpers.buildStore(constants.REDUCER_ROOT, initState, true)
//       component = helpers.buildConnectedComponent(<ConnectedCampaign match={{params: { campaignId: 1 }}}/>, store)

//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           try {
//             helpers.findByKey(component, 'headliner-link').simulate('click')
//             const storeActions = store.getActions()
//             expect(storeActions[2]).toEqual(push(paths.acts(2)))
//             resolve()
//           } catch (err) {
//             reject(err)
//           }
//         }, 1)
//       })
//     })

//     it('should transition to non-headliner band profile', () => {
//       const initState = initialState
//         .set('campaign', {
//           bands: [{
//             is_headliner: true,
//             id: 1,
//             band: {
//               id: 2
//             }
//           }, {
//             is_headliner: false,
//             id: 2,
//             band: {
//               id: 3
//             }
//           }],
//           timeslot: {
//             venue: {}
//           }
//         })

//       store = helpers.buildStore(constants.REDUCER_ROOT, initState, true)
//       component = helpers.buildConnectedComponent(<ConnectedCampaign match={{params: { campaignId: 1 }}}/>, store)

//       return new Promise((resolve, reject) => {
//         setTimeout(() => {
//           try {
//             const storeActions = store.getActions()
//             helpers.findByKey(component, `band-link-3`).simulate('click')
//             expect(storeActions[2]).toEqual(push(paths.acts(3)))
//             resolve()
//           } catch (err) {
//             reject(err)
//           }
//         }, 1)
//       })
//     })

//     // it('should transition to venue profile', () => {
//     //   const initState = initialState
//     //     .set('campaign', {
//     //       bands: [{
//     //         is_headliner: true,
//     //         id: 1,
//     //         band: {
//     //           id: 2
//     //         }
//     //       }, {
//     //         is_headliner: false,
//     //         id: 2,
//     //         band: {
//     //           id: 3
//     //         }
//     //       }],
//     //       timeslot: {
//     //         venue: {
//     //           id: 1
//     //         }
//     //       }
//     //     })

//     //   store = helpers.buildStore(constants.REDUCER_ROOT, initState, true)
//     //   component = helpers.buildConnectedComponent(<ConnectedCampaign match={{params: { campaignId: 1 }}}/>, store)

//     //   return new Promise((resolve, reject) => {
//     //     setTimeout(() => {
//     //       try {
//     //         const storeActions = store.getActions()
//     //         helpers.findByKey(component, `venue-link`).simulate('click')
//     //         expect(storeActions[2]).toEqual(push(paths.venues(1)))
//     //         resolve()
//     //       } catch (err) {
//     //         reject(err)
//     //       }
//     //     }, 1)
//     //   })
//     // })
//   })

//   describe('reducers', () => {
//     it('should digest campaign', () => {
//       const nextState = treeReducer(initialState, actions.campaignLoaded({id: 1}))
//       expect(selectors.selectCampaign(nextState).id).toEqual(1)
//     })

//     it('should digest pledgeLock', () => {

//     })

//     it('should digest pledgeError', () => {

//     })
//   })
// })

describe('Campaign', () => {
  it('chillz cause we aint done building yet', () => {

  })
})