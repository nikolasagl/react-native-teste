import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Intl from 'intl'
import 'intl/locale-data/jsonp/pt-BR'

export default class ExtratoTableCell extends Component {

   constructor(props) {
      super(props)

      this.state = {
         isExtended: false
      }
   }

   _handler = () => {
      this.setState({
         isExtended: !this.state.isExtended
      })
   }

   render() {
      return (
         <View style={styles.container}>
            
            <TouchableOpacity style={this.state.isExtended == true ? {display: 'none'} : null} onPress={this._handler}>
               <View style={styles.rowResume}>
                  <Text>{this.props.descricao}</Text>
                  <Text>{new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(this.props.valor)}</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity style={this.state.isExtended == false ? {display: 'none'} : null} onPress={this._handler}>
               <View style={styles.rowExtended}>
                  <View style={styles.extendedDataText}>
                     <Text>Data Operaçao</Text>
                     <Text>{this.props.data}</Text>
                  </View>

                  <View style={styles.extendedDescText}>
                     <Text>Descriçao Operaçao</Text>
                     <Text>{this.props.descricao}</Text>
                  </View>

                  <View style={styles.extendedValorText}>
                     <Text>Valor Operaçao</Text>
                     <Text style={this.props.valor < 0 ? {color: 'red'} : null}>{new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(this.props.valor)}</Text>
                  </View>

                  <View style={styles.extendedTotalText}>
                     <Text>Total Pós Operaçao</Text>
                     <Text style={this.props.valor < 0 ? {color: 'red'} : null}>{new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(this.props.total)}</Text>
                  </View>

               </View>
            </TouchableOpacity>

         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      borderTopWidth: 1,
      borderColor: '#e5e5e5',
      marginBottom: 6,
   },
   rowResume: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 35,
      marginLeft: 10,
      marginRight: 10
   },
   rowExtended: {
      justifyContent: "center",
      marginLeft: 10,
      marginRight: 10
   },
   extendedDataText: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 3,
   },
   extendedDescText: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 3,
   },
   extendedValorText: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 3,
   },
   extendedTotalText: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 3,
   },
})