const { encode, decode } = require('base-64')
import { AsyncStorage } from 'react-native'

module.exports = {

   // DECODE
   atou(b64) {
      return decodeURIComponent(escape(decode(b64)));
   },

   // ENCODE
   utoa(data) {
      return encode(unescape(encodeURIComponent(data)));
   },

   shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array
   },

   negativeArray(arr) {
      return new Proxy(arr, {
         set(t, k, v, r) {
            let i
            if (typeof k === 'string' && (i = +k) < 0 && !Number.isNaN(i)) k = t.length + i
            Reflect.set(t, k, v, r)
         },
         get(t, k, r) {
            let i
            if (typeof k === 'string' && (i = +k) < 0 && !Number.isNaN(i)) k = t.length + i
            return Reflect.get(t, k, r)
         }
      })
   },

   validateCpf(strCPF) {
      cpf = strCPF.replace(/\D/g, '');

      var numeros, digitos, soma, i, resultado, digitos_iguais;
      digitos_iguais = 1;
      if (cpf.length < 11)
         return false;
      for (i = 0; i < cpf.length - 1; i++)
         if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
         }
      if (!digitos_iguais) {
         numeros = cpf.substring(0, 9);
         digitos = cpf.substring(9);
         soma = 0;
         for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
         resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
         if (resultado != digitos.charAt(0))
            return false;
         numeros = cpf.substring(0, 10);
         soma = 0;
         for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
         resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
         if (resultado != digitos.charAt(1))
            return false;
         return true;
      }
      else
         return false;
   },

   validateCnpj(cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, '');

      if (cnpj == '') return false;

      if (cnpj.length != 14)
         return false;

      // Elimina CNPJs invalidos conhecidos
      if (cnpj == "00000000000000" ||
         cnpj == "11111111111111" ||
         cnpj == "22222222222222" ||
         cnpj == "33333333333333" ||
         cnpj == "44444444444444" ||
         cnpj == "55555555555555" ||
         cnpj == "66666666666666" ||
         cnpj == "77777777777777" ||
         cnpj == "88888888888888" ||
         cnpj == "99999999999999")
         return false;

      // Valida DVs
      tamanho = cnpj.length - 2
      numeros = cnpj.substring(0, tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
         soma += numeros.charAt(tamanho - i) * pos--;
         if (pos < 2)
            pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
         return false;

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
         soma += numeros.charAt(tamanho - i) * pos--;
         if (pos < 2)
            pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
         return false;

      return true;
   },

   // AsyncStorage Functions
   async AsyncSetItem(key, value) {
      try {
         return await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
         // console.error('AsyncStorage#setItem error: ' + error.message);
      }
   },
   async AsyncGetItem(key) {
      return await AsyncStorage.getItem(key)
         .then((result) => {
            if (result) {
               try {
                  result = JSON.parse(result);
               } catch (e) {
                  // console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
               }
            }
            return result;
         });
   },
   async AsyncRemoveItem(key) {
      return await AsyncStorage.removeItem(key);
   },
   async AsyncClear() {
      return await AsyncStorage.clear()
   }
} 