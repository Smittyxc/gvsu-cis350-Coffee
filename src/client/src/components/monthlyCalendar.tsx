"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const calendarInputStyle = "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:cbg3 text-ctext bg-cbg2 hover:bg-chover";

interface MonthlyCalendarProps {
  value: string | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function MonthlyCalendar({ value, onDateChange }: MonthlyCalendarProps) {
  const [open, setOpen] = React.useState(false)
  // const [date, setDate] = React.useState<Date | undefined>(undefined)
  const date = value ? new Date(value) : undefined

  const buttonClassName = `${calendarInputStyle} justify-between font-normal`;

  return (
    <div className="flex flex-col gap-1 w-64">
      <Label htmlFor="date" className="">
        Roast Date 
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            id="date"
            className={buttonClassName}
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0 bg-cbg2 text-ctext border border-cbg3" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              onDateChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
