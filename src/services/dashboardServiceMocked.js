const mockDashboard = {
  totalAplicado: 20000,
  totalBruto: 30000,
  lucroNominal: 10000,
  lucroPercentual: 0.5,
  totalAcoes: 15000,
  totalFiis: 10000,
  totalCaixa: 5000
}

async function obterDashboard () {
  return mockDashboard
}

export async function handleObterDashboard (successCallback, errorCallback) {
  try {
      let dashboard = await obterDashboard()
      successCallback(dashboard)
    } catch (error) {
      errorCallback(error)
    }
}
