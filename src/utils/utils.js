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
    let lucroPercentual = (lucro * 100).toFixed(2)
    if (lucro > 0) {
        return <p className="text-success">{lucroPercentual + '%'}</p>
    }

    if (lucro < 0) {
        return <p className="text-danger">{lucroPercentual + '%'}</p>
    }

    return <p>{lucroPercentual + '%'}</p>

}
