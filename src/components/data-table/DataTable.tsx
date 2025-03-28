"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "../tremor/Table"
import { cx } from "../../lib/utils"
import * as React from "react"
import axios from "axios"
import { DbConfig } from "../../types/dbTypes"

import { DataTableBulkEditor } from "./DataTableBulkEditor"
import { DataTablePagination } from "./DataTablePagination"
import { columns as generateColumns } from "./columns"

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface DataTableProps {
  tableName: string;
  dbConfig: DbConfig;
}

export function DataTable({ tableName, dbConfig }: DataTableProps) {
  const API_URL = `http://localhost:8080/api/show-data/${tableName}` // Dynamic API URL
  const pageSize = 20
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = React.useState<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dynamicColumns, setDynamicColumns] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(API_URL, dbConfig)
        setData(response.data)
        setDynamicColumns(generateColumns(response.data))
      } catch (error) {
        console.error("Error fetching table data:", error)
      }
    }
    fetchData()
  }, [tableName, API_URL, dbConfig])

  const table = useReactTable({
    data,
    columns: dynamicColumns,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <div className="space-y-3">
        <div className="relative overflow-hidden overflow-x-auto">
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-y border-gray-200 dark:border-gray-800"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHeaderCell
                      key={header.id}
                      className={cx(
                        "whitespace-nowrap py-1 text-sm sm:text-xs",
                        header.column.columnDef.meta?.className,
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHeaderCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group select-none hover:bg-gray-50 hover:dark:bg-gray-900"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cx(
                          "relative whitespace-nowrap py-1 text-gray-600 first:w-10 dark:text-gray-400 select-text", // Added `select-text` class
                          cell.column.columnDef.meta?.className,
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={dynamicColumns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <DataTableBulkEditor table={table} rowSelection={{}} />
        </div>
        <DataTablePagination table={table} pageSize={pageSize} />
      </div>
    </>
  )
}
