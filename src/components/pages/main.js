import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'

import api from '../../services/api'

const { height, width } = Dimensions.get('window')

class Main extends Component {

   constructor(props) {
      super(props)

      this.state = {
         dash: []
      }
   }

   componentDidMount() {
      this.loadDash()
   }

   loadDash = async () => {
      const response = await api.get('/dashboard/2')

      const { dash }  = response.data

      this.setState({ dash })
   }

   renderItem = ({ item }) => (
      <View style={styles.card}>
         <View style={styles.cardHeader}>
            <Text>{item.label}</Text>               
         </View>
         <View style={styles.cardBody}>
            <Text>{item.value != null ? 'R$ ' + item.value.toLocaleString('pt-BR') : 'R$ 0,00'}</Text>
         </View>
      </View>
   )

   render() {
      return (
         <View style={styles.container}>

            <FlatList 
               style={styles.list}
               data={this.state.dash}
               keyExtractor={item => item.title}
               renderItem={this.renderItem}/>

         </View>
      )
   }
}

export default Main

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f2f2f2'
   },
   list: {
      padding: 30
   },
   card: {
      backgroundColor: 'white',
      alignItems: 'center',
      margin: width*0.02,
      borderWidth: 1,
      borderRadius: 6,
      borderColor: 'grey'
   },
   cardHeader: {
      alignSelf: "stretch",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: 'grey',
      padding: 10,
   },
   cardBody: {
      padding : 30
   }
})
