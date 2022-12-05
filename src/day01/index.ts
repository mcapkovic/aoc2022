import run from "aocrunner"

const ex1 = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

const parseInput = (rawInput: string) => rawInput.split("\n").map((x) => Number(x))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const calories: number[] = []
  let elf = 0

  input.forEach((calory) => {
    if (calory === 0) {
      elf++
    } else {
      calories[elf] = calories[elf] != null ? calories[elf] + calory : calory
    }
  })

  return Math.max(...calories)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const calories: number[] = []
  let elfIndex = 0

  input.forEach((calory) => {
    if (calory === 0) return elfIndex++
    const oldCalories = calories[elfIndex] ?? 0
    calories[elfIndex] = oldCalories + calory
  })

  const sortedElves = calories.sort((a, b) => b - a)

  return sortedElves[0] + sortedElves[1] + sortedElves[2]
}

run({
  part1: {
    tests: [
      {
        input: ex1,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: ex1,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
