import run from "aocrunner"

const example1 = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

// parse string to array of arrays
function parseStringToArray(string) {
  const array = []
  let currentArray = array
  let currentNumber = ""
  for (let i = 0; i < string.length; i++) {
    const char = string[i]
    if (char === "[") {
      currentArray.push([])
      currentArray = currentArray[currentArray.length - 1]
    } else if (char === "]") {
      if (currentNumber) {
        currentArray.push(parseInt(currentNumber))
        currentNumber = ""
      }
      currentArray = array
    } else if (char === ",") {
      if (currentNumber) {
        currentArray.push(parseInt(currentNumber))
        currentNumber = ""
      }
    } else {
      currentNumber += char
    }
  }
  return array
}

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map(
    (rawRule) =>
      // rawRule.split("\n").map((item) => JSON.parse(item)), // this also works
      rawRule.split("\n").map((item) => parseStringToArray(item)), // this is slower :( but it's more fun
  )

const parseInput2 = (rawInput) =>
  rawInput
    .split("\n")
    .filter((row) => row !== "")
    .map((row) => JSON.parse(row))

// compare two arrays of arrays
// return true if left is smaller
// return false if right is smaller
// return null if equal
const compareSites = (left, right) => {
  const leftIsNumber = typeof left === "number"
  const rightIsNumber = typeof right === "number"

  if (leftIsNumber && rightIsNumber) {
    if (left < right) return true
    if (left > right) return false
    if (left === right) return null
  }

  if (leftIsNumber) return compareSites([left], right)
  if (rightIsNumber) return compareSites(left, [right])

  const length = Math.max(left.length, right.length)
  for (let i = 0; i < length; i++) {
    const leftItem = left[i]
    const rightItem = right[i]

    if (leftItem == null && rightItem == null) return null
    if (leftItem == null) return true
    if (rightItem == null) return false

    const compactionResult = compareSites(leftItem, rightItem)
    if (compactionResult !== null) return compactionResult
  }

  return null
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let score = 0
  input
    .map((pair) => {
      const value = compareSites(pair[0], pair[1])
      return value === true || value === null
    })
    .forEach((isValid, index) => (isValid ? (score += index + 1) : null))

  return score
}

const part2 = (rawInput) => {
  const input = parseInput2(rawInput)
  input.push([[2]], [[6]])
  input.sort((a, b) => {
    const value = compareSites(a, b)
    return value === true || value === null ? -1 : 1
  })

  const dividersIndices = []

  for (let i = 1; i <= input.length; i++) {
    if(dividersIndices.length === 2) break
    const item = input[i]
    if (item?.length > 1) continue
    if(item?.[0]?.length > 1) continue
    const value = item?.[0]?.[0]
    if (value === 2) {
      dividersIndices.push(i + 1)
    } else if (value === 6) {
      dividersIndices.push(i + 1)
    }
  }

  return dividersIndices[0] * dividersIndices[1]
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 13,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 140,
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
