// For more accuracy, should be better to use a library
export const roundTwoDecimals = (number: number): number => {
  return Math.round(number * 100) / 100
}
