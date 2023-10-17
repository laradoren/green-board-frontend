import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    Input,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    DataTablePagination, Dialog, DialogTrigger
} from "../ui";
import {flexRender} from "@tanstack/react-table";
import * as React from "react";
import {ChevronDown} from "lucide-react";
import {BsFillTrashFill} from "react-icons/bs";

export const DateTable = ({table, columns, dialog, search}: {table:any, columns:any, dialog: any, search?: any}) => {
    return (
        <>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Шукати за ім'ям"
                    value={(table.getColumn("fullname")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("fullname")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {search}
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
                <Dialog>
                    <DialogTrigger>
                        <Button
                            variant="destructive"
                            className="hidden h-10 w-10 p-0 lg:flex ml-5"
                            disabled={!table.getFilteredSelectedRowModel().rows.length}
                        >
                            <span className="sr-only">Видалити</span>
                            <BsFillTrashFill className="h-5 w-5" />
                        </Button>
                    </DialogTrigger>
                    {dialog}
                </Dialog>
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
            <div className="py-4">
              <DataTablePagination table={table} />
            </div>
        </>
    )
}