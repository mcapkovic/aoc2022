import run from "aocrunner"

const example1 = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

function customSplit(str, index) {
  const result = [str.slice(0, index), str.slice(index)]
  return result
}

const parseInput = (rawInput) =>
  rawInput.split("\n").map((rucksack) => customSplit(rucksack, rucksack.length / 2))
const parseInput2 = (rawInput) => rawInput.split("\n")

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const duplicateItems = input.map((rucksack) => {
    const [left, right] = rucksack
    const leftItems = left.split("")
    const rightItems = right.split("")
    const duplicateItems = leftItems.filter((item) => rightItems.includes(item))
    return duplicateItems[0]
  })

  const priority = duplicateItems.map((item) => letters.indexOf(item) + 1)

  return priority.reduce((a, b) => a + b, 0)
}

const part2 = (rawInput) => {
  const input = parseInput2(rawInput)

  const allDuplicateItems = []
  for (let index = 0; index < input.length; index += 3) {
    const rucksacks = input[index].split("")
    const rucksacks2 = input[index + 1].split("")
    const rucksacks3 = input[index + 2].split("")

    const duplicateItem = rucksacks.filter(
      (item) => rucksacks2.includes(item) && rucksacks3.includes(item),
    )[0]

    allDuplicateItems.push(duplicateItem)
  }

  const priority = allDuplicateItems.map((item) => letters.indexOf(item) + 1)

  return priority.reduce((a, b) => a + b, 0)
}

run({
  part1: {
    tests: [
      {
        input: example1,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example1,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
})
