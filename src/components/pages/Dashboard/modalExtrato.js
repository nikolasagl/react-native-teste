import React, { Component } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { Header } from 'native-base'
import CalendarPicker from 'react-native-calendar-picker'
import HomeImage from '../../utils/homeImage'

class modalExtrato extends Component {

   constructor() {
      super()

      this.state = {
         selectedInitialDate: null,
         selectedFinalDate: null,
         dataInicial: false,
         dataFinal: false
      }
   }

   _onInitialDateChange = (date) => {

      this.setState({
         selectedInitialDate: date,
      })
   }

   _onFinalDateChange = (date) => {

      this.setState({
         selectedFinalDate: date,
      })
   }

   _dataInicialHandler = () => {
      this.setState({
         dataInicial: !this.state.dataInicial
      })
   }

   _dataFinalHandler = () => {
      this.setState({
         dataFinal: !this.state.dataFinal
      })
   }

   _gerarExtrato = () => {}

   _gerarPdf = () => {}

   render() {
      const { selectedInitialDate, selectedFinalDate } = this.state;
      const initialDate = selectedInitialDate ? selectedInitialDate.format('DD/MM/YYYY').toString() : ''
      const finalDate = selectedFinalDate ? selectedFinalDate.format('DD/MM/YYYY').toString() : ''

      return (
         <Modal visible={this.props.visible}>
            <Header>
               <HomeImage height={30} width={90} />
            </Header>

            <ScrollView style={styles.modal}>

               <View style={styles.header}>

                  <Text style={styles.headerTittle}>Extrato</Text>

                  <TouchableOpacity onPress={this.props.handler}>
                     <Icon
                        iconStyle={{marginRight: 20}}
                        type='ionicon'
                        name='md-close'
                        size={26} />
                  </TouchableOpacity>

               </View>

               <View style={styles.content}>

                  <View style={styles.calendarView}>
                     <Text style={styles.label}>Data Inicial</Text>

                     <TouchableOpacity style={styles.calendarToggle} onPress={this._dataInicialHandler}>
                        <Text style={styles.inputDate}>{initialDate}</Text>
                     </TouchableOpacity>

                     <View style={this.state.dataInicial == true ? null : {display: 'none'}}>
                        <CalendarPicker
                           onDateChange={this._onInitialDateChange} />
                     </View>
                  </View>
                  
                  <View style={styles.calendarView}>
                     <Text style={styles.label}>Data Final</Text>

                     <TouchableOpacity style={styles.calendarToggle} onPress={this._dataFinalHandler}>
                        <Text style={styles.inputDate}>{finalDate}</Text>
                     </TouchableOpacity>

                     <View style={this.state.dataFinal == true ? null : {display: 'none'}}>
                        <CalendarPicker
                           onDateChange={this._onFinalDateChange} />
                     </View>
                  </View>

                  <View style={styles.actionButtonView}>
                     <TouchableOpacity style={styles.actionButton} onPress={this._gerarExtrato}>
                        <Text style={styles.buttonLabel}>Gerar Extrato</Text>
                     </TouchableOpacity>

                     <TouchableOpacity style={styles.actionButton} onPress={this._gerarPdf}>
                        <Text style={styles.buttonLabel}>Gerar PDF</Text>
                     </TouchableOpacity>
                  </View>

               </View>
            </ScrollView>
         </Modal>
      )
   }
}

const styles = StyleSheet.create({
   modal: {
      flex: 1,
   },
   header: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: '#e5e5e5',
      width: '100%',
      height: 70,
      alignItems: "center",
      justifyContent: "space-between"
   },
   headerTittle: {
      marginLeft: 20,
      fontSize: 20
   },
   content: {
      width: '100%'
   },
   calendarView: {
      margin: 15,
      padding: 10
   },
   label: {
      fontSize: 20
   },
   calendarToggle: {
      borderBottomWidth: 1,
      height: 40
   },
   inputDate: {
      marginBottom: -10,
      marginTop: 10,
      fontSize: 17
   },
   actionButtonView: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-around"
   },
   actionButton: {
      height: 35,
      width: 130,
      backgroundColor: '#22a1d6',
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 15
   },
   buttonLabel: {
      color: 'white',
      fontSize: 16
   }
})

export default modalExtrato