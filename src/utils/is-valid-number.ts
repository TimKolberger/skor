export function isValidNumber(diff: number | null | undefined): diff is number {
  return diff !== undefined && diff !== null && !Number.isNaN(diff)
}
