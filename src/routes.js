import { createAppContainer, createStackNavigator } from 'react-navigation'
import Login from './components/login.js'
import Home from './components/main.js'

const Routes = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerStyle: {
        backgroundColor: '#374a63'
      },
      headerTintColor: '#fff'
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerStyle: {
        backgroundColor: '#374a63'
      },
      headerTintColor: '#fff'
    }
  }
})

export default createAppContainer(Routes)
