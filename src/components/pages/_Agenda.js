import React, { Component } from 'react'
import {
   Text,
   View,
   StyleSheet,
   Alert
} from 'react-native'
import { Agenda as AgendaComponent } from 'react-native-calendars'
import { AsyncGetItem, AsyncClear } from '../../helpers/mainHelper'

import api from '../../services/api'

class Agenda extends Component {

   constructor(props) {
      super(props)

      this.state = {
         items: {}
      }
   }

   render() {
      return (
         <AgendaComponent
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
         />
      )
   }

   async loadItems(day) {

      try {
         const id = await AsyncGetItem('id')
         const response = await api.get(`/agenda/${id}`, { 
            headers: { 'Authorization': 'Bearer ' + await AsyncGetItem('token') },
            params: { 'day': day }
         })
         
         var { items } = response.data

         this.setState({ items })

      } catch (error) {
         Alert.alert('Erro', 'Verifique sua conexão e tente novamente. ' + error)
      }
   }

   renderItem(item) {
      return (
         <View style={[styles.item, { height: item.height }]}><Text>{item.name}</Text></View>
      )
   }

   renderEmptyDate() {
      return (
         <View />
      )
   }

   rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
    }
}

const styles = StyleSheet.create({
   item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
   },
   emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
   }
})

export default Agenda