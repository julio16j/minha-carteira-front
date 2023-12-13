import MinhaCarteiraClientInstance from "@/clients/minhaCarteiraClient"

const caixaService = {
  endpoint: 'caixa',
  obterCaixaPorId: (id) => `${caixaService.endpoint}/${id}`,
  atualizarCaixa: (id) => `${caixaService.endpoint}/${id}`,
  deletarCaixa: (id) => `${caixaService.endpoint}/${id}`
}

async function obterCaixaPorId (id) {
  return MinhaCarteiraClientInstance.get(caixaService.obterCaixaPorId(id))
}
  
async function novoCaixa (caixa) {
  return MinhaCarteiraClientInstance.post(caixaService.endpoint, caixa)
}

async function atualizarCaixa (id, caixa) {
  return MinhaCarteiraClientInstance.put(caixaService.atualizarCaixa(id), caixa)
}

async function deleteCaixa (id) {
  return MinhaCarteiraClientInstance.delete(caixaService.deletarCaixa(id))
}

async function listarCaixa () {
  return MinhaCarteiraClientInstance.get(caixaService.endpoint)
}

export async function handleNovoCaixa (data, successCallback, errorCallback) {
  try {
      await novoCaixa(data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleAtualizarCaixa (id, data, successCallback, errorCallback) {
  try {
      await atualizarCaixa(id, data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleObterCaixaPorId (id, successCallback, errorCallback) {
  try {
      let resposta = await obterCaixaPorId(id)
      successCallback(resposta.data)
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleListarCaixa (successCallback, errorCallback ) {
  try {
    const resposta = await listarCaixa()
    successCallback(resposta.data)
  } catch (error) {
    errorCallback(error)
  }
}

export async function handleDeleteCaixa (id,successCallback, errorCallback) {
  try {
    await deleteCaixa(id)
    successCallback(id)
  } catch (error) {
    errorCallback(error)
  }
}
