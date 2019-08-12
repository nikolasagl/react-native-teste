import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native'

import api from '../../services/api'
import Form from '../utils/userEditForm'

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
      const response = await api.get('/user/edit/' + this.state.id)

      var data = response.data

      this.setState({ data })
   }

   render() {
      return (
         <View style={styles.container}>

            <ScrollView>

               <Form />

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
   scroll: {},
   form: {
      padding: 10,
      alignItems: "center"
   },
   section: {
      padding: 10,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: '#cbcdd1',
      marginBottom: 12,
      shadowOpacity: 0.25,
      shadowOffset: {
         height: 0,
         width: 0,
      },
      elevation: 2,
      backgroundColor: 'white'
   },
   input: {
      width: width * 0.85,
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
   }
})