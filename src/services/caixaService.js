const mockCaixaRows = [
    {
      id: 1,
      nome: 'Saldo Clear',
      valor: 10,
      rentabilidade: '0',
      liquidez: 'D+1'
    }, {
      id: 2,
      nome: 'Tesouro',
      valor: 100,
      rentabilidade: '100% CDI',
      liquidez: 'Diária'
    }, {
      id: 3,
      nome: 'LCA XP',
      valor: 1000,
      rentabilidade: '90% CDI',
      liquidez: 'Diaria após 90 dias'
    },
  ]

  
async function obterCaixaPorId (id) {
  return mockCaixaRows[0]
}
  
async function novoCaixa (caixa) {
  return
}

async function deleteCaixa (id) {
  return id
}

async function listarCaixa () {
  return mockCaixaRows
}

export async function handleNovoCaixa (data, successCallback, errorCallback) {
  try {
      await novoCaixa(data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleObterCaixaPorId (id, successCallback, errorCallback) {
  try {
      let caixa = await obterCaixaPorId(id)
      successCallback(caixa)
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleListarCaixa (successCallback, errorCallback ) {
  try {
    const listaCaixa = await listarCaixa()
    successCallback(listaCaixa)
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
