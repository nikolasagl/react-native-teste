import React from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native'
import { withFormik } from 'formik'

const { height, width } = Dimensions.get('window')

const Form = (props) => (

   <ScrollView
      horizontal={true}
      pagingEnabled={true}
   >
      <View style={styles.form}>

         <View style={styles.section}>

            <Text style={styles.sectionTitle}>Dados Pessoais</Text>

            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('data_nasc', text) }}
               value={props.values.data_nasc} >
            </TextInput>

            <Text style={styles.label}>Nome</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('nome', text) }}
               value={props.values.nome} >
            </TextInput>

            <Text style={styles.label}>CPF</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('cpf', text) }}
               value={props.values.cpf} >
            </TextInput>

            <Text style={styles.label}>RG</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('rg', text) }}
               value={props.values.rg} >
            </TextInput>

         </View>

         <View style={styles.section}>

            <Text style={styles.sectionTitle}>Dados Endereço</Text>

            <Text style={styles.label}>CEP</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('cep', text) }}
               value={props.values.cep} >
            </TextInput>

            <Text style={styles.label}>Endereço</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('endereco', text) }}
               value={props.values.endereco} >
            </TextInput>

            <Text style={styles.label}>Bairro</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('bairro', text) }}
               value={props.values.bairro} >
            </TextInput>

            <Text style={styles.label}>Numero</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('numero', text) }}
               value={props.values.numero} >
            </TextInput>

            <Text style={styles.label}>Complemento</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('complemento', text) }}
               value={props.values.complemento} >
            </TextInput>

            <Text style={styles.label}>Estado</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('estado', text) }}
               value={props.values.estado} >
            </TextInput>

            <Text style={styles.label}>Cidade</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('cidade', text) }}
               value={props.values.cidade} >
            </TextInput>

         </View>

         <View style={styles.section}>

            <Text style={styles.sectionTitle}>Dados de Contato</Text>

            <Text style={styles.label}>Telefone</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('telefone', text) }}
               value={props.values.telefone} >
            </TextInput>

            <Text style={styles.label}>Email</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('email', text) }}
               value={props.values.email} >
            </TextInput>

         </View>

         <View style={styles.section}>

            <Text style={styles.sectionTitle}>Dados Bancários</Text>

            <Text style={styles.label}>Banco</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('banco', text) }}
               value={props.values.banco} >
            </TextInput>

            <Text style={styles.label}>Número Banco</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('num_banco', text) }}
               value={props.values.num_banco} >
            </TextInput>

            <Text style={styles.label}>Agência</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('agencia', text) }}
               value={props.values.agencia} >
            </TextInput>

            <Text style={styles.label}>Conta</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('conta', text) }}
               value={props.values.conta} >
            </TextInput>

            <Text style={styles.label}>Nome Titular</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('titular', text) }}
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
               onChangeText={(text) => { props.setFieldValue('nova_senha', text) }}
               value={props.values.nova_senha} >
            </TextInput>

            <Text style={styles.label}>Confirmar nova Senha</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('nova_senha_conf', text) }}
               value={props.values.nova_senha_conf} >
            </TextInput>

            <Text style={styles.label}>Assinatura Digital</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('ass_digital', text) }}
               value={props.values.ass_digital} >
            </TextInput>

            <Text style={styles.label}>Confirmar Assinatura Digital</Text>
            <TextInput
               style={styles.input}
               onChangeText={(text) => { props.setFieldValue('ass_digital_conf', text) }}
               value={props.values.ass_digital_conf} >
            </TextInput>

         </View>

      </View>
   </ScrollView>
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
      fontSize: 17,
      marginLeft: 20,
      alignSelf: "flex-start"
   }
})