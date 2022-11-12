import React from 'react'
import styled from 'styled-components'

import { paths } from 'globals' 

import { RP_BLACK, RP_GREY } from 'Components' //GLOBALS
import { Link } from 'Components' 


export class SquareFields extends React.PureComponent {
  constructor(props) {
    super(props)

    // Create and initialize a payment form object
    this.square = new SqPaymentForm({

      // Initialize the payment form elements
      applicationId: __SQUARE_APPLICATION_ID__,
      locationId: '',//Used for Google Wallet and Apple Pay
      inputClass: 'sq-input',
      autoBuild: true,

      // Customize the CSS for SqPaymentForm iframe elements
      inputStyles: [{
        fontSize: '16px',
        fontFamily: 'Helvetica Neue',
        padding: '16px',
        color: '#373F4A',
        backgroundColor: 'transparent',
        lineHeight: '24px',
        placeholderColor: '#CCC',
        _webkitFontSmoothing: 'antialiased',
        _mozOsxFontSmoothing: 'grayscale'
      }],

      // Initialize Apple Pay placeholder ID
      applePay: false,

      // Initialize Masterpass placeholder ID
      masterpass: false,

      // Initialize the credit card placeholders
      cardNumber: {
        elementId: 'sq-card-number',
        placeholder: '• • • •  • • • •  • • • •  • • • •'
      },
      cvv: {
        elementId: 'sq-cvv',
        placeholder: 'CVV'
      },
      expirationDate: {
        elementId: 'sq-expiration-date',
        placeholder: 'MM/YY'
      },
      postalCode: {
        elementId: 'sq-postal-code',
        placeholder: '12345'
      },

      // SqPaymentForm callback functions
      callbacks: {
        /*
         * callback function: cardNonceResponseReceived
         * Triggered when: SqPaymentForm completes a card nonce request
         */
        cardNonceResponseReceived: function (errors, nonce) {
          if (errors) {
            // Log errors from nonce generation to the Javascript console
            console.log("Encountered errors:");
            errors.forEach(function (error) {
              console.log('  ' + error.message);
            });

            return;
          }
          props.onSubmit(nonce)
        },

        /*
         * callback function: unsupportedBrowserDetected
         * Triggered when: the page loads and an unsupported browser is detected
         */
        unsupportedBrowserDetected: function () {
          /* PROVIDE FEEDBACK TO SITE VISITORS */
        },

        /*
         * callback function: inputEventReceived
         * Triggered when: visitors interact with SqPaymentForm iframe elements.
         */
        inputEventReceived: function (inputEvent) {
          switch (inputEvent.eventType) {
            case 'focusClassAdded':
              /* HANDLE AS DESIRED */
              break;
            case 'focusClassRemoved':
              /* HANDLE AS DESIRED */
              break;
            case 'errorClassAdded':
              document.getElementById("error").innerHTML = "Please fix card information errors before continuing.";
              break;
            case 'errorClassRemoved':
              /* HANDLE AS DESIRED */
              document.getElementById("error").style.display = "none";
              break;
            case 'cardBrandChanged':
              /* HANDLE AS DESIRED */
              break;
            case 'postalCodeChanged':
              /* HANDLE AS DESIRED */
              break;
          }
        },

        /*
         * callback function: paymentFormLoaded
         * Triggered when: SqPaymentForm is fully loaded
         */
        paymentFormLoaded: function () {
          /* HANDLE AS DESIRED */
        }
      }
    });
  }

  render() {
    return (
      <div style={{position:'fixed',top:0,left:0,height:'100vh',width:'100%',zIndex:'1000'}}>
        <div id="form-container" style={{width:'auto'}}>
          <WhitePanel>
            <SectionalHeading>
              Card Information
              <NoteText>
                All major credit cards are accepted. Debit cards and gift cards are not supported.
              </NoteText>
            </SectionalHeading>
            <div id="sq-ccbox">
              <form id="nonce-form" noValidate>
                <fieldset>
                  <span className="label">Card Number</span>
                  <div id="sq-card-number"></div>

                  <div className="third">
                    <span className="label">Expiration</span>
                    <div id="sq-expiration-date"></div>
                  </div>

                  <div className="third">
                    <span className="label">CVV</span>
                    <div id="sq-cvv"></div>
                  </div>

                  <div className="third">
                    <span className="label">Postal Code/ZIP</span>
                    <div id="sq-postal-code"></div>
                  </div>
                </fieldset>

                { this.props.summary
                  ? <Disclaimer>{this.props.summary}</Disclaimer>
                  : null }

                <NoteText style={{textAlign:'right'}}>
                  Payments are processed by <Link href={paths.square()} bold>Square</Link> and are subject to their Terms of Use and Privacy Policy - we do not store your sensitive information.
                </NoteText>

                <button id="sq-creditcard" className="button-credit-card" onClick={(event) => this.requestCardNonce(event)}><i className="fa fa-check"/>&nbsp;&nbsp;{this.props.isPledge ? 'Pledge' : 'Purchase'}</button>
                <button className="button-credit-card-back" onClick={() => this.props.back()}><i className="fa fa-arrow-left"/>&nbsp;&nbsp;back</button>

                <div id="error"></div>

                <input type="hidden" id="card-nonce" name="nonce"/>
              </form>
            </div>
          </WhitePanel>
        </div>
      </div>
    )
  }

  requestCardNonce(event) {
    // Don't submit the form until SqPaymentForm returns with a nonce
    event.preventDefault();

    // Request a nonce from the SqPaymentForm object
    this.square.requestCardNonce();
  }

  componentDidMount(){
    if (SqPaymentForm.isSupportedBrowser()) {
      this.square.build();
      //this.square.recalculateSize();
    }
  }
}

const WhitePanel = styled.div`
  position: relative;
  background: #FFF;
  margin: 0 auto;
  padding: 7vmin 10vmin;
  white-space: normal;
  width: calc(70% - 20vmin - 2px);
  text-align: left;

  border: 1px solid ${RP_GREY};
  border-radius: 1vmin;
  box-shadow: 2px 1px 2px rgba(0,0,0,0.1);
  z-index: 50;

  @media (max-width: 1024px) and (orientation: portrait) {
    width: calc(90% - 20vmin - 2px);
  }
`
const SectionalHeading = styled.div`
  display: block;
  position: relative;
  padding: 5vmin 0 2vmin 0;
  font-size: 2.3vmin;
  color: ${RP_BLACK};
  font-weight: bold;

  &:first-child {
    padding-top: 0;
  }
`
const NoteText = styled.div`
  color: #000;
  font-size: 1.6vmin;
`
const Disclaimer = styled.div`
  font-size: 2vmin;
  padding: 0 0 5vmin 0;
  text-align: center;
`