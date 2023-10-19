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
    Button,
    Checkbox, Dialog, DialogTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger, Input, Tabs, TabsContent, TabsList, TabsTrigger,
} from "../../components/ui"
import {PageWrapper} from "../../components/wrapper/page-wrapper";
import {Teacher} from "../../types";
import {DateTable} from "../../components/table";
import {DialogWrapper} from "../../components/wrapper/dialog-wrapper";
import {dialogOptions} from "../../lib";
import {TeacherDataForm, TeachersDataFileForm} from "../../components/form/teacher-form";
import {DeleteDialog} from "../../components/dialog/delete-dialog.ts";
import {useContext, useEffect} from "react";
import GlobalContext from "../../context/GlobalContext";
import {GroupForm} from "../../components/form";
import {makeArrayWithIds} from "../../lib/helper";
import {StudentDataDataForm} from "../../components/form/student-form";

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
        accessorKey: "fullname",
        header: "Повне ім'я",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("fullname")}</div>
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
        accessorKey: "group",
        header: "Код групи",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("group")}</div>
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
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuLabel>Змінити</DropdownMenuLabel>
                            </DialogTrigger>
                            <DialogWrapper header={dialogOptions.updateStudent.header} button={dialogOptions.updateStudent.button}>
                                <StudentDataDataForm editOption={row.original} />
                            </DialogWrapper>
                        </Dialog>
                        <DropdownMenuSeparator />
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuLabel>Видалити</DropdownMenuLabel>
                            </DialogTrigger>
                            <DeleteStudentDialog list={[row.original.id.toString()]} />
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function GroupList() {
    const {allStudents} = useContext(GlobalContext);

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data: allStudents,
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

    useEffect(() => {
        if(allStudents) {
            table.setPageSize(5);
        }
    }, []);


    return (
        <PageWrapper className="w-full" title={"Список груп"}>
            <Dialog>
                <DialogTrigger>
                    <Button
                        size="lg"
                    >
                        Створити групу
                    </Button>
                </DialogTrigger>
                <DialogWrapper header={dialogOptions.createGroup.header} button={dialogOptions.createGroup.button}>
                    <GroupForm/>
                </DialogWrapper>
            </Dialog>

            <DateTable table={table} columns={columns}
                       dialog={<DeleteStudentDialog list={makeArrayWithIds(table.getFilteredSelectedRowModel().rows)}  />}
                       search={<SearchByGroup table={table} />}
            />
        </PageWrapper>
    )
}

const DeleteStudentDialog = ({list}: {list: any}) => {
    const { deleteStudentsList } = useContext(GlobalContext);

    return (
        <DeleteDialog handleFunction={deleteStudentsList} list={list} header={dialogOptions.deleteData.header} button={dialogOptions.deleteData.button}>
        </DeleteDialog>
    )
}

const SearchByGroup = ({table}: {table: any}) => {
    return (
        <Input
            placeholder="Шукати за групою"
            value={(table.getColumn("group")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("group")?.setFilterValue(event.target.value)
            }
            className="max-w-sm ml-5"
        />
    )
}
