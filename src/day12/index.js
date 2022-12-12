import run from "aocrunner"

const example1 = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.split(""))

const ELEVATIONS = "abcdefghijklmnopqrstuvwxyz"

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let startPosition
  let endPosition
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (startPosition && endPosition) break
      if (input[row][col] === "S") {
        startPosition = [row, col]
        continue
      }
      if (input[row][col] === "E") {
        endPosition = [row, col]
        continue
      }
    }
  }

  const queue = [startPosition]
  const visited = new Set()
  const distances = new Map()
  distances.set(`${startPosition[0]}-${startPosition[1]}`, 0)
  visited.add(`${startPosition[0]}-${startPosition[1]}`)

  while (queue.length > 0) {
    const [row, col] = queue.shift()
    const currentDistance = distances.get(`${row}-${col}`)
    const currentElevation = ELEVATIONS.indexOf(input[row][col])
    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ]
    neighbors.forEach(([neighborRow, neighborCol]) => {
      if (
        neighborRow < 0 ||
        neighborRow >= input.length ||
        neighborCol < 0 ||
        neighborCol >= input[0].length
      )
        return
      let elevationSymbol = input[neighborRow][neighborCol]
      if (elevationSymbol === "E") elevationSymbol = "z"
      const neighborElevation = ELEVATIONS.indexOf(elevationSymbol)
      if (neighborElevation > currentElevation + 1) return

      if (visited.has(`${neighborRow}-${neighborCol}`)) return
      visited.add(`${neighborRow}-${neighborCol}`)
      distances.set(`${neighborRow}-${neighborCol}`, currentDistance + 1)
      queue.push([neighborRow, neighborCol])
    })
  }

  return distances.get(`${endPosition[0]}-${endPosition[1]}`)
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let endPosition
  let startingPositions = []
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === "S") {
        startingPositions.push([row, col])
        continue
      }
      if (input[row][col] === "a") {
        startingPositions.push([row, col])
        continue
      }
      if (input[row][col] === "E") {
        endPosition = [row, col]
        continue
      }
    }
  }

  const allDistances = startingPositions.map((startPosition) => {
    const queue = [startPosition]
    const visited = new Set()
    const distances = new Map()
    distances.set(`${startPosition[0]}-${startPosition[1]}`, 0)
    visited.add(`${startPosition[0]}-${startPosition[1]}`)

    while (queue.length > 0) {
      const [row, col] = queue.shift()
      const currentDistance = distances.get(`${row}-${col}`)
      const currentElevation = ELEVATIONS.indexOf(input[row][col])
      const neighbors = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ]
      neighbors.forEach(([neighborRow, neighborCol]) => {
        if (
          neighborRow < 0 ||
          neighborRow >= input.length ||
          neighborCol < 0 ||
          neighborCol >= input[0].length
        )
          return
        let elevationSymbol = input[neighborRow][neighborCol]
        if (elevationSymbol === "E") elevationSymbol = "z"
        const neighborElevation = ELEVATIONS.indexOf(elevationSymbol)
        if (neighborElevation > currentElevation + 1) return

        if (visited.has(`${neighborRow}-${neighborCol}`)) return
        visited.add(`${neighborRow}-${neighborCol}`)
        distances.set(`${neighborRow}-${neighborCol}`, currentDistance + 1)
        queue.push([neighborRow, neighborCol])
      })
    }

    const endPositionDistance = distances.get(
      `${endPosition[0]}-${endPosition[1]}`,
    )
    if (!endPositionDistance) return Infinity

    return endPositionDistance
  })

  return Math.min(...allDistances)
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 31,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 29,
    },
  ],
  solution: part2,
}

run({
  part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
})
