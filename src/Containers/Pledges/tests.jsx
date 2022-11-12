import sinon from 'sinon'
import { push } from 'react-router-redux'

import ConnectedPledges, { Pledges } from './index.jsx'
import appActions from 'Containers/App/actions'
import actions from './actions'
import constants from './constants'
import selectors from './selectors'
import { initialState, reducer } from './reducer'
import { paths, helpers as globalHelpers } from 'globals'

describe('Pledges', () => {
  let treeReducer, component, store, pledges, campaigns, campaignsObj
  let setUp

  beforeEach(() => {
    pledges = [
      { id: 1, campaign: 1, },
      { id: 2, campaign: 1, }
    ]

    campaigns = [
      { id: 1 }
    ]

    campaignsObj = {
      1: {
        bands: [{
          is_headliner: true,
          band: {}
        }],
        timeslot: {
          venue: {}
        },
      }
    }

    api.pledges = {
      query: sinon.stub().returns(Promise.resolve({ results: pledges })),
      delete: sinon.stub().returns(Promise.resolve())
    }

    api.campaigns = {
      query: sinon.stub().returns(Promise.resolve({ results: campaigns }))
    }

    api.user = 1
    api.ready = Promise.resolve()

    treeReducer = helpers.buildTreeReducer(constants.REDUCER_ROOT, reducer)

    setUp = (state) => {
      if (!state) state = initialState
      store = helpers.buildStore(constants.REDUCER_ROOT, state, true)
      component = helpers.buildConnectedComponent(<ConnectedPledges />, store)
    }
  })

  describe('actions', () => {
    it('should start loading pledges and campaigns after api is "ready"', () => {
      setUp()
      expect(store.getActions()[0]).toEqual(actions.loadPledgesStart())

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const storeActions = store.getActions()
            expect(api.pledges.query.callCount).toEqual(1)
            expect(api.pledges.query.getCall(0).args[0]).toEqual({
              user: api.user,
              expand: 'purchases,purchases.item'
            })
            expect(storeActions[1]).toEqual(actions.pledgesLoaded(pledges))
            expect(api.campaigns.query.callCount).toEqual(1)
            expect(api.campaigns.query.getCall(0).args[0]).toEqual({
              expand: 'timeslot,timeslot.venue,bands,bands.band',
              id__in: '1'
            })
            resolve()
          } catch (err) {
            reject(err)
          }
        }, 1)
      })

      return promise
    })

    it('should transition to pledges when any my tickets button is clicked', () => {
      globalHelpers.getCampaignProgress = sinon.stub().returns(120)
      setUp(initialState.set('pledges', pledges).set('campaigns', campaignsObj))
      component.find('[data-test-ref="tickets-btn-1"]').simulate('click')
      component.find('[data-test-ref="tickets-btn-2"]').simulate('click')
      const storeActions = store.getActions()
      expect(storeActions).toEqual([actions.loadPledgesStart(), push(paths.tickets()), push(paths.tickets())])
    })
  })

  describe('reducers', () => {
    it('should digest pledges', () => {
      setUp()
      const nextState = treeReducer(initialState, actions.pledgesLoaded(pledges))
      expect(selectors.selectPledges(nextState)).toEqual(pledges)
    })

    it('should digest campaigns (into an object)', () => {
      setUp()
      const nextState = treeReducer(initialState, actions.campaignsLoaded(campaigns))
      expect(selectors.selectCampaigns(nextState)).toEqual({1: campaigns[0]})
    })

    it('should digest pledge cancellation success (delete the cancelled pledge)', () => {
      const state = initialState.set('pledges', pledges).set('campaigns', campaignsObj)
      setUp(state)
      const nextState = treeReducer(state, actions.cancelPledgeSuccess(pledges[0]))
      expect(selectors.selectPledges(nextState)).toEqual([pledges[1]])
    })
  })
})