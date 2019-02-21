*** Keywords ***

ตรวจสอบการเข้าถึงหน้าแรก
    [Arguments]     ${urlpage}
    Open Browser    ${urlpage}    gc
    Location Should Be    ${urlpage}

ตรวจสอบคลิกปุ่มเช็กอินแสดงหน้าต่างเช็กอิน
    #[Arguments]     ${urlpage}
    Open Browser    ${urlpage}    gc
    Location Should Be    ${urlpage}