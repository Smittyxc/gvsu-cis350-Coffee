import PWABadge from './PWABadge.tsx'
import { Label } from './components/ui/label.tsx'
import { Input } from './components/ui/input.tsx'
import { Button } from './components/ui/button.tsx'
import { Link } from 'react-router-dom'


const Demo = () => {
  return (
    <div className='flex flex-col w-full min-h-screen pt-40 gap-4 items-center bg-gradient-to-b from-blue-700 from-40% to-neutral-50 to-40%'>
      <h1 className='text-2xl font-semibold w-fit p-2 text-white'>Sign into your account</h1>
      <form>
        <div className="flex flex-col gap-6 bg-white p-4 rounded-2xl shadow">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
            <a
                href="#"
                className="ml-2 text-gray-600 text-xs inline-block underline-offset-4 hover:underline"
              >
                Forgot your password?
            </a>
            <div className='flex items-center justify-center w-full'>
              <Button>Login</Button>  
            </div>  
          </div>
        </div>
      </form>
      <Link to="/radar">
        <Button variant='default' className=''>Radar</Button>
      </Link>
      <Link to="/shadcn">
        <Button variant='default' className=''>Shadcn</Button>
      </Link>
      <PWABadge />
    </div>
  )
}

export default Demo