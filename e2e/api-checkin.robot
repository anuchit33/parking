*** Settings ***
Library     Collections
Library     RequestsLibrary

Resource   ${EXECDIR}/e2e/resource/api-keyword.robot

Test setup	  ClearDataINDB

*** Test Cases ***


Get Requests
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/x-www-form-urlencoded
    ${data}=    Create Dictionary    number=1111        rfid=1
    ${resp}=       POST Request      api     /carlist/      data=${data}        headers=${headers}
    Should Be Equal As Strings      ${resp.status_code}     201