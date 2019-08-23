import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Alert, KeyboardAvoidingView, Button } from 'react-native'
import { Formik } from 'formik'
import { AsyncGetItem } from '../../helpers/mainHelper'
import Input from '../utils/input'
import MaskedInput from '../utils/maskedInput'

import usuarioValidation from '../validation/usuarioValidation'

import api from '../../services/api'

const { height, width } = Dimensions.get('window')

class EditarUsuario extends Component {

   constructor(props) {
      super(props)

      const { navigation } = this.props

      this.state = {
         id: navigation.getParam('id', null),
         data: []
      }
   }

   componentDidMount() {
      this._loadData()
   }

   _loadData = async () => {
      try {
         const response = await api.get('/usuario/' + this.state.id + '/edit/', { headers: { 'Authorization': 'Bearer ' + await AsyncGetItem('token') } })

         var data = response.data

         this.setState({ data: data.usuario })

      } catch (error) {
         Alert.alert('Erro', 'Verifique sua conexão e tente novamente. ' + error)
      }
   }

   _handleSubmit = async (values, bag) => {
      try {
         const response = api.put('/usuario/' + this.state.id, values, { headers: { 'Authorization': 'Bearer ' + await AsyncGetItem('token') } })
      } catch (error) {
         console.log(error)
      }
   }

