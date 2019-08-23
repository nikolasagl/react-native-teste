import React from 'react'
import { createAppContainer, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import './src/config/statusBarConfig'
import Login from './src/components/pages/Login'
import RecuperarSenha from './src/components/pages/RecuperarSenha'
import Dashboard from './src/components/pages/Dashboard'
import Configuracoes from './src/components/pages/Configuracao'
import Investimento from './src/components/pages/Investimento'
import Resgate from './src/components/pages/Resgate'
import Detalhado from './src/components/pages/Detalhado'
import EditarUsuario from './src/components/pages/EditarUsuario'

import Indicadores from './src/components/pages/Indicadores'
import InvestimentoDigital from './src/components/pages/InvestimentoDigital'
import Aviso from './src/components/pages/Aviso'
import SolicitarResg from './src/components/pages/SolicitarResg'
import Mensagens from './src/components/pages/Mensagens'
import Agenda from './src/components/pages/Agenda'

const financeiroTabNavigator = createBottomTabNavigator(
   {
      Investimento,
      Resgate,
      Detalhado
   }
)

const drawerNavigator = createDrawerNavigator(
   {
      'Dashboard': Dashboard,
      'Configurações': Configuracoes,
      'Financeiro': financeiroTabNavigator,
      'Indicadores': Indicadores,
      'Investimento Digital': InvestimentoDigital,
      'Aviso de Investimento': Aviso,
      'Solicitar Resgate': SolicitarResg,
      'Mensagens': Mensagens,
      'Agenda': Agenda
   }, {
      navigationOptions: ({ navigation }) => {
         const { routeName } = navigation.state.routes[navigation.state.index]
         return {
            headerTitle: routeName
         }
      }
   })

const stackNavigator = createStackNavigator(
   {
      Login: {
         screen: Login,
         navigationOptions: () => ({
            title: 'Login',
            headerBackTitle: null,
            headerLeft: null,
            headerStyle: {
               backgroundColor: '#374a63',
            },
            headerTintColor: '#fff'
         }),
      },
      RecuperarSenha: {
         screen: RecuperarSenha,
         navigationOptions: ({navigation}) => ({
            title: 'Recuperar Senha',
            headerLeft: (
               <Icon
                  style={{ paddingLeft: 15, color: 'white' }}
                  name="md-arrow-back"
                  size={30}
                  onPress={() => navigation.goBack(null)} />
            ),
            headerStyle: {
               backgroundColor: '#374a63'
            },
            headerTintColor: '#fff',
         }),
      },
      EditarUsuario: {
         screen: EditarUsuario,
         navigationOptions: ({navigation}) => ({
            title: 'Editar Usuário',
            headerLeft: (
               <Icon
                  style={{ paddingLeft: 15, color: 'white' }}
                  name="md-arrow-back"
                  size={30}
                  onPress={() => navigation.goBack(null)} />
            ),
            headerStyle: {
               backgroundColor: '#374a63'
            },
            headerTintColor: '#fff',
         }),
      },
      Drawer: {
         screen: drawerNavigator,
         navigationOptions: () => ({
            title: 'Dashboard',
            headerStyle: {
               backgroundColor: '#374a63'
            },
            headerTintColor: '#fff'
         })
      }
   }, {
      defaultNavigationOptions: ({ navigation }) => {
         return {
            headerLeft: (
               <Icon
                  style={{ paddingLeft: 15, color: 'white' }}
                  name="md-menu"
                  size={30}
                  onPress={() => navigation.toggleDrawer()} />
            )
         }
      }
   }
)
export default createAppContainer(stackNavigator)
