import React, { useEffect } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@nextui-org/react";
import { acaoSchema } from "@/schemas/acao";
export default function AcaoForm ({submitCallback, initialValues={}, updateValue = false, setUpdateFalse}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({resolver: zodResolver(acaoSchema)})
    
    useEffect(() => {
        if (updateValue) {
            reset(initialValues)
            setUpdateFalse()
        }
    }, [updateValue])

    return (
        <form onSubmit={handleSubmit(submitCallback)} className="flex pb-4 justify-center items-center flex-col gap-4">
            <div className="flex gap-4 flex-wrap justify-center flex-row">
                <div className="flex flex-col max-w-[13rem]">
                    <Input label="Ticker" variant="bordered" {...register('ticker')} placeholder="Insira o ticker da ação" />
                    {errors.ticker && (
                    <p className="text-xs italic text-red-500 mt-2"> {errors.ticker?.message}</p>
                    )}
                </div>
                <div className="flex flex-col max-w-[13rem]">
                    <Input type="number" label="Quantidade" variant="bordered" {...register('quantidade')} placeholder="Insira a quantidade" />
                    {errors.quantidade && (
                    <p className="text-xs italic text-red-500 mt-2"> {errors.quantidade?.message}</p>
                    )}
                </div>
                <div className="flex flex-col max-w-[13rem]">
                    <Input type="number" label="Preço médio" step="0.01" variant="bordered" {...register('precoMedio')} placeholder="Insira o precoMedio" />
                    {errors.precoMedio && (
                    <p className="text-xs italic text-red-500 mt-2"> {errors.precoMedio?.message}</p>
                    )}
                </div>
            </div>
            <div className="flex gap-4 flex-wrap justify-center flex-row">
                <div className="flex flex-col max-w-[13rem]">
                    <Input type="number" label="Nota" variant="bordered" {...register('nota')} placeholder="Insira a nota da ação" />
                    {errors.nota && (
                    <p className="text-xs italic text-red-500 mt-2"> {errors.nota?.message}</p>
                    )}
                </div>
                <div className="flex flex-col max-w-[13rem]">
                    <Input type="number" step="0.01" label="Dividend Yield" variant="bordered" {...register('yield')} placeholder="Insira o yield" endContent={'%'} />
                    {errors.yield && (
                    <p className="text-xs italic text-red-500 mt-2"> {errors.yield?.message}</p>
                    )}
                </div>
                <div className="flex flex-col max-w-[13rem]">
                    <Input label="Setor" variant="bordered" {...register('setor')} placeholder="Insira o setor" />
                    {errors.setor && (
                    <p className="text-xs italic text-red-500 mt-2"> {errors.setor?.message}</p>
                    )}
                </div>
            </div>
            <div className="flex items-center">
                <Button  variant="outlied" isIconOnly className="h-full" type='submit'>
                    <AddBoxIcon />
                </Button>
            </div>
        </form>
    )
}