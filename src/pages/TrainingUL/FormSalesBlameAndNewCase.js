import React, { useState, useEffect } from "react";
import {
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Input,
  Button,
} from "reactstrap";
import { AddButton, Table } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import { get } from "lodash";
import { columns_tab3 } from "./columns";

const FormSalesBlameAndNewCase = (props) => {
  return (
    <Container>
      <Row style={{ paddingBottom: "14px" }}>
        <Col sm="2">โทษทางวินัย :</Col>
        <Col>
          <Row>
            <Col>ประเภทโทษ</Col>
            <Col>หนังสือ/วันที่</Col>
            <Col sm="3">ตำแหน่ง ณ วันที่ลงโทษ</Col>
            <Col sm="5">หมายเหตุ</Col>
          </Row>
          <Row>
            <Col>ตักเตือน</Col>
            <Col>0104 - 26/02/2551</Col>
            <Col sm="3">ผู้จัดการศูยน์การขาย</Col>
            <Col sm="5">
              โอนเบี้ย 28,160.-บาท ให้ฝ่ายขายรายอื่น
              โดยไม่ตรวจสอบการนำเบี้ยเข้าบัญชี
            </Col>
          </Row>
          <Row>
            <Col>ตักเตือน</Col>
            <Col>0104 - 26/02/2551</Col>
            <Col sm="3">ผู้จัดการศูยน์การขาย</Col>
            <Col sm="5">
              โอนเบี้ย 28,160.-บาท ให้ฝ่ายขายรายอื่น
              โดยไม่ตรวจสอบการนำเบี้ยเข้าบัญชี
            </Col>
          </Row>
          <Row>
            <Col>ตักเตือน</Col>
            <Col>0104 - 26/02/2551</Col>
            <Col sm="3">ผู้จัดการศูยน์การขาย</Col>
            <Col sm="5">
              โอนเบี้ย 28,160.-บาท ให้ฝ่ายขายรายอื่น
              โดยไม่ตรวจสอบการนำเบี้ยเข้าบัญชี
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "14px" }}>
        <Col sm="2">ผลงานเคสใหม่ :</Col>
        <Col>
          <Row>
            <Col sm="5">เคสใหม่</Col>
            <Col
              style={{
                textAlign: "center",
                fontWeight: "bold",
                borderBottom: "1px solid",
              }}
            >
              xx
            </Col>
            <Col>ราย</Col>
          </Row>
          <Row>
            <Col sm="5">
              ทุนรวม (ไม่รวมประกันกลุ่ม/ประกันแบบชำระเบี้ยครั้งเดียว)
            </Col>
            <Col
              style={{
                textAlign: "center",
                fontWeight: "bold",
                borderBottom: "1px solid",
              }}
            >
              0,000,000
            </Col>
            <Col>บาท</Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "14px" }}>
        <Col sm="2">คดีความ :</Col>
        <Col>
          <Row>
            <Col sm="1">ร้องเรียน</Col>
            <Col>
              <Row>
                <Col>1. ร.ที่ : 059 - 16/03/2555</Col>
                <Col>เรื่อง : การทำประกัน นำผู้ที่มีปัญหาสุขภาพมาทำประกัน</Col>
              </Row>
              <Row style={{ paddingBottom: "14px" }}>
                <Col>ตำแหน่ง ณ วันที่รับเรื่อง : ผู้จัดการศูยน์การขาย</Col>
                <Col>ผล : ภาคทัณฑ์</Col>
              </Row>
              <Row>
                <Col>2. ร.ที่ : 059 - 16/03/2555</Col>
                <Col>เรื่อง : การทำประกัน นำผู้ที่มีปัญหาสุขภาพมาทำประกัน</Col>
              </Row>
              <Row style={{ paddingBottom: "14px" }}>
                <Col>ตำแหน่ง ณ วันที่รับเรื่อง : ผู้จัดการศูยน์การขาย</Col>
                <Col>ผล : ภาคทัณฑ์</Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col sm="1">ยึด/อายัติ</Col>
            <Col>
              <Row>
                <Col>1. วันที่ : 16/03/2555</Col>
                <Col>ตำแหน่ง ณ วันที่รับเรื่อง : ผู้จัดการศูยน์การขาย</Col>
              </Row>
              <Row style={{ paddingBottom: "14px" }}>
                <Col>สาขา : แพร่</Col>
                <Col>หมายเหตุ : </Col>
              </Row>
              <Row>
                <Col>2. วันที่ : 16/03/2555</Col>
                <Col>ตำแหน่ง ณ วันที่รับเรื่อง : ผู้จัดการศูยน์การขาย</Col>
              </Row>
              <Row style={{ paddingBottom: "14px" }}>
                <Col>สาขา : แพร่</Col>
                <Col>หมายเหตุ : </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ paddingBottom: "14px" }}>
        <Col>
          <Table id="tab3" data={[]} columns={columns_tab3} loading={false} />
        </Col>
      </Row>
    </Container>
  );
};

export default FormSalesBlameAndNewCase;
