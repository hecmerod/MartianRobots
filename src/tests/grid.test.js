const supertest = require('supertest')
const app = require('../app')
const cache = require('../middleware/cache')

const api = supertest(app)

test('/grid/create/x/y creates a grid', async () => {
    const x = 5, y = 6

    await api.get(`/grid/create/${x}/${y}`).expect(200)

    const grid = cache.get('grid')

    expect(grid).toStrictEqual({'x': x, 'y': y})
})

test('x or y cant be negative', async () => {
    var x = -5, y = 6
    await api.get(`/grid/create/${x}/${y}`).expect(200)
    var grid = cache.get('grid')
    expect(grid).toBe(undefined)

    x = 5, y = -6
    await api.get(`/grid/create/${x}/${y}`).expect(200)
    grid = cache.get('grid')
    expect(grid).toBe(undefined)

    x = -5, y = -6
    await api.get(`/grid/create/${x}/${y}`).expect(200)
    grid = cache.get('grid')
    expect(grid).toBe(undefined)
})