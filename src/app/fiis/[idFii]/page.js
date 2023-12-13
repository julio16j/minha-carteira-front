"use client"

import React, { useState, useEffect } from "react"
import {Spinner} from "@nextui-org/react"
import { useRouter } from 'next/navigation'

import FiiForm from "../fiiForm";
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import { FII_EDITADO_SUCESSO, FII_FALHA_EDITAR } from "@/utils/constants"
import { handleAtualizarFii, handleObterFiiPorId } from "@/services/fiiService"

export default function EditarFii ({params: {idFii}}) {
    const [loading, setLoading] = useState('hidden')
    const [snackbarProps, setSnackbarProps] = useState({open: false, message: FII_EDITADO_SUCESSO})
    const [fiiObtido, setFiiObtido] = useState({})
    const [updateForm, setUpdateForm] = useState(false)
    const router = useRouter()
    
    function adicionar (data) {
        setLoading('')
        handleAtualizarFii(idFii, data, saveSuccessCallback, saveErrorCallback)
    }
    
    function saveErrorCallback(error) {
        console.log(error)
        setLoading('hidden')
        setSnackbarProps({open: true, message: FII_FALHA_EDITAR})
    }

    function saveSuccessCallback () {
        setLoading('hidden')
        setSnackbarProps({open: true, message: FII_EDITADO_SUCESSO})
        router.push('/fiis')
    }

    function getErrorCallback(error) {
        console.log(error)
        setLoading('hidden')
    }

    function getSuccessCallback (fii) {
        setLoading('hidden')
        setFiiObtido({...fiiObtido, ...fii})
        setUpdateForm(true)
    }

    useEffect(() => {
        setLoading('')
        handleObterFiiPorId(idFii, getSuccessCallback, getErrorCallback)
    }, [])

    return (
        <main className="dark text-foreground bg-background p-4 h-screen">
            <div className="flex justify-center p-16">
                <h1 className="text-3xl text-center">Editar Fii</h1>
            </div>
            <FiiForm submitCallback={adicionar} initialValues={fiiObtido} updateValue={updateForm} setUpdateFalse={()=>setUpdateForm(false)} />
            <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
                <div className="flex h-[100%] w-[100%] items-center justify-center">
                    <Spinner color="white"/>
                </div>
            </div>
            <DefaultSnackbar props={snackbarProps} setProps={setSnackbarProps} />
        </main>
    )
}