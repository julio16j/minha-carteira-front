"use client"

import React, { useState } from "react"
import {Spinner} from "@nextui-org/react"
import { useRouter } from 'next/navigation'

import { handleNovoFii } from "@/services/fiiService"
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import { FII_INSERIDO_SUCESSO, FII_FALHA_INSERIR } from "@/utils/constants"
import FiiForm from "../fiiForm"

export default function NovaFii () {

    const [loading, setLoading] = useState('hidden')
    const [snackbarProps, setSnackbarProps] = useState({open: false, message: FII_INSERIDO_SUCESSO})
    const router = useRouter()

    function adicionar (data) {
        setLoading('')
        handleNovoFii(data, successCallback, errorCallback)
    }
    
    function errorCallback(error) {
        console.log(error)
        setLoading('hidden')
        setSnackbarProps({open: true, message: FII_FALHA_INSERIR})
    }

    function successCallback () {
        setLoading('hidden')
        setSnackbarProps({open: true, message: FII_INSERIDO_SUCESSO})
        router.push('/fiis')
    }

    return (
        <main className="dark text-foreground bg-background p-4 h-screen">
            <div className="flex justify-center p-16">
                <h1 className="text-3xl text-center">Adicionar Novo Fii</h1>
            </div>
            <FiiForm submitCallback={adicionar} />
            <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
                <div className="flex h-[100%] w-[100%] items-center justify-center">
                    <Spinner color="white"/>
                </div>
            </div>
            <DefaultSnackbar props={snackbarProps} setProps={setSnackbarProps} />
        </main>
    )
}