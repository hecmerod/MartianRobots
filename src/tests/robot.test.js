const supertest = require('supertest')
const app = require('../app')
const cache = require('../middleware/cache')

const api = supertest(app)

beforeEach(() => {
  cache.del('robot')
  cache.del('grid')
})

test('/robot/deploy/x/y/facing deploys a robot', async () => {
  const x = 5; const y = 6; const facing = 'N'

  cache.set('grid', { x: 10, y: 7 })

  await api.get(`/robot/deploy/${x}/${y}/${facing}`).expect(200)

  const robot = cache.get('robot')

  expect(robot).toStrictEqual({ x, y, facing })
})

test('grid has to be created before deploying robot', async () => {
  const x = 5; const y = 6; const facing = 'N'

  await api.get(`/robot/deploy/${x}/${y}/${facing}`).expect(200)

  const robot = cache.get('robot')

  expect(robot).toBe(undefined)
})

test('x or y cant be negative', async () => {
  let x = -5; let y = 6; const facing = 'N'
  await api.get(`/robot/deploy/${x}/${y}/${facing}`).expect(200)
  let robot = cache.get('robot')
  expect(robot).toBe(undefined)

  x = 5, y = -6
  await api.get(`/robot/deploy/${x}/${y}/${facing}`).expect(200)
  robot = cache.get('robot')
  expect(robot).toBe(undefined)
})

test('facing has to be N || S || E || W', async () => {
  const x = -5; const y = 6; const facing = 'P'
  await api.get(`/robot/deploy/${x}/${y}/${facing}`).expect(200)
  const robot = cache.get('robot')
  expect(robot).toBe(undefined)
})