   render() {
      return (

         <View style={styles.container}>

            <ScrollView
               horizontal={true}
               pagingEnabled={true}
            >

               <KeyboardAvoidingView
                  behavior={(Platform.OS === 'ios') ? 'padding' : null}
                  keyboardVerticalOffset={Platform.select({ ios: 0, android: 100 })}>

                  <Formik
                     initialValues={this.state.data}
                     enableReinitialize={true}
                     onSubmit={this._handleSubmit}
                     validationSchema={usuarioValidation}
                     render={({ values, handleSubmit, setFieldValue, errors }) => (
                        <View style={styles.form}>

                           <ScrollView centerContent={true}>
                              <View style={styles.section}>

                                 <Text style={styles.sectionTitle}>Dados Pessoais</Text>

                                 <MaskedInput
                                    label='Data de Nascimento'
                                    name='dtnascimento_pes'
                                    onChange={setFieldValue}
                                    value={values.dtnascimento_pes}
                                    autoCapitalize='none'
                                    keyboardType='numeric'
                                    maskType='datetime'
                                    maskOptions={{ format: 'DD/MM/YYYY' }}
                                    error={errors.dtnascimento_pes}
                                 />

                                 <Input
                                    label='Nome'
                                    name='nome_pes'
                                    onChange={setFieldValue}
                                    value={values.nome_pes}
                                    autoCapitalize='none'
                                    error={errors.nome_pes}
                                 />

                                 <MaskedInput
                                    label='CPF'
                                    name='cpf_pes'
                                    onChange={setFieldValue}
                                    value={values.cpf_pes}
                                    keyboardType='numeric'
                                    autoCapitalize='none'
                                    maskType='cpf'
                                    error={errors.cpf_pes}
                                 />

                                 <MaskedInput
                                    label='RG'
                                    name='rg_pes'
                                    onChange={setFieldValue}
                                    value={values.rg_pes}
                                    keyboardType='numeric'
                                    autoCapitalize='none'
                                    maskType='custom'
                                    options={{ mask: '99.999.999-9' }}
                                    error={errors.rg_pes}
                                 />

                                 <Button title='Salvar' onPress={handleSubmit}></Button>
                              </View>
                           </ScrollView>

                           <ScrollView>
                              <View style={styles.section}>

                                 <Text style={styles.sectionTitle}>Dados Endereço</Text>

                                 <MaskedInput
                                    label='CEP'
                                    name='cep_pes'
                                    onChange={setFieldValue}
                                    value={values.cep_pes}
                                    keyboardType='numeric'
                                    autoCapitalize='none'
                                    maskType='custom'
                                    options={{ mask: '99999-999' }}
                                 />

                                 <Input
                                    label='Endereco'
                                    name='endereco_pes'
                                    onChange={setFieldValue}
                                    value={values.endereco_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Bairro'
                                    name='bairro_pes'
                                    onChange={setFieldValue}
                                    value={values.bairro_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Número'
                                    name='numero_pes'
                                    onChange={setFieldValue}
                                    keyboardType='numeric'
                                    value={values.numero_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Complemento'
                                    name='complemento_pes'
                                    onChange={setFieldValue}
                                    value={values.complemento_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Cidade'
                                    name='cidade_pes'
                                    onChange={setFieldValue}
                                    value={values.cidade_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Estado'
                                    name='estado_pes'
                                    onChange={setFieldValue}
                                    value={values.estado_pes}
                                    autoCapitalize='none'
                                 />

                                 <Button title='Salvar' onPress={handleSubmit}></Button>

                              </View>
                           </ScrollView>

                           <ScrollView>
                              <View style={styles.section}>

                                 <Text style={styles.sectionTitle}>Dados de Contato</Text>

                                 <MaskedInput
                                    label='Telefone'
                                    name='telefone_pes'
                                    onChange={setFieldValue}
                                    value={values.telefone_pes}
                                    keyboardType='numeric'
                                    autoCapitalize='none'
                                    maskType={'cel-phone'}
                                    options={{
                                       maskType: 'BRL',
                                       withDDD: true,
                                       dddMask: '(99) '
                                    }}
                                 />

                                 <Input
                                    label='Email'
                                    name='email_pes'
                                    onChange={setFieldValue}
                                    keyboardType='email-address'
                                    value={values.email_pes}
                                    autoCapitalize='none'
                                 />

                                 <Button title='Salvar' onPress={handleSubmit}></Button>
                              </View>
                           </ScrollView>

                           <ScrollView>
                              <View style={styles.section}>

                                 <Text style={styles.sectionTitle}>Dados Bancários</Text>

                                 <Input
                                    label='Banco'
                                    name='banco_pes'
                                    onChange={setFieldValue}
                                    value={values.banco_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Número Banco'
                                    name='numerobanco_pes'
                                    onChange={setFieldValue}
                                    keyboardType='numeric'
                                    value={values.numerobanco_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Agencia'
                                    name='agencia_pes'
                                    onChange={setFieldValue}
                                    keyboardType='numeric'
                                    value={values.agencia_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Conta'
                                    name='conta_pes'
                                    onChange={setFieldValue}
                                    keyboardType='numeric'                                 
                                    value={values.conta_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Titular'
                                    name='nometitular_pes'
                                    onChange={setFieldValue}
                                    value={values.nometitular_pes}
                                    autoCapitalize='none'
                                 />

                                 <Button title='Salvar' onPress={handleSubmit}></Button>
                              </View>
                           </ScrollView>

                           <ScrollView>
                              <View style={styles.section}>

                                 <Text style={styles.sectionTitle}>Dados de Login</Text>

                                 <Input
                                    label='Login'
                                    name='login_pes'
                                    editable={false}
                                    value={values.login_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Alterar Senha'
                                    name='senha_pes'
                                    onChange={setFieldValue}
                                    keyboardType='numeric'
                                    secureTextEntry={true}
                                    value={values.senha_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Confirmar Nova Senha'
                                    name='senha_pes_conf'
                                    onChange={setFieldValue}
                                    keyboardType='numeric'
                                    secureTextEntry={true}
                                    value={values.senha_pes_conf}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Alterar Assinatura Digital'
                                    name='digitalsign_pes'
                                    onChange={setFieldValue}
                                    keyboardType='numeric'
                                    secureTextEntry={true}
                                    value={values.digitalsign_pes}
                                    autoCapitalize='none'
                                 />

                                 <Input
                                    label='Confirmar Nova Assinatura Digital'
                                    name='digitalsign_pes_conf'
                                    onChange={setFieldValue}
                                    keyboardType='numeric'
                                    secureTextEntry={true}
                                    value={values.digitalsign_pes_conf}
                                    autoCapitalize='none'
                                 />

                                 <Button title='Salvar' onPress={handleSubmit}></Button>
                              </View>
                           </ScrollView>

                        </View>
                     )}>

                  </Formik>

               </KeyboardAvoidingView>

            </ScrollView>

         </View>

      )
   }
}

export default EditarUsuario

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#374a63',
   },
   form: {
      flexDirection: "row",
   },
   section: {
      height: height,
      width: width,
      backgroundColor: 'white',
      alignItems: "center"
   },
   input: {
      width: width * 0.85,
      height: height * 0.05,
      fontSize: 16,
      borderColor: '#cbcdd1',
      borderBottomWidth: 1,
      marginBottom: 30
   },
   sectionTitle: {
      width: width,
      height: 50,
      backgroundColor: '#ffe203',
      padding: 15,
      marginBottom: 20,
      alignSelf: "center",
      fontSize: 25
   },
   label: {
      fontSize: 18,
      fontWeight: "bold",
      alignSelf: "flex-start"
   }
})