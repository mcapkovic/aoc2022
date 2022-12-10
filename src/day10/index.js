import run from "aocrunner"

const example1 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`

const parseInput = (rawInput) =>
  rawInput.split("\n").map((row) => row.split(" "))

/**
 * addx is two cycles
 * noop is one cycle
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let cycleCount = 1
  let xValue = 1
  let signalStrengthSum = 0

  input.forEach((instruction) => {
    const [operation, value] = instruction

    // console.log({ cycleCount, xValue, signalStrengthSum })

    if ((cycleCount - 20) % 40 === 0) signalStrengthSum += xValue * cycleCount

    if (operation === "addx") {
      cycleCount += 1
      if ((cycleCount - 20) % 40 === 0) signalStrengthSum += xValue * cycleCount
    }

    cycleCount += 1

    if (operation === "addx") {
      xValue += parseInt(value)
    }
  })

  return signalStrengthSum
}

function isPixelActive(position, spriteCenter) {
  const spriteLeft = spriteCenter - 1
  const spriteRight = spriteCenter + 1
  return (
    spriteLeft === position ||
    spriteRight === position ||
    spriteCenter === position
  )
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const pixels = []
  let xValue = 1
  let cycleCount = 1

  input.forEach((instruction) => {
    const [operation, value] = instruction

    if (operation === "addx") {
      const pixelValue = isPixelActive((cycleCount % 40) - 1, xValue)
        ? "#"
        : "."
      pixels.push(pixelValue)
      cycleCount += 1
    }

    const pixelValue = isPixelActive((cycleCount % 40) - 1, xValue) ? "#" : "."
    pixels.push(pixelValue)
    cycleCount += 1

    if (operation === "addx") {
      xValue += parseInt(value)
    }
  })

  do {
    const row = pixels.splice(0, 40)
    console.log(row.join(""))
  } while (pixels.length > 0)

  return
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 13140,
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
  part2: part2Config,
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
})
