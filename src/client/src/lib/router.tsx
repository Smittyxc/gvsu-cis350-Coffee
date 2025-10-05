import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import { Login } from "@/components/ui/login"
import { Signup } from "@/components/ui/signup"
import Demo from "@/demo"
import RadarDemo from "@/components/radarDemo"
import { ShadcnDemo } from "@/components/shadcnDemo"

export const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: '/signup', element: <Signup />},
  {path: "/login", element: <Login />},
  {path: "/demo", element: <Demo />},
  {path: "/radar", element: <RadarDemo />},
  {path: "/shadcn", element: <ShadcnDemo />},

])
