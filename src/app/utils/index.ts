export function calculateMagnitudeColor(magnitude: number): string {
  if (magnitude < 4.5) {
    return 'bg-green-500';
  } else if (magnitude <= 6) {
    return 'bg-yellow-400';
  } else {
    return 'bg-red-600';
  }
}

export function convertMagnitudeType(magType: string = '') {
  // Valores posibles: md, ml, ms, mw, me, mi, mb, mlg
  switch (magType) {
    case 'md':
      return 'Magnitud de duración';
    case 'ml':
      return 'Magnitud local';
    case 'ms':
      return 'Magnitud superficial';
    case 'mw':
      return 'Magnitud de momento';
    case 'me':
      return 'Magnitud de energía';
    case 'mi':
      return 'Magnitud de intensidad';
    case 'mb':
      return 'Magnitud de onda corporal';
    case 'mlg':
      return 'Magnitud local de Groningen';
    default:
      return 'Magnitud desconocida';
  }
}
