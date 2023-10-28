"use client"

import React, {useState} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Input, Button, Pagination} from "@nextui-org/react";
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

  function formatarParaBRL(numero) {
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  
    return formatter.format(numero);
  }

  function atualizarEntrada (campo, novoValor) {
    setEntrada({...entrada, [campo]: novoValor})
  }

  function mascaraNumero (novoValor) {
    return novoValor.replace(/[^0-9.]/g, '')
  }

  function adicionar() {
    let montante=Number(entrada.valorInicial)
    const novasLinhas=[]
    const aporteMensal = Number(entrada.aporte);
    const rentabilidadeMensal = 1 + Number(entrada.rentabilidade/100);
    const periodo = Number(entrada.periodo)
    for (let anos = 0; anos < periodo; anos++) {
      for (let meses = 0; meses < 12; meses++) {
        montante = (montante + aporteMensal) * rentabilidadeMensal;
      }
      novasLinhas.push({
        id: anos + 1,
        ano: new Date().getFullYear() + anos,
        patrimonio: formatarParaBRL(montante),
        mensal: formatarParaBRL(montante * 0.008)
      });
    }
    setRows(novasLinhas)
  }

  function limpar () {
    setRows([])
  }

  function handleEnterKey (event) {
    if (event.key === 'Enter') {
      adicionar()
    }
  }

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-16">
        <h1 className="text-3xl">Projeção</h1>
      </div>
      <div className="flex pb-4" onKeyDown={(event)=>handleEnterKey(event)}>
        <div className="flex">
          <Input className="mr-4" label="Rentabilidade (Ao mes)" variant="bordered" value={entrada.rentabilidade || ''} onValueChange={(novoRent)=>{atualizarEntrada('rentabilidade', mascaraNumero(novoRent))}} endContent={'%'}/>
          <Input className="mr-4" label="Período (Anos)" variant="bordered" value={entrada.periodo || ''} onValueChange={(novoAno)=>{atualizarEntrada('periodo', novoAno)}}/>
          <Input className="mr-4" label="Aporte" variant="bordered" value={entrada.aporte || ''} onValueChange={(novoAporte)=>{atualizarEntrada('aporte', novoAporte)}}/>
          <Input className="mr-4" label="Valor Inicial" value={entrada.valorInicial || ''} variant="bordered" onValueChange={(novoValorInicial)=>{atualizarEntrada('valorInicial', novoValorInicial)}}/>
        </div>
        <div className="flex items-center">
          <Button color="primary" className="mr-4" onClick={()=>{limpar()}}>
            Limpar
          </Button>
        </div>
      </div>
      <div className="w-full">
        <Table aria-label="Example table with dynamic content" className="max-h-60vh">
          
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
