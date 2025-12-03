import { useState, useEffect } from "react"
import { Slider } from "./ui/slider"
import { Label } from "./ui/label"
import Combobox from "./comboBox"
import { coffeeTastingNotes, getLabelFromValue, Option } from "@/lib/coffeeOptions"
import { X } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Recipe } from '@/lib/recipeData';
import { useAuth } from "@/context/AuthContext.tsx"
import { CoffeeBag } from "./coffeeBagEntry"

interface BrewResult {
  clarity: number;
  sweetness: number;
  acidity: number;
  body: number;
  overall: number;
  balance: string;
  notes: string[];
  bitterness: number;
  coffeeBagId?: string,
  recipeId?: string 
}

const BrewResultEntry = () => {
  const [data, setData] = useState<BrewResult>({
    clarity: 5,
    sweetness: 5,
    acidity: 5,
    body: 5,
    bitterness: 5,
    overall: 5,
    balance: '',
    notes: []
  })

  //const [comboBoxValue, setComboBoxValue] = useState('')

  const handleSliderChange = (field: keyof BrewResult) => (value: number[]) => {
    setData(prev => ({
      ...prev,
      [field]: value[0]
    }))
  }

  /*
  const handleNoteEntry = (note: string) => {
    if (!note) return
    setData(prev => {
    if (prev.notes.includes(note)) return prev
      return {
        ...prev,
        notes: [...prev.notes, note]
      }
    })
  } */

  const handleSubmit = async () => {
    try {
    const token = session?.access_token;

    const response = await fetch("http://localhost:5000/api/brew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(
        {
          clarity: data.clarity,
          sweetness: data.sweetness,
          acidity: data.acidity,
          //body: data.body,
          bitterness: data.bitterness,
          score: data.overall,
          //balance: data.balance,
          notes: selectedNotes ?? null,
          coffee_id: selectedCoffee ?? null,
          recipe_id: selectedRecipe ?? null,
        },
      ),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    const savedRecipe = await response.json();
    console.log("Brew saved successfully:", savedRecipe);
    alert("Brew saved successfully!");

  } catch (err: any) {
    console.error("Error saving recipe:", error);
    alert("Failed to save brew. Please try again.");
  }
  }

  const handleNoteRemoval = (note: string) => {
    setData(prev => ({
      ...prev, 
      ['notes']: data.notes.filter(oldNote => oldNote !== note)
    }))
  }

  const { session } = useAuth();

  useEffect(() => {
          const fetchRecipes = async () => {
              try {
              const token = session?.access_token;
  
              const resp = await fetch("http://localhost:5000/api/recipes", {
              headers: {
                  Authorization: `Bearer ${token ?? ""}`,
              },
              });
  
              if (!resp.ok) {
              const msg = await resp.text();
              throw new Error(msg || `Failed with status ${resp.status}`);
              }
  
              const { recipes } = (await resp.json()) as { recipes: Recipe[] };
              const options: Option[] = recipes.map((r) => ({
                value: r.id!,
                label: r.recipe_name
              }));

              setRecipeNames(options);
          } catch (err: any) {
              console.error("Error fetching recipes:", err);
              setError(err.message || "Failed to load recipes");
          }
          };

          const fetchCoffees = async () => {
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
              const options: Option[] = coffees.map((r) => ({
                value: String(r.id!),
                label: r.name,
              }));

              setCoffeeNames(options);
          } catch (err: any) {
              console.error("Error fetching coffees:", err);
              setError(err.message || "Failed to load coffees");
          }
          };
  
          fetchRecipes();
          fetchCoffees();
      }, []);

  // we'll need to fetch all coffees and recipes an individual has (just their name and id, not each column) to link with a brew result.
  // they'll be displayed in the first two comboboxes below

  const [recipeNames, setRecipeNames] = useState<Option[]>([]);
  const [coffeeNames, setCoffeeNames] = useState<Option[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [selectedRecipe, setSelectedRecipe] = useState<string>("");
  const [selectedCoffee, setSelectedCoffee] = useState<string>("");
  const [selectedNotes, setSelectedNotes] = useState<string>("");

  return (
    <div className="flex flex-col items-center gap-8 h-full overflow-y-auto w-full pb-4">
      <div className="w-full flex flex-col items-center">
      <div className="p-4 sm:p-8 text-white overflow-x-hidden w-full space-y-3">
        <div className="flex items-center justify-center p-4 bg-cbg2 rounded-lg border-t-4 border-caccent4">
          <h1 className="text-3xl font-bold text-white">New Brew Entry</h1>
        </div>
      </div>

      <div className="flex flex-col gap-7 items-start w-4/5">
        <div>
          <Label htmlFor='notes' className="text-lg">Coffee Used</Label>
          <Combobox key='coffee' value={selectedCoffee} data={coffeeNames} onValueChange={setSelectedCoffee} displayText="Select coffee"/>
        </div>
        <div>
          <Label htmlFor='notes' className="text-lg">Recipe Used</Label>
          <Combobox key='recipe' value={selectedRecipe} data={recipeNames} onValueChange={setSelectedRecipe} displayText="Select recipe"/>
        </div>
       <div className="flex justify-between items-end w-full">
          <div>
            <Label htmlFor='notes' className="text-lg">Notes</Label>
            <Combobox key='notes' value={selectedNotes} data={coffeeTastingNotes} onValueChange={setSelectedNotes} displayText="Select notes"/>
          </div>

        </div>
        {data.notes && data.notes.length > 0 && (
          <div className="flex flex-wrap justify-center w-full gap-2 p-5 rounded-lg shadow bg-cbg2">
            {
              data.notes.map((note, index) => {
                const label = getLabelFromValue(coffeeTastingNotes, note)
                return (
                  <Badge key={index} className="bg-cbg3 shadow-md">
                    {label}
                    <button className="p-1 pl-2 hover:text-ctext" type='button' onClick={() => handleNoteRemoval(note)}>
                      <X size={16} />
                    </button>
                  </Badge>
                )
              })
            }
          </div>
        )}
        

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='clarity' className="text-lg text-caccent2">Clarity</Label>
            <Slider id="clarity" value={[data.clarity]} step={1} max={10} onValueChange={handleSliderChange('clarity')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-cnote text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center font-semibold font-mono">{data.clarity}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='acidity' className="text-lg text-caccent3">Acidity</Label>
            <Slider id="acidity" value={[data.acidity]} step={1} max={10} onValueChange={handleSliderChange('acidity')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-cnote text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center font-semibold font-mono">{data.acidity}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='sweetness' className="text-lg text-caccent4">Sweetness</Label>
            <Slider id="sweetness" value={[data.sweetness]} step={1} max={10} onValueChange={handleSliderChange('sweetness')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-cnote text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center font-semibold font-mono">{data.sweetness}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='body' className="text-lg text-caccent5">Body</Label>
            <Slider id="body" value={[data.body]} step={1} max={10} onValueChange={handleSliderChange('body')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-cnote text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center font-semibold font-mono">{data.body}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='bitterness' className="text-lg text-caccent1">Bitterness</Label>
            <Slider id="bitterness" value={[data.bitterness]} step={1} max={10} onValueChange={handleSliderChange('bitterness')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-cnote text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center font-semibold font-mono">{data.bitterness}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='overall' className="text-lg">Overall</Label>
            <Slider id="overall" value={[data.overall]} step={1} max={10} onValueChange={handleSliderChange('overall')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-cnote text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center font-semibold font-mono">{data.overall}</p>
          </div>
        </div>
      </div>
      </div>
      <Button 
        variant="blank"
        onClick={handleSubmit}
        className={`
    flex items-start justify-center
    fixed left-1/2 -translate-x-1/2
    bottom-14
    bg-caction text-white font-semibold
    px-14 py-3 pb-15
    rounded-t-xl
    animate-[slide-up-fab_0.5s_ease-out_forwards]
    
    transition duration-300 ease-in-out
    hover:scale-105
    shadow-lg
  `}
      >
        <span className='text-[1rem] text-white font-semibold relative flex items-center h-full pt-3'>Submit</span>
      </Button>
    </div>
  )
}

export default BrewResultEntry