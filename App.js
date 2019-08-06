import { createAppContainer, createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation'
import './src/config/statusBarConfig'
import Login from './src/components/pages/login'
import RecoverPassword from './src/components/pages/recover'
import Resumo from './src/components/pages/main'
import Configuracoes from './src/components/pages/config'
import Investimento from './src/components/pages/investimento'
import Resgate from './src/components/pages/resgate'
import Detalhado from './src/components/pages/detalhado'

const financeiroTabNavigator = createBottomTabNavigator(
   {
      Investimento,
      Resgate,
      Detalhado
   }
)

const drawerNavigator = createDrawerNavigator(
{
   Resumo: Resumo,
   Configuracoes: Configuracoes,
   Financeiro: financeiroTabNavigator
}, {
   navigationOptions: ({ navigation }) =>  {
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
         headerStyle: {
            backgroundColor: '#374a63'
         },
         headerTintColor: '#fff'
      }),
   },
   RecoverPassword: {
      screen: RecoverPassword,
      navigationOptions: () => ({
         title: 'Recuperar Senha',
         headerStyle: {
            backgroundColor: '#374a63'
         },
         headerTintColor: '#fff'
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
      }),
   }
})

export default createAppContainer(stackNavigator)
