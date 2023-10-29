"use client"

import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Input, Button } from "@nextui-org/react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices'
import { handleEnterKey } from '../../utils/utils'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservaShcema } from "@/schemas/reserva"; 
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({resolver: zodResolver(reservaShcema)})

  function adicionar (data) {
    setRows([...rows, {...data}])
  }

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-16">
        <h1 className="text-3xl">Caixa</h1>
      </div>
      <form onSubmit={handleSubmit(adicionar)} className="flex pb-4">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <Input label="Nome" variant="bordered" {...register('nome')}/>
            {errors.nome && (
              <p className="text-xs italic text-red-500 mt-2"> {errors.nome?.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <Input type="number" label="Valor" variant="bordered" {...register('valor')} />
            {errors.valor && (
              <p className="text-xs italic text-red-500 mt-2"> {errors.valor?.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <Input type="number" label="Rentabilidade" variant="bordered" {...register('rentabilidade')} endContent={'%'}/>
            {errors.rentabilidade && (
              <p className="text-xs italic text-red-500 mt-2"> {errors.rentabilidade?.message}</p>
            )}
          </div>
          <div className="flex flex-col">
            <Input label="Liquidez" variant="bordered" {...register('liquidez')} />
            {errors.liquidez && (
              <p className="text-xs italic text-red-500 mt-2"> {errors.rentabilidade?.message}</p>
            )}
          </div>
        </div>
        <div className="flex items-center ml-4">
          <Button  variant="outlied" isIconOnly className="h-full" type='submit'>
            <AddBoxIcon />
          </Button>
        </div>
      </form>
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
