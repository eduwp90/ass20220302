import  mongoose  from '../../../../config/DatabaseConfig'
import { findMonthTransactions } from '../transactionsService'

beforeAll((done) => {
  mongoose.connection.on('connected', () => {
    done()
  })
})

describe('findMonthTransactions tests', function () {
  it('returns an empty array when no transactions by user', async () => {
    const result = await findMonthTransactions(3, '2021-01-05')

    expect(result).toHaveLength(0)
  })

  it('returns an empty array when no transactions by date', async () => {
    const result = await findMonthTransactions(1, '2022-05-05')

    expect(result).toHaveLength(0)
  })

  it('returns an array of objects if exists', async () => {
    const result = await findMonthTransactions(1, '2021-01-05')

    expect(result).toHaveLength(4)
  })

  it('returns an array of single object', async () => {
    const result = await findMonthTransactions(42, '2021-01-05')

    expect(result).toHaveLength(1)
  })

  it('Logs error when invalid args', async () => {
    jest.spyOn(console, 'error')
    // @ts-ignore
    await findMonthTransactions('ed', '2021-13-05')

    expect(console.error).toHaveBeenCalled()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
