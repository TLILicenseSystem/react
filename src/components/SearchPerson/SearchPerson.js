import React, { useState } from "react";
import {
  Card,
  CardBody,
  ButtonGroup,
  Button,
  TabPane,
  TabContent,
} from "reactstrap";
import { get } from "lodash";
import {
  FilterCollapse,
  PersonelData,
  SaleSearch,
  SelectSalePopup,
  EmployeeSearch,
} from "../shared";
import { showSelectSalePopup, updateSelectSale } from "../../redux/actions";
import { useDispatch } from "react-redux";
import {
  searchSalesbyname,
  searchPersonset,
  searchLicenseNo,
  searchEmployeeInfo,
} from "../../api/apiSearchSale";
import { getLicenseByCid } from "../../api/apiLicense";
import Swal from "sweetalert2";

export const SearchPerson = () => {
  const [saleData, setSaleData] = useState(
    sessionStorage.getItem("sale")
      ? JSON.parse(sessionStorage.getItem("sale"))
      : null
  );
  const [, forceUpdate] = useState(0);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const onSearchEmployee = async (key, value) => {
    // E = ค้นหาด้วยรหัสพนักงาน
    // C = ค้นหาด้วยรหัสบัตรประชาชน
    // M = ค้นหาด้วยชื่อ (like)
    if (key === "licenseNo") {
      let response = await searchLicenseNo(value[key].replaceAll("-", ""), "E");
      if (response.data && response.data.responseStatus.errorCode === "200") {
        if (
          response.data.responseRecord.status === "Q" ||
          response.data.responseRecord.status === "M" ||
          response.data.responseRecord.status === "D"
        ) {
          Swal.fire({
            icon: "warning",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
          });
        }
        let licenseNo = await getLicenseByCid(
          response.data.responseRecord.citizenID
        );
        response.data.responseRecord["licenseNo"] = get(
          licenseNo.license,
          "licenseNo",
          ""
        );
        response.data.responseRecord["expireDate"] = get(
          licenseNo.license,
          "expireDate",
          ""
        );
        response.data.responseRecord["agentType"] = "E";

        setSaleData(response.data.responseRecord);
        sessionStorage.setItem(
          "sale",
          JSON.stringify(response.data.responseRecord)
        );
        forceUpdate((n) => !n);
        dispatch(
          updateSelectSale({
            seleted: response.data.responseRecord,
          })
        );
      } else if (
        response.data &&
        response.data.responseStatus.errorCode !== "200"
      ) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text:
            response.data.responseStatus.errorMessage ||
            "ไม่พบข้อมูลที่ต้องการ",
        });
      }
    } else {
      let type = "";
      switch (key) {
        case "citizenID":
          type = "C";
          break;
        case "employeeID":
          type = "E";
          break;
        case "name":
          type = "M";
          value["name"] = value.firstName + "," + value.lastName;
          break;
        default:
          break;
      }
      let response = await searchEmployeeInfo(
        type,
        value[key].replaceAll("-", "")
      );
      if (response.data && response.data.responseStatus.errorCode === "200") {
        if (
          response.data.responseRecord.status === "Q" ||
          response.data.responseRecord.status === "M" ||
          response.data.responseRecord.status === "D"
        ) {
          Swal.fire({
            icon: "warning",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
          });
        }
        if (response.data.responseRecord.listEmployee.length === 1) {
          response.data.responseRecord =
            response.data.responseRecord.listEmployee[0];
          response.data.responseRecord["citizenID"] =
            response.data.responseRecord["referenceId"];

          let licenseNo = await getLicenseByCid(
            response.data.responseRecord.citizenID
          );
          response.data.responseRecord["licenseNo"] = get(
            licenseNo.license,
            "licenseNo",
            ""
          );
          response.data.responseRecord["expireDate"] = get(
            licenseNo.license,
            "expireDate",
            ""
          );
          response.data.responseRecord["agentType"] = "E";

          setSaleData(response.data.responseRecord);
          sessionStorage.setItem(
            "sale",
            JSON.stringify(response.data.responseRecord)
          );
          forceUpdate((n) => !n);
          dispatch(
            updateSelectSale({
              seleted: response.data.responseRecord,
            })
          );
        } else if (response.data.responseRecord.listEmployee.length > 1) {
          let row = response.data.responseRecord.listEmployee.map(
            (row, index) => {
              return {
                ...row,
                id: index,
                citizenID: row.referenceId,
                name: `${row.preName}${row.firstName} ${row.lastName}`,
              };
            }
          );
          dispatch(
            showSelectSalePopup({
              title: "รายชื่อฝ่ายขาย",
              list: row,
            })
          );
        } else if (response.data.responseRecord.listEmployee.length === 0) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่พบข้อมูลที่ต้องการ",
          });
        }
      } else if (
        response.data &&
        response.data.responseStatus.errorCode !== "200"
      ) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text:
            response.data.responseStatus.errorMessage ||
            "ไม่พบข้อมูลที่ต้องการ",
        });
      }
    }
  };

  const onSearchSale = async (key, value) => {
    if (key === "name") {
      let response = await searchSalesbyname(value.firstName, value.lastName);
      if (response.data && response.data.responseStatus.errorCode === "200") {
        let row = response.data.responseRecord.nameList.map((row) => {
          return {
            id: row.citizenID,
            name: `${row.preName}${row.firstName} ${row.lastName}`,
            ...row,
          };
        });
        dispatch(
          showSelectSalePopup({
            title: "รายชื่อฝ่ายขาย",
            list: row,
          })
        );
      } else if (
        response.data &&
        response.data.responseStatus.errorCode !== "200"
      ) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text:
            response.data.responseStatus.errorMessage ||
            "ไม่พบข้อมูลที่ต้องการ",
        });
      }
    } else if (key === "licenseNo") {
      let response = await searchLicenseNo(value[key].replaceAll("-", ""), "S");
      if (response.data && response.data.responseStatus.errorCode === "200") {
        if (
          response.data.responseRecord.status === "Q" ||
          response.data.responseRecord.status === "M" ||
          response.data.responseRecord.status === "D"
        ) {
          Swal.fire({
            icon: "warning",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
          });
        }
        let licenseNo = await getLicenseByCid(
          response.data.responseRecord.citizenID
        );
        response.data.responseRecord["licenseNo"] = get(
          licenseNo.license,
          "licenseNo",
          ""
        );
        response.data.responseRecord["expireDate"] = get(
          licenseNo.license,
          "expireDate",
          ""
        );
        response.data.responseRecord["agentType"] = "S";
        setSaleData(response.data.responseRecord);
        sessionStorage.setItem(
          "sale",
          JSON.stringify(response.data.responseRecord)
        );
        forceUpdate((n) => !n);
        dispatch(
          updateSelectSale({
            seleted: response.data.responseRecord,
          })
        );
      } else if (
        response.data &&
        response.data.responseStatus.errorCode !== "200"
      ) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text:
            response.data.responseStatus.errorMessage ||
            "ไม่พบข้อมูลที่ต้องการ",
        });
      }
    } else {
      let type = "";
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
        case "strid":
          type = "H";
          break;
        default:
          break;
      }
      let response = await searchPersonset(
        type,
        value[key].replaceAll("-", "")
      );
      if (response.data && response.data.responseStatus.errorCode === "200") {
        if (
          response.data.responseRecord.status === "Q" ||
          response.data.responseRecord.status === "M" ||
          response.data.responseRecord.status === "D"
        ) {
          Swal.fire({
            icon: "warning",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
          });
        }
        let licenseNo = await getLicenseByCid(
          response.data.responseRecord.citizenID
        );

        response.data.responseRecord["licenseNo"] = get(
          licenseNo.license,
          "licenseNo",
          ""
        );
        response.data.responseRecord["expireDate"] = get(
          licenseNo.license,
          "expireDate",
          ""
        );
        response.data.responseRecord["agentType"] = "S";
        setSaleData(response.data.responseRecord);
        sessionStorage.setItem(
          "sale",
          JSON.stringify(response.data.responseRecord)
        );
        forceUpdate((n) => !n);
        dispatch(
          updateSelectSale({
            seleted: response.data.responseRecord,
          })
        );
      } else if (
        response.data &&
        response.data.responseStatus.errorCode !== "200"
      ) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text:
            response.data.responseStatus.errorMessage ||
            "ไม่พบข้อมูลที่ต้องการ",
        });
      }
    }
  };

  const selectSale = async (data) => {
    setSaleData(null);
    if (activeTab === "1") {
      let response = await searchPersonset(
        "C",
        data.citizenID.replaceAll("-", "")
      );
      if (response.data && response.data.responseStatus.errorCode === "200") {
        if (
          response.data.responseRecord.status === "Q" ||
          response.data.responseRecord.status === "M" ||
          response.data.responseRecord.status === "D"
        ) {
          Swal.fire({
            icon: "warning",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่พบข้อมูลฝ่ายขายในแฟ้มโครงสร้างปัจจุบัน",
          });
        }
        let licenseNo = await getLicenseByCid(
          response.data.responseRecord.citizenID
        );
        response.data.responseRecord["licenseNo"] = get(
          licenseNo.license,
          "licenseNo",
          ""
        );
        response.data.responseRecord["expireDate"] = get(
          licenseNo.license,
          "expireDate",
          ""
        );
        response.data.responseRecord["agentType"] = "S";
        setSaleData(response.data.responseRecord);
        sessionStorage.setItem(
          "sale",
          JSON.stringify(response.data.responseRecord)
        );
        forceUpdate((n) => !n);
        dispatch(
          updateSelectSale({
            seleted: response.data.responseRecord,
          })
        );
      } else if (
        response.data &&
        response.data.responseStatus.errorCode !== "200"
      ) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text:
            response.data.responseStatus.errorMessage ||
            "ไม่พบข้อมูลที่ต้องการ",
        });
      }
    } //sale
    else if (activeTab === "2") {
      let licenseNo = await getLicenseByCid(data.citizenID);
      data["licenseNo"] = get(licenseNo.license, "licenseNo", "");
      data["expireDate"] = get(licenseNo.license, "expireDate", "");
      data["agentType"] = "E";

      setSaleData(data);
      sessionStorage.setItem("sale", JSON.stringify(data));
      forceUpdate((n) => !n);
      dispatch(
        updateSelectSale({
          seleted: data,
        })
      );
    } // employee
  };

  return (
    <Card style={{ border: "none" }}>
      <CardBody>
        <FilterCollapse title="ตัวกรองข้อมูล">
          <div style={{ textAlign: "center" }}>
            <ButtonGroup style={{ marginBottom: "2em" }}>
              <Button
                outline
                color="secondary"
                style={{ width: "18em" }}
                active={activeTab === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                ค้นหาฝ่ายขาย
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "18em" }}
                active={activeTab === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                ค้นหาพนักงาน
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <SaleSearch onSearch={onSearchSale} />
              </TabPane>
              <TabPane tabId="2">
                <EmployeeSearch onSearch={onSearchEmployee} />
              </TabPane>
            </TabContent>
          </div>

          {/* <SaleSearch onSearch={onSearchSale} /> */}
        </FilterCollapse>
      </CardBody>
      <CardBody style={{ padding: "20px" }}>
        <SelectSalePopup onChange={(v) => selectSale(v)} />
        <PersonelData data={saleData} />
      </CardBody>
    </Card>
  );
};
