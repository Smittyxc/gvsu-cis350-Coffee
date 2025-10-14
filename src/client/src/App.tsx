import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <p className="w-3/4 font-mono text-center">Future cool landing page routing to login and signup</p>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
      <Link to="/signup">
        <Button>
          Sign Up
        </Button>
      </Link>
    </div>
  );
}

export default App;