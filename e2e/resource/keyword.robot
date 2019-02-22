*** Keywords ***

ตรวจสอบการเข้าถึงหน้าแรก
    [Arguments]     ${urlpage}
    Open Browser    ${urlpage}    gc
    Location Should Be    ${urlpage}

ตรวจสอบคลิกปุ่มเช็กอินแสดงหน้าต่างเช็กอิน
    #[Arguments]     ${urlpage}
    Open Browser    ${urlpage}    gc
    Location Should Be    ${urlpage}

นำเข้ารถ1111และRFID1
# ตรวจสอบคลิกปุ่ม
  Wait Until Page Contains Element  id:btnCheckin
  
  # คลิกปุ่มเช็กอินเปิดหน้าต่างเช็กอิน
  Click Element   id:btnCheckin
  Wait Until Page Contains Element  id:checkinPopup
  
  # ตรวจสอบรูปภาพเช็กอิน
  Wait Until Page Contains Element  id:imageCheckin

  # กรอกข้อมูลทะเบียนรถได้
  Wait Until Page Contains Element  id:inputCarNumber
  Input Text    id:inputCarNumber   1111

  # กรอกข้อมูลRFID
  Wait Until Page Contains Element  id:inputRFID
  Input Text    id:inputRFID   1

  # กดปุ่มบันทึกเช็กอินได้
  Wait Until Page Contains Element  id:btnSubmitCheckin
  Click Element   id:btnSubmitCheckin