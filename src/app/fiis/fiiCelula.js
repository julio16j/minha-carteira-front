"use client"
import React from "react"
import { formatarParaBRL } from "@/utils/utils"
import { getKeyValue, Link, Button} from "@nextui-org/react"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { formatarLucro } from "@/utils/utils"
export default function CelulaFii ({item, columnKey, onDelete, editLink, onDock}) {
  if (columnKey == 'acoes') {
    return (
      <div>
        <Link className="cursor-pointer" href={editLink}>
          <EditIcon />
        </Link>
        <Link className="cursor-pointer" onClick={()=>onDelete(item)}>
          <DeleteIcon className="ml-1" />
        </Link>
        <Button variant="outlied" isIconOnly className="text-primary" onClick={()=>onDock(item)}>
          <FormatColorTextIcon />
        </Button>
      </div>
    )
  }
  if (columnKey == 'preco' || columnKey == 'total') {
    return (
      <div>{formatarParaBRL(getKeyValue(item, columnKey))}</div>
    )
  }

  if (columnKey == 'lucro') {
      return (
          <div>{formatarLucro(getKeyValue(item, columnKey))}</div>
      )
  }

  return <div>{getKeyValue(item, columnKey)}</div>
}