import PWABadge from './PWABadge.tsx'
import { Button } from './components/ui/button.tsx'
import { Link, useNavigate } from 'react-router-dom'
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
      <Button onClick={handleSignOut}>Sign Out</Button>
      <Link to="/radar">
        <Button variant='default' className=''>Dashboard</Button>
      </Link>
      <Link to="/timer">
        <Button variant='default' className=''>Timer</Button>
      </Link>
      <Link to="/coffeeEntry">
        <Button variant='default' className=''>Test</Button>
      </Link>
      <PWABadge />
    </div>
  )
}

export default Demo