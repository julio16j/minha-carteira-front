"use client"

import React, {useState} from "react"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Input, Button} from "@nextui-org/react"
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import CalculateIcon from '@mui/icons-material/Calculate'
import {Spinner} from "@nextui-org/react"
import { formatarParaBRL, handleEnterKey } from "@/utils/utils"
import { handleCalcularNovoAporte } from "@/services/acaoService"
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
    key: "quantidadeNova",
    label: "Qtde Nova",
  },
  {
    key: "total",
    label: "Total",
  }
]

export default function NovoAporte() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState('hidden')
  const [valorAporte, setValorAporte] = useState(0)

  function calcular() {
    setLoading('')
    handleCalcularNovoAporte(valorAporte, successCallback, errorCallback)
  }

  function successCallback (resultado) {
  setLoading('hidden')
    setRows([...resultado])
  }

  function errorCallback (error) {
    setLoading('hidden')
    console.log(error)
  }

  function limpar () {
    setRows([])
  }

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-4 md:p-16">
        <h1 className="text-3xl text-center">Novo Aporte em Ações</h1>
      </div>
      <div className="flex pb-4 flex-col gap-2 md:flex-row" onKeyDown={(event)=>handleEnterKey(event, calcular)}>
        <div>
          <Input className="mr-4" type="number" label="Valor" placeholder="Insira o valor do novo aporte" value={valorAporte || ''} variant="bordered" onValueChange={(novoValorInicial)=>{setValorAporte(novoValorInicial)}}/>
        </div>
        <div className="flex items-center justify-center gap-16 md:gap-0">
          <Button variant="outlied" isIconOnly className="mr-4 h-full w-30" onClick={()=>{limpar()}}>
            <CleaningServicesIcon />
          </Button>
          <Button variant="outlied" isIconOnly className="mr-4 h-full w-30" onClick={()=>{calcular()}}>
            <CalculateIcon />
          </Button>
        </div>
      </div>
      <div className="w-full">
        <Table aria-label="Tabela de projeção" className="max-h-60vh">
          <TableHeader columns={columns} style={{display: 'flex', justifyContent: 'space-between'}}>
            {(column) => <TableColumn className="text-lg" key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody emptyContent={'Sem dados'} items={rows}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => <TableCell className="text-center" >{columnKey=='preco' || columnKey=='total'
                  ? formatarParaBRL(getKeyValue(item, columnKey))
                  : getKeyValue(item, columnKey)}
                </TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
        <div className="flex h-[100%] w-[100%] items-center justify-center">
          <Spinner color="white"/>
        </div>
      </div>
    </main>
  )
}
