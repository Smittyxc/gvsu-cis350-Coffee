import { Link } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

import { Coffee, Utensils, Clock, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <div className="fixed flex h-16 bottom-0 z-30 w-full bg-cbg2 shadow-2xl border-t-3 border-cbg2"> 
      <Tabs defaultValue='stats' className="w-full h-full">
        <TabsList className="w-full p-0 justify-around h-full rounded-none bg-cbg2">
          
          {/* COFFEES */}
          <Link to='/viewcoffees' className="rounded-none flex-grow h-full flex items-center justify-center">
            <TabsTrigger
              value='coffee'
              className="rounded-none h-full w-full bg-cbg2 text-ctext hover:bg-cbg3 data-[state=active]:text-cactive data-[state=active]:bg-cbg3 ring-none outline-none flex flex-col justify-center transition-colors" 
            >
              <Coffee className="h-5 w-5 mb-0.5" />
              <p className="text-xs font-semibold">Coffees</p>
            </TabsTrigger>
          </Link>
          
          {/* RECIPES */}
          <Link to='/recipes' className="rounded-none flex-grow h-full flex items-center justify-center">
            <TabsTrigger
              value='recipes'
              className="rounded-none h-full w-full bg-cbg2 text-ctext hover:bg-cbg3 data-[state=active]:text-cactive data-[state=active]:bg-cbg3 ring-none outline-none flex flex-col justify-center transition-colors"
            >
              <Utensils className="h-5 w-5 mb-0.5" />
              <p className="text-xs font-semibold">Recipes</p>
            </TabsTrigger>
          </Link>
          
          {/* STATS */}
          <Link to='/summary' className="rounded-none flex-grow h-full flex items-center justify-center">
            <TabsTrigger
              value='stats'
              className="rounded-none h-full w-full bg-cbg2 text-ctext hover:bg-cbg3 data-[state=active]:text-cactive data-[state=active]:bg-cbg3 ring-none outline-none flex flex-col justify-center transition-colors" 
            >
              <Clock className="h-5 w-5 mb-0.5" />
              <p className="text-xs font-semibold">Stats</p>
            </TabsTrigger>
          </Link>
          
          {/* BREWS */}
          <Link to='/brewresults' className="rounded-none flex-grow h-full flex items-center justify-center">
            <TabsTrigger
              value='brews'
              className="rounded-none h-full w-full bg-cbg2 text-ctext hover:bg-cbg3 data-[state=active]:text-cactive data-[state=active]:bg-cbg3 ring-none outline-none flex flex-col justify-center transition-colors"
            >
              <Heart className="h-5 w-5 mb-0.5" />
              <p className="text-xs font-semibold">Brews</p>
            </TabsTrigger>
          </Link>
          
        </TabsList>
      </Tabs>
    </div>
  )
}

export default Footer

/* OLD FOOTER JUST IN CASE
const Footer = () => {
  return (
    <div className="fixed flex h-18 bottom-0 z-30 w-full ">
      <Tabs defaultValue='timer' className="w-full h-full">
        <TabsList className="w-full p-0 justify-start h-full rounded-none">
          <Link to='/viewcoffees' className="rounded-none flex-grow h-full flex items-center ">
            <TabsTrigger
              value='coffee'
              className="rounded-none bg-blue-600  data-[state=active]:border-t-blue-800 data-[state=active]:border-t-6 data-[state=active]:bg-blue-600 ring-none outline-none flex items-center" // Added flex for alignment
            >
              <p className="text-md text-white font-semibold">Coffees</p>
            </TabsTrigger>
          </Link>
          <Link to='/recipes' className="rounded-none flex-grow h-full flex items-center ">
            <TabsTrigger
              value='recipes'
              className="rounded-none bg-blue-600 data-[state=active]:border-t-blue-800 data-[state=active]:border-t-6 data-[state=active]:bg-blue-600 ring-none outline-none flex items-center" // Added flex for alignment
            >
              <p className="text-md text-white font-semibold">Recipes</p>
            </TabsTrigger>
          </Link>
          <Link to='/summary' className="rounded-none flex-grow h-full flex items-center ">
            <TabsTrigger
              value='timer'
              className="rounded-none bg-blue-600 data-[state=active]:border-t-blue-800 data-[state=active]:border-t-6 data-[state=active]:bg-blue-600 ring-none outline-none flex items-center" // Added flex for alignment
            >
              <p className="text-md text-white font-semibold">Stats</p>
            </TabsTrigger>
          </Link>
          <Link to='/brewresults' className="rounded-none flex-grow h-full flex items-center ">
            <TabsTrigger
              value='brews'
              className="rounded-none bg-blue-600 data-[state=active]:border-t-blue-800 data-[state=active]:border-t-6 data-[state=active]:bg-blue-600 ring-none outline-none flex items-center" // Added flex for alignment
            >
              <p className="text-md text-white font-semibold">Brews</p>
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default Footer
*/