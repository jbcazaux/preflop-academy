export const xyBySeatNumber = (seatNumber: number, centerX: number, centerY: number, radius: number, ratio: number) => {
  const coefByPosition = [6, 5, 3, 2, 1, -1]
  const p = (coefByPosition[seatNumber % 6] * Math.PI) / 4
  const x = centerX + radius * Math.cos(p)
  const y = centerY - ratio * radius * Math.sin(p)

  return [x, y]
}
