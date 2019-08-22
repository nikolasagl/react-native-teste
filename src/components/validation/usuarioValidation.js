import * as Yup from 'yup';

const usuarioValidation = Yup.object().shape({
   dtnascimento_pes: Yup.date('Digite uma data válida.').required('O campo Data de Nascimento é oobrigatorio.'),
   nome_pes: Yup.string().required('O campo Nome é obrigatorio.'),
   cpf_pes: Yup.string().required('O campo CPF é obrigatorio.'),
   rg_pes: Yup.string().required('O campo RG é obrigatorio.')        
})

export default usuarioValidation