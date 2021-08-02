
  //-----------------------for GET Method------------------
  // const fetchData = async () => {

  //   const { status, data } = await api.get("/searchExamRoundProcessAll");
  //   if (status === 200) {
  //     setResult(data.responseRecord.arrData); //เมื่อ setResult แล้ว ค่า result จะได้เป็นค่า arraylist ของ data สามารถนำค่า resultมาใช้ได้เลย เช่น result[0] คือ arrayตัวที่0
  //     console.log("result in fetchData >>>>>>>>>>>>>.. ",data.responseRecord.arrData);
  //   } else {
  //     alert("พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ!");
  //   }
  // };

 
  //-----------------------for POST Method searchAll-------------------------
  // const fetchData = async () => {
  //   const request = {
  //     headerData: {
  //       messageId: messageId,
  //       sentDateTime: date,
  //       responseDateTime: date,
  //     },
  //     requestRecord: {
  //       roundId: "",
  //       type: "A",
  //     },
  //   };

  //   const { status, data } = await api.post("/searchExamRoundProcess", request);
  //   if (status === 200) {
  //     setResult(data.responseRecord.arrData); //เมื่อ setResult แล้ว ค่า result จะได้เป็นค่า arraylist ของ data สามารถนำค่า resultมาใช้ได้เลย เช่น result[0] คือ arrayตัวที่0
  //     console.log("result in fetchData >>>>>>>>>>>>>.. ",data.responseRecord.arrData);
  //   } else {
  //     alert("พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ!");
  //   }
  // };

  
  //-------------------------for insert/update/delete--------------
  // const doExamRoundProcess = async (roundId, timeStr, processType) => {

    // const request = {
    //   headerData: {
    //     messageId: messageId,
    //     sentDateTime: date,
    //     responseDateTime: date,
    //   },
    //   requestRecord: {
    //     roundId: roundId,
    //     timeStr: timeStr,
    //     create_user_code: create_user_code,
    //     create_time: "00.00",
    //     update_user_code: update_user_code,
    //     last_update: "00.00",
    //     processType: processType,
    //   },
    // };

  //   const { status, data } = await api.post("/doExamRoundProcess", request);
  //   if (status === 200) 
  //   {
  //     // setResult(data.responseRecord.arrData); //เมื่อ setResult แล้ว ค่า result จะได้เป็นค่า arraylist ของ data สามารถนำค่า resultมาใช้ได้เลย เช่น result[0] คือ arrayตัวที่0
  //     console.log("result in doExamRoundProcess >>>>>>>>>>>>>.. ", data.responseStatus.status);
  //     if(data.responseStatus.status === 'S') //S=SUCCESS,E=ERROR
  //     {
  //         if (pressEdit) 
  //         {
  //           //ทำการ update row ในตาราง
  //           updateItem(id, "timeStr", `${start}-${end}`);
  //           alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  //         } 
  //         else 
  //         {
  //           if (processType === "D")
  //           {
  //             //delete row ในตาราง
  //             setResult(result.filter((item) => item.roundId !== roundId)); //ให้แสดงข้อมูลทั้งหมดใน result โดยไม่แสดง roundId ที่ส่งเข้ามา
  //             examRoundClear();
  //             alert("ลบข้อมูลเรียบร้อยแล้ว");
  //           }
  //           else 
  //           {
  //             //add row ในตาราง
  //             setResult([...result, { roundId: id, timeStr: `${start}-${end}` }]);
  //             alert("บันทึกข้อมูลเรียบร้อยแล้ว");
  //           }
  //         }
  //       }
  //       else
  //         alert("พบข้อผิดพลาด!");
  //   } 
  //   else {
  //     alert("พบข้อผิดพลาด! ",status);

  //   }

  // };


 