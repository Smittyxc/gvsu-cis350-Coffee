import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
      <p>this can be a landing page in the future and route to login/sign-up</p>
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