*** Settings ***
Library     Collections
Library     RequestsLibrary

Resource   ${EXECDIR}/e2e/resource/api-keyword.robot

Test setup	  ClearDataINDB

*** Test Cases ***


Post สร้างรายการจอดรถสำเร็จ

    # สร้างรายการจอดรถสำเร็จ
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/x-www-form-urlencoded
    ${data}=    Create Dictionary    number=1111        rfid=2
    ${resp}=       POST Request      api     /carlist/      data=${data}        headers=${headers}
    Log        ${resp.json()} 
    Should Be Equal As Strings      ${resp.status_code}     201
    Dictionary Should Contain Value     ${resp.json()}      1111        2

Post สร้างรายการจอดรถไม่สำเร็จ เพราะไม่กรอก RFID
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    # สร้างรายการจอดรถไม่สำเร็จ เพราะไม่กรอก RFID
    ${data}=    Create Dictionary    number=2222
    ${resp}=       POST Request      api     /carlist/      data=${data}        headers=${headers}
    Should Be Equal As Strings      ${resp.status_code}     400
    Log        ${resp.json()}
    Dictionary Should Contain Key     ${resp.json()}       rfid

Post สร้างรายการจอดรถไม่สำเร็จ RFID ซ้ำ
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    # สร้างรายการจอดรถไม่สำเร็จ RFID ซ้ำ
    ${data}=    Create Dictionary    number=1111        rfid=2
    ${resp}=       POST Request      api     /carlist/      data=${data}        headers=${headers}
    ${resp}=       POST Request      api     /carlist/      data=${data}        headers=${headers}
    Should Be Equal As Strings      ${resp.status_code}     400
    Dictionary Should Contain Key     ${resp.json()}       rfid

Post สร้างรายการจอดรถไม่สำเร็จ จำนวนรถเต็มแล้ว   
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    # สร้างรายการจอดรถไม่สำเร็จ จำนวนรถเต็มแล้ว
    ${data}=    Create Dictionary    number=8888        rfid=51

    # จำรองสร้างรถ 50 รายการ
    ${resp}=       GET Request      api     /carlist/create/50/
    Should Be Equal As Strings      ${resp.status_code}     200
    
    ${resp}=       POST Request      api     /carlist/      data=${data}        headers=${headers}
    Should Be Equal As Strings      ${resp.status_code}     400
    Log        ${resp.json()}
    Dictionary Should Contain Key     ${resp.json()}       error


Get ดึงจำนวนรถทั้งหมด

    # ดึงจำนวนรถทั้งหมด
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${resp}=       GET Request      api     /carlist/count/     headers=${headers}
    Log        ${resp.json()} 
    Should Be Equal As Strings      ${resp.status_code}     200
    Dictionary Should Contain Item     ${resp.json()}        count      0

Get ดึงจำนวนรถทั้งหมด 50 คัน
    # จำรองสร้างรถ 50 รายการ
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${resp}=       GET Request      api     /carlist/create/50/
    Should Be Equal As Strings      ${resp.status_code}     200

    # ดึงจำนวนรถทั้งหมด 50 คัน
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${resp}=       GET Request      api     /carlist/count/     headers=${headers}
    Log        ${resp.json()} 
    Should Be Equal As Strings      ${resp.status_code}     200
    Dictionary Should Contain Item     ${resp.json()}        count      50


Get ค้นหา RFID 1 จากรถ 50 คัน
    # จำรองสร้างรถ 50 รายการ
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${resp}=       GET Request      api     /carlist/create/50/
    Should Be Equal As Strings      ${resp.status_code}     200

    # ดึงจำนวนรถทั้งหมด 50 คัน
    Create Session      api     http://127.0.0.1:8000
    ${headers}=    Create Dictionary    Content-Type=application/json
    ${resp}=       GET Request      api     /carlist/?rfid=1    headers=${headers}
    Log        ${resp.json()} 
    Should Be Equal As Strings      ${resp.status_code}     200
    Dictionary Should Contain Item     ${resp.json()[0]}         rfid     1