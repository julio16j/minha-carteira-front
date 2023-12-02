"use client"

import React, { useState, useEffect } from "react"
import {Spinner} from "@nextui-org/react"
import { useRouter } from 'next/navigation'

import CaixaForm from "../caixaForm";
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import { CAIXA_INSERIDO_SUCESSO, CAIXA_FALHA_INSERIR } from "@/utils/constants"
import { handleNovoCaixa, handleObterCaixaPorId } from "@/services/caixaService"

export default function EditarCaixa ({params: {idCaixa}}) {
    const [loading, setLoading] = useState('hidden')
    const [snackbarProps, setSnackbarProps] = useState({open: false, message: CAIXA_INSERIDO_SUCESSO})
    const [caixaObtido, setCaixaObtido] = useState({})
    const [updateForm, setUpdateForm] = useState(false)
    const router = useRouter()
    
    function adicionar (data) {
        setLoading('')
        handleNovoCaixa(data, saveSuccessCallback, saveErrorCallback)
    }
    
    function saveErrorCallback(error) {
        console.log(error)
        setLoading('hidden')
        setSnackbarProps({open: true, message: CAIXA_FALHA_INSERIR})
    }

    function saveSuccessCallback () {
        setLoading('hidden')
        setSnackbarProps({open: true, message: CAIXA_INSERIDO_SUCESSO})
        router.push('/caixa')
    }

    function getErrorCallback(error) {
        console.log(error)
        setLoading('hidden')
    }

    function getSuccessCallback (caixa) {
        setLoading('hidden')
        setCaixaObtido({...caixaObtido, ...caixa})
        setUpdateForm(true)
    }

    useEffect(() => {
        setLoading('')
        handleObterCaixaPorId(idCaixa, getSuccessCallback, getErrorCallback)
    }, [])

    return (
        <main className="dark text-foreground bg-background p-4 h-screen">
            <div className="flex justify-center p-16">
                <h1 className="text-3xl text-center">Editar Caixa</h1>
            </div>
            <CaixaForm submitCallback={adicionar} initialValues={caixaObtido} updateValue={updateForm} setUpdateFalse={()=>setUpdateForm(false)} />
            <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
                <div className="flex h-[100%] w-[100%] items-center justify-center">
                    <Spinner color="white"/>
                </div>
            </div>
            <DefaultSnackbar props={snackbarProps} setProps={setSnackbarProps} />
        </main>
    )
}