const mocFiisRows = [
  {
    id: 1,
    ticker: 'MXRF11',
    preco: 10.5,
    quantidade: 4000,
    total:  42000,
    lucro: 0.05,
    precoMedio: 10,
    nota: 10,
    setor: 'PAPEL',
    yield: 13.11
  }, {
    id: 2,
    ticker: 'IRDM11',
    preco: 77,
    quantidade: 800,
    total:  61600,
    lucro: 0.1,
    precoMedio: 70,
    nota: 2,
    setor: 'PAPEL',
    yield: 13.46
  }, {
    id: 3,
    ticker: 'HGLG11',
    preco: 172.5,
    quantidade: 500,
    total:  86250,
    lucro: 0.15,
    precoMedio: 150,
    nota: 5,
    setor: 'LOGÍSTICA',
    yield: 9.15
  },
  ]

const mocFiisAporte = [
  {
    id: 1,
    ticker: 'MXRF11',
    preco: 10,
    quantidadeNova: 200,
    total:  2000
  }, {
    id: 2,
    ticker: 'IRDM11',
    preco: 70,
    quantidadeNova:30,
    total:  2100
  }, {
    id: 3,
    ticker: 'HGLG11',
    preco: 150,
    quantidadeNova: 20,
    total:  3000
  }
]

async function calcularNovoAporte (valor) {
  return mocFiisAporte
}

async function obteFiisPorId (id) {
  return mocFiisRows[0]
}
  
async function novoFii (fiis) {
  return
}

async function deletFiis (id) {
  return id
}

async function listaFiis () {
  return mocFiisRows
}

export async function handleNovoFii (data, successCallback, errorCallback) {
  try {
      await novoFii(data)
      successCallback()
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleObterFiiPorId (id, successCallback, errorCallback) {
  try {
      let fii = await obteFiisPorId(id)
      successCallback(fii)
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleCalcularNovoAporte (valor, successCallback, errorCallback) {
  try {
      let resultado = await calcularNovoAporte(valor)
      successCallback(resultado)
    } catch (error) {
      errorCallback(error)
    }
}

export async function handleListarFiis (successCallback, errorCallback ) {
  try {
    const listFiis = await listaFiis()
    successCallback(listFiis)
  } catch (error) {
    errorCallback(error)
  }
}

export async function handleDeleteFii (id,successCallback, errorCallback) {
  try {
    await deletFiis(id)
    successCallback(id)
  } catch (error) {
    errorCallback(error)
  }
}
