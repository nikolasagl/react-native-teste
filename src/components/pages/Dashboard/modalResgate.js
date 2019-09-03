import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, Modal, TouchableOpacity, ScrollView } from 'react-native'
import { Header } from 'native-base'
import { Icon } from 'react-native-elements'
import HomeImage from '../../utils/homeImage'
import { TextInputMask } from 'react-native-masked-text'
import { AsyncGetItem, AsyncClear } from '../../../helpers/mainHelper'
import api from '../../../services/api'

const { height, width } = Dimensions.get('window')

class modalResgate extends Component {

   constructor() {
      super()

      this.state = {
         valor_resg: ''
      }
   }

   componentDidMount() {
      this._loadData()
   }

   _loadData = async () => {

   }

   _solicitarResgate = () => {}

   render() {
      return (
         <Modal visible={this.props.visible}>

            <Header>
               <HomeImage height={30} width={90} />
            </Header>

            <ScrollView style={styles.modal}>

               <View style={styles.header}>

                  <Text style={styles.headerTittle}>Resgate</Text>

                  <TouchableOpacity onPress={this.props.handler}>
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
                           <Text style={styles.contentLabelText}>Data: </Text>
                        </View>
                        <View style={styles.contentLabel}>
                           <Text style={styles.contentLabelText}>Saldo: </Text>
                        </View>
                     </View>
                  </View>

                  <View style={styles.dadosResgate}>
                     <View>
                        <Text style={styles.headerLabel}>DADOS RESGATE</Text>

                        <Text style={styles.label}>Valor do Resgate</Text>
                        <TextInputMask
                           style={styles.input}
                           name='valor_resg'
                           value={this.state.valor_resg}
                           onChangeText={(text) => this.setState({ valor_resg: text })}
                           keyboardType='numeric'
                           type='money'
                        />
                     </View>
                  </View>

                  <TouchableOpacity style={styles.sendButton} onPress={this._solicitarResgate}>
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
   }
})

export default modalResgate