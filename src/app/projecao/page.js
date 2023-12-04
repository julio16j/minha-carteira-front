"use client"

import React, {useState} from "react"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Input, Button} from "@nextui-org/react"
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import CalculateIcon from '@mui/icons-material/Calculate'
import {formatarParaBRL, handleEnterKey} from '../../utils/utils'
const columns = [
  {
    key: "ano",
    label: "Ano",
  },
  {
    key: "patrimonio",
    label: "Patrimonio",
  },
  {
    key: "mensal",
    label: "Renda Mensal",
  }
]

export default function Home() {
  const [rows, setRows] = useState([])
  const [entrada, setEntrada] = useState({
    rentabilidade: 1,
    periodo: 10,
    aporte: 500,
    valorInicial: 0
  })

  function atualizarEntrada (campo, novoValor) {
    setEntrada({...entrada, [campo]: novoValor})
  }

  function adicionar() {
    let montante=Number(entrada.valorInicial)
    const novasLinhas=[]
    const aporteMensal = Number(entrada.aporte)
    const rentabilidadeMensal = 1 + Number(entrada.rentabilidade/100)
    const periodo = Number(entrada.periodo)
    for (let anos = 0; anos < periodo; anos++) {
      for (let meses = 0; meses < 12; meses++) {
        montante = (montante + aporteMensal) * rentabilidadeMensal
      }
      novasLinhas.push({
        id: anos + 1,
        ano: new Date().getFullYear() + anos,
        patrimonio: formatarParaBRL(montante),
        mensal: formatarParaBRL(montante * 0.008)
      })
    }
    setRows(novasLinhas)
  }

  function limpar () {
    setRows([])
  }

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-16">
        <h1 className="text-3xl">Projeção</h1>
      </div>
      <div className="flex pb-4 flex-col gap-2 md:flex-row" onKeyDown={(event)=>handleEnterKey(event, adicionar)}>
        <div className="flex flex-col gap-2 md:flex-row">
          <Input className="mr-4" type="number" label="Rentabilidade (Ao mes)" variant="bordered" value={entrada.rentabilidade || ''} onValueChange={(novoRent)=>{atualizarEntrada('rentabilidade', novoRent)}} endContent={'%'}/>
          <Input className="mr-4" label="Período (Anos)" variant="bordered" value={entrada.periodo || ''} onValueChange={(novoAno)=>{atualizarEntrada('periodo', novoAno)}}/>
          <Input className="mr-4" type="number" label="Aporte" variant="bordered" value={entrada.aporte || ''} onValueChange={(novoAporte)=>{atualizarEntrada('aporte', novoAporte)}}/>
          <Input className="mr-4" type="number" label="Valor Inicial" value={entrada.valorInicial || ''} variant="bordered" onValueChange={(novoValorInicial)=>{atualizarEntrada('valorInicial', novoValorInicial)}}/>
        </div>
        <div className="flex items-center justify-center gap-16 md:gap-0">
          <Button variant="outlied" isIconOnly className="mr-4 h-full w-30" onClick={()=>{limpar()}}>
            <CleaningServicesIcon />
          </Button>
          <Button variant="outlied" isIconOnly className="mr-4 h-full w-30" onClick={()=>{adicionar()}}>
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
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
