import '@/globals.css'

const SignupInput = ({ label, type, name, placeholder, required, }) => {
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                name={name}
                placeholder={placeholder || undefined}
                required={required || undefined}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
)}

export default SignupInput