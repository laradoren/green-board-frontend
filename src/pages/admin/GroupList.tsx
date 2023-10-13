"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import {
    Button,
    Checkbox,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui"
import {PageWrapper} from "../../components/wrapper/page-wrapper";
import {Teacher} from "../../types";
import {DateTable} from "../../components/table";

const data: Teacher[] = [
    {
        id: "m5gr84i9",
        name: "Аліна",
        surname: "Галушко",
        lastname: "Василівна",
        email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        name: "Дарина",
        surname: "Проботюк",
        lastname: "Андріївна",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        name: "Анатолій",
        surname: "Проботюк",
        lastname: "Степанович",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        name: "Оксана",
        surname: "Кузло",
        lastname: "Сергіївна",
        email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        name: "Бляяя",
        surname: "Муха",
        lastname: "да",
        email: "carmella@hotmail.com",
    },
]

export const columns: ColumnDef<Teacher>[] = [
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
        accessorKey: "name",
        header: "Ім'я",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "surname",
        header: "Прізвище",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("surname")}</div>
        ),
    },
    {
        accessorKey: "lastname",
        header: "По-батькові",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("lastname")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }: {column: any}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Пошта
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: {row:any}) => <div className="lowercase">{row.getValue("email")}</div>,
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function GroupList() {
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
        <PageWrapper className="w-full" title={"Список груп"}>
            <Button
                size="lg"
            >
                Створити групу
            </Button>
            <Button
                size="lg"
            >
                Додати студента
            </Button>
            <DateTable table={table} columns={columns} />
        </PageWrapper>
    )
}
