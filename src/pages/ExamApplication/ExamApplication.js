import React, { useState, useEffect } from "react";
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
  Nav,
  NavItem,
  NavLink,
  CardTitle,
  CardText,
} from "reactstrap";
import {
  DropdownExamRegion,
  DropdownExamOrganizer,
  Container,
  EditLocationPopup,
  EditButton,
  DeleteButton,
  AddButton,
  FilterCollapse,
  PersonelData,
  Table,
} from "../../components/shared";
import { get } from "lodash";

import SearchSalesDlg from "./SearchSalesDlg";

const ExamApplication = (props) => {
  const [activeTab, setActiveTab] = useState("1");
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
                size="sm"
                sm="6"
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
                size="sm"
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
          <CardBody>
            <div>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <h4>Tab 1 Contents</h4>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Table data={[]} columns={columns} loading={false} />
                </TabPane>
              </TabContent>
            </div>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
};

export default ExamApplication;
