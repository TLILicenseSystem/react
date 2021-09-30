import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import {
  FilterCollapse,
  PersonelData,
  PersonelSearch,
  SelectSalePopup,
} from "../shared";
import { showSelectSalePopup } from "../../redux/actions";
import { useDispatch } from "react-redux";
import {searchSalesbyname,searchPersonset} from "../../api/apiSearchSale"
import Swal from "sweetalert2";


export const SearchSales = () => {
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );
  const dispatch = useDispatch();

  const onSearchSale = async (key, value) => {
    if (key === "name") {
      let response = await searchSalesbyname(value.firstName, value.lastName);
      if(response.data && response.data.responseStatus.errorCode ==="200" ){
        let row = response.data.responseRecord.nameList.map((row) => {
          const { citizenID,firstName,lastName ,...rest } = row;
          return { id: citizenID, name: `${firstName} ${lastName}`,citizenID, ...rest };
        });
        dispatch(
          showSelectSalePopup({
            title: "รายชื่อฝ่ายขาย",
            list: row
          })
        );
       }else if(response.data && response.data.responseStatus.errorCode !== "200"){
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: response.data.responseStatus.errorMessage || "ไม่พบข้อมูลที่ต้องการ",
        });
      }
    } else{
      let type = ""
      switch (key) {
        case "citizenID":
          type = "C";
          break;
        case "personID":
          type = "P";
          break;    
        case "depositCode":
            type = "D";
            break; 
        default:
          break;
      }
     alert(value[key])
     let response = await searchPersonset(type, value[key].replaceAll("-",""));
      if(response.data && response.data.responseStatus.errorCode ==="200" ){
        setSaleData(response.data.responseRecord)
        sessionStorage.setItem("sale", JSON.stringify(response.data.responseRecord));
      }else if(response.data && response.data.responseStatus.errorCode !== "200"){
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: response.data.responseStatus.errorMessage || "ไม่พบข้อมูลที่ต้องการ",
        });
      }
    }

    
  };

  const selectSale =  async (data) => {
    let response = await searchPersonset("C", data.citizenID.replaceAll("-",""));
    if(response.data && response.data.responseStatus.errorCode ==="200" ){
      setSaleData(response.data.responseRecord)
      sessionStorage.setItem("sale", JSON.stringify(response.data.responseRecord));
    }else if(response.data && response.data.responseStatus.errorCode !== "200"){
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: response.data.responseStatus.errorMessage || "ไม่พบข้อมูลที่ต้องการ",
      });
    }
  };

  return (
    <Card style={{ border: "none" }}>
      <CardBody>
        <FilterCollapse title="ตัวกรองข้อมูล">
          <PersonelSearch onSearch={onSearchSale} />
        </FilterCollapse>
      </CardBody>
      <CardBody style={{ padding: "20px" }}>
        <SelectSalePopup onChange={(v) => selectSale(v)} />
        <PersonelData data={saleData} />
      </CardBody>
    </Card>
  );
};
