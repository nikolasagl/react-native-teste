import React, { Component } from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import { Header } from 'native-base'
import CalendarPicker from 'react-native-calendar-picker'
import { StackActions, NavigationActions } from 'react-navigation'
import HomeImage from '../../utils/homeImage'
import moment from 'moment'
import ExtratoTableCell from './extratoTableCell'
import { AsyncGetItem, AsyncClear } from '../../../helpers/mainHelper'
import api from '../../../services/api'

class modalExtrato extends Component {

   constructor() {
      super()

      this.state = {
         dataInicial: moment().subtract(1, 'month'),
         dataFinal: moment(),
         calendarioInicial: false,
         calendarioFinal: false,
         extrato: []
      }
   }

   _onInitialDateChange = (date) => {
      this.setState({
         dataInicial: date,
      })
   }

   _onFinalDateChange = (date) => {
      this.setState({
         dataFinal: date,
      })
   }

   _calendarioInicialHandler = () => {
      this.setState({
         calendarioInicial: !this.state.calendarioInicial
      })
   }

   _calendarioFinalHandler = () => {
      this.setState({
         calendarioFinal: !this.state.calendarioFinal
      })
   }

   componentDidMount() {
      this._gerarExtrato()
   }

   _gerarExtrato = async () => {
      try {
         const id = await AsyncGetItem('id')
         const response = await api.get(`/extrato/total/${id}`, {
            headers: { 'Authorization': 'Bearer ' + await AsyncGetItem('token') },
            params: { 
               dataInicial: moment(this.state.dataInicial).format('YYYY-MM-DD'),
               dataFinal: moment(this.state.dataFinal).format('YYYY-MM-DD'),
               pdf: false
            }
         })

         const extrato = response.data

         this.setState({ extrato })

         console.log(this.state.extrato.extrato)

      } catch (error) {
         AsyncClear()
         Alert.alert('Erro', 'Verifique sua conexão e tente novamente. ' + error)
         const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
         })
         this.props.navigation.dispatch(resetAction)
      }
   }

   _gerarPdf = async () => {
      try {
         console.log('entrei')
         const id = await AsyncGetItem('id')
         const response = await api.get(`/extrato/total/${id}/pdf`, {
            headers: { 'Authorization': 'Bearer ' + await AsyncGetItem('token') },
            params: { 
               dataInicial: moment(this.state.dataInicial).format('YYYY-MM-DD'),
               dataFinal: moment(this.state.dataFinal).format('YYYY-MM-DD'),
               pdf: true
            }
         })
         console.log(typeof response.data)
         const pdf = response.data

      } catch (error) {
         AsyncClear()
         Alert.alert('Erro', 'Verifique sua conexão e tente novamente. ' + error)
         const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
         })
         this.props.navigation.dispatch(resetAction)
      }
   }

   _renderItem = ({item}) => {
      console.log(item)
      return (
         <ExtratoTableCell 
            data={moment(item.data).format('DD/MM/YYYY')}
            descricao={item.tipo} 
            valor={item.valor}
            total={item.total} />
      )
   }

   render() {
      const { dataInicial, dataFinal } = this.state;
      const initialDate = dataInicial.format('DD/MM/YYYY').toString()
      const finalDate = dataFinal.format('DD/MM/YYYY').toString()
      const week = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

      return (
         <Modal visible={this.props.visible}>
            <Header>
               <HomeImage height={30} width={90} />
            </Header>

            <ScrollView style={styles.modal} scrollEnabled={false}>

               <View style={styles.header}>

                  <Text style={styles.headerTittle}>Extrato</Text>

                  <TouchableOpacity onPress={() => {
                     this.setState({
                        dataInicial: moment().subtract(1, 'month'),
                        dataFinal: moment(),
                     })
                     this.props.handler()
                  }}>
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

                     <TouchableOpacity style={styles.calendarToggle} onPress={this._calendarioInicialHandler}>
                        <Text style={styles.inputDate}>{initialDate}</Text>
                     </TouchableOpacity>

                     <View style={this.state.calendarioInicial == true ? null : {display: 'none'}}>
                        <CalendarPicker
                           onDateChange={this._onInitialDateChange}
                           maxDate={moment()}
                           weekdays={week}
                           months={months}
                           previousTitle='Anterior'
                           nextTitle='Proximo'
                           monthBackgroundColor='#22a1d6'
                           yearBackgroundColor='#22a1d6' />
                     </View>
                  </View>
                  
                  <View style={styles.calendarView}>
                     <Text style={styles.label}>Data Final</Text>

                     <TouchableOpacity style={styles.calendarToggle} onPress={this._calendarioFinalHandler}>
                        <Text style={styles.inputDate}>{finalDate}</Text>
                     </TouchableOpacity>

                     <View style={this.state.calendarioFinal == true ? null : {display: 'none'}}>
                        <CalendarPicker
                           onDateChange={this._onFinalDateChange} 
                           maxDate={moment()}
                           weekdays={week}
                           months={months}
                           previousTitle='Anterior'
                           nextTitle='Proximo'
                           monthBackgroundColor='#22a1d6'
                           yearBackgroundColor='#22a1d6' />
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

            <View style={{marginBottom: 15}}></View>
               
            <FlatList style={[
               this.state.calendarioFinal == false ? null : {display: 'none'}, 
               this.state.calendarioInicial == false ? null : {display: 'none'}, 
               styles.extratoTable
            ]} 
               data={ 'extrato' in this.state.extrato ? this.state.extrato.extrato : [] }
               keyExtractor = {(item, index) => index}
               renderItem={this._renderItem}
               initialNumToRender={20} />

         </Modal>
      )
   }
}

const styles = StyleSheet.create({
   modal: {
      flex: 2,
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
   },
   extratoTable: {
      flex: 3,
   }
})

export default modalExtrato