import React, { Component } from 'react'
import {
   Text,
   View,
   StyleSheet,
   Alert,
   ScrollView
} from 'react-native'
import { Icon } from 'react-native-elements'

import AgendaCell from './agendaCell'

import { AsyncGetItem, AsyncClear } from '../../../helpers/mainHelper'

import api from '../../../services/api'

class Agenda extends Component {

   constructor(props) {
      super(props)

      this.state = {
         items: {}
      }
   }

   componentDidMount() {
      this._loadItems()
   }

   static navigationOptions = () => ({
      drawerIcon: () => (
         <Icon
            containerStyle={{width: 50}}
            type='material-community'
            name='calendar-month-outline'
            color='black'
            size={30} />
      )
   })

   render() {
      return (
         <View style={styles.container}>
            <ScrollView>
               <AgendaCell date='2019-08-27' text='Atividade Teste' />
            </ScrollView>
         </View>
      )
   }

   _loadItems = async () => {

      try {
         const id = await AsyncGetItem('id')
         const response = await api.get(`/agenda/${id}`, { headers: { 'Authorization': 'Bearer ' + await AsyncGetItem('token') } })
         
         var { items } = response.data

         this.setState({ items })
         console.warn(this.state.items)

      } catch (error) {
         Alert.alert('Erro', 'Verifique sua conexão e tente novamente. ' + error)
      }
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   },
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