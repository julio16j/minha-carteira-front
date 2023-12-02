"use client"

import React, { useState } from "react"
import {Spinner} from "@nextui-org/react"
import { useRouter } from 'next/navigation'

import { handleNovoCaixa } from "@/services/caixaService"
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import { CAIXA_INSERIDO_SUCESSO, CAIXA_FALHA_INSERIR } from "@/utils/constants"
import CaixaForm from "../caixaForm"

export default function NewCaixa () {

    const [loading, setLoading] = useState('hidden')
    const [snackbarProps, setSnackbarProps] = useState({open: false, message: CAIXA_INSERIDO_SUCESSO})
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
            <CaixaForm submitCallback={adicionar} />
            <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
                <div className="flex h-[100%] w-[100%] items-center justify-center">
                    <Spinner color="white"/>
                </div>
            </div>
            <DefaultSnackbar props={snackbarProps} setProps={setSnackbarProps} />
        </main>
    )
}