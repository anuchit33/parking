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

  it('calls api post carlist', () => {

    fetch.mockResponseOnce(JSON.stringify({ id: 1,number: '1111',rfid: 1 }))
    let data ={ number: '1111',rfid: 1}
    //assert on the response
    Api.post('/carlist/',data,(status,res) => {
      
      expect(status).toEqual(201)
      expect(res).toEqual({ id: 1,number: '1111',rfid: 1 })
    })
 
    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
  })
})