import run from "aocrunner"

const example1 = `30373
25512
65332
33549
35390`

const parseInput = (rawInput) =>
  rawInput.split("\n").map((row) => row.split("").map(Number))

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let seenCount = input.length * 2 + input[0].length * 2 - 4
  for (let rowIndex = 1; rowIndex < input.length - 1; rowIndex++) {
    for (let colIndex = 1; colIndex < input[0].length - 1; colIndex++) {
      const current = input[rowIndex][colIndex]
      const top = input[rowIndex - 1][colIndex]
      const bottom = input[rowIndex + 1][colIndex]
      const left = input[rowIndex][colIndex - 1]
      const right = input[rowIndex][colIndex + 1]

      if (current > bottom) {
        let isSeeFromBottom = true
        for (let i = rowIndex + 1; i < input.length; i++) {
          if (input[i][colIndex] >= current) {
            isSeeFromBottom = false
            break
          }
        }
        if (isSeeFromBottom) {
          seenCount++
          continue
        }
      }

      if (current > right) {
        let isSeeFromRight = true
        for (let i = colIndex + 1; i < input[0].length; i++) {
          if (input[rowIndex][i] >= current) {
            isSeeFromRight = false
            break
          }
        }
        if (isSeeFromRight) {
          seenCount++
          continue
        }
      }

      if (current > top) {
        let isSeeFromTop = true
        for (let i = rowIndex - 1; i >= 0; i--) {
          if (input[i][colIndex] >= current) {
            isSeeFromTop = false
            break
          }
        }
        if (isSeeFromTop) {
          seenCount++
          continue
        }
      }

      if (current > left) {
        let isSeeFromLeft = true
        for (let i = colIndex - 1; i >= 0; i--) {
          if (input[rowIndex][i] >= current) {
            isSeeFromLeft = false
            break
          }
        }
        if (isSeeFromLeft) {
          seenCount++
          continue
        }
      }
    }
  }

  return seenCount
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const allScores = []

  for (let rowIndex = 1; rowIndex < input.length - 1; rowIndex++) {
    for (let colIndex = 1; colIndex < input[0].length - 1; colIndex++) {
      const current = input[rowIndex][colIndex]

      let bottomScore = 0
      for (let i = rowIndex + 1; i < input.length; i++) {
        bottomScore++
        if (input[i][colIndex] >= current) break
      }

      let rightScore = 0
      for (let i = colIndex + 1; i < input[0].length; i++) {
        rightScore++
        if (input[rowIndex][i] >= current) break
      }

      let topScore = 0
      for (let i = rowIndex - 1; i >= 0; i--) {
        topScore++
        if (input[i][colIndex] >= current) break
      }

      let leftScore = 0
      for (let i = colIndex - 1; i >= 0; i--) {
        leftScore++
        if (input[rowIndex][i] >= current) break
      }

      const score = bottomScore * rightScore * topScore * leftScore
      allScores.push(score)
    }
  }

  return Math.max(...allScores)
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 21,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 8,
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
