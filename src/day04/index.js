import run from "aocrunner"

const example1 = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((line) =>
      line
        .split(",")
        .map((range) => range.split("-").map((num) => parseInt(num))),
    )

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let counter = 0
  input.forEach((elfPair) => {
    const [elf1, elf2] = elfPair
    const [elf1Start, elf1End] = elf1
    const [elf2Start, elf2End] = elf2
    if (elf1Start <= elf2Start && elf1End >= elf2End) {
      console.log("elf1 range is inside elf2 range")
      counter++
    } else if (elf2Start <= elf1Start && elf2End >= elf1End) {
      console.log("elf2 range is inside elf1 range")
      counter++
    }
  })

  return counter
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let overlapCount = 0
  input.forEach((elfPair) => {
    const [elf1, elf2] = elfPair
    const [elf1Start, elf1End] = elf1
    const [elf2Start, elf2End] = elf2

    const elf1Range = Array.from({ length: elf1End - elf1Start + 1 }, (_, i) => i + elf1Start)
    const elf2Range = Array.from({ length: elf2End - elf2Start + 1 }, (_, i) => i + elf2Start)
    
    const intersection = elf1Range.filter((num) => elf2Range.includes(num))
    if (intersection.length > 0) overlapCount++
  })

  return overlapCount
}

const part2v1 = (rawInput) => {
  const input = parseInput(rawInput)

  let overlapCount = 0
  input.forEach((elfPair) => {
    const [elf1, elf2] = elfPair
    const [elf1Start, elf1End] = elf1
    const [elf2Start, elf2End] = elf2

    const elf1Range = Array.from(
      { length: elf1End - elf1Start + 1 },
      (_, i) => i + elf1Start,
    )

    const intersection = elf1Range.filter(
      (elf1Position) => elf2Start <= elf1Position && elf1Position <= elf2End,
    )
    if (intersection.length > 0) overlapCount++
  })

  return overlapCount
}

const part2v2 = (rawInput) => {
  const input = parseInput(rawInput)

  let overlapCount = 0
  input.forEach((elfPair) => {
    const [elf1, elf2] = elfPair
    const [elf1Start, elf1End] = elf1
    const [elf2Start, elf2End] = elf2

    for(let elf1Position = elf1Start; elf1Position <= elf1End; elf1Position++) {
      if ( elf1Position >= elf2Start && elf1Position <= elf2End) {
        overlapCount++
        break
      }
    }
  })

  return overlapCount
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 2,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 4,
    },
  ],
  // solution: part2,
  // solution: part2v1,
  solution: part2v2,

}

run({
  part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
})
