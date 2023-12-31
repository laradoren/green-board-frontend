import { Table } from "@tanstack/react-table"
import {Button} from "./button";
import {RxDoubleArrowLeft, RxDoubleArrowRight} from "react-icons/rx";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

interface DataTablePaginationProps<TData> {
    table: Table<TData>,
    disableDelete?: any
}

export function DataTablePagination<TData>({
                                               table,
                                               disableDelete
                                           }: DataTablePaginationProps<TData>) {
    return (
        <div className="flex items-center justify-between px-2">
            {!disableDelete && <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} з {" "}
                {table.getFilteredRowModel().rows.length} рядків обрано.
            </div>}
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Сторінка {table.getState().pagination.pageIndex + 1} з{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to first page</span>
                        <RxDoubleArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <BsChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to next page</span>
                        <BsChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <span className="sr-only">Go to last page</span>
                        <RxDoubleArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
