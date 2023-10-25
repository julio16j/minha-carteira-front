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
    rentabilidade: 0.00,
    periodo: 0,
    aporte: 0,
    valorInicial: 0
  })
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = 2;


  function atualizarEntrada (campo, novoValor) {
    setEntrada({...entrada, [campo]: novoValor})
  }

  function adicionar() {
    let montante=entrada.valorInicial
    const novasLinhas=[]
    for (let anos = 0; anos < Number(entrada.periodo); anos++) {
      for (let meses = 0; meses < 12; meses++) {
        montante=(montante + Number(entrada.aporte)) * (1+Number(entrada.rentabilidade))
      }
      novasLinhas.push({
        id: anos + 1,
        ano: new Date().getFullYear() + anos,
        patrimonio: montante,
        mensal: montante*0.008
      })
    }
    console.log(novasLinhas.length)
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
      <div className="flex pb-4">
        <div className="flex">
          <Input className="mr-4" type="number" label="Rentabilidade" onValueChange={(novoRent)=>{atualizarEntrada('rentabilidade', novoRent)}}/>
          <Input className="mr-4" type="number" label="Período (Anos)" onValueChange={(novoAno)=>{atualizarEntrada('periodo', novoAno)}}/>
          <Input className="mr-4" type="number" label="Aporte" onValueChange={(novoAporte)=>{atualizarEntrada('aporte', novoAporte)}}/>
          <Input className="mr-4" type="number" label="Valor Inicial" onValueChange={(novoValorInicial)=>{atualizarEntrada('valorInicial', novoValorInicial)}}/>
        </div>
        <div className="flex items-center">
          <Button color="primary" className="mr-4" onClick={()=>{limpar()}}>
            Limpar
          </Button>
          <Button color="success" onClick={()=>{adicionar()}}>
            Calcular
          </Button>
        </div>
      </div>
      <div className="w-full h-80vh">
        <Table aria-label="Example table with dynamic content" style={{width: '100%'}}
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }>
          
          <TableHeader columns={columns} style={{display: 'flex', justifyContent: 'space-between'}}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
