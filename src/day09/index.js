import run from "aocrunner"

const example1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

const parseInput = (rawInput) =>
  rawInput.split("\n").map((row) => row.split(" "))

function getNewPosition(head, direction, distance) {
  const newHead = { ...head }
  switch (direction) {
    case "R":
      newHead.x += distance
      break
    case "L":
      newHead.x -= distance
      break
    case "U":
      newHead.y += distance
      break
    case "D":
      newHead.y -= distance
      break
    default:
      break
  }
  return newHead
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let head = { x: 0, y: 0 }
  let tail = { x: 0, y: 0 }
  const tailVisited = new Set()
  tailVisited.add(`${tail.x},${tail.y}`)

  input.forEach((instruction) => {
    const [direction, distance] = instruction
    for (let i = 0; i < distance; i++) {
      head = getNewPosition(head, direction, 1)

      let xDistance = head.x - tail.x
      let yDistance = head.y - tail.y

      const isTailAdjacent =
        Math.abs(xDistance) <= 1 && Math.abs(yDistance) <= 1

      if (isTailAdjacent) continue

      tail = getNewPosition(tail, direction, 1)

      if (direction === "R" || direction === "L") {
        if (yDistance > 0) {
          tail = getNewPosition(tail, "U", 1)
        } else if (yDistance < 0) {
          tail = getNewPosition(tail, "D", 1)
        }
      } else {
        if (xDistance > 0) {
          tail = getNewPosition(tail, "R", 1)
        } else if (xDistance < 0) {
          tail = getNewPosition(tail, "L", 1)
        }
      }

      tailVisited.add(`${tail.x},${tail.y}`)
    }
  })

  return tailVisited.size
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 13,
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
