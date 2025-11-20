import { Coffee, Plus, X } from "lucide-react";
import { CoffeeBag } from "./coffeeBagEntry";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { coffeeProducingCountries, varieties, getLabelFromValue, Option } from "@/lib/coffeeOptions.ts"
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import PWABadge from "@/PWABadge";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext.tsx"
import { Skeleton } from "./ui/skeleton";


const sampleCoffeeBags: CoffeeBag[] = [
  {
    id: '123',
    name: "Finca El Diviso",
    roaster: "Onyx Lab",
    process: "Thermal Shock",
    variety: "pink-bourbon",
    origin: "colombia",
    roastDate: "2025-10-05T04:00:00.000Z",
    weight: 340, 
  },
  {
    id: '123',
    name: "Worka Sakaro",
    roaster: "Madcap",
    process: "Natural",
    variety: "ethiopian-heirloom",
    origin: "ethiopia",
    roastDate: "2025-09-28T04:00:00.000Z",
    weight: 340, 
  },
  {
    id: '123',
    name: "Las Lajas",
    roaster: "Heart Roasters",
    process: "Red Honey",
    variety: "caturra",
    origin: "costa-rica",
    roastDate: "2025-10-10T04:00:00.000Z",
    weight: 227, 
  },
  {
    id: '123',
    name: "Gatomboya AA",
    roaster: "Tandem",
    process: "Washed",
    variety: "sl-28",
    origin: "kenya",
    roastDate: undefined,
    weight: 340, 
  },
];

const CoffeeBagView = () => {
  const { session } = useAuth();
  const [Bags, setBags] = useState<CoffeeBag[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
        try {
        const token = session?.access_token;

        const resp = await fetch("http://localhost:5000/api/getCoffees", {
        headers: {
            Authorization: `Bearer ${token ?? ""}`,
        },
        });

        if (!resp.ok) {
        const msg = await resp.text();
        throw new Error(msg || `Failed with status ${resp.status}`);
        }

        const { coffees } = (await resp.json()) as { coffees: CoffeeBag[] };

        setBags(coffees);
        setLoading(false);
    } catch (err: any) {
        console.error("Error fetching recipes:", err);
        //setError(err.message || "Failed to load recipes");
    }
    }

    fetchRecipes();
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-start w-full pb-4">
      <h1 className="text-3xl text-white font-semibold py-4">Your Coffees</h1>
        <Link to='/coffee/new' className="fixed bottom-22 right-5">
          <div className="flex justify-center items-center bg-cbg3 hover:bg-chover shadow-md rounded-full size-16">
            <Plus size={36} color="#FFFFFF" />
          </div>
        </Link>
      
        {Loading && (
          <div className="flex flex-col w-4/5 gap-4 justify-center items-center ">
            <Skeleton className="h-10 w-full bg-gray-300" />
            <Skeleton className="h-10 w-full bg-gray-300" />
            <Skeleton className="h-10 w-full bg-gray-300" />
            <Skeleton className="h-10 w-full bg-gray-300" />
            <Skeleton className="h-10 w-full bg-gray-300" />
            <Skeleton className="h-10 w-full bg-gray-300" />
          </div>
          )}
        {!Loading && Bags.map((bag, index) => (
      <div className="grid grid-cols-2 w-full px-2 w-full gap-3 overflow-y-auto">

          <Popover key={`${bag.name}-${index}`}>
            <PopoverTrigger>
              <div key={`${bag.name}-${index}`} className="w-full h-30 flex flex-col items-center justify-around border-2 border-cbg3 shadow-md rounded-2xl text-cltext bg-cbg2 hover:bg-chover">
                <p>{bag.name}</p>
                  <Coffee />
                <p>{bag.roaster}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="bg-cbg2 relative">
              <PopoverClose asChild className="absolute top-3 right-3">
                <button><X color="#ffffff" /></button>
              </PopoverClose>
              <div className="flex flex-col items-start text-ctext font-semibold">
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
                  <Link to={`/coffee/${bag.id}/edit`}>
                    <Button variant='dark2'>Edit</Button>
                  </Link>
                  <Button variant='dark2'>Delete</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
   
          )
       )}
      <PWABadge />
    </div>
  )
}

export default CoffeeBagView