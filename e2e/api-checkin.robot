*** Settings ***
Library     Collections
Library     RequestsLibrary

Resource   ${EXECDIR}/e2e/resource/api-keyword.robot

Test setup	  ClearDataINDB

*** Test Cases ***


Post Requests

    # สร้างรายการจอดรถสำเร็จ
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/x-www-form-urlencoded
    ${data}=    Create Dictionary    number=1111        rfid=2
    ${resp}=       POST Request      api     /carlist/      data=${data}        headers=${headers}
    Log        ${resp.json()} 
    Should Be Equal As Strings      ${resp.status_code}     201
    Dictionary Should Contain Value     ${resp.json()}      1111        2

    # สร้างรายการจอดรถไม่สำเร็จ เพราะไม่กรอก RFID
    ${data}=    Create Dictionary    number=2222
    ${resp2}=       POST Request      api     /carlist/      data=${data}        headers=${headers}
    Should Be Equal As Strings      ${resp2.status_code}     400
    Log        ${resp2.json()}
    Dictionary Should Contain Key     ${resp2.json()}       rfid

    # สร้างรายการจอดรถไม่สำเร็จ RFID ซ้ำ
    ${data}=    Create Dictionary    number=1111        rfid=2
    Log        ${resp2.json()}
    Should Be Equal As Strings      ${resp.status_code}     400
    Dictionary Should Contain Key     ${resp2.json()}       rfid
    
