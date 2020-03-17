import { Universe } from 'wasm-game-of-life';

// wasm.greet("Stringy McStringerson");

const pre = document.getElementById('game-of-life-canvas')
const universe = Universe.new()

// The Javascript runs in a requestAniamtionFrame loop.
// On each iteration, it draws the current universe to the <preP., and then calls Universe::tick
//
const renderLoop = () => {
  pre.textContent = universe.render()
  universe.tick()

  requestAnimationFrame(renderLoop)
}

requestAnimationFrame(renderLoop)
