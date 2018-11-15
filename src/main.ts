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

interface Force {
  dx: number
  dy: number
}

function calcForce(a: Point, b: Point): Force {
  const f = power(a, b)
  const t = angle(a, b)
  var dy = f * Math.sin(t)
  var dx = f * Math.cos(t)
  if (a.x < b.x) {
    dx *= -1;
    dy *= -1;
  }
  return { dx, dy }
}

var target: Point = undefined
const ghost = document.getElementById('ghost')
const canvas = document.getElementById('canvas')

Sketch.create({
  autoclear: false,
  retina: 'auto',
  container: canvas,
  eventTarget: canvas,
  setup() {
    this.r = this.g = this.b = random(100, 200)
    target = { x: this.width / 2.0, y: this.height / 2.0 }
  },
  touchmove() {
    const touch = { x: this.touches[0].x, y: this.touches[0].y }
    this.r = 255 * (touch.x / this.width)
    this.g = 255 * (touch.y / this.height)
    this.b = 255 * abs(cos(PI * touch.y / this.width))
    const { dx, dy } = calcForce(target, touch)
    const space = 30
    const newX = Math.min(Math.max(space, target.x + dx), this.width - space)
    const newY = Math.min(Math.max(space, target.y + dy), this.height - space)
    target = { x: newX, y: newY }
  },
  draw() {
    this.fillStyle = `rgb(${~~this.r},${~~this.g},${~~this.b})`
    this.beginPath()
    this.arc(target.x, target.y, 10, 0, 2 * Math.PI)
    this.fill();
    ghost.style.top = `${target.y}px`
    ghost.style.left = `${target.x}px`
  }
})
