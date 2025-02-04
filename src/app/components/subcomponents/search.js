'use client'
import '@/globals.css'
import SearchIcon from '@mui/icons-material/Search'

const Search = () => {
    return (
        <div>
            {/* Searchbar when using desktop mod */}
            <label className='mt-2 w-4/5 md:w-96 h-10 rounded-full focus:drop-shadow-md focus:outline-none text-xl border-2 px-4 bg-gray-100 hidden md:inline'>
                <input 
                    className='flex-grow h-full text-center focus:outline-none bg-gray-100 text-black' 
                    placeholder="Pesquisar" 
                    type='text'
                />
                <SearchIcon className='text-black'/>
            </label>
            {/* Search button when using mobile mod */}
            <button className='m-auto rounded-full flex border-2 p-1 bg-gray-100 md:hidden'>
                <SearchIcon className='text-black'/>
            </button>
        </div>
    )
}

export default Search