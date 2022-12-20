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

  getValue() {
    return this.value
  }

  setNext(node) {
    this.next = node
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

  // get(index) {
  //   let node = this.head
  //   let i = 0

  //   while (i < index) {
  //     node = node.next
  //     i++
  //   }

  //   return node
  // }

  getNodeByValue(value) {
    let node = this.head
    let i = 0

    while (node.value !== value) {
      node = node.next
      i++
    }

    return node
  }

  getNodeByKey(key) {
    let node = this.head
    let i = 0

    while (node.key !== key) {
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

    return node.getValue()
  }

  // insertAtPosition(value, position) {
  //   const node = new Node(value)

  //   if (position === 0) {
  //     node.next = this.head
  //     this.head = node
  //     this.tail.next = this.head
  //   } else {
  //     const prev = this.get(position - 1)
  //     const next = prev.next

  //     prev.next = node
  //     node.next = next
  //   }

  //   this.length++
  // }

  indexOf(value) {
    let node = this.head
    let i = 0

    while (node.value !== value) {
      node = node.next
      i++
    }

    return i
  }

  moveNodeBySteps(value, steps) {
    if (steps === 0) return

    const node = this.getNodeByValue(value)
    const nodeValue = node.getValue()
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
      // console.log(node.getValue())
      values.push(node.getValue())
      node = node.next
      i++
    }
    console.log(values.join(", "))
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  // console.log(input)

  const list = new CircularList()

  input.forEach((value) => list.add(value))
  input.forEach((value) => {
    list.moveNodeBySteps(value, value)
  })

  // console.log("---")
  // list.printValues()
  // list.moveNodeBySteps(2, -1)
  // console.log("---")
  // list.printValues()

  // for (let i = 0; i < input.length; i++) {
  //   console.log(list.get(i).getValue())
  //   // console.log(list.get(i))
  // }

  // for(let i = 0; i < input.length; i++) {
  //   console.log(list.get(i).getValue())
  //   // console.log(list.get(i))
  // }

  // console.log(list.indexOf(0))

  // console.log('valueAtIndex2', valueAtIndex2)
  // list.moveNodeBySteps(4, 1)
  // console.log('---')
  // for(let i = 0; i < input.length; i++) {
  //   console.log(list.get(i).getValue())
  //   // console.log(list.get(i))
  // }

  // console.log('head', list.head)

  // list.moveNodeBySteps(2, 2)
  // console.log('---')
  // for(let i = 0; i < input.length; i++) {
  //   console.log(list.get(i).getValue())
  //   console.log(list.get(i))
  // }

  // list.moveNodeBySteps(-3, -3)
  // console.log('---')
  // for(let i = 0; i < input.length; i++) {
  //   console.log(list.get(i).getValue())
  //   // console.log(list.get(i))
  // }

  // const node = list.getNodeByValue(-3)
  // list.remove(node)
  // console.log('---', -3)

  // list.insertAfter(node, 10)
  // for(let i = 0; i < input.length; i++) {
  //   console.log(list.get(i).getValue())
  //   console.log(list.get(i))
  // }

  const indexOfZero = list.indexOf(0)
  const valueAtIndex1 = list.getValue((1000 + indexOfZero) % input.length)
  const valueAtIndex2 = list.getValue((2000 + indexOfZero) % input.length)
  const valueAtIndex3 = list.getValue((3000 + indexOfZero) % input.length)
  console.log(valueAtIndex1, valueAtIndex2, valueAtIndex3)
  return valueAtIndex1 + valueAtIndex2 + valueAtIndex3
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
