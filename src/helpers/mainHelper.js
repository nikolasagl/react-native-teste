const { encode, decode } = require('base-64')

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
      strCPF = strCPF.replace(/\D/g, '');
      
      var Soma;
      var Resto;
      Soma = 0;
      if (strCPF == "00000000000") return false;

      for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))) return false;

      Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if ((Resto == 10) || (Resto == 11)) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))) return false;
      return true;
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
   }
} 