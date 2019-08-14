import { Platform } from 'react-native'
import axios from 'axios'

const api = axios.create({
   baseURL: Platform.OS === 'ios' ? 'http://127.0.0.1:3000' : 'http://10.0.2.2:3000'
})

module.exports = api
