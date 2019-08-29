import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

class Aviso extends Component {
   static navigationOptions = () => ({
      drawerIcon: () => (
         <Icon
            containerStyle={{width: 50}}
            type='ionicon'
            name='md-add-circle-outline'
            color='black'
            size={30} />
      )
   })

   render() {
      return (
         <View>
            <Text>Aviso Screen</Text>
         </View>
      )
   }
}

export default Aviso
