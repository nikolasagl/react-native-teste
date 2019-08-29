import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

class SolicitarResg extends Component {
   static navigationOptions = () => ({
      drawerIcon: () => (
         <Icon
            containerStyle={{width: 50}}
            type='ionicon'
            name='md-remove-circle-outline'
            color='black'
            size={30} />
      )
   })

   render() {
      return (
         <View>
            <Text>SolicitarResg Screen</Text>
         </View>
      )
   }
}

export default SolicitarResg
