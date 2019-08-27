import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class agendaCell extends Component {

   constructor(props) {
      super(props)

      this.state = {

      }
   }

   render() {
      const { date, text } = this.props

      return (
         <View style={styles.container}>
            <View style={styles.date}>
               <Text>{date}</Text>
            </View>
            <View style={styles.description}>
               <Text>{text}</Text>
            </View>
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
   date: {}, 
   description:{}
})