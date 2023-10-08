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
    Badge,
    Button,
    Checkbox,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui"
import {PageWrapper} from "../../../components/wrapper/page-wrapper";
import {BadgeOptionType, HomeTask} from "../../../types";

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

export const columns: ColumnDef<HomeTask>[] = [
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
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Шукати за прізвищем"
                    value={(table.getColumn("student")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("student")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Стовпці <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column:any) => column.getCanHide())
                            .map((column:any) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value:any) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {(typeof column.columnDef.header !== "string" ? "Пошта" : column.columnDef.header)}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup:any) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header:any) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row:any) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell:any) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Немає результатів.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Попередня
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Наступна
                    </Button>
                </div>
            </div>
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
