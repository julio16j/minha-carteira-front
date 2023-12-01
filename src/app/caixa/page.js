"use client"

import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Link } from "@nextui-org/react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { listarCaixa, deleteCaixa } from "@/services/caixaService";

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
  },
  {
    key: "acoes",
    label: "Ações"
  }
]

async function obterListaCaixa (successCallback, errorCallback ) {
  try {
    const listaCaixa = await listarCaixa()
    successCallback(listaCaixa)
  } catch (error) {
    errorCallback(error)
  }
}

export default function Caixa() {
  const [rows, setRows] = useState([])

  function successObterCaixaCallback (data) {
    setRows([...data])
  }

  function errorObterCaixaCallback(error) {
    console.log(error)
  }

  async function onDelete (id) {
    try {
      await deleteCaixa(id)
      obterListaCaixa(successObterCaixaCallback, errorObterCaixaCallback)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obterListaCaixa(successObterCaixaCallback, errorObterCaixaCallback)
  }, []);

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
              <TableRow key={item.id}>
                {
                  (columnKey) => columnKey != 'acoes'
                    ? <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    : <TableCell>
                        <Link className="cursor-pointer" href={`caixa/${item.id}`}>
                          <EditIcon />
                        </Link>
                        <Link className="cursor-pointer" onClick={()=>onDelete(item.id)}>
                          <DeleteIcon className="ml-1" />
                        </Link>
                      </TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex mt-4 justify-center w-full">
          <Link className="cursor-pointer" href="caixa/novo-caixa">
            Adicionar
            <AddBoxIcon className="ml-1" />
          </Link>
      </div>
    </main>
  )

}
