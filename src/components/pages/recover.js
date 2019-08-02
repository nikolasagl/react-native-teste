import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native'
import RadioButton from '../utils/radioButton'
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

class RecoverPassword extends Component {

   constructor(props) {
      super(props)

      this.state = {
         username: '',
         radio: 1
      }
   }

   _recover = async () => {
      const response = await api.post('/recover', this.state)

      console.log(response)
   }

   _radioHandler = (val) => {
      this.setState({
         radio: val
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

                  <Text style={styles.labelH1}>Recupere sua senha</Text>

                  <RadioButton options={radioOptions} action={this._radioHandler} />

                  <Text style={styles.labelH5}>Digite o CPF ou o CNPJ cadastrado, será enviado uma senha provisória para o email vinculado a ele.</Text>

                  <TextInput
                     style={styles.input}
                     placeholder={this.state.radio === 1 ? 'CPF' : 'CNPJ'}
                     placeholderTextColor='#95989c'
                     autoCapitalize='none'
                     keyboardType='numeric'
                     onChangeText={(text) => this.setState({ username: text })}>
                  </TextInput>

                  <TouchableOpacity style={styles.btnContainer} onPress={this._recover}>
                     <Text style={styles.btn}>Enviar</Text>
                  </TouchableOpacity>

               </View>

            </KeyboardAvoidingView>

         </DismissKeyboard>
      )
   }
}

export default RecoverPassword

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
   labelH1: {
      fontSize: 22,
      color: '#acacac',
      alignSelf: "center",
      marginBottom: height * 0.05
   },
   labelH5: {
      fontSize: 11,
      width: width * 0.8,
      color: '#acacac',
   }
})
