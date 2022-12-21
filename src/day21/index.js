import run from "aocrunner"

const example1 = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((line) => line.split(": "))
    .map(([name, value]) => {
      const isValueANumber = !isNaN(Number(value))
      let monkey1 = null
      let monkey2 = null
      let operator = null
      if (!isValueANumber) {
        const temp1 = value.split(" ")
        monkey1 = temp1[0]
        operator = temp1[1]
        monkey2 = temp1[2]
      }
      return [
        name,
        {
          value: isValueANumber ? Number(value) : null,
          operator,
          monkey1,
          monkey2,
        },
      ]
    })

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const monkeys = new Map()
  const queue = []

  input.forEach((line) => {
    const [name, { value, operator, monkey1, monkey2 }] = line
    if (value !== null) {
      monkeys.set(name, { value, operator, monkey1, monkey2 })
    } else {
      queue.push(line)
    }
  })

  while (queue.length > 0) {
    const [name, { operator, monkey1, monkey2 }] = queue.shift()
    if (monkeys.has(monkey1) && monkeys.has(monkey2)) {
      const monkey1Value = monkeys.get(monkey1).value
      const monkey2Value = monkeys.get(monkey2).value
      let value = null
      switch (operator) {
        case "+":
          value = monkey1Value + monkey2Value
          break
        case "-":
          value = monkey1Value - monkey2Value
          break
        case "*":
          value = monkey1Value * monkey2Value
          break
        case "/":
          value = monkey1Value / monkey2Value
          break
      }
      monkeys.set(name, { value, operator, monkey1, monkey2 })
    } else {
      queue.push([name, { operator, monkey1, monkey2 }])
    }
  }

  return monkeys.get("root").value
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 152,
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
