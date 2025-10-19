import { useState } from "react"
import { Slider } from "./ui/slider"
import { Label } from "./ui/label"
import Combobox from "./comboBox"
import { coffeeTastingNotes, getLabelFromValue } from "@/lib/coffeeOptions"
import { Plus, X } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

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

  const [comboBoxValue, setComboBoxValue] = useState('')

  const handleSliderChange = (field: keyof BrewResult) => (value: number[]) => {
    setData(prev => ({
      ...prev,
      [field]: value[0]
    }))
  }

  const handleNoteEntry = (note: string) => {
    if (!note) return
    setData(prev => {
    if (prev.notes.includes(note)) return prev
      return {
        ...prev,
        notes: [...prev.notes, note]
      }
    })
  }

  const handleSubmit = () => {
    console.log('Submitting', data)
  }

  const handleNoteRemoval = (note: string) => {
    setData(prev => ({
      ...prev, 
      ['notes']: data.notes.filter(oldNote => oldNote !== note)
    }))
  }
      
  // we'll need to fetch all coffees and recipes an individual has (just their name and id, not each column) to link with a brew result.
  // they'll be displayed in the first two comboboxes below

  return (
    <div className="flex flex-col items-center gap-8 h-[calc(100vh-4rem)] overflow-y-auto w-full pt-6 pb-16">
      <div className="flex flex-col gap-8 items-start w-4/5">
        <div>
          <Label htmlFor='notes' className="text-lg">Coffee Used</Label>
          <Combobox key='notes' value={comboBoxValue} data={coffeeTastingNotes} onValueChange={setComboBoxValue} displayText="Select notes"/>
        </div>
        <div>
          <Label htmlFor='notes' className="text-lg">Recipe Used</Label>
          <Combobox key='notes' value={comboBoxValue} data={coffeeTastingNotes} onValueChange={setComboBoxValue} displayText="Select notes"/>
        </div>
       <div className="flex justify-between items-end w-full">
          <div>
            <Label htmlFor='notes' className="text-lg">Notes</Label>
            <Combobox key='notes' value={comboBoxValue} data={coffeeTastingNotes} onValueChange={setComboBoxValue} displayText="Select notes"/>
          </div>
          <button className="flex justify-center items-center rounded-full h-9 w-9 bg-gray-200" onClick={() => handleNoteEntry(comboBoxValue)}>
            <Plus />
          </button>
        </div>
        {data.notes && data.notes.length > 0 && (
          <div className="flex flex-wrap justify-center w-full gap-2 p-2 rounded-lg shadow border border-black ">
            {
              data.notes.map((note, index) => {
                const label = getLabelFromValue(coffeeTastingNotes, note)
                return (
                  <Badge key={index} className="bg-blue-400 shadow-md">
                    {label}
                    <button className="p-1 pl-2" type='button' onClick={() => handleNoteRemoval(note)}>
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
            <Label htmlFor='clarity' className="text-lg">Clarity</Label>
            <Slider id="clarity" value={[data.clarity]} step={1} max={10} onValueChange={handleSliderChange('clarity')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-blue-600 text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center  font-semibold font-mono">{data.clarity}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='acidity' className="text-lg">Acidity</Label>
            <Slider id="acidity" value={[data.acidity]} step={1} max={10} onValueChange={handleSliderChange('acidity')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-blue-600 text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center  font-semibold font-mono">{data.acidity}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='sweetness' className="text-lg">Sweetness</Label>
            <Slider id="sweetness" value={[data.sweetness]} step={1} max={10} onValueChange={handleSliderChange('sweetness')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-blue-600 text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center  font-semibold font-mono">{data.sweetness}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='body' className="text-lg">Body</Label>
            <Slider id="body" value={[data.body]} step={1} max={10} onValueChange={handleSliderChange('body')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-blue-600 text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center  font-semibold font-mono">{data.body}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='bitterness' className="text-lg">Bitterness</Label>
            <Slider id="bitterness" value={[data.bitterness]} step={1} max={10} onValueChange={handleSliderChange('bitterness')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-blue-600 text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center  font-semibold font-mono">{data.bitterness}</p>
          </div>
        </div>

        <div className="flex w-full justify-between gap-2">
          <div className="flex flex-col w-full">
            <Label htmlFor='overall' className="text-lg">Overall</Label>
            <Slider id="overall" value={[data.overall]} step={1} max={10} onValueChange={handleSliderChange('overall')} className="pt-1" />
          </div>
          <div className="flex justify-center items-center p-3 bg-blue-600 text-white rounded-full">
            <p className="w-4 h-4 -mt-2 text-center  font-semibold font-mono">{data.overall}</p>
          </div>
        </div>
      </div>
      <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
    </div>
  )
}

export default BrewResultEntry