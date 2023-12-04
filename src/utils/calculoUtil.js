export function gerarResumo (data) {
    let resumo = {}
    const resultadoPreco = totalizarPreco(data)
    const resultadoYield = totalizarYield(data, resultadoPreco)
    resumo.total = resultadoPreco.total
    resumo.lucroTotal = (resultadoPreco.total - resultadoPreco.totalPrecoMedio) / resultadoPreco.totalPrecoMedio
    resumo.yield = (resultadoYield * 100).toFixed(2)
    resumo.rendaAnual = resultadoPreco.total * resultadoYield
    return resumo
  }

function totalizarYield(data, resultadoPreco) {
    return data.reduce(
        (totalizador, ativo) => {
            let totalAtivo = ativo.preco * ativo.quantidade
            totalizador += (ativo.yield / 100) * (totalAtivo / resultadoPreco.total)
            return totalizador
        },
        0
    )
}

function totalizarPreco(data) {
    return data.reduce(
        (totalizador, ativo) => {
            totalizador.totalPrecoMedio += ativo.precoMedio * ativo.quantidade;
            totalizador.total += ativo.preco * ativo.quantidade;
            return totalizador;
        },
        { totalPrecoMedio: 0, total: 0 }
    );
}

export function gerarDataPieChart (data) {
    let dataPieChart = [
        ['Seto', 'Total por setor']
    ]
    const resultadoFinal = data.reduce((lista, ativo) => {
        const indice = lista.findIndex(item => item[0] === ativo.setor);
        if (indice !== -1) {
          lista[indice][1] += ativo.quantidade * ativo.preco;
        } else {
          lista.push([ativo.setor, ativo.quantidade * ativo.preco ]);
        }
        return lista;
      }, []);
    
    return [...dataPieChart, ...resultadoFinal]
}

export function calculaLucro (novoPreco, precoMedio) {
    return (novoPreco-precoMedio) / precoMedio
}