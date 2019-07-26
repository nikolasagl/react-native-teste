import { createAppContainer, createStackNavigator } from 'react-navigation'

import Login from './components/login.js'
import Home from './components/main.js'

const Routes = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    },
  },
  Home: Home,
})

export default createAppContainer(Routes)
