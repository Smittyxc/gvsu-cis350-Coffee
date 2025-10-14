import { Link } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"

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
          {/* <Link to='/timer' className="rounded-none flex-grow h-full flex items-center ">
            <TabsTrigger
              value='timer'
              className="rounded-none bg-blue-600 data-[state=active]:border-t-blue-800 data-[state=active]:border-t-6 data-[state=active]:bg-blue-600 ring-none outline-none flex items-center" // Added flex for alignment
            >
              <p className="text-md text-white font-semibold">Timer</p>
            </TabsTrigger>
          </Link> */}
          <Link to='/recipes' className="rounded-none flex-grow h-full flex items-center ">
            <TabsTrigger
              value='recipes'
              className="rounded-none bg-blue-600 data-[state=active]:border-t-blue-800 data-[state=active]:border-t-6 data-[state=active]:bg-blue-600 ring-none outline-none flex items-center" // Added flex for alignment
            >
              <p className="text-md text-white font-semibold">Recipes</p>
            </TabsTrigger>
          </Link>
          <Link to='#' className="rounded-none flex-grow h-full flex items-center ">
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