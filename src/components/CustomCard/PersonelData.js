import React from "react";
import { Col, Row, Input } from "reactstrap";
import { get } from "lodash";
import PropTypes from "prop-types";
import {
  InputCitizenID,
  InputDepositCode,
  InputPersonID,
  InputStrID,
} from "../shared";

import InputMask from "react-input-mask";

export const PersonelData = ({ data }) => {
  return (
    <>
      <Row>
        <Col xs="12" sm="5">
          <Row style={{ marginBottom: "0" }}>
            <Col sm="4">ชื่อ-นามสกุล</Col>
            <Col sm="8" style={{ padding: "0" }}>
              <Input
                style={{ marginBottom: "20px" }}
                readOnly={true}
                value={`${get(data, "firstName", "")} ${get(
                  data,
                  "lastName",
                  ""
                )}`}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row style={{ marginBottom: "0" }}>
            <Col sm="5">ตำแหน่ง</Col>
            <Col sm="7" style={{ paddingRight: "0" }}>
              <Input
                id="strid"
                type={"tel"}
                value={
                  get(data, "highStrid", "").length === 3
                    ? get(data, "highStrid", "").split("").join("-")
                    : get(data, "highStrid", "").length === 5
                    ? get(data, "highStrid", "").slice(0, 1) +
                      "-" +
                      get(data, "highStrid", "").slice(
                        1,
                        get(data, "highStrid", "").length - 1
                      ) +
                      "-" +
                      get(data, "highStrid", "").slice(
                        get(data, "highStrid", "").length - 1
                      )
                    : get(data, "highStrid", "").length === 8
                    ? get(data, "highStrid", "").slice(0, 1) +
                      "-" +
                      get(data, "highStrid", "").slice(
                        1,
                        get(data, "highStrid", "").length - 1
                      ) +
                      "-" +
                      get(data, "highStrid", "").slice(
                        get(data, "highStrid", "").length - 1
                      )
                    : get(data, "highStrid", "").length === 10
                    ? get(data, "highStrid", "").slice(0, 1) +
                      "-" +
                      get(data, "highStrid", "").slice(
                        1,
                        get(data, "highStrid", "").length - 1
                      ) +
                      "-" +
                      get(data, "highStrid", "").slice(
                        get(data, "highStrid", "").length - 1
                      )
                    : ""
                }
                disabled={true}
              />
            </Col>
          </Row>
        </Col>
        <Col xs="12" sm="4">
          <Row style={{ marginBottom: "0" }}>
            <Col sm="3">สาขา</Col>
            <Col sm="9" style={{ paddingLeft: "0" }}>
              <Input
                readOnly={true}
                value={
                  get(data, "branchCode", "") +
                  " " +
                  get(data, "branchName", "")
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="5">
          <Row style={{ marginBottom: "0" }}>
            <Col sm="4">เลขบัตรประชาชน</Col>
            <Col sm="8" style={{ padding: "0" }}>
              <InputMask
                mask="9-9999-99999-99-9"
                maskChar={null}
                className="form-control"
                style={{ marginBottom: "20px" }}
                id="citizenID"
                type={"tel"}
                value={get(data, "citizenID", "")}
                disabled={true}
              />
            </Col>
          </Row>
        </Col>

        <Col>
          <Row style={{ marginBottom: "0" }}>
            <Col sm="5" style={{ paddingRight: "0" }}>
              รหัสประจำตัว
            </Col>
            <Col sm="7" style={{ paddingRight: "0" }}>
              <InputMask
                mask="999-9999-9"
                maskChar={null}
                className="form-control"
                style={{ marginBottom: "20px" }}
                id="personID"
                type={"tel"}
                value={get(data, "personID", "")}
                disabled={true}
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row style={{ marginBottom: "0" }}>
            <Col sm="5">เลขที่ฝากค้ำ</Col>
            <Col sm="7" style={{ paddingLeft: "0" }}>
              <Input
                label=""
                disabled={true}
                value={
                  get(data, "branchCode", "") + "-" + get(data, "depositNo", "")
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm="5">
          <Row style={{ marginBottom: "0" }}>
            <Col sm="4">สถานะ</Col>
            <Col sm="8" style={{ padding: "0" }}>
              <Input readOnly={true} value={get(data, "statusName", "")} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row style={{ marginBottom: "0" }}>
            <Col sm="5" style={{ paddingRight: "0" }}>
              เลขที่ใบอนุญาต
            </Col>
            <Col sm="7" style={{ paddingRight: "0" }}>
              <Input readOnly={true} value={get(data, "licenseNo", "")} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row style={{ marginBottom: "0" }}>
            <Col sm="5">วันที่หมดอายุ</Col>
            <Col sm="7" style={{ paddingLeft: "0" }}>
              <Input readOnly={true} value={get(data, "licenseNo", "")} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

PersonelData.defaultProps = {
  data: [],
};
PersonelData.propTypes = {
  data: PropTypes.array,
};
