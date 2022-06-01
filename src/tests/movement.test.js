const supertest = require('supertest')
const app = require('../app')
const cache = require('../middleware/cache')

const api = supertest(app)

beforeEach(() => {
  cache.del('robot')

  cache.set('grid', { x: 5, y: 3 })
})

test('/robot/move/instructions doesnt accept wrong characters', async () => {
  cache.set('robot', { x: 1, y: 1, facing: 'E' })

  await api.get('/robot/move/ASASDFASDASD').expect(200)

  const robot = cache.get('robot')

  expect(robot).toStrictEqual({ x: 1, y: 1, facing: 'E' })
})

test('first input on /robot/move/instructions', async () => {
  cache.set('robot', { x: 1, y: 1, facing: 'E' })

  await api.get('/robot/move/RFRFRFRF').expect(200)

  const robot = cache.get('robot')

  expect(robot).toStrictEqual({ x: 1, y: 1, facing: 'E' })
})

test('second input on /robot/move/instructions moves the robot', async () => {
  cache.set('robot', { x: 3, y: 2, facing: 'N' })

  await api.get('/robot/move/FRRFLLFFRRFLL').expect(200)

  const robot = cache.get('robot')

  expect(robot).toBe(undefined)
})

test('third input on /robot/move/instructions moves the robot', async () => {
  cache.set('robot', { x: 0, y: 3, facing: 'W' })

  await api.get('/robot/move/LLFFFRFLFL').expect(200)

  const robot = cache.get('robot')

  expect(robot).toStrictEqual({ x: 4, y: 2, facing: 'N' })
})

test('/robot/move/instructions should not have more than 100 instructions', async () => {
  cache.set('robot', { x: 0, y: 3, facing: 'N' })

  await api.get(`/robot/move/${'F'.repeat(101)}`).expect(200)

  const robot = cache.get('robot')

  expect(robot).toStrictEqual({ x: 0, y: 3, facing: 'N' })
})