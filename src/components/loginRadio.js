import React, { Component } from 'react'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

var radio_props = [
  {label: 'CPF', value: 0 },
  {label: 'CNPJ', value: 1 }
];

export default class LoginRadio extends Component {
  render() {
    return (
      <RadioForm
        radio_props={radio_props}
        initial={0}
        formHorizontal={true}
        labelHorizontal={true}
        buttonColor={'#cbcdd1'}
        animation={true}
        onPress={(value) => {this.setState({value:value})}}
      />
    )
  }
}
