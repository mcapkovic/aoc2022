import run from "aocrunner"

const example1 = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

const parseInput = (rawInput) =>
  rawInput.split("\n\n").map((monkey, index) => {
    const instructions = monkey.split("\n")
    const startingItems = instructions[1].split(": ")[1].split(", ").map(Number)
    const operation = instructions[2].split(": ")[1].split(" = ")[1].split(" ")
    const test = instructions[3].split(": ")[1].split(" by ")[1]
    const ifTrue = instructions[4].split(": ")[1].split(" to monkey ")[1]
    const ifFalse = instructions[5].split(": ")[1].split(" to monkey ")[1]
    return {
      monkey: index,
      startingItems,
      operation,
      test: Number(test),
      ifTrue: Number(ifTrue),
      ifFalse: Number(ifFalse),
      inspectedCount: 0,
    }
  })

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  for (let round = 1; round <= 20; round++) {
    input.forEach((monkey) => {
      const { startingItems, operation, test, ifTrue, ifFalse } = monkey
      let [_, operator, operandString] = operation

      if (startingItems.length === 0) return

      startingItems.forEach((item) => {
        const operand = operandString === "old" ? item : Number(operandString)
        let worryLevel = item

        if (operator === "*") {
          worryLevel *=  operand
        } else if (operator === "+") {
          worryLevel += operand
        }

        worryLevel = Math.floor(worryLevel / 3)

        const newMonkeyIndex = worryLevel % test === 0 ? ifTrue : ifFalse
        input[newMonkeyIndex].startingItems.push(worryLevel)
        monkey.inspectedCount++
      })

      monkey.startingItems = []
    })
  }

  const counts = input
    .map((monkey) => monkey.inspectedCount)
    .sort((a, b) => b - a)

  return counts[0] * counts[1]
}


// NOT WORKING!!!!
const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  for (let round = 1; round <= 20; round++) {
    input.forEach((monkey) => {
      const { startingItems, operation, test, ifTrue, ifFalse } = monkey
      let [_, operator, operandString] = operation

      if (startingItems.length === 0) return

      startingItems.forEach((item) => {
        const operand = operandString === "old" ? BigInt(item) : BigInt(operandString)
        let worryLevel = BigInt(item)

        if (operator === "*") {
          worryLevel = worryLevel * operand
        } else if (operator === "+") {
          worryLevel = worryLevel + operand
        }

        // console.log(worryLevel)
        const newMonkeyIndex = worryLevel % BigInt(test) === 0 ? ifTrue : ifFalse

        input[newMonkeyIndex].startingItems.push(worryLevel)
        monkey.inspectedCount++
      })
      monkey.startingItems = []
    })
  }

  const counts = input
    .map((monkey) => monkey.inspectedCount)
    .sort((a, b) => b - a)

    console.log(counts)
  return counts[0] * counts[1]
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 10605,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 2713310158,
    },
  ],
  solution: part2,
}

run({
  // part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  onlyTests: true,
  // onlyTests: false,
})
