import run from "aocrunner"

const example1 = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((line) =>
      line.split(" -> ").map((coordinate) => coordinate.split(",").map(Number)),
    )
// rawInput.split("\n").map((line) => line.split(" -> "))

function move(currentPosition, rocks) {
  let newPosition = [currentPosition[0], currentPosition[1] + 1]
  if (rocks.has(newPosition.join(","))) {
    newPosition = [currentPosition[0] - 1, currentPosition[1] + 1]
    if (rocks.has(newPosition.join(","))) {
      newPosition = [currentPosition[0] + 1, currentPosition[1] + 1]
      if (rocks.has(newPosition.join(","))) {
        newPosition = currentPosition
      }
    }
  }
  // console.log("newPosition", newPosition)
  return newPosition
}

// calculate coordinates between two points
function getCoordinatesBetweenTwoPoints(start, end) {
  const coordinatesArray = []
  const dx = Math.abs(end[0] - start[0])
  const dy = Math.abs(end[1] - start[1])
  const incrementX = start[0] < end[0] ? 1 : -1
  const incrementY = start[1] < end[1] ? 1 : -1

  let x = start[0]
  let y = start[1]

  // Main loop
  while (true) {
    coordinatesArray.push([x, y])
    if (dy > 0 && dx > 0) break

    if (x === end[0] && y === end[1]) break

    if (dx === 0) {
      y = y + incrementY
    }

    if (dy === 0) {
      x = x + incrementX
    }
  }

  return coordinatesArray
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let maxY = 0
  const obstacles = new Set()

  input.forEach((line) => {
    let previousCoordinate = line[0]
    line.map((coordinate) => {
      const coordinatesBetween = getCoordinatesBetweenTwoPoints(
        previousCoordinate,
        coordinate,
      )
      coordinatesBetween.forEach((coordinateBetween) =>
        obstacles.add(coordinateBetween.join(",")),
      )
      previousCoordinate = coordinate
      if (coordinate[1] > maxY) maxY = coordinate[1]
    })
  })

  let filling = true
  let numberOfSands = 1
  let currentSandPosition = [500, 0]
  let sanityCheck = 0
  do {
    sanityCheck++
    const newSandPosition = move(currentSandPosition, obstacles)
    if (currentSandPosition[1] > maxY) {
      filling = false
    } else if (
      newSandPosition[0] === currentSandPosition[0] &&
      newSandPosition[1] === currentSandPosition[1]
    ) {
      numberOfSands++
      obstacles.add(currentSandPosition.join(","))
      currentSandPosition = [500, 0]
    } else {
      currentSandPosition = newSandPosition
    }
  } while (filling && sanityCheck < 1000000)

  return numberOfSands - 1
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let minX = Infinity
  let maxX = 0
  let maxY = 0
  const obstacles = new Set()

  input.forEach((line) => {
    let previousCoordinate = line[0]
    line.map((coordinate) => {
      const coordinatesBetween = getCoordinatesBetweenTwoPoints(
        previousCoordinate,
        coordinate,
      )
      coordinatesBetween.forEach((coordinateBetween) =>
        obstacles.add(coordinateBetween.join(",")),
      )
      previousCoordinate = coordinate
      if (coordinate[0] < minX) minX = coordinate[0]
      if (coordinate[0] > maxX) maxX = coordinate[0]
      if (coordinate[1] > maxY) maxY = coordinate[1]
    })
  })

  maxY = maxY + 2

  // do some sketchy stuff to make sure the water is filling the whole area
  getCoordinatesBetweenTwoPoints(
    [minX - 500, maxY],
    [maxX + 500, maxY],
  ).forEach((coordinateBetween) => obstacles.add(coordinateBetween.join(",")))

  let filling = true
  let numberOfSands = 1
  let currentSandPosition = [500, 0]
  let sanityCheck = 0
  do {
    sanityCheck++
    const newSandPosition = move(currentSandPosition, obstacles)

    if (currentSandPosition[1] > maxY) {
      filling = false
    } else if (
      newSandPosition[0] === 500 &&
      newSandPosition[1] === 0 &&
      numberOfSands > 1
    ) {
      filling = false
    } else if (
      newSandPosition[0] === currentSandPosition[0] &&
      newSandPosition[1] === currentSandPosition[1]
    ) {
      numberOfSands++
      obstacles.add(currentSandPosition.join(","))
      currentSandPosition = [500, 0]
    } else {
      currentSandPosition = newSandPosition
    }
  } while (filling && sanityCheck < 10000000)

  return numberOfSands
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 24,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 93,
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
