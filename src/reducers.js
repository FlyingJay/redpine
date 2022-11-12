import ActReducer from './Containers/Acts/reducer'
import ActCalendarReducer from './Containers/ActCalendar/reducer'
import ActStatsReducer from './Containers/ActStats/reducer'
import ActProfileReducer from './Containers/Act/reducer'
import AppReducer from './Containers/App/reducer'
import BuyRedPineReducer from './Containers/BuyRedPine/reducer'
import Error404Reducer from './Containers/Error404/reducer'
import ForgotPasswordReducer from './Containers/ForgotPassword/reducer'
import GuestListReducer from './Containers/GuestList/reducer'
import HomeReducer from './Containers/Home/reducer'
import InfoCrowdfunding from './Containers/InfoCrowdfunding/reducer'
import InfoHeadliner from './Containers/InfoHeadliner/reducer'
import InfoBooking from './Containers/InfoBooking/reducer'
import LoginReducer from './Containers/Login/reducer'
import LandingPageReducer from './Containers/LandingPage/reducer'
import MessagesReducer from './Containers/Messages/reducer'
import NavBarReducer from './Containers/NavBar/reducer'
import NavJumpReducer from './Containers/NavJump/reducer'
import NotificationsReducer from './Containers/Notifications/reducer'
import OrganizationCalendarReducer from './Containers/OrganizationCalendar/reducer'
import OrganizationReducer from './Containers/Organization/reducer'
import OrganizationsReducer from './Containers/Organizations/reducer'
import OrganizationStatsReducer from './Containers/OrganizationStats/reducer'
import PledgeReducer from './Containers/Pledges/reducer'
import RegisterReducer from './Containers/Register/reducer'
import RegisterEmailReducer from './Containers/RegisterEmail/reducer'
import RegisterFacebookReducer from './Containers/RegisterFacebook/reducer'
import RegisterVenueListingsReducer from './Containers/RegisterVenueListings/reducer'
import ResetPasswordReducer from './Containers/ResetPassword/reducer'
import ReviewReducer from './Containers/Reviews/reducer'
import SearchPageReducer from './Containers/SearchPage/reducer'
import SettingsReducer from './Containers/Settings/reducer'
import ShowReducer from './Containers/Show/reducer'
import ShowStatusHeaderReducer from './Containers/ShowStatusHeader/reducer'
import ShowCreateReducer from './Containers/ShowCreate/reducer'
import ShowHubReducer from './Containers/ShowHub/reducer'
import ShowsReducer from './Containers/Shows/reducer'
import ShowStatsReducer from './Containers/ShowStats/reducer'
import SummaryPageReducer from './Containers/SummaryPage/reducer'
import TicketReducer from './Containers/Tickets/reducer'
import TourReducer from './Containers/Tours/reducer'
import VenueReducer from './Containers/Venues/reducer'
import VenueCalendarReducer from './Containers/VenueCalendar/reducer'
import VenueCreateReducer from './Containers/VenuesCreate/reducer'
import VenueOfferSheetReducer from './Containers/VenueOfferSheet/reducer'
import VenueStatsReducer from './Containers/VenueStats/reducer'
import VenueProfileReducer from './Containers/Venue/reducer'

import WidgetActShowsReducer from './Containers/Widgets/ActShows/reducer'
import WidgetCitiesReducer from './Containers/Widgets/Cities/reducer'
import WidgetOrganizationShowsReducer from './Containers/Widgets/OrganizationShows/reducer'
import WidgetVenueCalendarReducer from './Containers/Widgets/VenueCalendar/reducer'
import WidgetVenueShowsReducer from './Containers/Widgets/VenueShows/reducer'


export default {
  act: ActProfileReducer,
  actCalendar: ActCalendarReducer,
  acts: ActReducer,
  actStats: ActStatsReducer,
  app: AppReducer,
  buyRedPine: BuyRedPineReducer,
  error404: Error404Reducer,
  forgotPassword: ForgotPasswordReducer,
  guestList: GuestListReducer,
  home: HomeReducer,
  infoCrowdfunding: InfoCrowdfunding,
  infoHeadliner: InfoHeadliner,
  infoBooking: InfoBooking,
  login: LoginReducer,
  landingPage: LandingPageReducer,
  messages: MessagesReducer,
  navBar: NavBarReducer,
  navJump: NavJumpReducer,
  notifications: NotificationsReducer,
  organizationCalendar: OrganizationCalendarReducer,
  organization: OrganizationReducer,
  organizations: OrganizationsReducer,
  organizationStats: OrganizationStatsReducer,
  pledges: PledgeReducer,
  register: RegisterReducer,
  registerEmail: RegisterEmailReducer,
  registerFacebook: RegisterFacebookReducer,
  registerVenueListings: RegisterVenueListingsReducer,
  resetPassword: ResetPasswordReducer,
  reviews: ReviewReducer,
  search: SearchPageReducer,
  settings: SettingsReducer,
  showCreate: ShowCreateReducer,
  showHub: ShowHubReducer,
  show: ShowReducer,
  showStatusHeader: ShowStatusHeaderReducer,
  shows: ShowsReducer,
  showStats: ShowStatsReducer,
  summary: SummaryPageReducer,
  tickets: TicketReducer,
  tours: TourReducer,
  venue: VenueProfileReducer,
  venues: VenueReducer,
  venueCalendar: VenueCalendarReducer,
  venueCreate: VenueCreateReducer,
  venueOfferSheet: VenueOfferSheetReducer,
  venueStats: VenueStatsReducer,

  widgetActShows: WidgetActShowsReducer,
  widgetCities: WidgetCitiesReducer,
  widgetOrganizationShows: WidgetOrganizationShowsReducer,
  widgetVenueCalendar: WidgetVenueCalendarReducer,
  widgetVenueShows: WidgetVenueShowsReducer
}
