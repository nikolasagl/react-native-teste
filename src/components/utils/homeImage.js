import React, { Component } from 'react'
import { Image } from 'react-native'

export default class HomeImage extends Component {
  render() {
    return (
      <Image
        style={{ height: 100, width: 300 }}
        source={ require('../../assets/fmi.png') }
      />
    )
  }
}
