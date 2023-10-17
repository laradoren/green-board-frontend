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
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger, Tabs, TabsContent, TabsList, TabsTrigger,
} from "../../components/ui"
import {PageWrapper} from "../../components/wrapper/page-wrapper";
import {Teacher} from "../../types";
import {DateTable} from "../../components/table";
import {DialogWrapper} from "../../components/wrapper/dialog-wrapper";
import {dialogOptions} from "../../lib";
import {TeacherDataForm, TeachersDataFileForm} from "../../components/form/teacher-form";
import {useContext, useEffect, useState} from "react";
import {DeleteDialog} from "../../components/dialog/delete-dialog.ts";
import GlobalContext from "../../context/GlobalContext";

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
        header: "Ім'я",
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
                            <DialogWrapper header={dialogOptions.updateTeachers.header} button={dialogOptions.updateTeachers.button}>
                                <TeacherDataForm editOption={row.original} />
                            </DialogWrapper>
                        </Dialog>
                        <DropdownMenuSeparator />
                        <Dialog>
                            <DialogTrigger>
                                <DropdownMenuLabel>Видалити</DropdownMenuLabel>
                            </DialogTrigger>
                            <DeleteDialog list={[row.original.id.toString()]} header={dialogOptions.deleteData.header} button={dialogOptions.deleteData.button}>
                            </DeleteDialog>
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function TeachersList() {
    const { allTeachers } = useContext(GlobalContext);

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: allTeachers,
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
    });

    useEffect(() => {
        if(allTeachers) {
            table.setPageSize(5);
        }
    }, []);

    return (
        <PageWrapper className="w-full" title={"Списки викладачів"}>
            <Dialog>
                <DialogTrigger>
                    <Button
                        size="lg"
                    >
                        Запросити викладачів
                    </Button>
                </DialogTrigger>
                <DialogWrapper header={dialogOptions.addTeachers.header} button={dialogOptions.addTeachers.button}>
                    <TeacherModal />
                </DialogWrapper>
            </Dialog>

            <DateTable table={table} columns={columns} />
        </PageWrapper>
    )
}

const TeacherModal = () => {
    return (
        <Tabs defaultValue="many" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger className="w-[50%]" value="many">Файлом</TabsTrigger>
                <TabsTrigger className="w-[50%]" value="single">Дані про одного</TabsTrigger>
            </TabsList>
            <TabsContent value="many"><TeachersDataFileForm /></TabsContent>
            <TabsContent value="single"><TeacherDataForm editOption={null}/></TabsContent>
        </Tabs>
    )
}
