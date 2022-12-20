import run from "aocrunner"

const example1 = `1
2
-3
3
-2
0
4`

const parseInput = (rawInput) => rawInput.split("\n").map(Number)

// Circular doubly linked list
class Node {
  constructor(value, key, next = null, prev = null) {
    this.value = value
    this.next = next
    this.prev = prev
    this.key = key
  }
}

class CircularList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  add(value, index = this.length) {
    const node = new Node(value, index)

    if (!this.head) {
      this.head = node
      this.tail = node
      node.next = node
      node.prev = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
      this.tail.next = this.head
      this.head.prev = this.tail
    }

    this.length++
  }

  remove(node) {
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      const prev = node.prev
      const next = node.next

      prev.next = next
      next.prev = prev

      if (node === this.head) {
        this.head = next
      }

      if (node === this.tail) {
        this.tail = prev
      }
    }

    this.length--
  }

  getNodeByKey(key) {
    let node = this.head
    let i = 0

    while (node.key !== key && i < this.length) {
      node = node.next
      i++
    }

    return node
  }

  getValue(index) {
    let node = this.head
    let i = 0

    while (i < index) {
      node = node.next
      i++
    }

    return node.value
  }

  indexOf(value) {
    let node = this.head
    let i = 0

    while (node.value !== value) {
      node = node.next
      i++
    }

    return i
  }

  moveNode(key, steps) {
    if (steps === 0) return

    const node = this.getNodeByKey(key)
    const nodeValue = node.value
    let pointer = node
    this.remove(node)

    // move node by steps
    if (steps > 0) {
      // move right
      for (let i = 0; i < steps; i++) {
        pointer = pointer.next
      }
      this.insertAfter(pointer, nodeValue)
    } else {
      // move left
      for (let i = 0; i < Math.abs(steps); i++) {
        pointer = pointer.prev
      }
      pointer = pointer.prev
      this.insertAfter(pointer, nodeValue)
    }
  }

  insertAfter(node, value) {
    const newNode = new Node(value)
    if (node.next.value === this.head.value) this.head = newNode
    if (node.value === this.tail.value) this.tail = newNode

    const next = node.next

    node.next.prev = newNode
    node.next = newNode

    newNode.next = next
    newNode.prev = node

    this.length++
  }

  printValues() {
    let node = this.head
    let i = 0

    const values = []
    while (i < this.length) {
      values.push(node.value)
      node = node.next
      i++
    }
    console.log(values.join(", "))
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const list = new CircularList()

  input.forEach((value) => list.add(value))
  input.forEach((value, index) => {
    list.moveNode(index, value)
  })

  const indexOfZero = list.indexOf(0)
  const value1 = list.getValue((1000 + indexOfZero) % input.length)
  const value2 = list.getValue((2000 + indexOfZero) % input.length)
  const value3 = list.getValue((3000 + indexOfZero) % input.length)

  return value1 + value2 + value3
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 3,
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
