import {ReactNode} from "react";

export interface NavigationOptionType {
    title: string
    role: string
    href: string
    type: string
}

export interface DialogOptionsType {
    [key: string]: DialogOptionType
}

export interface DialogOptionType {
    header: string
    button?: string
    children?: ReactNode
    list?: [string]
    handleFunction?: (list: any) => void
}

export type BadgeOptionType = {
    title:string
    variant:"default" | "destructive" | "outline" | "secondary" | null | undefined
}

