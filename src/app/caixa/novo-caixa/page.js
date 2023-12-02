"use client"

import React, { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {Spinner} from "@nextui-org/react";
import { Input, Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

import { caixaSchema } from "@/schemas/caixa";
import { novoCaixa } from "@/services/caixaService";
import DefaultSnackbar from "@/utils/components/defaultSnackabar";
import { CAIXA_INSERIDO_SUCESSO, CAIXA_FALHA_INSERIR } from "@/utils/constants";

async function handleNovoCaixa (data, successCallback, errorCallback) {
    try {
        await novoCaixa(data)
        successCallback()
      } catch (error) {
        errorCallback(error)
      }
}

export default function NewCaixa () {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({resolver: zodResolver(caixaSchema)})

    const [loading, setLoading] = useState('hidden')
    const [snackbarProps, setSnackbarProps] = useState({open: false, message: CAIXA_INSERIDO_SUCESSO});
    const router = useRouter()

    function adicionar (data) {
        setLoading('')
        console.log(data)
        handleNovoCaixa(data, successCallback, errorCallback)
    }
    
    function errorCallback(error) {
        console.log(error)
        setLoading('hidden')
        setSnackbarProps({open: true, message: CAIXA_FALHA_INSERIR})
    }

    function successCallback () {
        setLoading('hidden')
        setSnackbarProps({open: true, message: CAIXA_INSERIDO_SUCESSO})
        router.push('/caixa')
    }

    return (
        <main className="dark text-foreground bg-background p-4 h-screen">
            <div className="flex justify-center p-16">
                <h1 className="text-3xl text-center">Adicionar Novo Caixa</h1>
            </div>
            <form onSubmit={handleSubmit(adicionar)} className="flex pb-4 justify-center items-center flex-col sm:flex-row gap-4">
                <div className="flex gap-4 flex-wrap justify-center flex-row">
                    <div className="flex flex-col max-w-[13rem]">
                        <Input label="Nome" variant="bordered" {...register('nome')} placeholder="Insira o nome do caixa" />
                        {errors.nome && (
                        <p className="text-xs italic text-red-500 mt-2"> {errors.nome?.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col max-w-[13rem]">
                        <Input type="number" label="Valor" variant="bordered" {...register('valor')} placeholder="Insira o valor" />
                        {errors.valor && (
                        <p className="text-xs italic text-red-500 mt-2"> {errors.valor?.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col max-w-[13rem]">
                        <Input label="Rentabilidade" variant="bordered" {...register('rentabilidade')} placeholder="Insira a rentabilidade" />
                        {errors.rentabilidade && (
                        <p className="text-xs italic text-red-500 mt-2"> {errors.rentabilidade?.message}</p>
                        )}
                    </div>
                    <div className="flex flex-col max-w-[13rem]">
                        <Input label="Liquidez" variant="bordered" {...register('liquidez')} placeholder="Insira a liquidez" />
                        {errors.liquidez && (
                        <p className="text-xs italic text-red-500 mt-2"> {errors.liquidez?.message}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    <Button  variant="outlied" isIconOnly className="h-full" type='submit'>
                        <AddBoxIcon />
                    </Button>
                </div>
            </form>
            <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
                <div className="flex h-[100%] w-[100%] items-center justify-center">
                    <Spinner color="white"/>
                </div>
            </div>
            <DefaultSnackbar props={snackbarProps} setProps={setSnackbarProps} />
        </main>
    )
}