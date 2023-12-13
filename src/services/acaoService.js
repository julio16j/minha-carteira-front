import MinhaCarteiraClientInstance from "@/clients/minhaCarteiraClient"
import { TIPO_ATIVO_ACAO } from "@/utils/constants"

const acaoService = {
  endpoint: 'ativo',
  listarAcoes: () => `${acaoService.endpoint}/tipo-ativo/${TIPO_ATIVO_ACAO}`,
  obterAcaoPorId: (id) => `${acaoService.endpoint}/${id}`,
  atualizarAcao: (id) => `${acaoService.endpoint}/${id}`,
  deletarAcao: (id) => `${acaoService.endpoint}/${id}`,
  calcularNovoAporte: (valor) => `${acaoService.endpoint}/calcular-aporte/${valor}/${TIPO_ATIVO_ACAO}`,
}

async function calcularNovoAporte (valor) {
  return MinhaCarteiraClientInstance.get(acaoService.calcularNovoAporte(valor))
}

async function obterAcaoPorId (id) {
  return MinhaCarteiraClientInstance.get(acaoService.obterAcaoPorId(id))
}
  
async function novaAcao (acao) {
  return MinhaCarteiraClientInstance.post(acaoService.endpoint, {...acao, tipoAtivo: TIPO_ATIVO_ACAO})
}

async function atualizarAcao (id, acao) {
  return MinhaCarteiraClientInstance.put(acaoService.atualizarAcao(id), {...acao, tipoAtivo: TIPO_ATIVO_ACAO})
}

async function deleteAcoes (id) {
  return MinhaCarteiraClientInstance.delete(acaoService.deletarAcao(id))
}

function listarAcoes () {
  return MinhaCarteiraClientInstance.get(acaoService.listarAcoes())
}

export async function handleNovaAcao (data, successCallback, errorCallback) {
  try {
      await novaAcao(data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleAtualizarAcao (id, data, successCallback, errorCallback) {
  try {
      await atualizarAcao(id, data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleObterAcaoPorId (id, successCallback, errorCallback) {
  try {
      let resposta = await obterAcaoPorId(id)
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

export async function handleListarAcoes (successCallback, errorCallback ) {
  try {
    const resposta = await listarAcoes()
    successCallback(resposta.data)
  } catch (error) {
    errorCallback(error)
  }
}

export async function handleDeleteAcao (id,successCallback, errorCallback) {
  try {
    await deleteAcoes(id)
    successCallback(id)
  } catch (error) {
    errorCallback(error)
  }
}
