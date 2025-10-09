import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import { Login } from "@/components/ui/login"
import { Signup } from "@/components/ui/signup"
import Demo from "@/demo"
import RadarDemo from "@/components/radarDemo"
import { ShadcnDemo } from "@/components/shadcnDemo"
import { RecipeOverview } from "@/components/recipeOverview"
import { RecipeNew } from "@/components/recipeNew"
import { RecipeInstructions } from "@/components/recipeInstruction"

export const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: '/signup', element: <Signup />},
  {path: "/login", element: <Login />},
  {path: "/demo", element: <Demo />},
  {path: "/radar", element: <RadarDemo />},
  {path: "/shadcn", element: <ShadcnDemo />},
  {path: "/recipes", element: <RecipeOverview />},
  {path: "/recipes/new", element: <RecipeNew />},
  {path: "/recipes/instructions", element: <RecipeInstructions />},
 
])
