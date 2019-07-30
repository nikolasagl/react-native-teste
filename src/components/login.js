import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import RadioButton from './utils/radioButton'
import HomeImage from './utils/homeImage'
import Routes from '../routes'

import api from '../services/api'

const {height, width} = Dimensions.get('window')

const radioOptions = [
  { key: 1, text: 'CPF' },
  { key: 2, text: 'CNPJ' },
]

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  _login = async () => {
    const response = await api.post('/login', this.state)

    if (response.data !== null) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      });
      this.props.navigation.dispatch(resetAction);
    }

    console.log(response.data);
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.image}>
          <HomeImage />
        </View>

        <View style={styles.content}>

          <RadioButton options={radioOptions} />

          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='#95989c'
            autoCapitalize = 'none'
            onChangeText={(text) => this.setState({username:text})}>
          </TextInput>

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder='Senha'
            placeholderTextColor='#95989c'
            autoCapitalize = 'none'
            onChangeText={(text) => this.setState({password:text})}>
          </TextInput>

          <TouchableOpacity style={styles.loginContainer} onPress={this._login}>
            <Text style={styles.loginBtn}>Entrar</Text>
          </TouchableOpacity>

        </View>

      </View>
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
    flex: 0.2,
  },
  content: {
    flex: 0.4,
  }
})
