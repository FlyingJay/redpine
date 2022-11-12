
export const MAX_UPLOAD_SIZE = 2500000
export const MAX_MUSIC_UPLOAD_SIZE = 15000000

export const getQueryParams = () => {
  return (/^[?#]/.test(window.location.search) ? window.location.search.slice(1) : window.location.search)
    .split('&')
    .reduce((params, param) => {
      let [ key, value ] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, { });
}

export const encodeQueryData = (data) => {
   const ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}

export const paths = {
                show: () => { return `/show` },
      forgotPassword: () => { return `/forgot-password` },
                home: () => { return `/home` },
               login: () => { return `/login` },
                  me: () => { return `${paths.users(`me`)}` },
              myActs: () => { return `${paths.me()}/acts` },
     myOrganizations: () => { return `${paths.me()}/organizations` },
             myShows: () => { return `${paths.me()}/shows` },
            myVenues: () => { return `${paths.me()}/venues` },
       notifications: () => { return `${paths.me()}/notifications` },
            messages: () => { return `${paths.me()}/messages` },
             pledges: () => { return `${paths.me()}/pledges` },
       privacyPolicy: () => { return `/privacy-policy` },
           promotion: () => { return `/promotion` },
         redPineTeam: () => { return `/our-team` },
            register: () => { return `/register` },
       registerEmail: () => { return `${paths.register()}/email` },
    registerFacebook: () => { return `${paths.register()}/facebook` },
       resetPassword: () => { return `/reset-password` },
             reviews: () => { return `${paths.me()}/reviews` },
         sellTickets: () => { return `/tickets/create` },
          showCreate: () => { return `/shows/create` },
            settings: () => { return `${paths.me()}/settings` },
             summary: () => { return `/summary` },
          termsOfUse: () => { return `/terms-of-use` },
             tickets: () => { return `${paths.me()}/tickets` },
         venueCreate: () => { return `/venues/create` },
    infoCrowdfunding: () => { return `/info/crowdfunding` },
       infoHeadliner: () => { return `/info/headliner` },
         infoBooking: () => { return `/info/booking` },
                info: () => { return `/info` },
 
                acts: (id) => { return `/acts/${id}` },
         actCalendar: (id) => { return `${paths.acts(id)}/calendar` },
            actStats: (id) => { return `${paths.acts(id)}/stats` },
               tours: (id) => { return `${paths.acts(id)}/tours` },
               shows: (id) => { return `/shows/${id}` },
           showStats: (id) => { return `${paths.shows(id)}/stats` },
             showHub: (id) => { return `${paths.shows(id)}/hub` },
           guestList: (id) => { return `${paths.shows(id)}/guests` },
       organizations: (id) => { return `/organizations/${id}` },
   organizationStats: (id) => { return `${paths.organizations(id)}/stats` },
organizationCalendar: (id) => { return `${paths.organizations(id)}/calendar` },
              venues: (id) => { return `/venues/${id}` },
       venueCalendar: (id) => { return `${paths.venues(id)}/calendar` },
          venueStats: (id) => { return `${paths.venues(id)}/stats` },
          offerSheet: (id) => { return `${paths.venues(id)}/offer-sheet` },
               users: (id) => { return `/users/${id}` },
              
         djangoAdmin: () => { return `${__API_BASE_URL__}/admin` },
         
                blog: () => { return `https://blog.redpinemusic.com` },
                help: () => { return `https://redpinemusic.com/help` },
     redpineFacebook: () => { return `https://www.facebook.com/redpineofficial/` },
    redpineInstagram: () => { return `https://www.instagram.com/redpineofficial/` },
      redpineTwitter: () => { return `https://twitter.com/redpineofficial` },
       statusTwitter: () => { return `https://twitter.com/redpinestatus` },
              square: () => { return `https://squareup.com/` },
         supportMail: () => { return `mailto:hello@redpinemusic.com` },
  
  search: (category='shows', query='', city=null, province=null, country=null, genre=null) => { 
    city = Number.isInteger(city) ? city : city && city.id
    province = Number.isInteger(province) ? province : province && province.id
    country = Number.isInteger(country) ? country : country && country.id
    genre = Number.isInteger(genre) ? genre : genre && genre.id
    return `/search?category=${category}&query=${query}${city ? `&city=${city}`: ``}${province ? `&province=${province}`:``}${country ? `&country=${country}`:``}${genre ? `&genre=${genre}`:``}` 
  },  
  baseURL: () => {
    return __WEBAPP_BASE_URL__
  },
  messageUser: (user) => { 
    return `${paths.messages()}?recipient=${user}`
  },
  messageRedPine: () => { 
    return `${paths.messages()}?recipient=1022`
  },
  showPromoter: (show,user) => { 
    return `/shows/${show}?promoter=${user}` 
  },
  showShareLink: (show,user=null) => {
    return __API_BASE_URL__ + `/v1${paths.shows(show)}/share/${user ? `?promoter=${user}` : ''}`
  },
  facebookOAuth: () => {
    return 'https://www.facebook.com/v2.9/dialog/oauth'
  },
  facebookLoginOAuth: () => {    
    const redirectUri = paths.facebookLoginRedirectURI()
    const clientId = __FACEBOOK_APP_ID__
    return `${paths.facebookOAuth()}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email`
  },
  facebookLoginRedirectURI: () => {
    const baseURL = paths.baseURL()
    return `${baseURL}/login?facebookCallback`
  },
  facebookRegistrationOAuth: () => {
    const redirectUri = paths.facebookRegistrationRedirectURI()
    const clientId = __FACEBOOK_APP_ID__
    return `${paths.facebookOAuth()}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email`
  },
  facebookRegistrationRedirectURI: () => {
    const baseURL = paths.baseURL()
    const registerFacebook = paths.registerFacebook()
    return `${baseURL}${registerFacebook}`
  }
}

export const helpers = {
  _decodeEntitiesDiv: document.createElement('div'),

  decodeHTMLEntities(str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      this._decodeEntitiesDiv.innerHTML = str;
      str = this._decodeEntitiesDiv.textContent;
      this._decodeEntitiesDiv.textContent = '';
    }

    return str;
  },

  pictures_first(list){
    let with_pictures = []
    let without_pictures = []
    list.forEach(obj => obj.picture ? with_pictures.push(obj) : without_pictures.push(obj))
    return with_pictures.concat(without_pictures)
  },

  headliners_first(list){
    let headliner = []
    let no_headliner = []
    list.forEach(obj => obj.is_headliner ? headliner.push(obj) : no_headliner.push(obj))
    return headliner.concat(no_headliner)
  },

  fast_reply_first(list){
    let fast_reply = []
    let no_fast_reply = []
    list.forEach(obj => obj.has_fast_reply ? fast_reply.push(obj) : no_fast_reply.push(obj))
    return fast_reply.concat(no_fast_reply)
  },

  is_promotion_first(list){
    let is_promotion = []
    let not_promotion = []
    list.forEach(obj => obj.is_promotion ? is_promotion.push(obj) : not_promotion.push(obj))
    return is_promotion.concat(not_promotion)
  },

  /** Shuffles array in place. ES6 version
    * @param {Array} a items An array containing the items */
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

export const validators = {
  ALL_THE_SHIT: () => { 
    return [
      /^[a-zA-Z0-9./<>?;:"'`\-!@#$%^&*()\[\]{}_\s+=|\\-ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ]+$|^$/, 
      "Cut it out with the weird characters."
    ] 
  },

  KEYBOARD: () => { return [/^[a-zA-Z0-9\t\n ./<>?;:"'`!@#$%^&*()\[\]{}_+=|\\-]+$|^$/i, "Only keyboard characters alowed."] },
  STANDARD_CHARACTERS: () => { return [/^[a-z\d\-_\s\.\']+$|^$/i, "Only A-Z/0-9/-/_/./' and spaces are available."] },

  LETTERS: () => { return [/[a-zA-Z\s]+$|^$/, "Only letters are allowed."] },
  EXTENDED_LETTERS: () => { 
    return [
      /^[a-zA-Z\-_ ’'‘ÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ]+$|^$/, 
      "Most alphabets are allowed."
    ] 
  },
  LETTERS_NUMBERS: () => { return [/^[a-zA-Z0-9]*$/, "Only letters and numbers are allowed."] },

  NUMBER: () => { return [/^(?:-?|$)(?:\d*|$)(?:\.?|$)(?:\d+|$)$/, "Must be a number."] },
  POSITIVE_NUMBER: () => { return [/^(?:\d*|$)(?:\.?|$)(?:\d+|$)$/,"Must be a positive number."] },
  NEGATIVE_NUMBER: () => { return [/^(?:-|$)(?:\d*|$)(?:\.?|$)(?:\d+|$)$/, "Must be a negative number."] },

  POSITIVE_DOLLAR: () => { return [/^(?:\d*|$)(?:\.?|$)(?:\d{1,2}|$)$/,"Must be a positive number with at most 2 decimals."] },

  INTEGER: () => { return [/^(?:-?|$)(?:\d+|$)$/, "Must be an integer."] },
  POSITIVE_INTEGER: () => { return [/^(?:\d+|$)$/, "Must be a positive integer."] },
  NEGATIVE_INTEGER: () => { return [/^(?:-|$)(?:\d+|$)$/, "Must be a negative integer."] }
}

export const analytics = {
  _key: __GOOGLE_ANALYTICS_PROPERTY__,

  pushPage(page_path) {
    if (window.gtag) {
      const key = this._key
      gtag('config', key, { page_path })
    }
  },

  pushEvent(eventName, params) {
    if (window.gtag) {
      gtag('event', eventName, params)
    }
  },

  pledgeOpenModal(campaign_id) {
    this.pushEvent('pledge_modal_open', {
      event_category: 'Pledge',
      event_label: campaign_id,
    })
  },

  pledgeSubmit(campaign_id) {
    this.pushEvent('pledge_submit', {
      event_category: 'Pledge',
      event_label: campaign_id
    })
  },

  pledgeSuccess(campaign_id) {
    this.pushEvent('pledge_success', {
      event_category: 'Pledge',
      event_label: campaign_id
    })
  },

  pledgeFailure(campaign_id) {
    this.pushEvent('pledge_failure', {
      event_category: 'Pledge',
      event_label: campaign_id
    })
  },

  playShowCitySelected() {
    this.pushEvent('play_show_city', {
      event_category: 'Play a Show',
      event_label: null,
    })
  },

  playShowVenueSelected() {
    this.pushEvent('play_show_venue', {
      event_category: 'Play a Show',
      event_label: null,
    })
  },

  playShowDaySelected() {
    this.pushEvent('play_show_day', {
      event_category: 'Play a Show',
      event_label: null,
    })
  },

  playShowActsSelected() {
    this.pushEvent('play_show_acts', {
      event_category: 'Play a Show',
      event_label: null,
    })
  },

  playShowSubmitted() {
    this.pushEvent('play_show_submitted', {
      event_category: 'Play a Show',
      event_label: null,
    })
  },

  justTicketsSubmitted() {
    this.pushEvent('just_tickets_submitted', {
      event_category: 'Just Tickets',
      event_label: null,
    })
  },

  userSignup() {
    this.pushEvent('user_signup', {
      event_category: 'User',
      event_label: null,
    })
  },
  
  actCreated() {
    this.pushEvent('act_created', {
      event_category: 'Acts',
      event_label: null,
    })
  },

  venueCreated() {
    this.pushEvent('venue_created', {
      event_category: 'Venues',
      event_label: null,
    })
  },

  bookingRequestApproved(campaign_id) {
    this.pushEvent('booking_request_approved', {
      event_category: 'Venues',
      event_label: campaign_id,
    })
  },

  bookingRequestRejected(campaign_id) {
    this.pushEvent('booking_request_rejected', {
      event_category: 'Venues',
      event_label: campaign_id,
    })
  },

  reviewSubmitted() {
    this.pushEvent('review_submitted', {
      event_category: 'Reviews',
      event_label: null,
    })
  },

  reviewResponded() {
    this.pushEvent('review_responded', {
      event_category: 'Reviews',
      event_label: null,
    })
  },

  actPaidArtists() {
    this.pushEvent('act_paid_artists', {
      event_category: 'Acts',
      event_label: null,
    })
  }
}
