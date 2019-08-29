import React, { Component } from 'react'
import { Image } from 'react-native'

export default class HomeImage extends Component {
   
   render() {
      return (
         <Image
            style={{ height: this.props.height, width: this.props.width, tintColor: this.props.color ? this.props.color : null }}
            source={require('../../assets/fmi.png')}
         />
      )
   }
}
