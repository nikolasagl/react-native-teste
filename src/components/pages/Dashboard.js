import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import FlatListWithEnd from 'react-native-flatlist-with-end'
import { Icon } from 'react-native-elements'

import api from '../../services/api'
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window')

class Dashboard extends Component {

   constructor(props) {
      super(props)

      this.state = {
         dash: 0
      }
   }

   componentDidMount() {
      this._loadDash()
   }

   _loadDash = async () => {
      const response = await api.get('/dashboard/2')

      var { dash } = response.data

      dash = this._loadDashIcons(dash)

      this.setState({ dash })
   }

   _loadDashIcons = (dash) => {

      const icons = [
         {
            icon: 'coin',
            type: 'material-community'
         },
         {
            icon: 'attach-money',
            type: 'material'
         },
         {
            icon: 'ticket',
            type: 'foundation'
         },
         {
            icon: 'dollar-bill',
            type: 'foundation'
         },
         {
            icon: 'cash-usd',
            type: 'material-community'
         },
         {
            icon: 'linechart',
            type: 'antdesign'
         },
         {
            icon: 'credit-card',
            type: 'font-awesome'
         },
      ]

      for (let index = 0; index < dash.length; index++) {
         const element = dash[index]
         const icon = icons[index]
         element.iconType = icon.type
         element.icon = icon.icon
      }

      return dash
   }

   _extrato = () => { }

   _resgate = () => { }

   render() {

      var cards = []

      for (let index = 0; index < this.state.dash.length; index++) {
         const item = this.state.dash[index];

         cards.push(
            <View key={item.title}>
               <View style={styles.card}>
                  <View style={styles.cardHeader}>
                     <Text style={styles.realSign}>R$</Text>
                     <Text style={styles.value}>{item.value != null ? item.value.toLocaleString('pt-BR') : '0,00'}</Text>
                  </View>
                  <View style={styles.cardBody}>
                     <Text style={styles.label}>{item.label}</Text>
                  </View>
               </View>
               <View style={styles.icon}>
                  <Icon
                     iconStyle={{ alignSelf: "center", marginTop: 10 }}
                     color='white'
                     type={item.iconType}
                     name={item.icon}
                     size={40} />
               </View>
            </View>
         )
      }

      return (
         <View style={styles.container}>

            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
               
               {cards}

               <View style={styles.btnView}>
                  <TouchableOpacity style={styles.extratoBtn} onPress={this._extrato}>
                     <Icon
                        iconStyle={{ alignSelf: 'center', marginRight: 1 }}
                        color='white'
                        type='material-community'
                        name='file-document-outline'
                        size={20}
                     />
                     <Text style={{ color: 'white', fontSize: 16 }}>Extrato</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.resgateBtn} onPress={this._resgate}>
                     <Icon
                        iconStyle={{ alignSelf: 'center', marginRight: 5 }}
                        color='white'
                        type='foundation'
                        name='dollar-bill'
                        size={20}
                     />
                     <Text style={{ color: 'white', fontSize: 16 }}>Resgate</Text>
                  </TouchableOpacity>
               </View>
            </ScrollView>

         </View>
      )
   }
}

export default Dashboard

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f2f4f6',
   },
   list: {
      padding: 35
   },
   card: {
      backgroundColor: 'white',
      alignItems: 'flex-start',
      margin: width * 0.02,
      marginBottom: 25,
      borderRadius: 6,
      shadowOpacity: 0.25,
      shadowOffset: {
         height: 0,
         width: 0,
      },
      elevation: 2,
      padding: 30
   },
   cardHeader: {
      flexDirection: "row",
      alignSelf: "stretch",
      paddingTop: 10,
      marginLeft: 20
   },
   cardBody: {
      paddingBottom: 10,
      marginLeft: 20
   },
   realSign: {
      color: '#374a63',
   },
   value: {
      fontSize: 25,
      color: '#374a63',
      fontWeight: "bold"
   },
   label: {
      color: '#acacac',
      fontSize: 16,
      marginTop: 5
   },
   icon: {
      backgroundColor: '#23a1d7',
      borderRadius: 6,
      width: 60,
      height: 60,
      position: "absolute",
      top: -10,
      left: -10
   },
   btnView: {
      paddingBottom: 20,
      alignItems: "center"
   },
   resgateBtn: {
      flexDirection: "row",
      height: height * 0.05,
      width: width * 0.8,
      backgroundColor: '#374a63',
      borderRadius: 6,
      shadowOpacity: 0.25,
      shadowOffset: {
         height: 0,
         width: 0,
      },
      elevation: 2,
      alignItems: "center",
      justifyContent: "center",
   },
   extratoBtn: {
      flexDirection: "row",
      height: height * 0.05,
      width: width * 0.8,
      backgroundColor: '#22a1d6',
      marginBottom: 5,
      borderRadius: 6,
      shadowOpacity: 0.25,
      shadowOffset: {
         height: 0,
         width: 0,
      },
      elevation: 2,
      alignItems: "center",
      justifyContent: "center",
   }
})
