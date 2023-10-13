import {PageWrapper} from "../../../components/wrapper/page-wrapper";
import * as React from "react";
import {
    Button,
    Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../../../components/ui";
import {Student} from "../../../types";
import {DateTable} from "../../../components/table";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {MoreHorizontal} from "lucide-react";

const data:Student[] = [
    {
        id: "student1",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        currentScore: "20",
        firstAttestation: true,
        secondAttestation: false,
        result: "30"
    },
    {
        id: "student2",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        currentScore: "10",
        firstAttestation: false,
        secondAttestation: false,
        result: "30"
    },
    {
        id: "student3",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        currentScore: "10",
        firstAttestation: false,
        secondAttestation: false,
        result: "30"
    },
    {
        id: "student4",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        currentScore: "10",
        firstAttestation: false,
        secondAttestation: false,
        result: "30"
    },
    {
        id: "student5",
        name: "Галушко",
        surname: "Аліна",
        lastname: "Миколайвна",
        currentScore: "10",
        firstAttestation: false,
        secondAttestation: false,
        result: "30"
    }
]

const columns: ColumnDef<Student>[] = [
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
        accessorKey: "currentScore",
        header: "Поточний результат",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("currentScore")}</div>
        ),
    },
    {
        accessorKey: "firstAttestation",
        header: "Перша атестація",
        cell: ({ row }: {row: any}) => (
            <Checkbox checked={row.getValue("firstAttestation")} />
        ),
    },
    {
        accessorKey: "secondAttestation",
        header: "Друга атестація",
        cell: ({ row }: {row: any}) => (
            <Checkbox checked={row.getValue("secondAttestation")} />
        ),
    },
    {
        accessorKey: "result",
        header: "Оцінка за рік",
        cell: ({ row }: {row: any}) => (
            <div className="capitalize">{row.getValue("result")}</div>
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
                        <DropdownMenuItem>Позначити, як перевірено</DropdownMenuItem>
                        <DropdownMenuItem>Відправити на доопрацювання</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
export const StudyList = () => {
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
        <PageWrapper className="w-full" title={"Електронний журнал"}>
            <div className="flex">
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
                <Select>
                    <SelectTrigger className="w-[384px]">
                        <SelectValue placeholder="Обрати групу" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="subject1">Основи програмування</SelectItem>
                        <SelectItem value="subject2">Основи програмування 2</SelectItem>
                        <SelectItem value="subject3">Дисципліна</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <DateTable table={table} columns={columns} />
        </PageWrapper>
    );
}
