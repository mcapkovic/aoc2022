import run from "aocrunner"

const example1 = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

const parseInput = (rawInput) =>
  rawInput
    .split("\n\n")
    .map((part) => part.split("\n"))
    .map((part, index) => {
      if (index === 0) {
        const cratesLayout = part.slice(0, -1)
        const noOfStacks = part[part.length - 1]
          .split(" ")
          .filter((word) => word !== "").length

        const stacks = []
        let cratesTowerIndex = 1
        
        for (let stackNo = 0; stackNo < noOfStacks; stackNo++) {
          const currentStack = cratesLayout
            .map((cratesTowers) => cratesTowers[cratesTowerIndex]) // get stack letters
            .filter((crate) => crate !== " ") // remove empty spaces
            .reverse()  // reverse to get the order of the stack

          stacks.push(currentStack)
          cratesTowerIndex += 4
        }
        return stacks

      } else {
        const instructions = part.map((row) =>
          row
            .split(" ")
            .map((word) => Number(word))
            .filter((num) => !isNaN(num)),
        )
        return instructions
      }
    })

/**
 * 0 - move count
 * 1 - from
 * 2 - to
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const [stacks, instructions] = input

  instructions.forEach((instruction) => {
    const [moveCount, from, to] = instruction
    const fromStack = stacks[from - 1]
    const toStack = stacks[to - 1]
    for (let i = 0; i < moveCount; i++) {
      const crate = fromStack.pop()
      toStack.push(crate)
    }
  })

  const topStacksLetters = stacks
    .map((stack) => stack[stack.length - 1])
    .join("")
  return topStacksLetters
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const [stacks, instructions] = input

  instructions.forEach((instruction) => {
    const [moveCount, from, to] = instruction
    const fromStack = stacks[from - 1]
    const toStack = stacks[to - 1]

    const cratesToMove = fromStack.splice(fromStack.length - moveCount)
    toStack.push(...cratesToMove)
  })

  const topStacksLetters = stacks
    .map((stack) => stack[stack.length - 1])
    .join("")
  return topStacksLetters
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: "CMZ",
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: "MCD",
    },
  ],
  solution: part2,
}

run({
  part1: part1Config,
  part2: part2Config,
  trimTestInputs: false,
  // onlyTests: true.
  onlyTests: false,
})
