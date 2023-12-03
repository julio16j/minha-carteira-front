const mockAcoesRows = [
  {
    id: 1,
    ticker: 'WEGE3',
    preco: 30,
    quantidade: 400,
    total:  12000,
    lucro: 0.05,
    precoMedio: 30,
    nota: 10,
    setor: 'INDUSTRIAL',
    yield: 10.5
  }, {
    id: 2,
    ticker: 'ITSA4',
    preco: 10,
    quantidade: 800,
    total:  8000,
    lucro: 0,
    precoMedio: 10,
    nota: 2,
    setor: 'BANCO'
  }, {
    id: 3,
    ticker: 'LREN3',
    preco: 15,
    quantidade: 500,
    total:  7500,
    lucro: -0.05,
    precoMedio: 15,
    nota: 5,
    setor: 'VAREJO'
  },
  ]

  
async function obterAcoesPorId (id) {
  return mockAcoesRows[0]
}
  
async function novaAcao (acoes) {
  return
}

async function deleteAcoes (id) {
  return id
}

async function listarAcoes () {
  return mockAcoesRows
}

export async function handleNovaAcao (data, successCallback, errorCallback) {
  try {
      await novaAcao(data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleObterAcaoPorId (id, successCallback, errorCallback) {
  try {
      let acao = await obterAcoesPorId(id)
      successCallback(acao)
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleListarAcoes (successCallback, errorCallback ) {
  try {
    const listaAcoes = await listarAcoes()
    successCallback(listaAcoes)
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
