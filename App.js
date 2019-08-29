import React from 'react'
import {
   createAppContainer,
   createStackNavigator,
   createDrawerNavigator,
   createBottomTabNavigator,
   StackActions,
   NavigationActions,
   DrawerItems
} from 'react-navigation'
import { View, TouchableOpacity, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { AsyncClear } from './src/helpers/mainHelper'
import './src/config/statusBarConfig'

import Login from './src/components/pages/Login/LoginScreen'
import RecuperarSenha from './src/components/pages/Login/RecuperarSenhaScreen'
import Dashboard from './src/components/pages/DashboardScreen'
import Configuracoes from './src/components/pages/Configuracoes/ConfiguracaoScreen'
import EditarUsuario from './src/components/pages/Configuracoes/EditarUsuarioScreen'
import Investimento from './src/components/pages/Financeiro/InvestimentoScreen'
import Resgate from './src/components/pages/Financeiro/ResgateScreen'
import Detalhado from './src/components/pages/Financeiro/DetalhadoScreen'
import Indicadores from './src/components/pages/Indicadores/IndicadoresScreen'
import InvestimentoDigital from './src/components/pages/Solicitacoes/InvestimentoDigitalScreen'
import Aviso from './src/components/pages/Solicitacoes/AvisoScreen'
import SolicitarResg from './src/components/pages/Solicitacoes/SolicitarResgScreen'
import Mensagens from './src/components/pages/Mensagens/MensagensScreen'
import Agenda from './src/components/pages/Agenda/AgendaScreen'
import HomeImage from './src/components/utils/homeImage'

const CustomDrawerContentComponent = (props) => (

   <View>
      <View style={{marginTop: 25}}>
         <DrawerItems {...props} />
      </View>
   </View>
)

const financeiroTabNavigator = createBottomTabNavigator(
   {
      Investimento,
      Resgate,
      Detalhado
   }, {
      navigationOptions: () => ({
         drawerIcon: () => (
            <Icon
               containerStyle={{ width: 50 }}
               type='ionicon'
               name='md-cash'
               color='black'
               size={30} />
         )
      })
   }
)

const editarUsuarioStackNavigator = createStackNavigator(
   {
      'Configurações da Conta': Configuracoes,
      EditarUsuario: EditarUsuario
   }, {
      headerMode: 'none',
      mode: 'modal',
      navigationOptions: () => ({
         drawerIcon: () => (
            <Icon
               type='ionicon'
               name='md-cog'
               color='black'
               size={30} />
         )
      })
   }
)

const drawerNavigator = createDrawerNavigator(
   {
      'Dashboard': Dashboard,
      'Configurações da Conta': editarUsuarioStackNavigator,
      'Financeiro': financeiroTabNavigator,
      'Indicadores': Indicadores,
      'Investimento Digital': InvestimentoDigital,
      'Aviso de Investimento': Aviso,
      'Solicitar Resgate': SolicitarResg,
      'Mensagens': Mensagens,
      'Agenda': Agenda
   }, {

      initialRouteName: 'Dashboard',
      drawerPosition: 'left',
      contentComponent: CustomDrawerContentComponent,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      navigationOptions: () => {
         return {
            headerTitle: (
               <HomeImage height={30} width={90} color='white' />
            )
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
         navigationOptions: ({ navigation }) => ({
            title: 'Recuperar Senha',
            headerLeft: (
               <Icon
                  iconStyle={{ paddingLeft: 15, color: 'white' }}
                  type='ionicon'
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
         navigationOptions: ({ navigation }) => ({
            title: 'Dashboard',
            headerStyle: {
               backgroundColor: '#374a63'
            },
            headerTintColor: '#fff',
            headerRight: (
               <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => {
                  AsyncClear()
                  const resetAction = StackActions.reset({
                     index: 0,
                     actions: [NavigationActions.navigate({ routeName: 'Login' })],
                  })
                  navigation.dispatch(resetAction)
               }}>
                  <Icon
                     iconStyle={{ color: 'white', marginRight: 5 }}
                     type='ionicon'
                     name="md-log-out"
                     size={25} />
                  <Text style={{ color: 'white', marginTop: 5, marginRight: 15 }}>Sair</Text>
               </TouchableOpacity>
            )
         })
      }
   }, {
      defaultNavigationOptions: ({ navigation }) => {
         return {
            headerLeft: (
               <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                  <Icon
                     iconStyle={{ paddingLeft: 15, color: 'white' }}
                     type='ionicon'
                     name="md-menu"
                     size={30} />
               </TouchableOpacity>
            ),
         }
      }
   }
)
export default createAppContainer(stackNavigator)
// export default createAppContainer(drawerNavigator)
