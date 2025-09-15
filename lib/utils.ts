export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(' ')
}

export function formatLatency(latencyMs: number): string {
  if (latencyMs < 1000) {
    return `${latencyMs.toFixed(0)}ms`
  }
  return `${(latencyMs / 1000).toFixed(2)}s`
}

export function formatTokenCount(tokens: number): string {
  if (tokens < 1000) {
    return tokens.toString()
  }
  return `${(tokens / 1000).toFixed(1)}k`
}

export function calculateCostSavings(hyperscalerCost: number, maraCost: number): number {
  return ((hyperscalerCost - maraCost) / hyperscalerCost) * 100
}