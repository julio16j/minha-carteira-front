const mockCaixaRows = [
    {
      id: 1,
      nome: 'Saldo Clear',
      valor: 10,
      rentabilidade: 0,
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

export async function listarCaixa () {
    return mockCaixaRows
}

export async function deleteCaixa (id) {
    return id
}
