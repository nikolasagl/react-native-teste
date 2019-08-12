import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'

import api from '../../services/api'

const { height, width } = Dimensions.get('window')

class Configuracoes extends Component {

   constructor(props) {
      super(props)

      this.state = {
         user: '',
         cidade: '',
         estado: ''
      }
   }

   componentDidMount() {
      this._loadData()
   }

   _loadData = async () => {
      const response = await api.get('/user/2')

      const { user } = response.data

      this.setState({
         user: user,
         cidade: user.cidade_pes.nome_cid,
         estado: user.estado_pes.uf_est
      })
   }

   _editarPerfil = () => {
      this.props.navigation.navigate('EditarUsuario', { id: this.state.user.codigo_pes })
   }

   render() {
      return (
         <View style={styles.container}>

            <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>

               <View style={styles.btnView}>
                  <TouchableOpacity style={styles.editBtn} onPress={this._editarPerfil}>
                     <Text style={{ color: 'white', fontSize: 16 }}>Editar Perfil</Text>
                  </TouchableOpacity>
               </View>

               <View style={styles.card}>

                  <View style={styles.cardHeader}>
                     <Text style={styles.headerLabel}>Dados Pessoais</Text>
                  </View>

                  <View style={styles.cardBody}>
                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Nome: </Text>
                        <Text style={styles.value}>{this.state.user.nome_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>CPF: </Text>
                        <Text style={styles.value}>{this.state.user.cpf_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>RG: </Text>
                        <Text style={styles.value}>{this.state.user.rg_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Data Nasc.: </Text>
                        <Text style={styles.value}>{this.state.user.dtnascimento_pes}</Text>
                     </View>
                  </View>

               </View>

               <View style={styles.card}>

                  <View style={styles.cardHeader}>
                     <Text style={styles.headerLabel}>Endereço e Contato</Text>
                  </View>

                  <View style={styles.cardBody}>
                     <View style={styles.contentRow}>
                        <Text style={styles.label}>CEP: </Text>
                        <Text style={styles.value}>{this.state.user.cep_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Endereço: </Text>
                        <Text style={styles.value}>{this.state.user.endereco_pes + ', ' + this.state.user.numero_pes + ', ' + this.state.user.bairro_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Complemento: </Text>
                        <Text style={styles.value}>{this.state.user.complemento_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Cidade: </Text>
                        <Text style={styles.value}>{this.state.cidade + ', ' + this.state.estado + ' - Brasil'}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Telefone: </Text>
                        <Text style={styles.value}>{this.state.user.telefone_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Email: </Text>
                        <Text style={styles.value}>{this.state.user.email_pes}</Text>
                     </View>
                  </View>

               </View>

               <View style={styles.card}>

                  <View style={styles.cardHeader}>
                     <Text style={styles.headerLabel}>Dados Bancários</Text>
                  </View>

                  <View style={styles.cardBody}>
                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Banco: </Text>
                        <Text style={styles.value}>{this.state.user.banco_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Nº Banco: </Text>
                        <Text style={styles.value}>{this.state.user.numerobanco_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Agência: </Text>
                        <Text style={styles.value}>{this.state.user.agencia_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Conta: </Text>
                        <Text style={styles.value}>{this.state.user.conta_pes}</Text>
                     </View>

                     <View style={styles.contentRow}>
                        <Text style={styles.label}>Nome Titular: </Text>
                        <Text style={styles.value}>{this.state.user.nometitular_pes}</Text>
                     </View>
                  </View>

               </View>

               <View style={styles.btnView}>
                  <TouchableOpacity style={styles.editBtn} onPress={this._editarPerfil}>
                     <Text style={{ color: 'white', fontSize: 16 }}>Editar Perfil</Text>
                  </TouchableOpacity>
               </View>

            </ScrollView>

         </View>
      )
   }
}

export default Configuracoes

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#f2f4f6',
      alignItems: "center"
   },
   list: {
      padding: 12,
   },
   card: {
      width: width * 0.9,
      backgroundColor: 'white',
      marginBottom: 20,
      borderRadius: 10,
      shadowOpacity: 0.25,
      elevation: 2,
   },
   cardHeader: {
      backgroundColor: '#f5f5f5',
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
   },
   cardBody: {
   },
   headerLabel: {
      fontWeight: "bold",
      fontSize: 22,
      color: '#374a63'
   },
   editBtn: {
      flexDirection: "row",
      height: height * 0.05,
      width: width * 0.9,
      backgroundColor: '#22a1d6',
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
   label: {
      fontSize: 14,
      fontWeight: "bold",
   },
   value: {
      width: width * 0.7
   },
   contentRow: {
      flexDirection: "row",
      margin: 10
   },
   btnView: {
      marginBottom: 15
   }
})