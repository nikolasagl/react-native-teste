import * as yup from 'yup';

const usuarioValidation = yup.object().shape({
   dtnascimento_pes: yup.date('Digite uma data válida.').required('O campo Data de Nascimento é obrigatorio.'),
   nome_pes: yup.string().required('O campo Nome é obrigatorio.'),
   cpf_pes: yup.string().required('O campo CPF é obrigatorio.'),
   rg_pes: yup.string().required('O campo RG é obrigatorio.')
})

export default usuarioValidation