import React, { useState, useEffect } from "react";
import { FormGroup, Row, Col, Input } from "reactstrap";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import _ from "lodash";
import { searchEmployeeInfo } from "../../api/apiSearchSale";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

const FormCreateUser = ({ mode, data }) => {
  const [user, setUser] = useState(
    sessionStorage.getItem("updateUser")
      ? JSON.parse(sessionStorage.getItem("updateUser"))
      : null
  );

  useEffect(() => {
    getEmployeeName();
  }, [data]);

  const getEmployeeName = async () => {
    let response = null;
    if (user) {
      if (data) {
        console.log("if", data);
        if (
          (!data.updateUserCode || data.updateUserCode === "") &&
          data.updateUserName
        ) {
          setUser({
            firstName: data.updateUserName,
          });
          console.log("if 1", data.updateUserCode);
        } else if (
          data.updateUserCode &&
          data.updateUserCode !== user.employeeID
        ) {
          response = await fetchData(data.updateUserCode);
          setUser(response);
          console.log("if 2", data.updateUserCode);
        } else {
          console.log("if else");

          setUser(
            sessionStorage.getItem("updateUser")
              ? JSON.parse(sessionStorage.getItem("updateUser"))
              : null
          );
        }
      } else {
        setUser(
          sessionStorage.getItem("updateUser")
            ? JSON.parse(sessionStorage.getItem("updateUser"))
            : null
        );
      }
      // else {
      // response = await fetchData(user.employeeID); //ldap
      // sessionStorage.setItem("updateUser", JSON.stringify(response));
      // sessionStorage.removeItem("updateUser");
      //  setUser(response);
      // }
    } else {
      if (data && data.updateUserCode) {
        response = await fetchData(data.updateUserCode);
        setUser(response);
      }
    }
  };

  const fetchData = async (userCode) => {
    const response = await searchEmployeeInfo("E", userCode);
    if (response.data && response.data.responseStatus.errorCode === "200") {
      if (response.data.responseRecord.listEmployee.length === 1) {
        return response.data.responseRecord.listEmployee[0];
      } else {
        return null;
      }
    }
  };

  return (
    <Row sm="6">
      <Col>
        <FormGroup>
          <label className={styles.label}>ผู้บันทึก</label>
          <Input
            readOnly={true}
            type="text"
            name="code"
            value={`${_.get(user, "firstName", "")} ${_.get(
              user,
              "lastName",
              ""
            )}`}
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <label className={styles.label}>สาขา</label>
          <Input
            readOnly={true}
            type="text"
            value={`${_.get(user, "orgCode", "")} ${_.get(
              user,
              "orgName",
              ""
            )}`}
          />
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <label className={styles.label}>วันที่บันทึก</label>
          <Input
            readOnly={true}
            type="text"
            name="time"
            value={
              _.get(user, "lastUpdate", "")
                ? dayjs(_.get(user, "lastUpdate", "")).format("DD/MM/BBBB")
                : dayjs(new Date()).format("DD/MM/BBBB")
            }
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default FormCreateUser;
