import Api from './Api'
global.fetch = require('jest-fetch-mock')

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
 
  it('calls api get counter', () => {

    fetch.mockResponseOnce(JSON.stringify({ count: 1 }))
 
    //assert on the response
    Api.get('/carlist/count/',(status,res) => {

      expect(res.count).toEqual(1)
    })
 
    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
  })
})