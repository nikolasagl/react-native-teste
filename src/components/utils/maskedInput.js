import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'

const { height, width } = Dimensions.get('window')

class MaskedInput extends Component {
   _handleChange = (value) => {
      this.props.onChange(this.props.name, value)
   }

   render() {
      const { label, name, maskType, error, ...rest } = this.props
      return (
         <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <TextInputMask
               style={styles.input}
               name={name}
               placeholder={label}
               onChangeText={this._handleChange}
               maskType='datetime'
               type={maskType}
               {...rest} />
            {error && <Text style={styles.error}>{error}</Text>}
         </View>
      )
   }
}

const styles = StyleSheet.create({
   field: {
      marginBottom: 30
   },
   input: {
      width: width * 0.85,
      height: height * 0.05,
      fontSize: 16,
      borderColor: '#cbcdd1',
      borderBottomWidth: 1
   },
   label: {
      fontSize: 18,
      fontWeight: "bold",
      alignSelf: "flex-start"
   },
   error: {
      color: 'red'
   }
})

export default MaskedInput