import moment from 'moment'
import { helpers } from 'globals'

describe('globals', () => {
  describe('helpers', () => {
    describe('getTimeslotTimeRemaining', () => {
      it('should return the appropriate days', () => {
        let end_time = moment().add(9, 'days').add(30, 'seconds').toISOString()
        expect(helpers.timeRemaining(end_time)).toEqual('9 Days')
      })

      it('should return the appropriate hours', () => {
        let end_time = moment().add(5, 'hours').add(30, 'seconds').toISOString()
        expect(helpers.timeRemaining(end_time)).toEqual('5 Hours')
      })

      it('should return the appropriate minutes', () => {
        let end_time = moment().add(53, 'minutes').add(30, 'seconds').toISOString()
        expect(helpers.timeRemaining(end_time)).toEqual('53 Minutes')
      })

      it('should return the appropriate seconds', () => {
        let end_time = moment().add(34, 'seconds').add(500, 'milliseconds').toISOString()
        expect(helpers.timeRemaining(end_time)).toEqual('34 Seconds')
      })
    })
  })
})