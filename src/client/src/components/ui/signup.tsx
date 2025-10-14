import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpNewUser } from "@/lib/auth";
import { Coffee, Loader } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Signup1Props {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Signup = ({
  heading = "Signup",

  buttonText = "Create Account",
  signupText = "Already a user?",
}: Signup1Props) => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setEmail(e.target.value);
    };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword2(e.target.value);
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    const { data, error } = await signUpNewUser(email, password);

    if (error) {
      alert("Failed to sign in: " + error.message);
      setIsLoading(false)
    } else {
      console.log('Signed in successfully!', data);
      navigate('/demo')
    }
  };


  return (
    <div className='flex flex-col w-full min-h-screen items-center justify-center bg-gradient-to-b from-blue-700 from-50% to-neutral-50 to-50%'>
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
            <div className="flex gap-6">
              <Coffee size={48} color="#ffffff" />
              <h1 className="text-5xl text-white font-semibold">Best<span className="font-light">Brew</span></h1>
            </div>
            <form onSubmit={handleSubmit} className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
            {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
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
            <Input
              type="password"
              placeholder="Confirm Password"
              className="text-sm"
              onChange={handlePassword2}
              value={password2}
              required
            />
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </form>
          {isLoading &&
            <div className="flex items-center justify-center">
              <Loader className="animate-spin w-8 h-8 text-blue-500" />
            </div>
          }
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Signup };
