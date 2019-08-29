import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'

class Mensagens extends Component {
   static navigationOptions = () => ({
      drawerIcon: () => (
         <Icon
            containerStyle={{width: 50}}
            type='material-community'
            name='email-outline'
            color='black'
            size={30} />
      )
   })

   render() {
      return (
         <View>
            <Text>Mensagens Screen</Text>
         </View>
      )
   }
}

export default Mensagens
