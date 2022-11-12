import sinon from 'sinon'
import { push } from 'react-router-redux'

import ConnectedTickets, { Tickets } from './index.jsx'
import appActions from 'Containers/App/actions'
import actions from './actions'
import constants from './constants'
import selectors from './selectors'
import { initialState, reducer } from './reducer'
import { paths, helpers as globalHelpers } from 'globals'
import { SexyButton } from 'Components'

describe('Tickets', () => {
  let treeReducer, component, store, tickets
  let setUp

  beforeEach(() => {
    tickets = [
      {
        "id": 2,
        "code": "957c583ec3b01baf",
        "pledge": {
          "id": 10,
          "total": "10.00",
          "count": 1,
          "campaign": {
            "id": 1,
            "title": "Test",
            "description": "test",
            "funding_start": "2017-07-28T03:19:17",
            "funding_end": "2017-07-29T03:19:18",
            "hashtag": "test",
            "picture": "http://localhost:8000/media/IMG_20170722_193210.jpg",
            "is_venue_approved": false,
            "bands": [
              {
                "id": 1,
                "is_headliner": true,
                "band": {
                  "id": 1,
                  "name": "Test Headliner",
                  "short_bio": "Test",
                  "is_redpine": false
                }
              }
            ],
            "timeslot": {
              "id": 1,
              "venue": {
                "id": 1,
                "title": "TEst",
                "description": "test",
                "capacity": 200,
                "address": "4218 Av. de l'Hôtel de Ville",
                "picture": "http://localhost:8000/media/flux-diagram.png",
                "web_link": null,
                "facebook_link": null,
                "twitter_link": null,
                "soundcloud_link": null,
                "instagram_link": null,
                "youtube_link": null,
                "managers": [],
                "city": {
                  "id": 1,
                  "name": "Montreal",
                  "province": {
                    "id": 1,
                    "name": "Quebec",
                    "country": {
                      "id": 1,
                      "name": "Canada"
                    }
                  }
                },
                "location": {
                  "type": "Point",
                  "coordinates": [
                    45.5199592,
                    -73.58041469999999
                  ]
                }
              },
              "description": "test",
              "asking_price": "2000.00",
              "min_headcount": 20,
              "start_time": "2017-07-29T03:18:52",
              "end_time": "2017-07-29T04:18:54",
              "last_day": "2017-08-06T20:27:04.335830",
              "booked": false
            },
            "funding_type": 0,
            "goal_amount": "200.00",
            "goal_count": 20,
            "tickets_sold": 25,
            "min_ticket_price": "10.00",
            "seating_type": 0,
            "total_earned": 250,
            "currency": "cad"
          },
          "bands": [
            1
          ],
          "is_cancelled": true
        }
      }
    ]

    api.ready = Promise.resolve()
    api.tickets = {
      query: sinon.stub().returns(Promise.resolve({
        results: tickets
      }))
    }

    treeReducer = helpers.buildTreeReducer(constants.REDUCER_ROOT, reducer)

    setUp = (state) => {
      if (!state) state = initialState
      store = helpers.buildStore(constants.REDUCER_ROOT, state, true)
      component = helpers.buildConnectedComponent(<ConnectedTickets />, store)
    }
  })

  describe('actions', () => {
    it('should load tickets immediately', () => {
      setUp()

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const storeActions = store.getActions()
            expect(storeActions).toEqual([
              actions.loadTicketsStart(),
              actions.loadTicketsSuccess(tickets)
            ])
            expect(api.tickets.query.callCount).toEqual(1)
            resolve()
          } catch (err) {
            reject(err)
          }
        }, 1)
      })
    })
  })

  describe('reducers', () => {
    it('should digest tickets', () => {
      setUp()
      const nextState = treeReducer(initialState, actions.loadTicketsSuccess(tickets))
      expect(selectors.selectTickets(nextState)).toEqual(tickets)
    })
  })
})