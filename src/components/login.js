import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import LoginRadio from './loginRadio'


const {height, width} = Dimensions.get('window')

_login = () => {}

class HomeImage extends Component {
  render() {
    return (
      <Image source={require('../assets/fmi.png')} style={{ width: 190, height:100 }}/>
    )
  }
}

export default class Login extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View>
          <HomeImage style={styles.image} />
        </View>

        <LoginRadio />

        <TextInput style={styles.input} placeholder='CPF/CNPJ' placeholderTextColor='#95989c'></TextInput>

        <TextInput style={styles.input} placeholder='Senha' placeholderTextColor='#95989c'></TextInput>

        <TouchableOpacity style={styles.loginContainer}>
          <Text style={styles.loginBtn}>Entrar</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: width*0.8,
    height: height*0.05,
    borderRadius: height*0.01,
    fontSize: 16,
    borderColor: '#cbcdd1',
    borderWidth: 1,
    marginTop: height*0.01,
    paddingLeft: height*0.02,
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },
  loginContainer: {
    backgroundColor: '#374a63',
    marginTop: height*0.02,
    width: width*0.8,
    height: height*0.05,
    borderRadius: height*0.01,
    shadowOpacity: 0.25,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    color: '#fff',
    fontSize: 16
  },
  image: {
    marginBottom: 10
  }
})
