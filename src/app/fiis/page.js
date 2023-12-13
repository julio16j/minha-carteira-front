"use client"

import React, { useState, useEffect } from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link, Card, CardHeader, CardBody, Divider } from "@nextui-org/react"
import AddBoxIcon from '@mui/icons-material/AddBox'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import {Spinner} from "@nextui-org/react"
import { FII_DELETADO_SUCESSO } from "@/utils/constants"
import { formatarParaBRL, formatarLucro } from "@/utils/utils"
import CelulaFii from "./fiiCelula"
import { Chart } from "react-google-charts"
import ToggleVisible from "@/utils/components/toggleVisible"
import { gerarResumoFii, gerarDataPieChart, calculaLucro } from "@/utils/calculoUtil"
import { handleListarFiis, handleDeleteFii } from "@/services/fiiService"
import { handleObterPrecoAtivo } from "@/services/bolsaService"

const columns = [
  {
    key: "ticker",
    label: "Ticker",
  },
  {
    key: "preco",
    label: "Preço",
  },
  {
    key: "quantidade",
    label: "Quantidade",
  },
  {
    key: "total",
    label: "Total",
  },
  {
    key: "lucro",
    label: "Lucro",
  },
  {
    key: "acoes",
    label: "Ações"
  }
]

export default function Fiis() {

  const [rows, setRows] = useState([])
  const [resumo, setResumo] = useState({})
  const [loading, setLoading] = useState('hidden')
  const [snackbarProps, setSnackbarProps] = useState({open: false, message: FII_DELETADO_SUCESSO})

  const [dataPieChart, setDataPieChart] = useState([])
  const optionsPieChart = {
    title: "Percentual por setor",
    is3D: true,
    backgroundColor: '#18181b',
    titleTextStyle: {
      color: '#ECEDEE',
      fontSize: 18,
      bold: false
    },
    legend: {
      textStyle: {
        color: '#ECEDEE'
      }
    }
  };

  function atualizarPrecoAtivos (ativos) {
    console.log(ativos)
    ativos.forEach(ativo => {
      handleObterPrecoAtivo(ativo.ticker, (resultado) =>successObterPrecoAtivoCallback(resultado, ativos), errorCallback)
    })
  }

  function successObterPrecoAtivoCallback ({ticker, preco}, ativos) {
    const listaAtualizada = ativos.map(ativo => {
      if (ativo.ticker != ticker) return ativo
      ativo.preco = preco
      ativo.total = ativo.quantidade * preco
      ativo.lucro = calculaLucro(preco, ativo.precoMedio)
      return ativo
    })
    setRows([...listaAtualizada])
    setResumo(gerarResumoFii(listaAtualizada))
    setDataPieChart([...gerarDataPieChart(listaAtualizada)])
  }

  function successObterFiisCallback (data) {
    setLoading('hidden')
    setRows([...data])
    setResumo(gerarResumoFii(data))
    setDataPieChart([...gerarDataPieChart(data)])
    atualizarPrecoAtivos(data)
  }

  function errorCallback(error) {
    setLoading('hidden')
    console.log(error)
  }

  function successDeleteFiisCallback (id) {
    setLoading('hidden')
    setSnackbarProps({open: true, message: FII_DELETADO_SUCESSO})
    handleListarFiis(successObterFiisCallback, errorCallback)
  }

  function onDelete(item) {
    setLoading('')
    handleDeleteFii(item.id, successDeleteFiisCallback, errorCallback)
  }

  useEffect(() => {
    setLoading('')
    handleListarFiis(successObterFiisCallback, errorCallback)
  }, []);

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-4 md:p-16">
        <h1 className="text-3xl">Fiis</h1>
      </div>
      <div className="w-full">
        <Table aria-label="Tabela de fiis" className="max-h-60vh">
          <TableHeader columns={columns} style={{display: 'flex', justifyContent: 'space-between'}}>
            {(column) => <TableColumn className="text-lg" key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody emptyContent="Sem dados" >
              {rows.map((row) =>
              <TableRow key={row.id}>
                {(columnKey) => <TableCell>
                    <CelulaFii item={row} columnKey={columnKey} editLink={`fiis/${row.id}`} onDelete={onDelete} />
                  </TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex mt-4 w-full px-4 justify-center gap-4 xl:px-52 xl:justify-between">
        <Link className="cursor-pointer" href="fiis/novo-fii">
          Adicionar
          <AddBoxIcon className="ml-1" />
        </Link>
        <Link className="cursor-pointer" href="fiis/novo-aporte">
          Novo Aporte
          <MonetizationOnIcon className="ml-1" />
        </Link>
      </div>
      <div className="flex gap-4 flex-wrap justify-center flex-row h-[13.25rem] md:h-[15.25rem] mt-4 md:px-52 xl:justify-between">
        <ToggleVisible visible={resumo.total}>
          <Card className="w-[25rem] h-[100%]">
            <CardHeader className="flex gap-3">
              <h1 className="text-xl">Resumo</h1>
            </CardHeader>
            <Divider/>
            <CardBody className="flex-col">
              <div className="pb-3">
                <div className="flex justify-between">
                  <div>
                    Total:
                  </div>
                  <div>
                    {formatarParaBRL(resumo.total)}
                  </div>
                </div>
                <Divider/>
              </div>
              <div className="pb-3">
                <div className="flex flex-row justify-between">
                  <p>Lucro Total: </p>{formatarLucro(resumo.lucroTotal)}
                </div>
                <Divider/>
              </div>
              <div className="pb-3">
                <div className="flex justify-between">
                  <p>Yield Médio:</p>
                  {resumo.yield + '%'}
                </div>
                <Divider/>
              </div>
              <div>
                <div className="flex justify-between">
                  <p>Renda Mensal:</p>
                  {formatarParaBRL(resumo.rendaMensal)}
                </div>
                <Divider/>
              </div>
            </CardBody>
          </Card>
        </ToggleVisible>
        <ToggleVisible visible={dataPieChart.length}>
          <Card className="w-[25rem]">
            <Chart
              className="text-white"
              chartType="PieChart"
              data={dataPieChart}
              options={optionsPieChart}
              height={"100%"}
            />
          </Card>
        </ToggleVisible>
      </div>
      <div className={`absolute h-screen w-[95vw] top-0 bg-gray ${loading}`}>
        <div className="flex h-[100%] w-[100%] items-center justify-center">
          <Spinner color="white"/>
        </div>
      </div>
      <DefaultSnackbar props={snackbarProps} setProps={setSnackbarProps} />
    </main>
  )
}
