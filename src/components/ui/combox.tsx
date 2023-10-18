"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "./button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "./command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover"

export function ComboboxDemo({data, selectedData, setSelectedData}: {data: any, selectedData: any, setSelectedData: any}) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {"Оберіть групи....."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[462px] p-0">
                <Command>
                    <CommandInput placeholder="Оберіть групи....." />
                    <CommandEmpty>Група не знайдена</CommandEmpty>
                    <CommandGroup>
                        {data.map((item: any) => (
                            <CommandItem
                                key={Object.keys(item)[0]}
                                value={Object.keys(item)[0]}
                                onSelect={(currentValue: string) => {
                                    if(!selectedData.includes(currentValue)) {
                                        setSelectedData((prevState: any) => [...prevState, currentValue]);
                                        setOpen(false);
                                    }
                                }}
                            >
                                {item[Object.keys(item)[0]]}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
