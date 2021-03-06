*** Settings ***
Library   Selenium2Library

Resource   ${EXECDIR}/e2e/resource/keyword.robot
Resource   ${EXECDIR}/e2e/resource/variable.robot

*** Variables ***

${urlmainpage}    http://localhost:3000/

Test setup	  ClearDataINDB

*** Test Cases ***

test เช็กเอาสำเร็จ
  ตรวจสอบการเข้าถึงหน้าแรก    ${urlmainpage}

  # ตรวจสอบปุ่มเช็กเอา
  Wait Until Page Contains Element  id:btnCheckout
  
  # คลิกปุ่มเช็กอินเปิดหน้าต่างเช็กอิน
  Click Element   id:btnCheckout
  Wait Until Page Contains Element  id:rfidPopup

  # กรอกข้อมูลRFID และ enter
  Wait Until Page Contains Element  id:inputRFID
  Input Text    id:inputRFID   1\n


  # แสดงข้อมูลเช็กเอา
  Wait Until Page Contains Element  id:popupCheckout

  ClearDataINDB
