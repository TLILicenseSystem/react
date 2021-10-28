import React from "react";
import { Col, Row, Input, Container, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";
import { colors } from "../../themes/style";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

export const LicenseDetail = ({ title, data }) => {
  const Item = ({ title, value, size_k = 6, size_v = 6 }) => {
    return (
      <Row style={{ textAlign: "left" }}>
        <Col sm={size_k}>{title}</Col>
        <Col
          sm={size_v}
          style={{ color: colors.PRIMARYBLUE, fontWeight: "bolder" }}
        >
          {value}
        </Col>
      </Row>
    );
  };

  return (
    <>
      <h5>{title}</h5>
      <hr />
      <Row style={{ paddingBottom: "12px" }}>
        <Col sm="9">
          <Item
            title="ชื่อหลักสูตร"
            value={_.get(data, "courseName", "")}
            size_k={2}
            size_v={10}
          />
        </Col>
      </Row>
      <Row style={{ paddingBottom: "12px" }}>
        <Col sm="3">
          <Item
            title="วันที่อบรม"
            value={dayjs(_.get(data, "startDate", "")).format("DD/MM/YYYY")}
            size_k={6}
            size_v={6}
          />
        </Col>
        <Col sm="6">
          <Item
            title="สถานที่อบรม"
            value={_.get(data, "place", "")}
            size_k={3}
            size_v={9}
          />
        </Col>
        <Col sm="3">
          <Row style={{ textAlign: "left" }}>
            <Col sm="6">ผลการอบรม</Col>
            {_.get(data, "result") === "P" ? (
              <Col style={{ color: colors.PRIMARYBLUE, fontWeight: "bolder" }}>
                ครบ
              </Col>
            ) : (
              _.get(data, "result", null) && (
                <Col style={{ color: colors.PRIMARYRED, fontWeight: "bolder" }}>
                  ไม่ครบ
                </Col>
              )
            )}
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm="3">
          <Row>
            <Col sm="6">รวมชั่วโมงอบรม</Col>
            <Col sm="3" style={{ color: colors.PRIMARYBLUE }}>
              {_.get(data, "time", "")}
            </Col>
            <Col sm="3" style={{ textAlign: "right" }}>
              ชั่วโมง
            </Col>
          </Row>
        </Col>
        <Col sm="4">
          <Row>
            <Col sm="7">ชั่วโมงอบรมตามหลักสูตร</Col>
            <Col sm="2" style={{ color: colors.PRIMARYBLUE }}>
              {_.get(data, "timeTarget", "")}
            </Col>
            <Col sm="3" style={{ textAlign: "right" }}>
              ชั่วโมง
            </Col>
          </Row>
        </Col>
        <Col sm="5">
          <Item
            title="วันที่อัพโหลผลการสอบ"
            value={dayjs(_.get(data, "certificateDate", "")).format(
              "DD/MM/YYYY"
            )}
            size_k={5}
            size_v={5}
          />
        </Col>
      </Row>
      <hr />
    </>
  );
};

LicenseDetail.defaultProps = {
  title: "ผลการอบรม",
  data: [],
};
LicenseDetail.propTypes = {
  string: PropTypes.string,
  data: PropTypes.array,
};
