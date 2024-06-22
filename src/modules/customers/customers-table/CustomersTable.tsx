"use client";

import { LeftArrowIcon } from "@/modules/shared/icons/left-arrow.icon";
import { RightArrowIcon } from "@/modules/shared/icons/right-arrow.icon";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useListCustomers } from "@/modules/customers/api/customers.controller";
import { columns } from "@/modules/customers/customers-table/columns";
import { Customer } from "@/modules/hotels/types";
import { useState } from "react";
import { clsx } from "clsx";

const noResults: Customer[] = [];

const PAGE_SIZE = 10;

export const CustomersTable = () => {
  const { customers } = useListCustomers();

  const [pagination, setPagination] = useState({
    pageSize: PAGE_SIZE,
    pageIndex: 0,
  });

  const table = useReactTable({
    data: customers ?? noResults,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: { pagination },
  });

  return (
    <>
      <table className="w-full mt-5">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left">
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="px-4 rounded-lg">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="bg-white border-b border-gray-100 rounded-lg"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex justify-end py-3 px-4 bg-white rounded-b-lg">
        <div className="flex items-center gap-x-3">
          <button
            className="h-7 w-7 flex items-center justify-center bg-palette-gray-100 rounded-full"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <LeftArrowIcon
              className={clsx(
                "text-black",
                !table.getCanPreviousPage() && "text-palette-gray-500",
              )}
            />
          </button>

          <div className="flex items-center">
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <div
                key={index}
                className={clsx(
                  "h-7 w-7 flex justify-center items-center rounded-full",
                  table.getState().pagination.pageIndex === index &&
                    "bg-blue-500 text-white",
                )}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <button
            className="h-7 w-7 flex items-center justify-center bg-palette-gray-100 rounded-full"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <RightArrowIcon
              className={clsx(
                "text-black",
                !table.getCanNextPage() && "text-palette-gray-500",
              )}
            />
          </button>
        </div>
      </div>
    </>
  );
};
