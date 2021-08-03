import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { FormGroup, Form, Col } from "reactstrap";
import styles from "./InputWithLabel.module.css";
import PropTypes from "prop-types";
import { get } from "lodash";
import { getOrganizerAll } from "../../api/apiGetExamOrganizer";

// 4 props เพิ้อคุยกับ componant ชื่อ InputWithLabel
// label
// type
// value
// onClick

// { label, type, value, onChange } คือ props

export const DropdownExamOrganizer = ({ label, type, value, onClick, requiredField }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const response = await getOrganizerAll();
    setUserData(get(response, "data", []));
  };

  useEffect(() => {
    console.log("DropdownExamRegion inital ");
    fetchData();
  }, []);

  return (
    <div>
      {/* ใส่ colon ที่ label เพื่อไม่ต้องใส่ที่หน้า login */}
      <Form>
        <FormGroup row>
          <Col xs={3}>
            <label className={styles.label}>{label} :</label>
            <label className={styles.required}>{(value === "" && requiredField) ? "*" : ""}</label>
          </Col>
          <Col xs={9}>
            <DropdownButton
              className={styles.input}
              id="dropdown-basic-button"
              title={
                value === "" || value === null || value === "null"
                  ? "กรุณาเลือก"
                  : value
              }
              onSelect={onClick}
            >
              {userData.map((detail, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    eventKey={get(detail, "orgCode", "")}
                  >
                    {get(detail, "orgCode", "")} {get(detail, "orgName", "")}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

// กำหนดค่าเริ่มต้นของ InputWithLabel
DropdownExamOrganizer.defaultProps = {
  label: "",
  type: "text",
  value: "",
  //กรณีไม่ได้ส่ง onChange เข้ามาก็จะไม่พัง
  onClick: () => {},
  requiredField: false,
};

DropdownExamOrganizer.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func,
  requiredField: PropTypes.bool,
};
