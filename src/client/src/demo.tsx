import PWABadge from './PWABadge.tsx'
import { Button } from './components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'
import { signOut } from './lib/auth.tsx'


const Demo = () => {
  
  const navigate = useNavigate()
  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await signOut()
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className='flex flex-col w-full h-full gap-4 items-center pt-6'>
      <h1 className='animate-in font-extrabold tracking-wide text-4xl text-blue-600'>Welcome, Matt</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>

      <div className="flex relative w-64 h-64 items-end justify-center  bg-white">
        <div className="absolute right-2 top-22 w-16 h-20  rounded-r-full border-8 border-l-0 border-gray-300"></div>
        <div className="absolute top-2 left-1/3  w-4 h-8 bg-gray-400 opacity-30 blur-sm animate-pulse"></div>
        <div className="absolute top-2 left-2/3  w-4 h-8 bg-gray-400 opacity-30 blur-sm animate-"></div>
        <div className="absolute top-2 left-1/2  w-4 h-8 bg-gray-400 opacity-30 blur-sm animate-pulse"></div>
        <div className="relative w-40 h-49 bg-white rounded-b-full rounded-t-lg shadow-xl shadow-black/20 overflow-hidden">
          {/* <!-- Mug Body --> */}
          <div className="absolute inset-0 bg-gray-200 rounded-b-full rounded-t-md"></div>
          {/* <!-- Liquid (Coffee) --> */}
          <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-amber-900 rounded-b-full"></div>
          {/* <!-- Rim/Top Edge --> */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gray-300 rounded-t-lg"></div>
        </div>
      </div>
      <PWABadge />
    </div>
  )
}

export default Demo