"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
    Badge,
    Button,
    Checkbox,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../../components/ui"
import {PageWrapper} from "../../../components/wrapper/page-wrapper";
import {BadgeOptionType, HomeTask} from "../../../types";
import {DateTable} from "../../../components/table"

const data: HomeTask[] = [
    {
        id: "m5gr84i9",
        student: "Макс Барахло",
        file: "Файл 1",
        date: "22-12-2023",
        status: "success",
    },
    {
        id: "3u1reuv4",
        student: "Дарина Андріївна",
        file: "Файл 1",
        date: "22-12-2023",
        status: "pending"
    },
    {
        id: "derv1ws0",
        student: "Пісі клабер",
        file: "Файл 1",
        date: "20-12-2023",
        status: "fail"
    },
    {
        id: "5kma53ae",
        student: "Кузло Оксана",
        file: "Файл 1",
        date: "22-12-2023",
        status: "success"
    },
    {
        id: "bhqecj4p",
        student: "Бляха муха",
        file: "Файл 1",
        date: "22-11-2023",
        status: "pending"
    },
]

const columns: ColumnDef<HomeTask>[] = [
    {
        id: "select",
        header: ({ table }: {table: any}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }: {row: any}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value:any) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "student",
        header: "Студент",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("student")}</div>
        ),
    },
    {
        accessorKey: "file",
        header: "Завдання",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("file")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Статус",
        cell: ({ row }: {row: any}) => (
            getStatusBadge(row.getValue("status"))
        ),
    },
    {
        accessorKey: "date",
        header: ({ column }: {column: any}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Дата
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: {row:any}) => <div className="lowercase">{row.getValue("date")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }: {row: any}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Позначити, як перевірено</DropdownMenuItem>
                        <DropdownMenuItem>Відправити на доопрацювання</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function HometaskList() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <PageWrapper className="w-full" title={"Домашні завдання"}>
            <Select>
                <SelectTrigger className="w-[384px]">
                    <SelectValue placeholder="Обрати дисципліну" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="subject1">Основи програмування</SelectItem>
                    <SelectItem value="subject2">Основи програмування 2</SelectItem>
                    <SelectItem value="subject3">Дисципліна</SelectItem>
                </SelectContent>
            </Select>
            <DateTable table={table} columns={columns} />
        </PageWrapper>
    )
}

const getStatusBadge = (status: string) => {
    let option:BadgeOptionType = {
        variant: "outline",
        title: "Не визначено"
    }
    switch (status) {
        case "success":
            option = {
                variant: undefined,
                title: "Перевірено"
            }
            break;
        case "pending":
            option = {
                variant: "secondary",
                title: "Очікує"
            }
            break;
        case "fail":
            option = {
                variant: "outline",
                title: "На доопрацюванні"
            }
            break;
    }
    return <Badge variant={option.variant} className="green">{option.title}</Badge>
}
