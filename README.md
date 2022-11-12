# Installation

1. Install [NodeJS](https://nodejs.org/en/).
2. Add new/existing [SSH Key](https://gitlab.com/profile/keys)
3. Clone this repository (`git clone git@gitlab.com:redpine/web.git`)
4. Run `npm install` to install the app's dependencies.
5. Run `npm install -g webpack@3.11.0 webpack-cli jest` to install required development CLIs.

Note: The webpack version must be 3.11.0. to run properly in this configuration.
To check which version of webpack you are using, run: `webpack -v`

# Environment Variables

You will need to set the following environment variables for the application to run:

```
WEBAPP_BASE_URL={URL where your webapp is running, usually http://localhost:3000}
API_BASE_URL={URL where the API is running at}
STRIPE_PUBLISHABLE_KEY={stripe publishable key}
GOOGLE_API_KEY={google api key for loading google maps}
FACEBOOK_APP_ID={facebook app id}
SENTRY_DSN_PUBLIC={can be empty}
ENV="development"
GOOGLE_ANALYTICS_PROPERTY={can be empty}
``` 

## Environment Variables in a Unix Environemnt

1. Create a file `.env` in your project root.
2. For each of the variables above, type `export VARIABLE_NAME=VARIABLE_VALUE` (e.g. `export API_BASE_URL=http://localhost:8000`).  Separate variables with a new line.
3. When you want to load the environment variables, type `source .env`.

## Environment Variables in a Windows Environment

1. Create a file `.env.ps1` in your project root.
2. For each of the variables above, type `$env:VARIABLE_NAME="VARIABLE_VALUE"` (e.g. `$env:API_BASE_URL="http://192.168.99.100:8000"`).  Separate variables with a new line.
3. When you want to load the environment variables, make sure you have a PowerShell open, then type `. .env.ps1` (yes, that first period is intentional).

# Development

1. Run `npm start` from the project root to start the test server.
2. Run `webpack --watch` from the project root to start the build process.
3. Visit `localhost:3000`

# Testing

To run the entire test suite, run `npm test`.

During development, it's very useful to run `npm run test:watch`.  After the initial test run, press `w`; filtering by the name of the module you are working on can greatly increase the speed of subsequent tests.

# Workflow

1. Create an issue on gitlab for your task
2. Click the "create merge request" button and it will generate a branch for you
3. Work on that branch

# Best Practices

### React / JSX

### Components

* `src/Components` provide reusable functionality to the application; for example, an Input that allows the user to set an error string via <Input error="error"> or a stylized div that is used in multiple places in the application.
* Each component may be visual, or functional. (`Panel` vs. `ImageUpload`)
* Import these into Containers or Container-specific Components and add any page-specific styling there. Consider generalizing the base Component to allow you to pass additional properties if it is likely your changes would be common to other pages.
* Declare all inherited properties for Components at the beginning of the render() method. (ex: `const campaign = this.props.campaign || null`) This will keep the Component clean, while keeping a clear list of the props it uses.


### Containers

* `src/Containers` are the views of the application.  They define the functionality & layout of each "page" of the application.  `Containers` may make use of reusable `Components`.
* Should be broken down into as many Container-specific components as is reasonable, stored in subfolders of the Container:

```
/Campaign
/Campaign/CheckoutButton/index.jsx
/Campaign/DetailSummary/index.jsx
/Campaign/DetailSummary/SummaryComponent/index.jsx
/Campaign/actions.js
/Campaign/constants.js
/Campaign/index.jsx
/Campaign/reducer.js
/Campaign/selectors.js
```

* Do not re-render the entire Container on each state change.  Make use of `shouldComponentUpdate(nextProps, nextState)` to ensure that each container-specific component only re-renders when values pertinent to it are changed.
* A `Container` should have 6 files in it's corresponding directory:
  * actions.js
  * constants.js
  * index.jsx
  * reducer.js
  * selectors.js
  * tests.jsx _(will fail pipeline if left empty, do not include this unless you have tests written!)_


### File Structure

```
//Core Libraries
import React from 'react'
import styled from 'styled-components'

//External Libraries
import CalendarThing from 'big-calendar'

//Global File Import
import { paths, validators } from 'globals'

//Container Imports
import { NavBar } from 'Containers'

//Global Component Import
import { RP_RED, RP_BLUE, Bold } from 'Components' //GLOBALS

//Common Component Imports
import { Input, TextArea } from 'Components' //INPUT
import { Modal } from 'Components' //MODAL

//Local Component Imports
import { SubComponentName } from './SubComponentName/index.jsx'

//Local Infrastructure
import actions from './actions.js'
import selectors from './selectors.js'
import constants from './constants.js'


export class ComponentName extends React.PureComponent {
    super(props)
    this.state = {
        //State Variables
        initialized_from_parent: this.props.initialized_from_parent,
        initialized_locally: 'any value/type'
    }

    render(){
        //All render variables at the top (to clarify inline logic)
        //Main properties
        const parent_prop_but_not_state       = this.props.parent_prop_but_not_state
        const initialized_from_parent         = this.state.initialized_from_parent

        //Sub-properties
        const sub_property_with_default_value = initialized_from_parent && initialized_from_parent.sub_property || null
        const sub_sub_property                = sub_property_with_default_value && sub_property_with_default_value.sub_sub_property || null

        //Calculated Properties
        const calculation                     = (sub_sub_property == 4)
        const calculation_two                 = sub_sub_property == 4 ? 'The value is four.' : 'The value is not four.'

        return(
            <StyledElementA>
                <StyledElementB single_property={calculation}>
                    {calculation_two //Value used inline}
                </StyledElementB>
                {//Conditional Rendering
                    calculation
                    ? <StyledElementBPlus/>
                    : null
                }
                <SubComponentName
                    multi_properties_one={initialized_from_parent}
                    multi_properties_two={sub_sub_property}/>
            </StyledElementA>
        )
    }

    //Component-specific functions
    helperFunction(arg1,arg2,...){

    }

    //Core Functions (where nessecary, there are others too)
    componentWillReceiveProps(nextProps){
        ...
    }

    shouldComponentUpdate(nextProps, nextState){
        ...
    }

    updateState(nextState){
        ...
    }
}

const StyledElementA = styled.div`
    display: inline-block;
`
const StyledElementB = styled.span`
    css-attribute1: value;
    css-attribute2: value;
`
const StyledElementBPlus = styled(StyledElementB)`
    /*Inherits attributes from StyledElementB, plus:*/
    css-attribute3: value;
`
```

*Many files don't follow these standards, especially older ones. Any efforts to refactor old code are appreciated, but if the Component/Container to too convoluted then it's sometimes better to wait, since we may need to rewrite the whole thing at some point anyways.*


### Colours

All custom colours used across the site should be defined with the rest in a global file.

Common colors with known codes may be used without definition, these are:
1. Black - `#000`
2. White - `#FFF`

Please define everything else as a color variable.

### URLs

The directory structure of the application should begin by spanning all RedPine content (https://redpinemusic.com/), and narrow the scope of the content with each successive subdirectory.

Access examples:
 * Homepage: http://redpinemusic.com/home
 * Specific Campaign: http://redpinemusic.com/campaigns/:id
 * Specific User's Tickets: http://redpinemusic.com/users/:id/tickets


### React / actions.js

The format for making requests to the API are as follows:

`api.resource` implies that we’ll be using REST methods on `/v1/resource/`:

- `api.resource.query({param: 1})` will make the call `GET /v1/resource/?param=1`

- `api.resource.get(1, {param: 2})` will make the call `GET /v1/resource/1/?param=2`

- `api.resource.create({param: 1})` will make the call `POST /v1/resource/` with the JSON body `{param: 1}`

- `api.resource.update(1, {param: 2})` will make the call `PUT /v1/resource/1/` with the JSON body `{param: 2}`

- `api.resource.delete(1)` will make the call `DELETE /v1/resource/1/`

Requests can be made synchronously or asyncronously, like this:

https://github.com/reduxjs/redux-thunk

