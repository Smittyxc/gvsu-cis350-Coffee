import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import { Login } from "@/components/ui/login"
import { Signup } from "@/components/ui/signup"
import Demo from "@/demo"
import RadarDemo from "@/components/radarDemo"
import { CoffeeBagEntry } from "@/components/coffeeBagEntry"
import Timer from "@/components/timer"
import CoffeeBagView from "@/components/coffeeBagView"
import BrewResultEntry from "@/components/brewResultEntry"
import Layout from "@/layout"

export const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: '/signup', element: <Signup />},
  {path: "/login", element: <Login />},
  // {path: "/demo", element: <Demo />},
  {path: "/radar", element: <RadarDemo />},
  {path: "/timer", element: <Timer />},
  {path: "/", 
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Demo />
      },
      { path: "/addcoffee",
        element: <CoffeeBagEntry />
      },
      { path: "/viewcoffees", 
        element: <CoffeeBagView />
      },
      { path: "/brewresults",
        element: <BrewResultEntry />
      },

    ]
  }

])
