export function getRelativeTimeString(
  date: Date | number,
  lang = 'pt-BR', // Definindo um valor padrão mais seguro
): string {
  try {
    // Verificação de segurança para o parâmetro date
    if (!date) return ''

    // Tratamento para valores numéricos inválidos
    const timeMs =
      typeof date === 'number'
        ? date
        : date instanceof Date
          ? date.getTime()
          : new Date(date).getTime()

    // Verificação adicional para valores inválidos
    if (isNaN(timeMs)) return ''

    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

    // Se a diferença for zero (agora mesmo)
    if (deltaSeconds === 0) return 'agora mesmo'

    const cutoffs = [
      60,
      3600,
      86400,
      86400 * 7,
      86400 * 30,
      86400 * 365,
      Infinity,
    ]
    const units: Intl.RelativeTimeFormatUnit[] = [
      'second',
      'minute',
      'hour',
      'day',
      'week',
      'month',
      'year',
    ]

    const unitIndex = cutoffs.findIndex(
      (cutoff) => cutoff > Math.abs(deltaSeconds),
    )

    // Fallback caso unitIndex seja -1 (não deveria acontecer com Infinity no final)
    if (unitIndex === -1) return ''

    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1
    const value = Math.floor(deltaSeconds / divisor)

    // Verificação final para garantir que o valor é finito
    if (!isFinite(value)) return ''

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
    return rtf.format(value, units[unitIndex])
  } catch (error) {
    console.error('Error in getRelativeTimeString:', error)
    return ''
  }
}
