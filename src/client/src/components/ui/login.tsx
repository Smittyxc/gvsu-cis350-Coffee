import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { signInUser } from "@/lib/auth";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Login1Props {
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

const Login = ({
  heading = "Login",
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg",
    alt: "logo",
    title: "shadcnblocks.com",
  },
  buttonText = "Login",
  signupText = "Need an account?",
}: Login1Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setLoading] = useState('');
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
        navigate('/demo')
      }
    };


  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <a href={logo.url}>
            <img
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              className="h-10 dark:invert"
            />
          </a>
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
            <Button type="submit" className="w-full">
              {buttonText}
            </Button>
          </form>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <Link
              to='/signup'
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Login };
