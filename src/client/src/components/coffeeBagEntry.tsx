import { ChangeEvent, useState } from "react"
import { Button } from "./ui/button.tsx"
import { Input } from "./ui/input.tsx"
import { Label } from "./ui/label.tsx"
import Combobox from "./comboBox.tsx"
import { MonthlyCalendar } from "./monthlyCalendar.tsx"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group.tsx"
import { Link } from "react-router-dom"
import { coffeeProducingCountries, varieties } from "@/lib/coffeeOptions.ts"
import { supabase } from "@/lib/client";

export interface CoffeeBag {
  name: string;
  roaster: string;
  process: string;
  variety: string;
  origin: string
  roastDate: string | undefined;
  weight: number;
}

export function CoffeeBagEntry() {
  const [data, setData] = useState<CoffeeBag>({
    name: '',
    roaster: '',
    process: '',
    variety: '',
    origin: '',
    roastDate: undefined,
    weight: 0,
  })

  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  const handleVarietyChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      variety: value
    }))
  }
    const handleOriginChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      origin: value
    }))
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setData((prev) => ({
      ...prev,
      [name]: value
    })
    )
  }
 
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return
    const dateString = date.toISOString()
    setData((prev) => ({
      ...prev,
      roastDate: dateString
    })
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setServerMsg(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const resp = await fetch('http://localhost:5000/api/addCoffee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err?.error || `Request failed with ${resp.status}`);
      }

      const json = await resp.json();
      console.log('Server response:', json);
      setServerMsg('Submitted successfully!');
    } catch (err: any) {
      console.error(err);
      setServerMsg(err.message ?? 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 h-full w-full">
      <div className="flex w-full justify-between">
        <Link to='/'>
          <Button variant='ghost' className="hover:bg-transparent">Cancel</Button>
        </Link>
        <h1 className="text-2xl font-semibold">New Coffee Bag</h1>
        <p className="w-18"></p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full items-center gap-6">
        <div className="">
          <Label className="" htmlFor='name'>Name</Label>
          <Input 
            type='text' 
            id='name'
            name='name'
            onChange={handleInputChange}
            value={data.name}
            className="mt-1 w-64"
          />
        </div>
        <div className="">
          <Label htmlFor='roaster'>Roaster</Label>
          <Input 
            type='text' 
            id='roaster'
            name='roaster'
            onChange={handleInputChange}
            value={data.roaster}
            className="mt-1 w-64"
          />
        </div>
        <div className="">
          <Label htmlFor='process'>Process</Label>
          <Input 
            type='text' 
            id='process'
            name='process'
            onChange={handleInputChange}
            value={data.process}
            className="mt-1 w-64"
          />
        </div>
        <div className="">
          <Label htmlFor='weight'>Weight</Label>
          <InputGroup className="w-64 mt-1">
            <InputGroupInput 
              type='number' 
              id='weight'
              name='weight'
              onChange={handleInputChange}
              value={data.weight}
              className="mt-1"
            />
            <InputGroupAddon align="inline-end">grams</InputGroupAddon>
          </InputGroup>
      
        </div>
        <div>
          <Label htmlFor='variety'>Variety</Label>
          <Combobox value={data.variety} onValueChange={handleVarietyChange} data={varieties} displayText="Select variety"/>
        </div>
        <div>
          <Label htmlFor='variety'>Origin</Label>
          <Combobox value={data.origin} onValueChange={handleOriginChange} data={coffeeProducingCountries} displayText='Select Origin'/>
        </div>
        <MonthlyCalendar value={data.roastDate} onDateChange={handleDateChange} />
        
        <Button disabled={submitting} variant="secondary" type='submit'>Submit</Button>
        {serverMsg && <p>{serverMsg}</p>}
      </form>
    </div>
  )
}