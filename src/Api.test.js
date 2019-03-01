import Api from './Api'
global.fetch = require('jest-fetch-mock')

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })
 
  it('calls api get counter', async () => {

    fetch.mockResponseOnce(JSON.stringify([{number: 1111,rfid: 1}]))
 
    //assert on the response
    const data = await Api.get('/carlist/')
    expect(data.data.length).toEqual(1);
    expect(data.status_code).toEqual(200);
 
    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1)
  })

  it('calls api post carlist', async () => {

    fetch.mockResponseOnce(JSON.stringify({ id: 1,number: '1111',rfid: 1 },201))
    let data_post ={ number: '1111',rfid: 1}
    //assert on the response
    const data = await Api.post('/carlist/',data_post) 
    expect(data.data).toEqual({ id: 1,number: '1111',rfid: 1 })
    expect(fetch.mock.calls.length).toEqual(1)
  })
})