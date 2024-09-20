import '../globals.css'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SearchIcon from '@mui/icons-material/Search'
const Navbar = () => {
    return (
        <div className='z-50 px-3 items-center justify-between flex fixed bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 drop-shadow-2xl text-white font-extrabold text-xl h-14 w-full'>
            <p className=''>[Social Posting]</p>
            <div className='rounded-full'>
            <label className='mt-2 w-4/5 md:w-96 h-10 rounded-full focus:drop-shadow-md focus:outline-none text-xl border-2 px-4 bg-white'>
                  <input 
                    className='flex-grow h-full text-center focus:outline-none bg-transparent' 
                    placeholder="Pesquisar..." 
                    type='text'
                  />
                  <SearchIcon className='text-black'/>
            </label>
            </div> 
            <div className='flex items-center'>
                <button className='rounded-full border-black border-2 w-12 h-12'>
                        <img alt="Profile" />
                </button>
                <button className='rounded-full border-black border-2 w-12 h-12 ml-3'>
                    <DarkModeIcon />
                </button>
            </div>
        </div>)
    }
export default Navbar