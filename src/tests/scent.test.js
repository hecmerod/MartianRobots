const supertest = require('supertest')
const app = require('../app')
const cache = require('../middleware/cache')

const api = supertest(app)

beforeEach(() => {
  cache.set('grid', { x: 5, y: 3 })
  cache.set('robot', { x: 0, y: 0, facing: 'S' })
  cache.del('00S')
})

test('scent has been created', async () => {
  await api.get('/robot/move/F').expect(200)

  const scent = cache.get('00S')

  expect(scent).not.toBe(undefined)
})

test('if theres a scent robot doesnt fall', async () => {
  await api.get('/robot/move/F').expect(200)

  cache.set('robot', { x: 0, y: 0, facing: 'S' })

  await api.get('/robot/move/RRFRR').expect(200)

  const robot = cache.get('robot')

  expect(robot).toStrictEqual({ x: 0, y: 1, facing: 'S' })
})
