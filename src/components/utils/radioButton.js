import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class RadioButton extends Component {

   constructor(props) {
      super(props)
      
      this.state = {
         value: 1
      }
   }

   render() {
      const options = this.props.options
      const value = this.state.value

      return (
         <View style={styles.buttonContainer}>

            {options.map(item => {
               return (
                  <View key={item.key} style={styles.button}>
                     <Text>{item.text}</Text>
                     <TouchableOpacity
                        style={styles.circle}
                        onPress={async () => {
                           await this.setState({
                              value: item.key
                           })
                           this.props.action(this.state.value)
                        }}>
                        {value === item.key && <View style={styles.checkedCircle} />}
                     </TouchableOpacity>
                  </View>
               )
            })}

         </View>
      )
   }
}

const styles = StyleSheet.create({
   buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
   },
   button: {
      margin: 10,
      alignItems: 'center',
   },
   circle: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ACACAC',
      alignItems: 'center',
      justifyContent: 'center',
   },
   checkedCircle: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: '#22a1d6',
   }
})
