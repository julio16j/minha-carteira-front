"use client"

import React, { useState, useEffect } from "react"
import { formatarParaBRL, formatarLucro } from "@/utils/utils"
import { Chart } from "react-google-charts"
import ToggleVisible from "@/utils/components/toggleVisible"
import { handleObterDashboard } from "@/services/dashboardService"
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react"

export default function Dashboard() {
  const [dashboard, setDasboard] = useState({})
  const [dataPieChart, setDataPieChart] = useState([])
  const optionsPieChart = {
    title: "Percentual por ativo",
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
  }
  
  function gerarDataPieChart (data) {
    let arrayData = [['Ativos', 'Total por Ativos'], ['Ações', data.totalAcoes], ['Fiis', data.totalFiis], ['Caixa', data.totalCaixa]]
    setDataPieChart(arrayData)
  }

  function successCallback (data) {
    setDasboard(data)
    gerarDataPieChart(data)
    
  }

  function errorCallback (error) {
    console.log(error)
  }

  useEffect(() => {
    handleObterDashboard(successCallback, errorCallback)
  }, [])

  return (
    <main className="dark text-foreground bg-background p-4 h-screen">
      <div className="flex justify-center p-4 md:p-16">
        <h1 className="text-3xl">Dashboard</h1>
      </div>
      <div className="flex gap-4 flex-wrap justify-center flex-row h-[13.25rem] md:h-[15.25rem] mt-4 justify-center">
        <ToggleVisible visible={dashboard.totalAplicado}>
          <Card className="w-[25rem] h-[100%]">
            <CardHeader className="flex gap-3">
              <h1 className="text-xl">Total</h1>
            </CardHeader>
            <Divider/>
            <CardBody className="flex-col">
              <div className="pb-3">
                <div className="flex justify-between">
                  <div>
                    Total Aplicado:
                  </div>
                  <div>
                    {formatarParaBRL(dashboard.totalAplicado)}
                  </div>
                </div>
                <Divider/>
              </div>
              <div className="pb-3">
                <div className="flex flex-row justify-between">
                  <p>Total Bruto: </p>{formatarParaBRL(dashboard.totalBruto)}
                </div>
                <Divider/>
              </div>
              <div className="pb-3">
                <div className="flex justify-between">
                  <p>Lucro%:</p>
                  {formatarLucro(dashboard.lucroPercentual)}
                </div>
                <Divider/>
              </div>
              <div>
                <div className="flex justify-between">
                  <p>Lucro R$:</p>
                  {formatarParaBRL(dashboard.lucroNominal)}
                </div>
                <Divider/>
              </div>
            </CardBody>
          </Card>
        </ToggleVisible>
        <ToggleVisible visible={dashboard.totalAplicado}>
          <Card className="w-[25rem] h-[100%]">
            <CardHeader className="flex gap-3">
              <h1 className="text-xl">Total Por Ativo</h1>
            </CardHeader>
            <Divider/>
            <CardBody className="flex-col">
              <div className="pb-3">
                <div className="flex justify-between">
                  <div>
                    Ações:
                  </div>
                  <div>
                    {formatarParaBRL(dashboard.totalAcoes)}
                  </div>
                </div>
                <Divider/>
              </div>
              <div className="pb-3">
                <div className="flex justify-between">
                    <div>
                      Fiis:
                    </div>
                    <div>
                      {formatarParaBRL(dashboard.totalFiis)}
                    </div>
                  </div>
                  <Divider/>
                </div>
              <div className="pb-3">
                <div className="flex justify-between">
                  <div>
                    Caixa:
                  </div>
                  <div>
                    {formatarParaBRL(dashboard.totalCaixa)}
                  </div>
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
    </main>
  )
}
