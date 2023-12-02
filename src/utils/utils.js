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
