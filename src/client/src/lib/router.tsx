import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import { Login } from "@/components/ui/login"
import { Signup } from "@/components/ui/signup"
import RadarDemo from "@/components/radarDemo"
import { CoffeeBagEntry } from "@/components/coffeeBagEntry"
import Timer from "@/components/timer"
import CoffeeBagView from "@/components/coffeeBagView"
import BrewResultEntry from "@/components/brewResultEntry"
import Layout from "@/layout"
import { RecipesList } from "@/components/recipeList"
import { NewRecipe } from "@/components/recipeNew"
import { RecipeInstructions } from "@/components/recipeInstructions"
import { BagSummary } from "@/components/bagSummary"


export const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: '/signup', element: <Signup />},
  {path: "/login", element: <Login />},
  {path: "/radar", element: <RadarDemo />},
  {path: "/timer", element: <Timer />},
  {path: "/", 
    element: <Layout />,
    children: [
      { path: "/coffee/new", element: <CoffeeBagEntry />},
      { path: "/coffee/:coffeeId/edit", element: <CoffeeBagEntry />},
      { path: "/viewcoffees", element: <CoffeeBagView />},
      { path: "/brewresults", element: <BrewResultEntry />},
      { path: "/summary", element: <BagSummary />},
      { path: "/recipes", element: <RecipesList /> },
      { path: "/recipes/recipeNew", element: <NewRecipe /> },
      { path: "/recipes/:recipeId", element: <RecipeInstructions /> },
      { path: "/recipes/:recipeId/edit", element: <NewRecipe /> }
    ]
  },
])

