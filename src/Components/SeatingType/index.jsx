import React from 'react'


const seatingTypes = [
  'First come first seating'
]


class SeatingType extends React.PureComponent {
  render() {
    const id = this.props.id
    const seatingType = id < seatingTypes.length ? seatingTypes[id] : null

    return (<span style={{fontSize:"2vmin"}}>{seatingType}</span>)
  }
}

export default SeatingType