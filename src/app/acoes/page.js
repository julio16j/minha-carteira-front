"use client"

import React, { useState, useEffect } from "react"
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link, Card, CardHeader, CardBody, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react"
import AddBoxIcon from '@mui/icons-material/AddBox'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import DefaultSnackbar from "@/utils/components/defaultSnackbar"
import {Spinner} from "@nextui-org/react"
import { ACAO_DELETADO_SUCESSO, APORTE_SUCESSO } from "@/utils/constants"
import { formatarParaBRL, formatarLucro } from "@/utils/utils"
import CelulaAcao from "./acaoCelula"
import { Chart } from "react-google-charts"
import ToggleVisible from "@/utils/components/toggleVisible"
import { gerarResumo, gerarDataPieChart, calculaLucro } from "@/utils/calculoUtil"
import { handleListarAcoes, handleDeleteAcao, handleMakeDock } from "@/services/acaoService"
import { handleObterPrecoAtivo } from "@/services/bolsaService"
import AcaoDock from "./acaoDock"

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

export default function Acoes() {

  const [rows, setRows] = useState([])
  const [selectedDock, setSelectedDock] = useState({})
  const [updateDock, setUpdateDock] = useState(false)
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [resumo, setResumo] = useState({})
  const [loading, setLoading] = useState('hidden')
  const [snackbarProps, setSnackbarProps] = useState({open: false, message: ACAO_DELETADO_SUCESSO})

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
    console.log(listaAtualizada)
    setRows([...listaAtualizada])
    setResumo(gerarResumo(listaAtualizada))
    setDataPieChart([...gerarDataPieChart(listaAtualizada)])
  }

  function successObterAcoesCallback (data) {
    setLoading('hidden')
    setRows([...data])
    setResumo(gerarResumo(data))
    setDataPieChart([...gerarDataPieChart(data)])
    atualizarPrecoAtivos(data)
  }

  function errorCallback(error) {
    setLoading('hidden')
    console.log(error)
  }

  function successDeleteAcoesCallback (id) {
    setLoading('hidden')
    setSnackbarProps({open: true, message: ACAO_DELETADO_SUCESSO})
    console.log(id)
    handleListarAcoes(successObterAcoesCallback, errorCallback)
  }

  function onDelete(item) {
    setLoading('')
    handleDeleteAcao(item.id, successDeleteAcoesCallback, errorCallback)
  }

  function onDock (item) {
    setSelectedDock({...item, quantidade: 0, preco:0})
    setUpdateDock(true)
    onOpen()
  }

  function makeDock (item) {
    setLoading('')
    onClose()
    handleMakeDock(item, successMakeDock, errorCallback)
  }

  function successMakeDock () {
    setLoading('hidden')
    setSnackbarProps({open: true, message: APORTE_SUCESSO})
    handleListarAcoes(successObterAcoesCallback, errorCallback)
  } 

  useEffect(() => {
    setLoading('')
    handleListarAcoes(successObterAcoesCallback, errorCallback)
  }, []);

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-4 md:p-16">
        <h1 className="text-3xl">Ações</h1>
      </div>
      <Modal className="dark text-foreground bg-background" isOpen={isOpen} onClose={onClose} style={{backgroundColor: '#181818'}}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Novo Aporte</ModalHeader>
          <ModalBody>
            <AcaoDock submitCallback={makeDock} initialValues={selectedDock} updateValue={updateDock} setUpdateFalse={()=>setUpdateDock(false)}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="w-full">
        <Table aria-label="Tabela de ações" className="max-h-60vh">
          <TableHeader columns={columns} style={{display: 'flex', justifyContent: 'space-between'}}>
            {(column) => <TableColumn className="text-lg" key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody emptyContent="Sem dados" >
              {rows.map((row) =>
              <TableRow key={row.id}>
                {(columnKey) => <TableCell>
                    <CelulaAcao item={row} columnKey={columnKey} editLink={`acoes/${row.id}`} onDelete={onDelete} onDock={onDock} />
                  </TableCell>
                }
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex mt-4 w-full px-4 justify-center gap-4 xl:px-52 xl:justify-between">
        <Link className="cursor-pointer" href="acoes/nova-acao">
          Adicionar
          <AddBoxIcon className="ml-1" />
        </Link>
        <Link className="cursor-pointer" href="acoes/novo-aporte">
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
                  <p>Renda Anual:</p>
                  {formatarParaBRL(resumo.rendaAnual)}
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
