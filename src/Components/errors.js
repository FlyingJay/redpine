import appActions from 'Containers/App/actions'

const e = {
	DEFAULT_ERROR: 'Something went wrong on our end! If this problem persists please contact RedPine and we\'ll make sure to sort it out for you.',
  DEFINITELY_REDPINES_FAULT_ERROR: 'It seems RedPine is missing something :( Sorry about the inconvenience, let us know where you found this message and we\'ll fix it as soon as we can.',

  INVALID_URL_ERROR: 'Invalid URL format. Your link should look similar to: ',
  INVALID_URL_DETAILS: {
    website:"https://www.mywebsite.com",
    facebook:"https://www.facebook.com/my_page",
    twitter:"https://www.twitter.com/my_page",
    instagram:"https://www.instagram.com/my_page",
    spotify:"https://open.spotify.com/artist/my_page",
    soundcloud:"https://www.soundcloud.com/my_page",
    bandcamp:"https://my_page.bandcamp.com/",
    youtube:"https://www.youtube.com/user/my_page",
    facebook_event:"https://www.facebook.com/events/.."
  },

  TOO_MANY_CHARACTERS_200_ERROR: 'Too many characters! The limit is 200.',
  TOO_EXPENSIVE_6_DIGITS_ERROR: 'That\'s pretty expensive! Max price is $9999.99 - If you have a special case please contact RedPine directly.',
  IMAGE_TYPE_NOT_DETERMINED: 'Huh, it seems we couldn\'t identify the type of image being uploaded. If you try another it will likely work.',
  FILE_TYPE_NOT_DETERMINED: 'It seems we cannot accept that type of file, please try another.',
  TOO_CHEAP_ERROR: 'Something is wrong, your checkout price is lower than the cheapest ticket..',
  DATA_NOT_A_FILE: 'Something is wrong, the file submitted could not be read.',
  ADDRESS_INVALID: 'That address appears to be invalid.',
  EMAIL_ALREADY_EXISTS: 'It seems that email address is already is use.',
  SQUARE_CUSTOMER_CREATE_ERROR: 'Square couldn\'t process your card info. This generally occurs when a card is declined, or the provided postal code doesn\'t match your card.',
  MISSING_FIELD_ERROR: 'Missing info: ',
  UPGRADE_ACCOUNT: 'Please upgrade your account to continue. You may do this now, or at any time via your "Settings" page.',
  INVALID_PAGE: 'The previous page was the last one.'
}

export const errorMessage = (error) => {
	return (dispatch, getState, api) => {
    //SIMPLE CASE
    if(typeof error == 'string'){
      dispatch(appActions.error_message(error))
    }else{
      //DETAILED ERRORS
  	  var error_field = Object.keys(error)[0]
  	  var error_code = ''

      if(error[error_field]){
        error_code = error[error_field][0]
      }else{
        error_code = error
      }

      if(error.detail){
        switch(error.detail){
          case "A higher level account is required to perform this action.":
            dispatch(appActions.error_message(e.UPGRADE_ACCOUNT))
            dispatch(appActions.showBuyRedPine())
            break;
          case "Invalid page.":
            dispatch(appActions.error_message(e.INVALID_PAGE))
            break;
          default:
            dispatch(appActions.error_message(error.detail))
            console.log('detail: ' + error) //For debugging only, if this catches a detailed error then add a message to the switch.
            break;
        }
      }else{
        switch (error_code) {
          case "Enter a valid URL.":
            dispatch(appActions.error_message(e.INVALID_URL_ERROR + e.INVALID_URL_DETAILS[error_field]))
            break;
          case "This field is required.":
          case "This field may not be blank.":
            dispatch(appActions.error_message(e.MISSING_FIELD_ERROR + error_field))
            break;
          case "Ensure this field has no more than 200 characters.":
            dispatch(appActions.error_message(e.TOO_MANY_CHARACTERS_200_ERROR))
            break;
          case "Pledge total does not exceed the cost of tickets":
            dispatch(appActions.error_message(e.TOO_CHEAP_ERROR))
            break;
          case "Ensure that there are no more than 6 digits in total.":
            dispatch(appActions.error_message(e.TOO_EXPENSIVE_6_DIGITS_ERROR))
            break;
          case "The type of the image couldn't be determined.":
            dispatch(appActions.error_message(e.IMAGE_TYPE_NOT_DETERMINED))
            break;
          case "The type of the file couldn't be determined.":
            dispatch(appActions.error_message(e.FILE_TYPE_NOT_DETERMINED))
            break;
          case "Incorrect type. Expected pk value, received dict.":
            dispatch(appActions.error_message(e.DEFINITELY_REDPINES_FAULT_ERROR))
            break;
          case "The submitted data was not a file. Check the encoding type on the form.":
            dispatch(appActions.error_message(e.DATA_NOT_A_FILE))
            break;
          case "This address appears to be invalid":
            dispatch(appActions.error_message(e.ADDRESS_INVALID))
            break;
          case "Email already exists":
            dispatch(appActions.error_message(e.EMAIL_ALREADY_EXISTS))
            break;
          case "Square couldn't use the card info provided.":
            dispatch(appActions.error_message(e.SQUARE_CUSTOMER_CREATE_ERROR))
            break;
          default:
            dispatch(appActions.error_message(e.DEFAULT_ERROR))
            console.log(error) //For debugging only, if this catches a detailed error then add a message to the switch.
            break;
        }
      }
    }
	}
}