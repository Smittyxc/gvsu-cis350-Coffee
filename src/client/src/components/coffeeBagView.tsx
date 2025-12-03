import { Coffee, X } from "lucide-react";
import { CoffeeBag } from "./coffeeBagEntry";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { coffeeProducingCountries, varieties, getLabelFromValue } from "@/lib/coffeeOptions.ts"
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import PWABadge from "@/PWABadge";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext.tsx"
import { Skeleton } from "./ui/skeleton";

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

      <div className="p-4 sm:p-8 text-white overflow-x-hidden w-full space-y-3">
        <div className="flex items-center justify-center p-4 bg-cbg2 rounded-lg border-t-4 border-caccent2">
          <h1 className="text-3xl font-bold text-white">Coffees</h1>
        </div>

        <div className="w-7/8 mx-auto">
          <input
            type="search"
            placeholder="Search"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:cbg3 text-ctext bg-cbg2"
          />
          <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
            {['All', 'Pourover', 'Aeropress', 'Iced'].map(filter => (
              <button
                key={filter}
                className="flex-shrink-0 px-4 py-1 hover:bg-chover text-cltext text-sm bg-cbg2 rounded"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

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
      {!Loading && (
        <div className="grid grid-cols-2 w-full px-2 gap-3 overflow-y-auto">
          {Bags.map((bag, index) => (
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
                  <Link to={`/summary/${bag.id}`}>
                    <Button variant='dark2' className="bg-caction p-5">Summary</Button>
                  </Link>
                  <Button variant='dark2'>Delete</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          ))}
        </div>
      )}
      <PWABadge />
    </div>
  );
};

export default CoffeeBagView