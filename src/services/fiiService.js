import MinhaCarteiraClientInstance from "@/clients/minhaCarteiraClient"
import { TIPO_ATIVO_FII } from "@/utils/constants"

const fiiService = {
  endpoint: 'ativo',
  listarFiis: () => `${fiiService.endpoint}/tipo-ativo/${TIPO_ATIVO_FII}`,
  obterFiiPorId: (id) => `${fiiService.endpoint}/${id}`,
  atualizarFii: (id) => `${fiiService.endpoint}/${id}`,
  deletarFii: (id) => `${fiiService.endpoint}/${id}`,
  calcularNovoAporte: (valor) => `${fiiService.endpoint}/calcular-aporte/${valor}/${TIPO_ATIVO_FII}`,
  makeDock: () => `${fiiService.endpoint}/novo-aporte`
}

async function calcularNovoAporte (valor) {
  return MinhaCarteiraClientInstance.get(fiiService.calcularNovoAporte(valor))
}

async function obterFiiPorId (id) {
  return MinhaCarteiraClientInstance.get(fiiService.obterFiiPorId(id))
}
  
async function novaFii (fii) {
  return MinhaCarteiraClientInstance.post(fiiService.endpoint, {...fii, tipoAtivo: TIPO_ATIVO_FII})
}

async function atualizarFii (id, fii) {
  return MinhaCarteiraClientInstance.put(fiiService.atualizarFii(id), {...fii, tipoAtivo: TIPO_ATIVO_FII})
}

async function deletarFii (id) {
  return MinhaCarteiraClientInstance.delete(fiiService.deletarFii(id))
}

function listarFiis () {
  return MinhaCarteiraClientInstance.get(fiiService.listarFiis())
}

async function makeDock (item) {
  return MinhaCarteiraClientInstance.put(fiiService.makeDock(), {...item})
}

export async function handleNovoFii (data, successCallback, errorCallback) {
  try {
      await novaFii(data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleAtualizarFii (id, data, successCallback, errorCallback) {
  try {
      await atualizarFii(id, data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleObterFiiPorId (id, successCallback, errorCallback) {
  try {
      let resposta = await obterFiiPorId(id)
      successCallback(resposta.data)
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleCalcularNovoAporte (valor, successCallback, errorCallback) {
  try {
      let resultado = await calcularNovoAporte(valor)
      successCallback(resultado.data)
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleListarFiis (successCallback, errorCallback ) {
  try {
    const resposta = await listarFiis()
    successCallback(resposta.data)
  } catch (error) {
    errorCallback(error)
  }
}

export async function handleDeleteFii (id,successCallback, errorCallback) {
  try {
    await deletarFii(id)
    successCallback(id)
  } catch (error) {
    errorCallback(error)
  }
}

export async function handleMakeDock (item, successCallback, errorCallback) {
  try {
    await makeDock(item)
    successCallback()
  } catch (error) {
    errorCallback(error)
  }
}
