*** Keywords ***

ClearDataINDB
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${resp}=       GET Request      api     /carlist/clear_all/
    Should Be Equal As Strings      ${resp.status_code}     200
