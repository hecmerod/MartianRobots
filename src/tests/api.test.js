const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('API is connected.',
  async () => {
    await api.get('/')
      .expect(200)
  })
