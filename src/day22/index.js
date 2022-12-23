import run from "aocrunner"

//                0123456789
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

const directionPoints ={
  right: 0,
  down: 1,
  left: 2,
  up: 3,
}

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((rawSection, index) => {
    if (index === 0) {
      return rawSection.split("\n").map((row) => row.split(""))
    }
    return rawSection
  })

const move = ({ row, column, direction, tilesToMove, grid }) => {
  console.log(" ----- moving", direction, tilesToMove)
  console.log("starting at r/c", row, column)

  let steps = parseInt(tilesToMove)
  let currentColumn = column
  let currentRow = row
  let lastValidRow = row
  let lastValidColumn = column
  let columnIncrement = 0
  let rowIncrement = 0

  switch (direction) {
    case "right":
      columnIncrement = 1
      break
    case "down":
      rowIncrement = 1
      break
    case "left":
      columnIncrement = -1
      break
    case "up":
      rowIncrement = -1
      break
  }

  let loopCount = 0
  // for (let i = 0; i < steps; i++) {
  while (loopCount <= steps) {
    let nextRowIndex = (currentRow + rowIncrement) % grid.length
    let nextColumnIndex = (currentColumn + columnIncrement) % grid[0].length
    if(nextColumnIndex < 0) nextColumnIndex = grid[0].length - 1
    if(nextRowIndex < 0) nextRowIndex = grid.length - 1

    let nextTile = grid[nextRowIndex][nextColumnIndex]
    let currentTile = grid[currentRow][currentColumn]

    console.log("currentTile", currentTile)

    console.log("nextTile", nextTile)
    console.log("nextTileIndex", nextRowIndex, nextColumnIndex)

    // if the position is valid, update the last valid position
    if (currentTile === ".") {
      lastValidColumn = currentColumn
      lastValidRow = currentRow
    }

    // if we hit a wall, stop moving
    if (nextTile === "#") break

    // if we hit a space, position is invalid
    if (nextTile == null || nextTile === ' ') steps++

    // move to next tile
    currentColumn = nextColumnIndex
    currentRow = nextRowIndex
    loopCount++
  }

  return [lastValidRow, lastValidColumn]
}

// A number indicates the number of tiles to move in the direction you are facing. If you run into a wall, you stop moving forward and continue with the next instruction.
// A letter indicates whether to turn 90 degrees clockwise (R) or counterclockwise (L). Turning happens in-place; it does not change your current tile.
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  // console.log(input)

  const grid = input[0]
  const instructions = input[1]
  // const instructions = "4R1L3R1R3"

  let instructionPointer = 0
  let direction = "right"
  let currentRow = 0
  let currentColumn = grid[0].indexOf(".")
  let tilesToMove = ""

  do {
    const instruction = instructions[instructionPointer]
    if (isNaN(instruction)) {
      // console.log('turning', instruction)
      switch (direction) {
        case "right":
          direction = instruction === "R" ? "down" : "up"
          break
        case "down":
          direction = instruction === "R" ? "left" : "right"
          break
        case "left":
          direction = instruction === "R" ? "up" : "down"
          break
        case "up":
          direction = instruction === "R" ? "right" : "left"
          break
      }
    } else {
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
        console.log('moving to', row, column)
        currentRow = row
        currentColumn = column
        tilesToMove = ""
      }
    }
    instructionPointer++
  } while (instructionPointer < instructions.length)

  console.log(currentRow, currentColumn, direction)
  return (currentRow + 1) * 1000 + (currentColumn + 1) * 4 + directionPoints[direction]
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
