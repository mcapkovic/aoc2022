import run from "aocrunner"

const example1 = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

const parseInput = (rawInput) =>
  rawInput
    .split("\n")
    .map((line) =>
      line
        .split(": ")
        .map((coordinate) =>
          coordinate
            .split(",")
            .map((location) => Number(location.split("=")[1])),
        ),
    )
    .map((sensor) => {
      const [sensorPosition, beaconPosition] = sensor
      const distance = getManhattanDistance(sensorPosition, beaconPosition)
      return [sensorPosition, beaconPosition, distance]
    })

function getManhattanDistance(start, end) {
  return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1])
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const resultRowY = input.length < 18 ? 10 : 2000000

  const beacons = input.map((sensor) => sensor[1])
  const sensors = input.map((sensor) => sensor[0])
  const xValues = beacons
    .map((beacon) => beacon[0])
    .concat(sensors.map((sensor) => sensor[0]))
  const caveMinX = Math.min(...xValues) - 1000000
  const caveMaxX = Math.max(...xValues) + 1000000

  let canNotBeBeacon = 0
  // loop through one row of the cave
  for (let x = caveMinX; x <= caveMaxX; x++) {
    const isBeaconPosition = beacons.some(
      (beacon) => beacon[0] === x && beacon[1] === resultRowY,
    )
    if (isBeaconPosition) continue

    // loop through all sensors
    const isSeen = input.some((row) => {
      const [sensorPosition, beacon, sensorToBeaconDistance] = row
      const sensorToPointDistance = getManhattanDistance(sensorPosition, [
        x,
        resultRowY,
      ])
      if (sensorToPointDistance <= sensorToBeaconDistance) return true
      return false
    })

    if (isSeen) canNotBeBeacon++
  }

  return canNotBeBeacon
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 26,
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
