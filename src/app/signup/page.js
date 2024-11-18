import '../globals.css';
import { InputAdornment, TextField } from '@mui/material';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'

const Signup = () => {
  return (
    <div className="grid justify-center pt-5 bg-gray-100 h-full pb-5">
      <h1 className="text-5xl text-center mb-5">Bem vindo!</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Cadastro</h2>
        <form id="signupForm" action="/api/register" method="POST" className="space-y-4">
          
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700">E-mail ou Telefone</label>
            <input
              type="text"
              id="emailOrPhone"
              name="emailOrPhone"
              placeholder="Digite seu e-mail ou telefone"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Digite seu nome"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Sobrenome</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Digite seu sobrenome"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>   
          <div>
      <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Nome de usuário</label>
      <TextField
        id="slug"
        name="slug"
        placeholder="Nome de usuário"
        required
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmailIcon />
            </InputAdornment>
          ),
        }}
        className="mt-1"
      />
    </div>                 
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Crie sua senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirme sua senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;