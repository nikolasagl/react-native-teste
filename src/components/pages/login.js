import React, { Component } from 'react'
import { StackActions, NavigationActions } from 'react-navigation'
import { TextInputMask } from 'react-native-masked-text'
import { 
   View, 
   Text, 
   TextInput, 
   Platform, 
   StyleSheet, 
   Dimensions, 
   TouchableOpacity, 
   TouchableWithoutFeedback, 
   Keyboard, 
   KeyboardAvoidingView
} from 'react-native'

import RadioButton from '../utils/radioButton'
import PasswordButton from '../utils/passwordButton'
import HomeImage from '../utils/homeImage'

import { validateCpf, validateCnpj, AsyncSetItem } from '../../helpers/mainHelper'

import api from '../../services/api'

const { height, width } = Dimensions.get('window')

const radioOptions = [
   { key: 1, text: 'CPF' },
   { key: 2, text: 'CNPJ' }
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
         radio: 1,

         passwordMask: '',
         validUsername: '',
         validPassword: '',
         usernameError: '',
         passwordError: '',
         backendError: ''
      }
   }

   _validateForm = async () => {
      this.setState({
         usernameError: await this._validateField('username', this.state.radio === 1 ? 'CPF' : 'CNPJ', 1),
         passwordError: await this._validateField('password', 'Senha', 2)
      })

      if (this.state.validUsername && this.state.validPassword)
         this._login()
   }

   _validateField = (element, label, rule) => {
      var field = this.state[element]
      var errorMsg = ''

      switch (rule) {
         case 1:
            var aux = this.state.radio === 1 ? validateCpf(this.state[element]) : validateCnpj(this.state[element])
            
            if (field.length != 0 && aux == true) {
               this.setState({ validUsername: true })    

            } else if (field.length == 0) {
               this.setState({ validUsername: false })         
               errorMsg += `O campo ${label} é obrigatorio.`

            } else {
               this.setState({ validUsername: false })         
               errorMsg += `Digite um ${label} válido.`
            }
            break;
      
         case 2:
            if (field.length != 0) {    
               this.setState({ validPassword: true })       

            } else {
               this.setState({ validPassword: false })    
               errorMsg += `O campo ${label} é obrigatorio.`
            }
            break;
      }

      return errorMsg
   }

   _login = async () => {
      const response = await api.post('/login', {
         username: this.state.username,
         password: this.state.password,
         radio: this.state.radio
      })
      
      if (response.data !== null) {
         if ('error' in response.data) {
            this.setState({
               backendError: response.data.error
            })

         } else if ('usuario' in response.data) {
            AsyncSetItem('id', response.data.usuario.codigo_pes)
            AsyncSetItem('nome', response.data.usuario.nome_pes)
            AsyncSetItem('email', response.data.usuario.email_pes)
            AsyncSetItem('token', response.data.usuario.token)
            
            const resetAction = StackActions.reset({
               index: 0,
               actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
            })
            this.props.navigation.dispatch(resetAction)

         } else {
            this.setState({
               backendError: 'Autenticação falhou. Tente novamente mais tarde1.'
            })
         }

      } else {
         this.setState({
            backendError: 'Autenticação falhou. Tente novamente mais tarde2.'
         })
      }
   }

   _forgotPass = () => {
      this.props.navigation.navigate('RecuperarSenha')
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
         password: '',
         passwordMask: ''
      })
   }

   render() {
      return (
         <DismissKeyboard>

            <KeyboardAvoidingView 
               style={styles.container} 
               behavior={(Platform.OS === 'ios') ? 'padding' : null}
               keyboardVerticalOffset={Platform.select({ios: 0, android: 100})}>

               <View style={styles.image}>
                  <HomeImage />
               </View>

               <View style={styles.content}>

                  <RadioButton options={radioOptions} action={this._radioHandler} />

                  <Text style={this.state.backendError != '' ? styles.backendError : {display: "none"}}>{this.state.backendError}</Text>                  

                  {/* <TextInputMask
                     style={[styles.input, this.state.validUsername === false ? styles.error : null]}
                     placeholder={this.state.radio === 1 ? 'CPF' : 'CNPJ'}
                     placeholderTextColor='#95989c'
                     autoCapitalize='none'
                     keyboardType='numeric'
                     onChangeText={(text) => this.setState({ username: text })}
                     value={this.state.username}
                     type={this.state.radio === 1 ? 'cpf' : 'cnpj'}>
                  </TextInputMask> */}
                  <TextInput
                     style={[styles.input, this.state.validUsername === false ? styles.error : null]}
                     placeholder={this.state.radio === 1 ? 'CPF' : 'CNPJ'}
                     placeholderTextColor='#95989c'
                     autoCapitalize='none'
                     keyboardType='numeric'
                     onChangeText={(text) => this.setState({ username: text })}
                     value={this.state.username}>
                  </TextInput>

                  <Text style={this.state.validUsername === false ? {color: 'red'} : {display: "none"}}>{this.state.usernameError}</Text>

                  <View style={[styles.passwordInput, this.state.validPassword === false ? styles.error : null]}>
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
                  
                  <Text style={this.state.validPassword === false ? {color: 'red'} : {display: "none"}}>{this.state.passwordError}</Text>

                  <PasswordButton action={this._passwordHandler} />

                  <TouchableOpacity style={styles.btnContainer} onPress={this._validateForm}>
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
      height: 40,
      borderRadius: height * 0.01,
      fontSize: 16,
      borderColor: '#cbcdd1',
      borderWidth: 1,
      paddingLeft: height * 0.02,
      marginTop: height * 0.01,
      ...Platform.select({
         ios: {
            shadowOpacity: 0.25,
         },
         android: {
            elevation: 1,
         }
      })
   },
   btnContainer: {
      backgroundColor: '#374a63',
      marginTop: height * 0.02,
      width: width * 0.8,
      height: 38,
      borderRadius: height * 0.01,
      shadowOpacity: 0.25,
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
      ...Platform.select({
         android: {
            marginBottom: 25,
         }
      })
   },
   content: {
      flex: Platform.OS === 'ios' ? 0.5 : 0.6,
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
      height: 40,
      borderRadius: height * 0.01,
      borderColor: '#cbcdd1',
      borderWidth: 1,
      marginTop: height * 0.01,
      paddingLeft: height * 0.02,
      ...Platform.select({
         ios: {
            fontSize: 16,
            shadowOpacity: 0.25,
         },
         android: {
            fontSize: 20,
            elevation: 1,
         }
      })
   },
   txtClearPass: {
      width: width * 0.6,
   },
   btnClearPass: {
      alignSelf: "center",
      marginRight: width * 0.03
   },
   error: {
      borderWidth: 1,
      borderColor: 'red'
   },
   backendError: {
      width: width * 0.785,
      color: 'red', 
      alignSelf: "center"
   }
})
