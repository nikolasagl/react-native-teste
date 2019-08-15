const { encode, decode } = require('base-64')

module.exports = {
   validateCpf(strCPF) {
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

   removeCpfMask(strCPF) {
      return strCPF.replace(/\D/g, '');
   },

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
   }
} 