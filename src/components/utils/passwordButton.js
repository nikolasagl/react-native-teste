import React, { Component } from 'react'
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { encode as btoa } from 'base-64'

const { height, width } = Dimensions.get('window')

export default class PasswordButton extends Component {

   constructor(props) {
      super(props)
      
      this.state = {
         encoded: null
      }
   }

   shouldComponentUpdate() {
      return false
   }

   render() {
      var buttons = []

      function shuffleArray(array) {
         for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
         }
         return array
      }

      var numeros = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])

      var duplicate = [numeros[0], numeros[4], numeros[2], numeros[6], numeros[8]]

      var i = 9

      for (let index = 0; index < duplicate.length; index++) {
         const element = duplicate[index]

         buttons.push(
            <TouchableOpacity
               key={i}
               style={styles.btn}
               onPress={async () => {
                  await this.setState({
                     encoded: btoa("{" + element + "," + numeros[i] + "," + numeros[i - 1] + "}")
                  })
                  this.props.action(this.state.encoded)
               }}>
               <Text style={styles.btnText}>{element} ou {numeros[i--]} ou {numeros[i--]}</Text>
            </TouchableOpacity>
         )
      }

      return (
         <View style={styles.btnContainer}>
            {buttons}
         </View>
      )
   }
}

const styles = StyleSheet.create({
   btnContainer: {
      width: width * 0.8,
      marginTop: height * 0.02,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
   },
   btn: {
      height: height * 0.04,
      width: width * 0.22,
      margin: width * 0.01,
      backgroundColor: '#22a1d6',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: height * 0.01
   },
   btnText: {
      color: '#fff'
   }
})