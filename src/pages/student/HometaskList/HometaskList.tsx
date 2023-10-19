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
    Button, Dialog, DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuTrigger, Input,
} from "../../../components/ui"
import {PageWrapper} from "../../../components/wrapper/page-wrapper";
import {BadgeOptionType, StudentHomeTask} from "../../../types";
import {DateTable} from "../../../components/table"
import {useContext} from "react";
import GlobalContext from "../../../context/GlobalContext";
import {DialogWrapper} from "../../../components/wrapper/dialog-wrapper";
import {dialogOptions} from "../../../lib";
import {StudentDataDataForm} from "../../../components/form/student-form";
import {HomeTaskForm} from "../../../components/form/hometask-form";

const columns: ColumnDef<StudentHomeTask>[] = [

    {
        accessorKey: "title",
        header: ({ column }: {column: any}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Назва дисципліни
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }: {row:any}) => <div className="capitalize">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "name",
        header: "Завдання",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: "Опис",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("description")}</div>
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
        accessorKey: "text",
        header: "Рішення",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("text")}</div>
        ),
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }: {row: any}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Меню</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    {row.original.status !== "success" &&
                        <DropdownMenuContent align="end">
                            <Dialog>
                                <DialogTrigger>

                                    <DropdownMenuLabel>Відправити на перевірку</DropdownMenuLabel>
                                </DialogTrigger>
                                <DialogWrapper header={dialogOptions.updateHometask.header} >
                                    <HomeTaskForm options={row.original}/>

                                </DialogWrapper>
                            </Dialog>
                        </DropdownMenuContent>}
                </DropdownMenu>
            )
        },
    },
]

export function HometaskList() {
    const { allStudentsSubjects: data } = useContext(GlobalContext);

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
            <DateTable table={table} columns={columns} search={<SearchByGroup table={table} />} dialog={<></>} disableDelete={true} />
        </PageWrapper>
    )
}

const getStatusBadge = (status: string) => {
    let option:BadgeOptionType = {
        variant: "outline",
        title: "Не відправлено"
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

const SearchByGroup = ({table}: {table: any}) => {
    return (
        <>
            <Input
                placeholder="Шукати за дисципліною"
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <Input
                placeholder="Шукати за завданням"
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm ml-5"
            />
        </>

    )
}
