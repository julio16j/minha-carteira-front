import React, { useEffect } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button } from "@nextui-org/react";
import { acaoDockSchema } from "@/schemas/acaoDock";
export default function AcaoDock ({submitCallback, initialValues={}, updateValue = false, setUpdateFalse}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({resolver: zodResolver(acaoDockSchema)})
    
    useEffect(() => {
        if (updateValue) {
            reset(initialValues)
            setUpdateFalse()
        }
    }, [updateValue])
    if (initialValues.ticker) {
        return (
            <form onSubmit={handleSubmit(submitCallback)} className="flex pb-4 justify-center items-center flex-col gap-4">
                <div className="flex gap-4 flex-wrap justify-center flex-row">
                    <div className="flex flex-col max-w-[13rem]">
                        <Input readOnly label="Ticker" variant="bordered" {...register('ticker')} placeholder="Insira o ticker da ação" />
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
                        <Input type="number" label="Preço" step="0.01" variant="bordered" {...register('preco')} placeholder="Insira o preco" />
                        {errors.preco && (
                        <p className="text-xs italic text-red-500 mt-2"> {errors.preco?.message}</p>
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
}
