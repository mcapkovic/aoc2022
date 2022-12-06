import run from "aocrunner"

const example1 = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`

const part1 = (rawInput: string) => {
  let endMarkerPosition = 0
  let currentPosition = 0

  do {
    const marker = rawInput.slice(currentPosition, currentPosition + 4)
    const uniqueValues = new Set(marker.split(""))
    if(uniqueValues.size === 4) endMarkerPosition = currentPosition + 4

    currentPosition++
  } while (endMarkerPosition === 0 && currentPosition < rawInput.length - 4)

  return endMarkerPosition
}

const part2 = (rawInput: string) => {
  let endMarkerPosition = 0
  let currentPosition = 0

  do {
    const marker = rawInput.slice(currentPosition, currentPosition + 14)
    const uniqueValues = new Set(marker.split(""))
    if(uniqueValues.size === 14) endMarkerPosition = currentPosition + 14
    currentPosition++
  } while (endMarkerPosition === 0 && currentPosition < rawInput.length - 14)

  return endMarkerPosition
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 7,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 19,
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
