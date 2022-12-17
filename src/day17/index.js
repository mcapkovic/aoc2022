import run from "aocrunner"

const example1 = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`

// ####

// .#.
// ###
// .#.

// ..#
// ..#
// ###

// #
// #
// #
// #

// ##
// ##
const NEW_SHAPES = [
  [[".", "#", "#", "#", "#", ".", "."]],
  [
    [".", ".", ".", "#", ".", ".", "."],
    [".", ".", "#", "#", "#", ".", "."],
    [".", ".", ".", "#", ".", ".", "."],
  ],
  [
    [".", ".", "#", "#", "#", ".", "."],
    [".", ".", "#", ".", ".", ".", "."],
    [".", ".", "#", ".", ".", ".", "."],
  ],
  [
    [".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", "#", ".", "."],
    [".", ".", ".", ".", "#", ".", "."],
  ],
  [
    [".", ".", ".", "#", "#", ".", "."],
    [".", ".", ".", "#", "#", ".", "."],
  ],
]

const NEW_ROW = [".", ".", ".", ".", ".", ".", "."]

// > means move to the left
// < means move to the right
const DIRECTION = {
  left: ">",
  right: "<",
}

const parseInput = (rawInput) => rawInput

class TetrisGame2 {
  constructor() {
    this.chamber = []
    this.lowestPoint = 0 // lowest point of the stopped shapes
    this.currentShape = null
    this.nextRowIndex = null // next row to be explored by the shape
  }

  nextRound(shape) {
    this.currentShape = shape.map((row) => [...row])
    const emptyRowCount = this.chamber.length - this.lowestPoint

    // add empty rows
    if (emptyRowCount < 3) {
      for (let j = 1; j <= 3 - emptyRowCount; j++) {
        this.chamber.push([...NEW_ROW])
      }
    }

    this.nextRowIndex = this.chamber.length - 1
  }

  moveToSide(directionSymbol) {
    const shape = this.currentShape
    const shapeHeight = shape.length
    const shapeWidth = shape[0].length

    // by default move to the left
    let sideIndex = 0
    let nextColumnIncrement = -1

    // move right
    if (directionSymbol === DIRECTION.right) {
      // console.log("move right")
      sideIndex = shapeWidth - 1
      nextColumnIncrement = 1
    }

    // check if the shape can be moved
    // loop through the shape rows
    for (let i = 0; i < shapeHeight; i++) {
      const shapeRow = shape[i]
      const currentChamberRowIndex = this.nextRowIndex + 1
      const rowIndex = currentChamberRowIndex + i

      // loop through the shape columns
      for (let columnIndex = 0; columnIndex < shapeWidth; columnIndex++) {
        const cell = shapeRow[columnIndex]
        if (cell === "#") {
          if (columnIndex === sideIndex) return false // the shape is already at the right side
          const nextCellColumnIndex = columnIndex + nextColumnIncrement
          if (this.chamber[rowIndex]?.[nextCellColumnIndex] === "#") {
            return false
          }
        }
      }
    }

    // move the shape
    for (let i = 0; i < shapeHeight; i++) {
      if (directionSymbol === DIRECTION.right) {
        shape[i].pop()
        shape[i].unshift(".")
      } else {
        shape[i].shift()
        shape[i].push(".")
      }
    }

    this.currentShape = shape
    return true
  }

  moveToNextRow() {
    // console.log("this.nextRowIndex", this.nextRowIndex)
    const shape = this.currentShape
    const shapeHeight = shape.length
    const shapeWidth = shape[0].length
    const currentRowIndex = this.nextRowIndex + 1
    let isEndOfRound = false

    // check if the shape can be moved
    // loop through the shape rows
    for (let i = 0; i < shapeHeight; i++) {
      const shapeRow = shape[i]
      const rowIndex = this.nextRowIndex + i

      if (rowIndex < 0) {
        isEndOfRound = true
        break
      }

      // loop through the shape columns
      for (let columnIndex = 0; columnIndex < shapeWidth; columnIndex++) {
        const cell = shapeRow[columnIndex]
        if (cell === "#") {
          if (this.chamber[rowIndex]?.[columnIndex] === "#") {
            isEndOfRound = true
            break
          }
        }
      }
      if (isEndOfRound) break
    }

    // if shape can be moved, stop it and add it to the chamber
    if (isEndOfRound) {
      for (let i = 0; i < shapeHeight; i++) {
        const shapeRow = shape[i]
        const rowIndex = currentRowIndex + i
        for (let columnIndex = 0; columnIndex < shapeWidth; columnIndex++) {
          const cell = shapeRow[columnIndex]
          if (cell === "#") {
            if (this.chamber[rowIndex] == null) this.chamber.push([...NEW_ROW]) // edge case when the shape is at the top and there is no row
            this.chamber[rowIndex][columnIndex] = "#"
          }
        }
      }

      if (this.lowestPoint < currentRowIndex + shapeHeight) {
        this.lowestPoint = currentRowIndex + shapeHeight
      }

      return false
    }

    this.nextRowIndex--
    return true
  }

  getChamber() {
    const chamber = this.chamber
    console.log(chamber.map((row) => row.join(" ")).join("\n"))
    return chamber
  }

  getShape() {
    const shape = this.currentShape
    console.log(shape.map((row) => row.join(" ")).join("\n"))
    return shape
  }

  getPeak() {
    return this.lowestPoint
  }
}

// tetris game
const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const game = new TetrisGame2()
  let counter = 0
  for (let round = 1; round <= 2022; round++) {
    const shapeIndex = (round - 1) % 5
    game.nextRound(NEW_SHAPES[shapeIndex])

    let shouldContinue = true
    do {
      const directionIndex = counter % input.length
      const direction = input[directionIndex]
      game.moveToSide(direction)

      shouldContinue = game.moveToNextRow()
      counter++
    } while (shouldContinue)
  }
  // game.getChamber()
  return game.getPeak()
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 3068,
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
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
})
