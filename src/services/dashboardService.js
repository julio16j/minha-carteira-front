import MinhaCarteiraClientInstance from "@/clients/minhaCarteiraClient"

const dashboardService = {
  endpoint: 'dashboard',
}


async function obterDashboard () {
  return MinhaCarteiraClientInstance.get(dashboardService.endpoint)
}

export async function handleObterDashboard (successCallback, errorCallback) {
  try {
      let dashboard = await obterDashboard()
      successCallback(dashboard.data)
    } catch (error) {
      errorCallback(error)
    }
}
