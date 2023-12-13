"use client"

import React, { useState, useEffect } from "react"
import {Spinner} from "@nextui-org/react"
import { useRouter } from 'next/navigation'

import AcaoForm from "../acaoForm";
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import { ACAO_EDITADA_SUCESSO, ACAO_FALHA_EDITAR } from "@/utils/constants"
import { handleAtualizarAcao, handleObterAcaoPorId } from "@/services/acaoService"

export default function EditarAcao ({params: {idAcao}}) {
    const [loading, setLoading] = useState('hidden')
    const [snackbarProps, setSnackbarProps] = useState({open: false, message: ACAO_EDITADA_SUCESSO})
    const [acaoObtida, setAcaoObtido] = useState({})
    const [updateForm, setUpdateForm] = useState(false)
    const router = useRouter()
    
    function atualizar (data) {
        setLoading('')
        handleAtualizarAcao(idAcao, data, saveSuccessCallback, saveErrorCallback)
    }
    
    function saveErrorCallback(error) {
        console.log(error)
        setLoading('hidden')
        setSnackbarProps({open: true, message: ACAO_FALHA_EDITAR})
    }

    function saveSuccessCallback () {
        setLoading('hidden')
        setSnackbarProps({open: true, message: ACAO_EDITADA_SUCESSO})
        router.push('/acoes')
    }

    function getErrorCallback(error) {
        console.log(error)
        setLoading('hidden')
    }

    function getSuccessCallback (acao) {
        setLoading('hidden')
        setAcaoObtido({...acaoObtida, ...acao})
        setUpdateForm(true)
    }

    useEffect(() => {
        setLoading('')
        handleObterAcaoPorId(idAcao, getSuccessCallback, getErrorCallback)
    }, [])

    return (
        <main className="dark text-foreground bg-background p-4 h-screen">
            <div className="flex justify-center p-16">
                <h1 className="text-3xl text-center">Editar Ação</h1>
            </div>
            <AcaoForm submitCallback={atualizar} initialValues={acaoObtida} updateValue={updateForm} setUpdateFalse={()=>setUpdateForm(false)} />
            <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
                <div className="flex h-[100%] w-[100%] items-center justify-center">
                    <Spinner color="white"/>
                </div>
            </div>
            <DefaultSnackbar props={snackbarProps} setProps={setSnackbarProps} />
        </main>
    )
}