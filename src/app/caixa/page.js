"use client"

import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
const columns = [
  {
    key: "nome",
    label: "Nome",
  },
  {
    key: "valor",
    label: "Valor",
  },
  {
    key: "rentabilidade",
    label: "Rentabilidade",
  },
  {
    key: "liquidez",
    label: "Liquidez",
  }
]

export default function Caixa() {
  const [rows, setRows] = useState([])

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-16">
        <h1 className="text-3xl">Caixa</h1>
      </div>
      <div className="w-full">
        <Table aria-label="Tabela de reservas" className="max-h-60vh">
          <TableHeader columns={columns} style={{display: 'flex', justifyContent: 'space-between'}}>
            {(column) => <TableColumn className="text-lg" key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody emptyContent={'Sem dados'} items={rows}>
            {(item) => (
              <TableRow key={item.nome}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
