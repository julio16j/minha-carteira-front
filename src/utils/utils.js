export function handleEnterKey (event, callback) {
    if (event.key === 'Enter') {
    callback()
    }
}

export function formatarParaBRL(numero) {
    const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
    });

    return formatter.format(numero);
}

export function formatarLucro(lucro) {
    let lucroPercentual = lucro * 100
    if (lucro > 0) {
        return <div className="text-success">{lucroPercentual + '%'}</div>
    }

    if (lucro < 0) {
        return <div className="text-danger">{lucroPercentual + '%'}</div>
    }

    return <div>{lucroPercentual + '%'}</div>

}
