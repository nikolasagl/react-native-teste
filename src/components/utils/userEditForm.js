import React from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
import { withFormik } from 'formik'

const { height, width } = Dimensions.get('window')

const Form = (props) => (
   <View style={styles.form}>

      <View style={styles.section}>

         <Text style={styles.sectionTitle}>Dados Pessoais</Text>

         <Text style={styles.label}>Data de Nascimento</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.data_nasc} >
         </TextInput>

         <Text style={styles.label}>Nome</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.nome} >
         </TextInput>

         <Text style={styles.label}>CPF</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.cpf} >
         </TextInput>

         <Text style={styles.label}>RG</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.rg} >
         </TextInput>

      </View>

      <View style={styles.section}>

         <Text style={styles.sectionTitle}>Dados Endereço</Text>

         <Text style={styles.label}>CEP</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.cep} >
         </TextInput>

         <Text style={styles.label}>Endereço</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.endereco} >
         </TextInput>

         <Text style={styles.label}>Bairro</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.bairro} >
         </TextInput>

         <Text style={styles.label}>Numero</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.numero} >
         </TextInput>

         <Text style={styles.label}>Complemento</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.complemento} >
         </TextInput>

         <Text style={styles.label}>Estado</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.estado} >
         </TextInput>

         <Text style={styles.label}>Cidade</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.cidade} >
         </TextInput>

      </View>

      <View style={styles.section}>

         <Text style={styles.sectionTitle}>Dados de Contato</Text>

         <Text style={styles.label}>Telefone</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.telefone} >
         </TextInput>

         <Text style={styles.label}>Email</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.email} >
         </TextInput>

      </View>

      <View style={styles.section}>

         <Text style={styles.sectionTitle}>Dados Bancários</Text>

         <Text style={styles.label}>Banco</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.banco} >
         </TextInput>

         <Text style={styles.label}>Número Banco</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.num_banco} >
         </TextInput>

         <Text style={styles.label}>Agência</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.agencia} >
         </TextInput>

         <Text style={styles.label}>Conta</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.conta} >
         </TextInput>

         <Text style={styles.label}>Nome Titular</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.titular} >
         </TextInput>

      </View>

      <View style={styles.section}>

         <Text style={styles.sectionTitle}>Dados Login</Text>

         <Text style={styles.label}>Login</Text>
         <TextInput
            style={styles.input}
            value={props.values.login}
            editable={false} >
         </TextInput>

         <Text style={styles.label}>Alterar Senha</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.nova_senha} >
         </TextInput>

         <Text style={styles.label}>Confirmar nova Senha</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.nova_senha_conf} >
         </TextInput>

         <Text style={styles.label}>Assinatura Digital</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.ass_digital} >
         </TextInput>

         <Text style={styles.label}>Confirmar Assinatura Digital</Text>
         <TextInput
            style={styles.input}
            onChangeText={() => { }}
            value={props.values.ass_digital_conf} >
         </TextInput>

      </View>

   </View>
)

export default withFormik({
   mapPropsToValues: () => ({
      data_nasc: '',
      nome: '',
      cpf: '',
      rg: '',

      cep: '',
      endereco: '',
      bairro: '',
      numero: '',
      complemento: '',
      estado: '',
      cidade: '',

      telefone: '',
      email: '',

      banco: '',
      num_banco: '',
      agencia: '',
      conta: '',
      titular: '',

      nova_senha: '',
      nova_senha_conf: '',
      ass_digital: '',
      ass_digital_conf: '',
   }),

   handleSubmit: (values) => {
      console.log(values)
   }
})(Form)

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