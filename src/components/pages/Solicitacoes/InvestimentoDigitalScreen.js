import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

class InvestimentoDigital extends Component {
   static navigationOptions = () => ({
      drawerIcon: () => (
         <Icon
            containerStyle={{width: 50}}
            type='material-community'
            name='coin'
            color='black'
            size={30} />
      )
   })

   render() {
      return (
         <View>
            <Text>InvestimentoDigital Screen</Text>
         </View>
      )
   }
}

export default InvestimentoDigital
