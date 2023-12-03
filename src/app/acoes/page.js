"use client"

import React, { useState, useEffect } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link } from "@nextui-org/react"
import AddBoxIcon from '@mui/icons-material/AddBox'
import { handleListarAcoes, handleDeleteAcao } from "@/services/acaoService"
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import {Spinner} from "@nextui-org/react"
import { ACAO_DELETADO_SUCESSO } from "@/utils/constants"
import CelulaAcao from "./acaoCelula"

const columns = [
  {
    key: "ticker",
    label: "Ticker",
  },
  {
    key: "preco",
    label: "Preço",
  },
  {
    key: "quantidade",
    label: "Quantidade",
  },
  {
    key: "total",
    label: "Total",
  },
  {
    key: "lucro",
    label: "Lucro",
  },
  {
    key: "acoes",
    label: "Ações"
  }
]

export default function Acoes() {

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState('hidden')
  const [snackbarProps, setSnackbarProps] = useState({open: false, message: ACAO_DELETADO_SUCESSO})

  function successObterAcoesCallback (data) {
    setLoading('hidden')
    setRows([...data])
  }

  function errorCallback(error) {
    setLoading('hidden')
    console.log(error)
  }

  function successDeleteAcoesCallback (id) {
    setLoading('hidden')
    setSnackbarProps({open: true, message: ACAO_DELETADO_SUCESSO})
    console.log(id)
    handleListarAcoes(successObterAcoesCallback, errorCallback)
  }

  function onDelete(item) {
    setLoading('')
    handleDeleteAcao(item.id, successDeleteAcoesCallback, errorCallback)
  }

  useEffect(() => {
    setLoading('')
    handleListarAcoes(successObterAcoesCallback, errorCallback)
  }, []);

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-16">
        <h1 className="text-3xl">Ações</h1>
      </div>
      <div className="w-full">
        <Table aria-label="Tabela de ações" className="max-h-60vh">
          <TableHeader columns={columns} style={{display: 'flex', justifyContent: 'space-between'}}>
            {(column) => <TableColumn className="text-lg" key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody emptyContent={'Sem dados'} items={rows}>
            {(item) => (
              <TableRow key={item.id}>
                {
                  (columnKey) => <TableCell>
                    <CelulaAcao item={item} columnKey={columnKey} editLink={`acoes/${item.id}`} onDelete={onDelete} />
                  </TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex mt-4 justify-center w-full">
        <Link className="cursor-pointer" href="acoes/nova-acao">
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
