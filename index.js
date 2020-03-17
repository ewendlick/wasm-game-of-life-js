import { Universe, Cell } from 'wasm-game-of-life'

import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg'

const CELL_SIZE = 5 // px
const GRID_COLOR = '#ccc'
const DEAD_COLOR = '#fff'
const ALIVE_COLOR = '#000'

const universe = Universe.new()
const width = universe.width()
const height = universe.height()


const canvas = document.getElementById('game-of-life-canvas')
canvas.height = (CELL_SIZE + 1) * height + 1
canvas.width = (CELL_SIZE + 1) * width + 1

const context = canvas.getContext('2d')

const drawGrid = () => {
  context.beginPath()
  context.strokeStyle = GRID_COLOR

  // Vertical lines
  for (let i = 0; i <= width; i++) {
    context.moveTo(i * (CELL_SIZE + 1) + 1, 0)
    context.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1)
  }

  // Horizontal
  for (let j = 0; j <= height; j++) {
    context.moveTo(0, j * (CELL_SIZE + 1) + 1)
    context.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1)
  }

  context.stroke()
}

const getIndex = (row, column) => {
  return row * width + column
}

const drawCells = () => {
  const cellsPtr = universe.cells()
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)

  context.beginPath()

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col)

      context.fillStyle = cells[idx] === Cell.Dead
        ? DEAD_COLOR
        : ALIVE_COLOR

      context.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      )
    }
  }

  context.stroke()
}

// The Javascript runs in a requestAniamtionFrame loop.
// On each iteration, it draws the current universe to the <canvas>., and then calls Universe::tick
const renderLoop = () => {
  // debugger;
  universe.tick()
  drawGrid()
  drawCells()

  requestAnimationFrame(renderLoop)
}

drawGrid()
drawCells()

requestAnimationFrame(renderLoop)
