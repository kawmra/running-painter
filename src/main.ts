import * as Sketch from 'sketch-js'

interface Point {
  x: number
  y: number
}

function power(a: Point, b: Point): number {
  return 100 / distance(a, b)
}

function angle(a: Point, b: Point): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.atan(dy / dx)
}

function angle2(a: Point, b: Point): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.atan(dx / dy)
}

function distance(a: Point, b: Point): number {
  const dx = b.x - a.x
  const dy = b.y - a.y
  return Math.sqrt(dx * dx + dy * dy)
}

var target: Point = undefined

Sketch.create({
  autoclear: false,
  retina: 'auto',
  setup() {
    this.r = this.g = this.b = random(100, 200)
    target = { x: this.width / 2.0, y: this.height / 2.0 }
  },
  mousemove() {
    this.r = 255 * (this.mouse.x / this.width)
    this.g = 255 * (this.mouse.y / this.height)
    this.b = 255 * abs(cos(PI * this.mouse.y / this.width))
    const mouse = { x: this.mouse.x, y: this.mouse.y }
    const f = power(target, mouse)
    const a = angle(target, mouse)
    const a2 = angle2(target, mouse)
    var dy = f * Math.sin(a)
    var dx = f * Math.cos(a)
    if (target.x < mouse.x) {
      dx *= -1;
      dy *= -1;
    }
    target = { x: target.x + dx, y: target.y + dy }
  },
  draw() {
    this.fillStyle = `rgb(${~~this.r},${~~this.g},${~~this.b})`
    this.beginPath()
    this.arc(target.x, target.y, 10, 0, 2 * Math.PI)
    this.fill();
  }
})
