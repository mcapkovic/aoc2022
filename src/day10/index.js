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

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const screen = new Array(6).fill(0).map(() => new Array(40).fill("."))
  const pixels = new Array(6 * 40).fill(".")
  const pixels2 = []
  let xValue = 1
  let cycleCount = 1

  input.forEach((instruction) => {
    // if (cycleCount >= 15) return
    const [operation, value] = instruction

    if (operation === "addx") {
      // console.log("cycleCount", cycleCount)
      // console.log("xValue spriteCenter", xValue)
      const row = Math.floor(cycleCount / 40)
      const spriteLeft = xValue + row * 40 - 1
      const spriteRight = xValue + row * 40 + 1
      const spriteCenter = xValue + row * 40
      if (
        spriteLeft === cycleCount - 1 ||
        spriteRight === cycleCount - 1 ||
        spriteCenter === cycleCount - 1
      ) {
        pixels[cycleCount - 1] = "#"
        pixels2.push("#")
      } else {
        pixels2.push(".")
      }
      // console.log({
      //   cycleCount,
      //   spriteCenter: xValue,
      //   pixels: pixels2.join(""),
      // })
      cycleCount += 1
    }
    // console.log(cycleCount)

    const row = Math.floor(cycleCount / 40)
    const spriteLeft = xValue + row * 40 - 1
    const spriteRight = xValue + row * 40 + 1
    const spriteCenter = xValue + row * 40
    // console.log(row)
    if (
      spriteLeft === cycleCount - 1 ||
      spriteRight === cycleCount - 1 ||
      spriteCenter === cycleCount - 1
    ) {
      pixels[cycleCount - 1] = "#"
      pixels2.push("#")
    } else {
      pixels2.push(".")
    }
    if (operation === "addx") {
      xValue += parseInt(value)
    }

    // console.log({ cycleCount, spriteCenter: xValue, pixels: pixels2.join("") })

    cycleCount += 1
  })

  // screen.forEach((row) => {
  //   console.log(row.join(""))
  // })

  // console.log(pixels)

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
  // part1: part1Config,
  part2: part2Config,
  trimTestInputs: true,
  // onlyTests: true,
  onlyTests: false,
})
