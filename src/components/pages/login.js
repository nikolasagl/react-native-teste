import React, { Component } from 'react'
import { View, Text, TextInput, Alert, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { TextInputMask } from 'react-native-masked-text'
import RadioButton from '../utils/radioButton'
import PasswordButton from '../utils/passwordButton'
import HomeImage from '../utils/homeImage'

import api from '../../services/api'

const { height, width } = Dimensions.get('window')

const radioOptions = [
   { key: 1, text: 'CPF' },
   { key: 2, text: 'CNPJ' },
]

const DismissKeyboard = ({ children }) => (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
   </TouchableWithoutFeedback>
)

class Login extends Component {

   constructor(props) {
      super(props)

      this.state = {
         username: '',
         password: '',
         passwordMask: '',
         radio: 1
      }
   }

   _login = async () => {
      /* 
      const response = await api.post('/login', this.state)
      if (response.data !== null) {}
      */

      const resetAction = StackActions.reset({
         index: 0,
         actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
      });
      this.props.navigation.dispatch(resetAction);
   }

   _forgotPass = async () => {
      this.props.navigation.navigate('RecoverPassword')
   }

   _radioHandler = (val) => {
      this.setState({
         radio: val
      })
   }

   _passwordHandler = (val) => {
      this.setState({
         password: this.state.password + val,
         passwordMask: this.state.passwordMask + '*'
      })
   }

   _clearPassword = () => {
      this.setState({
         passwordMask: ''
      })
   }

   render() {
      return (
         <DismissKeyboard>

            <KeyboardAvoidingView style={styles.container} behavior='padding'>

               <View style={styles.image}>
                  <HomeImage />
               </View>

               <View style={styles.content}>

                  <RadioButton options={radioOptions} action={this._radioHandler} />

                  <TextInputMask
                     style={styles.input}
                     placeholder={this.state.radio === 1 ? 'CPF' : 'CNPJ'}
                     placeholderTextColor='#95989c'
                     autoCapitalize='none'
                     keyboardType='numeric'
                     onChangeText={(text) => this.setState({ username: text })}
                     value={this.state.username}
                     type={this.state.radio === 1 ? 'cpf' : 'cnpj'}>
                  </TextInputMask>

                  <View style={styles.passwordInput}>
                     <TextInput
                        style={styles.txtClearPass}
                        secureTextEntry={true}
                        placeholder='Senha'
                        placeholderTextColor='#95989c'
                        autoCapitalize='none'
                        editable={false}
                        value={this.state.passwordMask}>
                     </TextInput>
                     <TouchableOpacity
                        style={styles.btnClearPass}
                        onPress={this._clearPassword}>
                        <Text style={{ color: '#acacac' }}>Limpar</Text>
                     </TouchableOpacity>
                  </View>

                  <PasswordButton action={this._passwordHandler} />

                  <TouchableOpacity style={styles.btnContainer} onPress={this._login}>
                     <Text style={styles.btn}>Entrar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={this._forgotPass}>
                     <Text style={styles.link}>Esqueci minha senha</Text>
                  </TouchableOpacity>

               </View>

            </KeyboardAvoidingView>

         </DismissKeyboard>
      )
   }
}

export default Login

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   input: {
      width: width * 0.8,
      height: height * 0.05,
      borderRadius: height * 0.01,
      fontSize: 16,
      borderColor: '#cbcdd1',
      borderWidth: 1,
      marginTop: height * 0.01,
      paddingLeft: height * 0.02,
      shadowOpacity: 0.25,
      shadowOffset: {
         height: 0,
         width: 0,
      },
      elevation: 2,
   },
   btnContainer: {
      backgroundColor: '#374a63',
      marginTop: height * 0.02,
      width: width * 0.8,
      height: height * 0.05,
      borderRadius: height * 0.01,
      shadowOpacity: 0.25,
      shadowOffset: {
         height: 0,
         width: 0,
      },
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
   },
   btn: {
      color: '#fff',
      fontSize: 16
   },
   image: {
      flex: 0.2,
   },
   content: {
      flex: 0.4,
   },
   link: {
      color: '#acacac',
      marginTop: height * 0.01,
      textDecorationColor: '#374a63',
   },
   passwordInput: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: width * 0.8,
      height: height * 0.05,
      borderRadius: height * 0.01,
      fontSize: 16,
      borderColor: '#cbcdd1',
      borderWidth: 1,
      marginTop: height * 0.01,
      paddingLeft: height * 0.02,
      shadowOpacity: 0.25,
      shadowOffset: {
         height: 0,
         width: 0,
      },
      elevation: 2,
   },
   txtClearPass: {
      width: width * 0.6,
   },
   btnClearPass: {
      alignSelf: "center",
      marginRight: width * 0.03
   }
})
