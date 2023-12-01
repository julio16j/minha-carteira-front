"use client"

import React, { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservaShcema } from "@/schemas/reserva";

import { Input, Button } from "@nextui-org/react";

export default function NewCaixa () {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({resolver: zodResolver(reservaShcema)})
    
    function adicionar (data) {
        console.log(data)
    }

    return (
        <main className="dark text-foreground bg-background p-4 h-screen">
            <div className="flex justify-center p-16">
                <h1 className="text-3xl text-center">Adicionar Novo Caixa</h1>
            </div>
            <form onSubmit={handleSubmit(adicionar)} className="flex pb-4 justify-center items-center flex-col sm:flex-row gap-4">
                <div className="flex gap-4 flex-wrap justify-center max-w-[13rem]">
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
        </main>
    )
}