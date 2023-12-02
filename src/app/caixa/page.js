"use client"

import React, { useState, useEffect } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Link } from "@nextui-org/react"
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { handleListarCaixa, handleDeleteCaixa } from "@/services/caixaService"
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import {Spinner} from "@nextui-org/react"
import { CAIXA_DELETADO_SUCESSO } from "@/utils/constants"

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

export default function Caixa() {

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState('hidden')
  const [snackbarProps, setSnackbarProps] = useState({open: false, message: CAIXA_DELETADO_SUCESSO})

  function successObterCaixaCallback (data) {
    setLoading('hidden')
    setRows([...data])
  }

  function errorCallback(error) {
    setLoading('hidden')
    console.log(error)
  }

  function successDeleteCaixaCallback (id) {
    setLoading('hidden')
    setSnackbarProps({open: true, message: CAIXA_DELETADO_SUCESSO})
    console.log(id)
    handleListarCaixa(successObterCaixaCallback, errorCallback)
  }

  function onDelete(item) {
    setLoading('')
    handleDeleteCaixa(item.id, successDeleteCaixaCallback, errorCallback)
  }

  useEffect(() => {
    setLoading('')
    handleListarCaixa(successObterCaixaCallback, errorCallback)
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
                        <Link className="cursor-pointer" onClick={()=>onDelete(item)}>
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
      <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
        <div className="flex h-[100%] w-[100%] items-center justify-center">
          <Spinner color="white"/>
        </div>
      </div>
      <DefaultSnackbar props={snackbarProps} setProps={setSnackbarProps} />
    </main>
  )
}
