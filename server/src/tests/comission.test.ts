var request = require("supertest")
import { app, server } from '../server'
import mongoose from '../config/DatabaseConfig'
import mockData from './mockData'

const api = request(app)

beforeAll((done) => {
  mongoose.connection.on('connected', () => {
    done()
  })
})

describe('GET /v1/commission', function () {
  it('responds as json', async () => {
    await api.post('/v1/commission')
      .send(mockData[0])
      .expect(200)
      .expect('Content-Type', /json/)
  })

  it('responds error code if bad request', async () => {
    await api.post('/v1/commission')
      .expect(500)
  })

  it('responded commission in EUR', async () => {
    for (const mock of mockData) {
      const response = await api.post('/v1/commission')
        .send(mock)
        .expect(200)

      expect(response.body.currency).toBe('EUR')
    }
  })

  it('responds with a correct commission on default pricing', async () => {
    const response = await api.post('/v1/commission')
      .send(mockData[0])
      .expect(200)

    expect(response.body.amount).toBe('50')
  })

  it('responds with a correct commission on turnover discount', async () => {
    const response = await api.post('/v1/commission')
      .send(mockData[1])
      .expect(200)

    expect(response.body.amount).toBe('0.03')
  })

  it('responds with a correct commission when passed USD as currency', async () => {
    const response = await api.post('/v1/commission')
      .send(mockData[2])
      .expect(200)

    expect(response.body.amount).toBe('44.98')
  })

  it('responds with a correct commission when special user', async () => {
    const response = await api.post('/v1/commission')
      .send(mockData[3])
      .expect(200)

    expect(response.body.amount).toBe('0.05')
  })

  it('responds with a correct minimum commission', async () => {
    const response = await api.post('/v1/commission')
      .send(mockData[4])
      .expect(200)

    expect(response.body.amount).toBe('0.05')
  })

    it('responds with a 404 on a bad request', async () => {
    const response = await api.get('/v1/commission')
      .send(mockData[4])
      .expect(404)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
