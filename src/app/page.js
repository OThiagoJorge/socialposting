import './globals.css'
import Logo from './components/logo'
import { gql, useQuery } from '@apollo/client'

const GET_BOOKS = gql`
query {
  books {
    title
    author
  }
}
`

const InsertName = () => {
    const { data, loading, error } = useQuery(GET_BOOKS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <div className='bg-gray-300 h-screen overflow-y-hidden'>
          <Logo />
            <div className="grid gap-4 grid-cols-1 w-auto justify-center relative mt-32">
              <h1 className="font-black text-4xl md:text-5xl block text-center mt-0">Bem-vindo!</h1>
              <form className="flex flex-col items-center mt-4">
                <label className="block text-2xl font-extrabold">Insira seu nome:</label>
                <input type="text" className="block mt-2 rounded-full w-4/5 md:w-96 h-10 focus:drop-shadow-md focus:outline-none align-middle text-2xl px-5 text-center" />
                <button type="submit" className="block mt-4 bg-blue-700 text-white rounded-full pt-3 px-10 py-3 hover:bg-blue-500 duration-100">Próximo</button>
              </form>
            </div>
            <h1>{data ? JSON.stringify(data.books) : 'No data'}</h1>
        </div>
    )
}

export default InsertName
