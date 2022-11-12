import React from 'react'
import thunk from 'redux-thunk'
import RedPineAPIClient from 'redpine-api-client'
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { Redirect, Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore, routerReducer, routerMiddleware , push } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import containers from 'Containers'
import reducers from './reducers'
import appActions from 'Containers/App/actions'
import appSelectors from 'Containers/App/selectors'
import { paths, analytics } from 'globals'
import { Header } from 'Components'


const api = new RedPineAPIClient(__API_BASE_URL__ + '/v1')
const browserHistory = createBrowserHistory()
const historyMiddleware = routerMiddleware(browserHistory)

reducers.routing = routerReducer
browserHistory.listen((location) => analytics.pushPage(location.pathname))

const store = createStore(
  combineReducers(reducers),
  composeWithDevTools( 
    applyMiddleware(
      historyMiddleware,
      thunk.withExtraArgument(api)
    )
  )
)

// replace hashbang URLs (for S3 404 redirection)
const path = (/#(\/.*)$/.exec(location.hash) || [])[1]
if (path) store.dispatch(push(path))

api.ready.then(() => {
  store.dispatch(appActions.setAuth(!!api.token))

  api.addEventListener(api.EVENTS.SESSION_EXPIRED, () => {
    store.dispatch(appActions.sessionExpired())
  })
})

class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Switch>
            <Redirect exact from="/" to="/info" />

            {/* iFrame Widgets */}
            <Route name="widgetActShows" path="/widgets/acts/:actId/shows" component={containers.WidgetActShows} />
            <Route name="widgetCities" path="/widgets/cities" component={containers.WidgetCities} />
            <Route name="widgetOrganizationShows" path="/widgets/organizations/:organizationId/shows" component={containers.WidgetOrganizationShows} />
            <Route name="widgetSubscribe" path="/widgets/subscribe" component={containers.WidgetSubscribe} />
            <Route name="widgetVenueCalendar" path="/widgets/venues/:venueId/calendar" component={containers.WidgetVenueCalendar} />
            <Route name="widgetVenueShows" path="/widgets/venues/:venueId/shows" component={containers.WidgetVenueShows} />


            <Route name="privacy-policy" path={paths.privacyPolicy()} component={containers.PrivacyPolicy} />
            <Route name="terms-of-use" path={paths.termsOfUse()} component={containers.TermsOfUse} />
            <Route name="login" path={paths.login()} component={containers.Login} />
            <Route name="register-email" path={paths.registerEmail()} component={containers.RegisterEmail} />
            <Route name="register" path={paths.register()} component={containers.RegisterEmail} />
            <Route name="forgotPassword" path={paths.forgotPassword()} component={containers.ForgotPassword} />
            <Route name="resetPassword" path={paths.resetPassword()} component={containers.ResetPassword} />
            <Route name="home" path={paths.home()} component={containers.Home} />
            <Route name="showCreate" path={paths.showCreate()} component={containers.ShowCreate} />
            <Route name="campaignStats" path="/campaigns/:campaignId/stats" component={containers.ShowStats} />
            <Route name="showStats" path="/shows/:campaignId/stats" component={containers.ShowStats} />
            <Route name="campaignHub" path="/campaigns/:campaignId/hub" component={containers.ShowHub} />
            <Route name="showHub" path="/shows/:campaignId/hub" component={containers.ShowHub} />
            <Route name="guestList" path="/shows/:campaignId/guests" component={containers.GuestList} />
            <Route name="campaign" path="/campaigns/:campaignId" component={containers.Show} />
            <Route name="show" path="/shows/:campaignId" component={containers.Show} />
            <Route name="show_special" path="/royalmountainrecordsgoodbyetosummerbbq" component={containers.Show} />
            <Route name="actStats" path={paths.actStats(':actId')} component={containers.ActStats} />
            <Route name="actCalendar" path="/acts/:actId/calendar" component={containers.ActCalendar} />
            <Route name="tours" path="/acts/:actId/tours" component={containers.Tours} />
            <Route name="act" path="/acts/:actId" component={containers.Act} />
            <Route name="venueCreate" path="/venues/create" component={containers.VenuesCreate} />
            <Route name="tickets" path="/users/:userId/tickets" component={containers.Tickets} />
            <Route name="pledges" path="/users/:userId/pledges" component={containers.Pledges} />
            <Route name="sellTickets" path="/tickets" component={containers.SellTickets} />
            <Route name="sellTickets" path={paths.sellTickets()} component={containers.SellTickets} />
            <Route name="infoCrowdfunding" path={paths.infoCrowdfunding()} component={containers.InfoCrowdfunding}/>
            <Route name="infoHeadliner" path={paths.infoHeadliner()} component={containers.InfoHeadliner}/>
            <Route name="infoBooking" path={paths.infoBooking()} component={containers.InfoBooking}/>
            <Route name="landingPage" path="/info" component={containers.LandingPage} />
            <Route name="shows" path="/users/:userId/shows" component={containers.Shows} />
            <Route name="venueStats" path={paths.venueStats(':venueId')} component={containers.VenueStats} />
            <Route name="venues" path="/users/:userId/venues" component={containers.Venues} />
            <Route name="organizationCalendar" path="/organizations/:organizationId/calendar" component={containers.OrganizationCalendar} />
            <Route name="organizationStats" path={paths.organizationStats(':organizationId')} component={containers.OrganizationStats} />
            <Route name="organization" path="/organizations/:organizationId" component={containers.Organization} />
            <Route name="organizations" path="/users/:userId/organizations" component={containers.Organizations} />
            <Route name="reviews" path="/users/:userId/reviews" component={containers.Reviews} />
            <Route name="settings" path="/users/:userId/settings" component={containers.Settings} />
            <Route name="acts" path="/users/:userId/acts" component={containers.Acts} />
            <Route name="notifications" path="/users/:userId/notifications" component={containers.Notifications} />
            <Route name="messages" path="/users/:userId/messages" component={containers.Messages} />
            <Route name="user" path="/users/:userId" component={containers.User} />
            <Route name="venueBookingCalendar" path="/venues/:venueId/booking-calendar" component={containers.WidgetVenueCalendar} />
            <Route name="venueCalendar" path="/venues/:venueId/calendar" component={containers.VenueCalendar} />
            <Route name="venueOfferSheet" path="/venues/:venueId/offer-sheet" component={containers.VenueOfferSheet} />
            <Route name="venue" path="/venues/:venueId" component={containers.Venue} />
            <Route name="search" path="/search" component={containers.SearchPage} />
            <Route name="promotion" path="/promotion" component={containers.Promotion} />
            <Route name="summary" path={paths.summary()} component={containers.SummaryPage} />
            <Route name="redPineTeam" path={paths.redPineTeam()} component={containers.RedPineTeam} />

            {/* Venue Listings App */}
            <Route name="booking" path="/booking" component={containers.Booking} />
            <Route name="djs" path="/djs" component={containers.Djs} />

            {/* Venue Listings App */}
            <Route name="venue-listings" path="/venue-listings" component={containers.RegisterVenueListings} />

            {/* Not found. */}
            <Route name="error404" path={'*'} component={containers.Error404} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

var div = document.createElement('div')
div.id = 'app'
document.body.appendChild(div)
render(<App/>, document.getElementById('app'))
