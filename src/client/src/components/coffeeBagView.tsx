import { Coffee, Plus, X } from "lucide-react";
import { CoffeeBag } from "./coffeeBagEntry";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { coffeeProducingCountries, varieties, getLabelFromValue } from "@/lib/coffeeOptions.ts"
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";


const sampleCoffeeBags: CoffeeBag[] = [
  {
    name: "Finca El Diviso",
    roaster: "Onyx Lab",
    process: "Thermal Shock",
    variety: "pink-bourbon",
    origin: "colombia",
    roastDate: "2025-10-05T04:00:00.000Z",
    weight: 283, // 10oz
  },
  {
    name: "Worka Sakaro",
    roaster: "Madcap",
    process: "Natural",
    variety: "ethiopian-heirloom",
    origin: "ethiopia",
    roastDate: "2025-09-28T04:00:00.000Z",
    weight: 340, // 12oz
  },
  {
    name: "Las Lajas",
    roaster: "Heart Roasters",
    process: "Red Honey",
    variety: "caturra",
    origin: "costa-rica",
    roastDate: "2025-10-10T04:00:00.000Z",
    weight: 227, // 8oz
  },
  {
    name: "Gatomboya AA",
    roaster: "Tandem",
    process: "Washed",
    variety: "sl-28",
    origin: "kenya",
    roastDate: undefined,
    weight: 340, // 12oz
  },
];

const CoffeeBagView = () => {
  return (
    <div className="h-full flex flex-col items-center justify-start w-full pb-4">
      <h1 className="text-3xl font-semibold py-4">Your Coffees</h1>
        <Link to='/addcoffee' className="fixed bottom-22 right-5">
          <div className="flex justify-center items-center bg-stone-500 bg-accent-brown shadow-md rounded-full size-16">
            <Plus size={36} color="#FFFFFF" />
          </div>
        </Link>
      
      <div className="grid grid-cols-2 px-2 w-full gap-3 overflow-y-auto">
        {sampleCoffeeBags.map((bag, index) => (
          <Popover key={`${bag.name}-${index}`}>
            <PopoverTrigger>
              <div key={`${bag.name}-${index}`} className="w-full h-30 flex flex-col items-center justify-around border-2 shadow-md border-black rounded-2xl">
                <p>{bag.name}</p>
                  <Coffee />
                <p>{bag.roaster}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-blue-600 relative">
              <PopoverClose asChild className="absolute top-3 right-3">
                <button><X color="#ffffff" /></button>
              </PopoverClose>
              <div className="flex flex-col items-start text-white font-semibold">
                <p>{bag.name}</p>
                <p>{bag.roaster}</p>
                <p><span className="font-light">Origin: </span>{getLabelFromValue(coffeeProducingCountries, bag.origin)}</p>
                <p><span className="font-light">Variety: </span>{getLabelFromValue(varieties, bag.variety)}</p>
                {bag.roastDate ? (
                  <p><span className="font-light">Roasted: </span>{format(bag.roastDate, 'P')}</p>
                ) : (
                  <></>
                )
                }
                <div className="flex justify-around w-full pt-3 pb-1">
                  <Button variant='secondary'>Edit</Button>
                  <Button variant='secondary'>Delete</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
   
          )
       )}
      </div>
    </div>
  )
}

export default CoffeeBagView