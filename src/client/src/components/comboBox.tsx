import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const inputStyle = "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:cbg3 text-ctext bg-cbg2 hover:bg-chover";

interface ComboboxProps {
  value: string;
  onValueChange: (value: string) => void;
  data: {
    value: string;
    label: string;
  }[];
  displayText: string;
}

export default function Combobox({
  value,
  onValueChange,
  data,
  displayText

}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const buttonClassName = `${inputStyle} justify-between mt-1`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={buttonClassName}
          variant="ghost"
          role="combobox"
          aria-expanded={open}
        >
          {value
            ? data.find((framework) => framework.value === value)?.label
            : displayText}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-cbg2 text-ctext border-cbg3">
        <Command>
          <CommandInput 
            placeholder="Search varieties..."
            className="p-3 text-ctext bg-cbg2 placeholder:text-gray-500 focus:ring-0 focus:border-0" 
          />
          <CommandList>
            <CommandEmpty>Not found.</CommandEmpty>
            <CommandGroup>
              {data.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}