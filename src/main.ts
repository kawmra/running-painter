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
  touchmove() {
    const touch = { x: this.touches[0].x, y: this.touches[0].y }
    this.r = 255 * (touch.x / this.width)
    this.g = 255 * (touch.y / this.height)
    this.b = 255 * abs(cos(PI * touch.y / this.width))
    const f = power(target, touch)
    const a = angle(target, touch)
    var dy = f * Math.sin(a)
    var dx = f * Math.cos(a)
    if (target.x < touch.x) {
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
