import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import { Login } from "@/components/ui/login"
import { Signup } from "@/components/ui/signup"
import Demo from "@/demo"
import RadarDemo from "@/components/radarDemo"
import { ShadcnDemo } from "@/components/shadcnDemo"
import RecipesPage from "@/components/recipes"
import { AccountPage } from "@/components/account"
import { CoffeePage } from "@/components/coffee"

export const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: '/signup', element: <Signup />},
  {path: "/login", element: <Login />},
  {path: "/demo", element: <Demo />},
  {path: "/radar", element: <RadarDemo />},
  {path: "/shadcn", element: <ShadcnDemo />},
  {path: "/recipes", element: <RecipesPage />},
  {path: "/account", element: <AccountPage />},
  {path: "/coffee", element: <CoffeePage />},
 
])

//import { RecipeOverview } from "@/components/recipeOverview"
//{path: "/recipes", element: <RecipeOverview />},