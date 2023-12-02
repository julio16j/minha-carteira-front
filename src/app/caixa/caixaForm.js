import React, { useEffect } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@nextui-org/react";
import { caixaSchema } from "@/schemas/caixa";
export default function CaixaForm ({submitCallback, initialValues={}, updateValue = false, setUpdateFalse}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({resolver: zodResolver(caixaSchema)})
    
    useEffect(() => {
        if (updateValue) {
            reset(initialValues)
            setUpdateFalse()
        }
    }, [updateValue])

    return (
        <form onSubmit={handleSubmit(submitCallback)} className="flex pb-4 justify-center items-center flex-col sm:flex-row gap-4">
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
    )
}