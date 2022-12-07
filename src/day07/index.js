import run from "aocrunner"

const example1 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const example2 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d`

const parseInput = (rawInput) =>
  rawInput.split("\n").map((row) => row.split(" "))

class File {
  constructor(name, size, parent) {
    this.name = name
    this.size = size
    this.parent = parent
  }

  getType(){
    return 'file'
  }
}

class Directory {
  constructor(name, parent) {
    this.name = name
    this.parent = parent
    this.children = []
    this.size = 0
  }

  addFile(name, size) {
    this.children.push(new File(name, size, this))
    let currentDir = this
    this.size += Number(size)
    while (currentDir.parent !== null) {
      currentDir.parent.size += Number(size)
      currentDir = currentDir.parent
    }
  }

  addDirectory(name) {
    this.children.push(new Directory(name, this))
  }

  getSize() {
    return this.size
  }

  getType(){
    return 'dir'
  }
}

class Filesystem {
  constructor() {
    this.root = new Directory("root", null)
    this.currentDir = this.root
  }

  changeDir(name) {
    if (name === "..") {
      this.currentDir = this.currentDir.parent
    } else if (name === "/") {
      this.currentDir = this.root
    } else {
      this.currentDir = this.currentDir.children.find(
        (child) => child.name === name,
      )
    }
  }

  addNodeToCurrentDir(type, name, size) {
    if (type === "dir") {
      this.currentDir.addDirectory(name)
    } else {
      this.currentDir.addFile(name, size)
    }
  }

  getCurrentDir() {
    return this.currentDir
  }

  getAllDirsAndSizes() {
    const dirs = []
    const queue = [this.root]
    while (queue.length > 0) {
      const currentDir = queue.shift()
      dirs.push({ name: currentDir.name, size: currentDir.getSize() })
      for (let i = 0; i < currentDir.children.length; i++) {
        if (currentDir.children[i].getType() === "dir") {
          queue.push(currentDir.children[i])
        }
      }
    }
    return dirs
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const filesystem = new Filesystem()

  for (let i = 0; i < input.length; i++) {
    const row = input[i]

    if (row[0] === "$") {
      if (row[1] === "cd") {
        filesystem.changeDir(row[2])
      } else if (row[1] === "ls") {
        continue
      }
    } else if (row[0] === "dir") {
      filesystem.addNodeToCurrentDir("dir", row[1])
    } else {
      filesystem.addNodeToCurrentDir("file", row[1], row[0])
    }
  }

  const allDirs = filesystem.getAllDirsAndSizes()
  let size = 0

  allDirs.forEach((directory) => {
    if (directory.size <= 100000) {
      size += directory.size
    }
  })

  return size
}

const DISC_SIZE = 70000000
const NEEDED_SPACE = 30000000

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const filesystem = new Filesystem()

  for (let i = 0; i < input.length; i++) {
    const row = input[i]
    if (row[0] === "$") {
      if (row[1] === "cd") {
        filesystem.changeDir(row[2])
      } else if (row[1] === "ls") {
        continue
      }
    } else if (row[0] === "dir") {
      filesystem.addNodeToCurrentDir("dir", row[1])
    } else {
      filesystem.addNodeToCurrentDir("file", row[1], row[0])
    }
  }

  const allDirs = filesystem.getAllDirsAndSizes()
  const root = allDirs.shift()
  const couldBeDeleted = []
  const availableSpace = DISC_SIZE - root.size

   allDirs.forEach((directory) => {
    if (directory.size + availableSpace > NEEDED_SPACE) {
      couldBeDeleted.push(directory.size)
    }
  })

  return Math.min(...couldBeDeleted)
}

const part1Config = {
  tests: [
    {
      input: example1,
      expected: 95437,
    },
  ],
  solution: part1,
}

const part2Config = {
  tests: [
    {
      input: example1,
      expected: 24933642,
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
