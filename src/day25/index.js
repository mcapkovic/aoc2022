import run from "aocrunner"

const example1 = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`

const example2 = `1=
1=
1=`

const example3 = `1=
2
20`


const parseInput = (rawInput) => rawInput.split("\n")

const snafuToDecimal = (snafu) => {
  const snafuArr = snafu.split("").reverse()

  const decimal = snafuArr.reduce((acc, curr, i) => {
    const base = Math.pow(5, i)
    if (curr === "0") {
      return acc
    } else if (curr === "1") {
      return acc + base
    } else if (curr === "2") {
      return acc + base * 2
    } else if (curr === "=") {
      return acc - base * 2
    } else if (curr === "-") {
      return acc - base
    }
  }, 0)

  return decimal
}

// snafu is base 5 but with offset to negative numbers
const decimalToSnafu = (decimal) => {
  const snafuArr = []
  let remainder = decimal
  let quotient = decimal

  while (quotient !== 0) {
    remainder = quotient % 5
    quotient = Math.floor(quotient / 5)

    if (remainder === 3) {
      remainder = '='
      quotient = quotient + 1
    } else if (remainder === 4) {
      remainder = '-'
      quotient = quotient + 1
    }


    snafuArr.push(remainder)
  }

  return snafuArr.reverse().join("")
}

/**
 * SNAFU numbers are base 5
 *         1              1
 *         2              2
 *         3             1=
 *         4             1-
 *         5             10
 *         6             11
 *         7             12
 *         8             2=
 *         9             2-
 *        10             20
 *        15            1=0
 *        20            1-0
 *      2022         1=11-2
 *     12345        1-0---0
 * 314159265  1121-1110-1=0
 *
 *
 * from right  1 5 25 125 625
 *
 *
 * symbols:
 * 2 is 2
 * 1 is 1
 * 0 is 0
 * - is -1
 * = is -2
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const decimals = input.map(snafuToDecimal)
  const sumDecimal = decimals.reduce((acc, curr) => acc + curr, 0)
  const sumSnafu = decimalToSnafu(sumDecimal)

  return sumSnafu
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: "2=-1=0",
    },
    {
      input: '20',
      expected: "20",
    },
    {
      input: '1=11-2',
      expected: "1=11-2",
    },
    {
      input: '1-0---0',
      expected: "1-0---0",
    },
    {
      input: '1121-1110-1=0',
      expected: "1121-1110-1=0",
    },
    {
      input: example2,
      expected: "2-",
    },
    {
      input: example3,
      expected: "1=0",
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
