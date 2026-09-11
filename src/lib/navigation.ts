export function canUseHistoryBack(state: unknown): boolean {
  if (typeof state !== 'object' || state === null || !('idx' in state)) return false
  return typeof state.idx === 'number' && state.idx > 0
}
