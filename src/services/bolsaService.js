import BolsaClientInstance from "@/clients/bolsaClient"
import { STATUS_OKAY } from "@/utils/constants"
const token = process.env.BRAPI_TOKEN
const respostaPrecoKey = 'regularMarketPrice'
const bolsaService = {
    endpoint: 'quote',
    get: (ticker, token) => `${bolsaService.endpoint}/${ticker}?token=${token}`
}

function obterPrecoAtivo (ticker) {
    return BolsaClientInstance.get(bolsaService.get(ticker, token))
}

export async function handleObterPrecoAtivo (ticker, successCallback, errorCallback) {
    try {
        const resposta = await obterPrecoAtivo(ticker)
        console.log(resposta)
        if (resposta.status == STATUS_OKAY && resposta.data.results.length > 0) {
            successCallback({ticker, preco: resposta.data.results[0][respostaPrecoKey]})
        }
    } catch (error) {
        errorCallback(error)
    }
}

