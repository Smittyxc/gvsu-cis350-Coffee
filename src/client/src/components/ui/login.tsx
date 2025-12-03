import { Button } from "@/components/ui/button-2";
import { Input } from "@/components/ui/input-2";
// import { useAuth } from "@/context/AuthContext";
import { signInUser } from "@/lib/auth";
import { Coffee, Loader } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Login1Props {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login = ({
  heading = "Login",

  buttonText = "Login",
  signupText = "Need an account?",
}: Login1Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setLoading] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const { data, error } = await signInUser(email, password);

    if (error) {
      alert("Failed to sign in: " + error.message);
      setIsLoading(false)
    } else {
      console.log('Signed in successfully!', data);
      navigate('/viewcoffees')
    }
  };

  return (
    <div className='flex flex-col w-full min-h-screen items-center justify-center bg-gradient-to-b from-cbg1 from-50% to-cbg2 to-50%'>
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <div className="flex gap-6">
            <Coffee size={48} color="#ffffff" />
            <h1 className="text-5xl text-cltext font-semibold">Best<span className="font-light">Brew</span></h1>
          </div>
          <div className="p-4 pb-0 bg-cbg2 rounded-t-lg">
            <form onSubmit={handleSubmit} className="min-w-sm border-muted rounded-md bg-cbg3 flex w-full max-w-sm flex-col items-center gap-y-4 px-6 py-8 shadow-md">
              {heading && <h1 className="text-xl font-semibold text-white">{heading}</h1>}
              <Input
                type="email"
                placeholder="Email"
                className="text-sm"
                onChange={handleEmail}
                value={email}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                className="text-sm"
                onChange={handlePassword}
                value={password}
                required
              />
              <Button type="submit" className="w-full bg-cfab text-white">
                {buttonText}
              </Button>
            </form>
          </div>

          <div className="flex justify-center text-sm bg-cbg1 px-4 py-2 rounded-b-lg -mt-6 shadow-md">
            <p className="text-muted-foreground mr-1">{signupText}</p>
            <Link
              to='/signup'
              className="text-cltext font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
          
          {isLoading &&
            <div className="flex items-center justify-center">
              <Loader className="animate-spin w-8 h-8 text-white" />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export { Login };
