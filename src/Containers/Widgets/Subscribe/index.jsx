import React from 'react'
import { connect } from 'react-redux'

import { App } from 'Containers'
import appSelectors from 'Containers/App/selectors'
import { BuyRedPine } from 'Containers'


export class WidgetSubscribe extends React.PureComponent {
  constructor(props) {
    super(props) 
  }

  render() {
    return <App no_ui>
            <div style={{padding:'2vmin'}}>
              <BuyRedPine user={this.props.user}/>
            </div>
           </App>
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: appSelectors.selectUser(state, props)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetSubscribe)
