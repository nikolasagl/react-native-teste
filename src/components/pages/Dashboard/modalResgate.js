import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Header } from 'native-base'
import { Icon } from 'react-native-elements'
import { TextInputMask } from 'react-native-masked-text'
import moment from 'moment'
import Intl from 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import { StackActions, NavigationActions } from 'react-navigation'
import HomeImage from '../../utils/homeImage'
import { AsyncGetItem, AsyncClear } from '../../../helpers/mainHelper'
import api from '../../../services/api'

const { height, width } = Dimensions.get('window')

class modalResgate extends Component {

   constructor(props) {
      super(props)

      this.state = {
         saldo: 0,
         valorResg: '',
         valorError: '',
         valorErrorMsg: ''
      }
   }

   componentDidMount() {
      this._loadData()
   }

   _loadData = async () => {
      try {
         const id = await AsyncGetItem('id')
         const response = await api.get(`/extrato/saldo/${id}`, {headers: { 'Authorization': 'Bearer ' + await AsyncGetItem('token') }})

         const saldo = response.data.saldo

         this.setState({ saldo })

         console.log(this.state)

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

   _validateForm = async () => {
      if (this.state.valorResg === '')
         await this.setState({ valorError: true, valorErrorMsg: 'O campo valor de resgate não pode ser vazio.' }) 
      else if (parseFloat(this.state.valorResg) < 0) 
         await this.setState({ valorError: true, valorErrorMsg: 'O valor de resgate não pode ser negativo.' }) 
      else if (parseFloat(this.state.valorResg) > this.state.saldo)
         await this.setState({ valorError: true, valorErrorMsg: 'Não é possivel resgatar um valor maior do que o saldo disponivel.' }) 
      else
         await this.setState({ valorError: false })

      if (this.state.valorError === false){
         this._solicitarResgate()
      }
   }

   _solicitarResgate = async () => {
      try {
         const id = await AsyncGetItem('id')
         const response = await api.post(`/resgate/solicitar/${id}`, {
            headers: { 'Authorization': 'Bearer ' + await AsyncGetItem('token') },
            params: {valor: parseFloat(this.state.valorResg)}
         })

         const res = response.data

         console.log(res)

         if (res === true) {
            Alert.alert('Sucesso', 'Solicitação de resgate efetuada com sucesso')
            const resetAction = StackActions.reset({
               index: 0,
               actions: [NavigationActions.navigate({ routeName: 'Agenda' })],
            })
            this.props.navigation.dispatch(resetAction)
         }

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

   render() {
      return (
         <Modal visible={this.props.visible}>

            <Header>
               <HomeImage height={30} width={90} />
            </Header>

            <ScrollView style={styles.modal}>

               <View style={styles.header}>

                  <Text style={styles.headerTittle}>Resgate</Text>

                  <TouchableOpacity onPress={() => {
                     this.setState({valorResg: '', valorError: '', valorErrorMsg: ''})
                     this.props.handler()
                  }}>
                     <Icon
                        iconStyle={{ marginRight: 20 }}
                        type='ionicon'
                        name='md-close'
                        size={26} />
                  </TouchableOpacity>

               </View>

               <View style={styles.content}>

                  <View>
                     <View>
                        <Text style={styles.headerLabel}>DADOS INVESTIMENTO</Text>
                        <View style={styles.contentLabel}>
                           <Text style={styles.contentLabelText}>Data: {moment().format('DD/MM/YYYY')}</Text>
                        </View>
                        <View style={styles.contentLabel}>
                           <Text style={styles.contentLabelText}>Saldo: {new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(this.state.saldo)}</Text>
                        </View>
                     </View>
                  </View>

                  <View style={styles.dadosResgate}>
                     <View>
                        <Text style={styles.headerLabel}>DADOS RESGATE</Text>

                        <Text style={styles.label}>Valor do Resgate</Text>
                        <TextInputMask
                           style={[styles.input, this.state.valorError === true ? {borderBottomColor: 'red'} : null]}
                           name='valorResg'
                           value={this.state.valorResg}
                           includeRawValueInChangeText={true}
                           onChangeText={(maskedText, rawText) => this.setState({ valorResg: rawText })}
                           keyboardType='numeric'
                           type='money'
                        />
                        <Text style={[styles.error, this.state.valorError === true ? null : {display: 'none'}]}>{this.state.valorErrorMsg}</Text>
                     </View>
                  </View>

                  <TouchableOpacity style={styles.sendButton} onPress={this._validateForm}>
                     <Text style={styles.sendButtonLabel}>Confirmar</Text>
                  </TouchableOpacity>

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
      width: '100%',
      padding: 30,
   },
   headerLabel: {
      alignSelf: "center",
      fontSize: 20
   },
   contentLabel: {
      marginTop: 27,
      borderBottomWidth: 1,
      borderBottomColor: '#dcdcdc'
   },
   contentLabelText: {
      fontSize: 17,
      marginBottom: 5
   },
   dadosResgate: {
      marginTop: 40
   },
   label: {
      marginTop: 20,
      marginBottom: -13,
      fontSize: 17
   },
   input: {
      width: width * 0.85,
      height: height * 0.05,
      fontSize: 16,
      borderColor: '#cbcdd1',
      borderBottomWidth: 1,
      marginTop: 10
   },
   sendButton: {
      marginTop: 80,
      alignSelf: "center",
      backgroundColor: 'green',
      borderRadius: 13,
      width: 120,
      height: 40,
      justifyContent: "center",
      alignItems: "center"
   },
   sendButtonLabel: {
      color: 'white',
      fontSize: 17
   },
   error: {
      color: 'red'
   }
})

export default modalResgate