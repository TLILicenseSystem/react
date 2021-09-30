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

export const SearchSales = () => {
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );
  const [saleList, setSaleList] = useState(null);
  const dispatch = useDispatch();

  const onSearchSale = async (key, value) => {
    if (key === "name") {
      // let response = await searchSalesbyname(value.fisrtName, value.lastName);
      // console.log(response);
      dispatch(
        showSelectSalePopup({
          title: "รายชื่อฝ่ายขาย",
          list: [
            {
              id: "3520600049051",
              firstName: "สมนึก",
              lastName: "สมสาย",
              oldName: "",
              seqNo: "1",
              preName: "000001",
              personID: "00000000",
              branchCode: "501",
              noteNo: "09",
              salesID: "0000490968",
              citizenID: "3520600049051",
              depositNo: "04151",
              highStrid: "A50104151T",
              statusDate: "25610401",
              status: "M",
            },
            {
              id: "0000000000000",
              firstName: "สมนึก",
              lastName: "สมสุขสวัสดิ์กุล",
              oldName: "",
              seqNo: "1",
              preName: "000002",
              personID: "00000000",
              branchCode: "007",
              noteNo: "09",
              salesID: "0000202712",
              citizenID: "0000000000000",
              depositNo: "01685",
              highStrid: "A00701685Z",
              statusDate: "25430203",
              status: "Q",
            },
          ],
        })
      );
      setSaleList({
        headerData: {
          version: "",
          sentDateTime: "31-03-2020 13:47:01",
          messageId: "3fe0a3c63603b7ea",
          responseDateTime: "29-09-2021 10:08:21",
        },
        responseRecord: {
          nameList: [
            {
              firstName: "สมนึก",
              lastName: "สมสาย",
              oldName: "",
              seqNo: "1",
              preName: "000001",
              personID: "00000000",
              branchCode: "501",
              noteNo: "09",
              salesID: "0000490968",
              citizenID: "3520600049051",
              depositNo: "04151",
              highStrid: "A50104151T",
              statusDate: "25610401",
              status: "M",
            },
            {
              firstName: "สมนึก",
              lastName: "สมสุขสวัสดิ์กุล",
              oldName: "",
              seqNo: "1",
              preName: "000002",
              personID: "00000000",
              branchCode: "007",
              noteNo: "09",
              salesID: "0000202712",
              citizenID: "0000000000000",
              depositNo: "01685",
              highStrid: "A00701685Z",
              statusDate: "25430203",
              status: "Q",
            },
          ],
        },
        responseStatus: {
          statusCode: "S",
          errorMessage: "SUCCESS",
          errorCode: "200",
        },
      });
    } else
      setSaleData({
        email: "",
        institution: "โรงเรียนแม่จันวิทยา",
        firstName: "นิ่มนวล",
        lastName: "ทายะนา",
        receiveDate: "00000000",
        seqNo: "01",
        preName: "000002",
        personID: "00102827",
        branchCode: "142",
        noteNo: "01",
        salesID: "0000000003",
        citizenID: "3509901178291",
        depositNo: "00385",
        highStrid: "G037.77L",
        statusDate: "25610201",
        bloodGroup: "3",
        race: "01",
        startDate: "25570101",
        contactAddressID: "0000351930",
        contactAddressType: "0",
        reserve: "A",
        wantSMS: "1",
        changeType: "0",
        changeDate: "00000000",
        strid: "G470.17L",
        salary: "000000",
        parentSalesID: "0000019212",
        parentStrid: "H470A",
        sex: "F",
        nationality: "0",
        religion: "1",
        maritalStatus: "4",
        educateCode: "02",
        leavingYear: "0000",
        localAddressID: "0000000003",
        mobilePhone: "0987461358",
        birthDate: "24960101",
        nameID: "0000000003",
        status: "N",
        noteDetail: "แต่งตั้งผู้บริหารภาคการขาย",
      });
  };

  const selectSale = (data) => {
    //  sessionStorage.
    setSaleData({
      email: "",
      institution: "โรงเรียนแม่จันวิทยา",
      firstName: "นิ่มนวล",
      lastName: "ทายะนา",
      receiveDate: "00000000",
      seqNo: "01",
      preName: "000002",
      personID: "00102827",
      branchCode: "142",
      noteNo: "01",
      salesID: "0000000003",
      citizenID: "3509901178291",
      depositNo: "00385",
      highStrid: "G037.77L",
      statusDate: "25610201",
      bloodGroup: "3",
      race: "01",
      startDate: "25570101",
      contactAddressID: "0000351930",
      contactAddressType: "0",
      reserve: "A",
      wantSMS: "1",
      changeType: "0",
      changeDate: "00000000",
      strid: "G470.17L",
      salary: "000000",
      parentSalesID: "0000019212",
      parentStrid: "H470A",
      sex: "F",
      nationality: "0",
      religion: "1",
      maritalStatus: "4",
      educateCode: "02",
      leavingYear: "0000",
      localAddressID: "0000000003",
      mobilePhone: "0987461358",
      birthDate: "24960101",
      nameID: "0000000003",
      status: "N",
      noteDetail: "แต่งตั้งผู้บริหารภาคการขาย",
    });
    sessionStorage.setItem("sale", JSON.stringify(saleData));
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
