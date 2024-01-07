export function formatDateHours(dataString) {
    const data = new Date(dataString);

    const opcoesDeFormato = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'America/Sao_Paulo', // Definindo o fuso horário para o Brasil
    };

    const dataFormatada = data.toLocaleString('pt-BR', opcoesDeFormato);
    return dataFormatada
}