import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  ButtonGroup,
  TabContent,
  TabPane,
  FormGroup,
  Label,
} from "reactstrap";
import {
  SearchSchedulePopup,
  DropdownExamRegion,
  DropdownExamOrganizer,
  Container,
  EditLocationPopup,
  EditButton,
  DeleteButton,
  AddButton,
  CancelButton,
  SubmitButton,
  FilterCollapse,
  PersonelData,
  Table,
} from "../../components/shared";
import { get } from "lodash";
import { showSearchSchedulePopup } from "../../redux/actions";

import SearchSalesDlg from "./SearchSalesDlg";
import FormSchedule from "./FormSchedule";
import FormPayment from "./FormPayment";

const ExamApplication = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();

  const columns = [
    {
      field: "examDateFormat",
      headerName: "วันที่สอบ",
      minWidth: 140,
      // valueGetter: (params) =>
      //   `${moment(params.getValue(params.id, "examDate")).format(
      //     "DD/MM/yyyy"
      //   )}`,
      hideSortIcons: "true",
      headerClassName: "header",
      cellClassName: "cellDark",
    },
    {
      field: "timeStr",
      headerName: "เวลาสอบ",
      minWidth: 120,
      hideSortIcons: "true",
      // valueGetter: (params) =>
      //   `${getExamRoundDetail(params.getValue(params.id, "roundId"))}`,
      headerClassName: "header",
    },
    {
      field: "orgName",
      headerName: "สถานที่สอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "provinceName",
      headerName: "สนามสอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },

    {
      field: "locationDetail",
      headerName: "สถานที่ตั้งสอบ",
      width: 160,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },

    {
      field: "receiveTime",
      headerName: "เลขที่นั่งสอบ",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "receiveTime",
      headerName: "ผลสอบ",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "receiveTime",
      headerName: "เลือก",
      minWidth: 120,
      align: "left",
      hideSortIcons: "true",
      headerClassName: "header",
    },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onClickChangeLocation = () => {
    dispatch(
      showSearchSchedulePopup({
        title: "ค้นหาตารางสอบ",
        description: "",
      })
    );
  };
  return (
    <Container>
      <EditLocationPopup />
      <div className="contents">
        <h2 className="head">สมัครสอบ</h2>
        <Card>
          <CardBody>
            <FilterCollapse title="ตัวกรองข้อมูล">
              <SearchSalesDlg />
            </FilterCollapse>
          </CardBody>

          <CardBody>
            <PersonelData />
          </CardBody>
          <CardBody>
            <ButtonGroup>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={activeTab === "1"}
                onClick={() => {
                  toggle("1");
                }}
              >
                สมัครสอบ
              </Button>
              <Button
                outline
                color="secondary"
                style={{ width: "12em" }}
                active={activeTab === "2"}
                onClick={() => {
                  toggle("2");
                }}
              >
                ประวัติ
              </Button>
            </ButtonGroup>
          </CardBody>
          <div>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <CardBody>
                  <Button
                    size="sm"
                    outline
                    color="secondary"
                    style={{ display: "inline" }}
                    onClick={() => onClickChangeLocation()}
                  >
                    <i class="fas fa-search" type="button"></i> ค้นหาตารางสอบ
                  </Button>
                  <FormSchedule />
                </CardBody>
                <CardBody>
                  <FormPayment />
                </CardBody>
                <CardBody
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  <hr />
                  <Row sm="4">
                    <Col>
                      <FormGroup>
                        <Label>เลขที่นั่งสอบ</Label>
                        <Input type="text" name="radio1" />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>ผลสอบ</Label>
                        <Input type="text" name="radio1" />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>เวลาที่ยื่นสมัครสอบ</Label>
                        <Input readOnly={true} type="text" name="radio1" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row sm="1">
                    <Col sm="9">
                      <FormGroup>
                        <Label>หมายเหตุ</Label>
                        <Input type="text" name="radio1" />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  <Row sm="6">
                    <Col>
                      <FormGroup>
                        <Label>ผู้บันทึก</Label>
                        <Input readOnly={true} type="text" name="radio1" />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>สาขา</Label>
                        <Input readOnly={true} type="text" name="radio1" />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>วันที่บันทึก</Label>
                        <Input readOnly={true} type="text" name="radio1" />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody style={{ textAlign: "right" }}>
                  <SubmitButton
                    // disabled={props.invalid || props.pristine || props.submitting}
                    title="บันทึก"
                    onClick={() => console.log("dd")}
                  />{" "}
                  <CancelButton
                    title="ยกเลิก"
                    onClick={() => console.log("dd")}
                  />
                </CardBody>
              </TabPane>
              <TabPane tabId="2">
                <CardBody>
                  <Table data={[]} columns={columns} loading={false} />
                </CardBody>
              </TabPane>
            </TabContent>
          </div>
        </Card>
      </div>
      <SearchSchedulePopup onChange={() => console.log("Eee")} />
    </Container>
  );
};

export default ExamApplication;
