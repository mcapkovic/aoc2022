import run from "aocrunner"

const example1 = `A Y
B X
C Z`

const parseInput = (rawInput) => rawInput.split("\n").map((x) => x.split(" "))

const normalizedShape = {
  X: "A",
  Y: "B",
  Z: "C",
}

const isSecondWinning = {
  AB: true,
  BC: true,
  CA: true,
}

const getPoints = {
  A: 1,
  B: 2,
  C: 3,
}

/**
 * a - Rock (1)
 * b - Paper (2)
 * c - Scissors (3)
 *
 * x - Rock
 * y - Paper
 * z - Scissors
 *
 * 0 - lost
 * 3 - draw
 * 6 - won
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const scores = input.map((round) => {
    const [playerOneHand, playerTwoHandOriginal] = round
    const playerTwoHand = normalizedShape[playerTwoHandOriginal]
    const shapePoints = getPoints[playerTwoHand]

    if (playerOneHand === playerTwoHand) return 3 + shapePoints

    const key = `${playerOneHand}${playerTwoHand}`
    if (isSecondWinning[key] === true)
      return 6 + shapePoints

    return shapePoints
  })

  const score = scores.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  )
  return score
}

const looseShape = {
  A: "C",
  B: "A",
  C: "B",
}

const winShape = {
  A: "B",
  B: "C",
  C: "A",
}

function getSecondPlayerHand(playerOneHand, end) {
  if (end === "X") return looseShape[playerOneHand]
  if (end === "Y") return playerOneHand
  if (end === "Z") return winShape[playerOneHand]
}

/**
 * a - Rock (1)
 * b - Paper (2)
 * c - Scissors (3)
 *
 * X - loose
 * Y - draw
 * Z - win
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const scores = input.map((round) => {
    const [playerOneHand, end] = round
    const playerTwoHand = getSecondPlayerHand(playerOneHand, end)

    const shapePoints = getPoints[playerTwoHand]
    if (playerOneHand === playerTwoHand) return 3 + shapePoints

    const key = `${playerOneHand}${playerTwoHand}`
    if (isSecondWinning[key] === true)
      return 6 + shapePoints

    return shapePoints
  })

  const score = scores.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  )

  return score
}

run({
  part1: {
    tests: [
      {
        input: example1,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example1,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
