import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import FlatListWithEnd from 'react-native-flatlist-with-end'
import { withNavigation } from 'react-navigation'

import api from '../../services/api'

const { height, width } = Dimensions.get('window')

class UserDataList extends Component {

   constructor(props) {
      super(props)

      this.state = {
         data: []
      }
   }

   componentDidMount() {
      this._loadData()
   }

   _loadData = async () => {
      const response = await api.get('/user/2')

      var data = response.data

      this.setState({ data: [data] })
   }

   _editarPerfil = () => {
      this.props.navigation.navigate('EditarUsuario', { id: this.state.data[0].user.codigo_pes})
   }

   render() {
      return (
         <FlatListWithEnd
            style={styles.list}
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
               <View>

                  <View style={styles.card}>

                     <View style={styles.cardHeader}>
                        <Text style={styles.headerLabel}>Dados Pessoais</Text>
                     </View>

                     <View style={styles.cardBody}>
                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Nome: </Text>
                           <Text style={styles.value}>{item.user.nome_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>CPF: </Text>
                           <Text style={styles.value}>{item.user.cpf_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>RG: </Text>
                           <Text style={styles.value}>{item.user.rg_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Data Nasc.: </Text>
                           <Text style={styles.value}>{item.user.dtnascimento_pes}</Text>
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
                           <Text style={styles.value}>{item.user.cep_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Endereço: </Text>
                           <Text style={styles.value}>{item.user.endereco_pes + ', ' + item.user.numero_pes + ', ' + item.user.bairro_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Complemento: </Text>
                           <Text style={styles.value}>{item.user.complemento_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Cidade: </Text>
                           <Text style={styles.value}>{item.user.cidade_pes.nome_cid + ', ' + item.user.estado_pes.uf_est + ' - Brasil'}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Telefone: </Text>
                           <Text style={styles.value}>{item.user.telefone_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Email: </Text>
                           <Text style={styles.value}>{item.user.email_pes}</Text>
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
                           <Text style={styles.value}>{item.user.banco_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Nº Banco: </Text>
                           <Text style={styles.value}>{item.user.numerobanco_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Agência: </Text>
                           <Text style={styles.value}>{item.user.agencia_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Conta: </Text>
                           <Text style={styles.value}>{item.user.conta_pes}</Text>
                        </View>

                        <View style={styles.contentRow}>
                           <Text style={styles.label}>Nome Titular: </Text>
                           <Text style={styles.value}>{item.user.nometitular_pes}</Text>
                        </View>
                     </View>

                  </View>

               </View>
            )}
            renderEndComponent={() => {
               return (
                  <View key={4} style={styles.btnView}>
                     <TouchableOpacity style={styles.editBtn} onPress={this._editarPerfil}>
                        <Text style={{ color: 'white', fontSize: 16 }}>Editar Perfil</Text>
                     </TouchableOpacity>
                  </View>
               )
            }} />
      )
   }
}

export default withNavigation(UserDataList)

const styles = StyleSheet.create({
   list: {
      padding: 12
   },
   card: {
      width: width * 0.9,
      backgroundColor: 'white',
      marginBottom: 20,
      borderRadius: 10,
      shadowOpacity: 0.25,
      shadowOffset: {
         height: 0,
         width: 0,
      },
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
      height: height*0.05,
      width: width*0.9,
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
      width: width*0.7
   },
   contentRow: {
      flexDirection: "row",
      margin: 10
   }
})