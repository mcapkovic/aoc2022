import run from "aocrunner"

const example1 = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`

const directionPoints = {
  right: 0,
  down: 1,
  left: 2,
  up: 3,
}

const directionIncrements = {
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
  up: [-1, 0],
}

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((rawSection, index) => {
    if (index === 0) {
      return rawSection.split("\n").map((row) => row.split(""))
    }
    return rawSection
  })

// wrap around the grid
const getNextIndex = (nextIndexRaw, length) => {
  if (nextIndexRaw < 0) return length - 1
  return nextIndexRaw % length
}

const move = ({ row, column, direction, tilesToMove, grid }) => {
  let steps = parseInt(tilesToMove)
  let currentColumn = column
  let currentRow = row
  let lastValidRow = row
  let lastValidColumn = column
  const [rowIncrement, columnIncrement] = directionIncrements[direction]

  let loopCount = 0
  while (loopCount <= steps) {
    let nextRowIndex = getNextIndex(currentRow + rowIncrement, grid.length)
    let nextColumnIndex = getNextIndex(
      currentColumn + columnIncrement,
      grid[0].length,
    )

    let nextTile = grid[nextRowIndex][nextColumnIndex]
    let currentTile = grid[currentRow][currentColumn]

    // if the position is valid, update the last valid position
    if (currentTile === ".") {
      lastValidColumn = currentColumn
      lastValidRow = currentRow
    }

    // if we hit a wall, stop moving
    if (nextTile === "#") break

    // if we hit a space, position is invalid
    if (nextTile == null || nextTile === " ") steps++

    // move to next tile
    currentColumn = nextColumnIndex
    currentRow = nextRowIndex
    loopCount++
  }

  return [lastValidRow, lastValidColumn]
}

const getDirection = (direction, instruction) => {
  switch (direction) {
    case "right":
      return instruction === "R" ? "down" : "up"
    case "down":
      return instruction === "R" ? "left" : "right"
    case "left":
      return instruction === "R" ? "up" : "down"
    case "up":
      return instruction === "R" ? "right" : "left"
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const grid = input[0]
  const instructions = input[1]

  let instructionPointer = 0
  let direction = "right"
  let currentRow = 0
  let currentColumn = grid[0].indexOf(".")
  let tilesToMove = ""

  do {
    const instruction = instructions[instructionPointer]

    // if instruction is not a number, it's a direction
    if (isNaN(instruction)) {
      direction = getDirection(direction, instruction)
      instructionPointer++
      continue
    }

    tilesToMove += instruction
    const nextInstruction = instructions[instructionPointer + 1]

    // if next instruction is not a number, we need to move
    if (isNaN(nextInstruction)) {
      const [row, column] = move({
        row: currentRow,
        column: currentColumn,
        direction,
        tilesToMove,
        grid,
      })
      currentRow = row
      currentColumn = column
      tilesToMove = ""
    }

    instructionPointer++
  } while (instructionPointer < instructions.length)

  return (
    (currentRow + 1) * 1000 +
    (currentColumn + 1) * 4 +
    directionPoints[direction]
  )
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 6032,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: "",
    },
  ],
  solution: part2,
}

run({
  part1: part1Config,
  // part2: part2Config,
  trimTestInputs: false,
  // onlyTests: true,
  onlyTests: false,
})
