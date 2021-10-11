import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { get } from "lodash";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { Card, CardBody, Row, Col, Table, Input, Button } from "reactstrap";
import {
  Container,
  SearchLocationPopup,
  SubmitButton,
  CancelButton,
  DateField,
  InputField,
  SelectField,
  TimeField,
} from "../../components/shared";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { showSearchLocationPopup } from "../../redux/actions";

import {
  addExamSchedule,
  updateExamSchedule,
} from "../../api/apiAddExamSchedule";
import { getExamRoundAll } from "../../api/apiGetExamRound";

import moment from "moment";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);



const validate = (values) => {
  const errors = {};
  if (!values.examDate) {
    errors.examDate = "กรุณาระบุข้อมูล";
  } else if (values.examDate) {
    if (!dayjs(values.examDate).isValid())
      errors.examDate = "กรุณาระบุข้อมูลให้ถูกต้อง";
  }

  if (!values.applyCloseDate) {
    errors.applyCloseDate = "กรุณาเลือกข้อมูล";
  } else if (values.applyCloseDate) {
    if (!dayjs(values.applyCloseDate).isValid())
      errors.applyCloseDate = "กรุณาระบุข้อมูลให้ถูกต้อง";
    if (
      values.examDate &&
      dayjs(values.applyCloseDate) > dayjs(values.examDate)
    ) {
      errors.applyCloseDate = "กรุณาระบุข้อมูลให้ถูกต้อง";
    }
  }
  if (!values.receiveDate) {
    errors.receiveDate = "กรุณาเลือกข้อมูล";
  } else if (values.receiveDate) {
    if (!dayjs(values.receiveDate).isValid())
      errors.receiveDate = "กรุณาระบุข้อมูลให้ถูกต้อง";
    if (
      values.examDate &&
      dayjs(values.receiveDate) > dayjs(values.examDate)
    ) {
      errors.receiveDate = "กรุณาระบุข้อมูลให้ถูกต้อง";
    }
  }

  if (!values.roundId) {
    errors.roundId = "กรุณาเลือกข้อมูล";
  }

  if (!values.receiveTime) {
    errors.receiveTime = "กรุณาระบุข้อมูล";
  }

  if (!values.maxApplicant) {
    errors.maxApplicant = "กรุณาระบุข้อมูล";
  } else if (values.maxApplicant) {
    const re = /^[0-9\b]+$/;
    if (values.maxApplicant === "" || re.test(values.maxApplicant)) {
      values.maxApplicant = values.maxApplicant;
    } else values.maxApplicant = 0;
  }

  return errors;
};

let EditSchedule = (props) => {
  const { handleSubmit } = props;

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const scheduleDetail = get(location, "state", {});

  const [mainLocation, setMainLocation] = useState(scheduleDetail);
  const [alterLocation, setAlterLocation] = useState(
    scheduleDetail.alteredLocationDetail
  );
  const [isShowMainLocation, setIsShowMainLocation] = useState(
    get(scheduleDetail, "locationId", "") !== "" ? true : false
  );
  const [isShowAlterLocation, setIsShowAlterLocation] = useState(
    get(scheduleDetail.locationDetail, "locationId", "") !==
      get(scheduleDetail.alteredLocationDetail, "locationId", "")
      ? true
      : false
  );

  const [userModify, setUserModify] = useState("2901133");
  const [modifyDate, setModifyDate] = useState(dayjs(new Date()).format("DD/MM/BBBB"));
  const [examRoundList, setExamRoundList] = useState([]);

  const getSearchValue = (e) => {
    setMainLocation(e.locationDetail);
    setIsShowMainLocation(true);
  };

  useEffect(() => {
    fetchData();

    if (props.history.location) {
      let { state } = props.history.location;
      if (state) {
        props.change("roundId", state.roundId);
        props.change("scheduleId", get(state, "scheduleId", null));
        props.change("examDate", state.examDate ? state.examDate : dayjs(new Date()));
        props.change(
          "applyCloseDate",
          state.applyCloseDate ? state.applyCloseDate :  dayjs(new Date())
        );
        props.change(
          "receiveDate",
          state.receiveDate ? state.receiveDate :  dayjs(new Date())
        );
        props.change("receiveTime", state.receiveTime);
        props.change("maxApplicant", state.maxApplicant);
      } else props.history.push("/setting/examSchedule");
    }
  }, []);

  const fetchData = async () => {
    const response = await getExamRoundAll();
    setExamRoundList(get(response, "data", []));
  };

  const changeToSchedulePage = () => {
    history.push("/setting/examSchedule", null);
  };
  const onClickSave = async (data) => {
    if (!isShowMainLocation) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาเลือกข้อมูลสถานที่สอบ",
      });
      return;
    } else {
      if (data.scheduleId) {
        if (isShowMainLocation.scheduleId === "") {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "กรุณาค้นหาตารางสอบก่อนบันทึกแก้ไข",
          });
          return;
        }

        let examSchedule = {
          ...data,
          // roundId: data.examTime,
          locationId: get(mainLocation, "locationId", ""),
          alteredLocationId: get(mainLocation, "locationId", ""),
          examDate: dayjs(data.examDate).format("YYYY-MM-DD"),
          applyOpenDate: dayjs(new Date()).format("YYYY-MM-DD"),
          applyCloseDate: dayjs(data.applyCloseDate).format("YYYY-MM-DD"),
          openStatus: "N",
          receiveDate: dayjs(data.receiveDate).format("YYYY-MM-DD"),
          receiveTime: dayjs(data.receiveTime, "HH:mm").format("HH:mm"),
          updateUserCode: userModify,
          lastUpdate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };

        let response = await updateExamSchedule(examSchedule);
        if (response !== "error") {
          Swal.fire("Updated!", "ปรับปรุงข้อมูลแล้ว", "success");
          changeToSchedulePage();
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
        }
      } else {
        let examSchedule = {
          ...data,
          // roundId: data.examTime,
          locationId: get(mainLocation, "locationId", ""),
          alteredLocationId: get(mainLocation, "locationId", ""),
          examDate: dayjs(data.examDate).format("YYYY-MM-DD"),
          applyOpenDate: dayjs(new Date()).format("YYYY-MM-DD"),
          applyCloseDate: dayjs(data.applyCloseDate).format("YYYY-MM-DD"),
          openStatus: "N",
          receiveDate: dayjs(data.receiveDate).format("YYYY-MM-DD"),
          receiveTime: dayjs(data.receiveTime, "HH:mm").format("HH:mm"),
          updateUserCode: userModify,
          lastUpdate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };
        let response = await addExamSchedule(examSchedule);
        if (response !== "error") {
          Swal.fire("Added!", "บันทึกข้อมูลแล้ว", "success");
          changeToSchedulePage();
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
          });
        }
      }
    }
  };
  const onClickChangeLocation = (locationTier) => {
    dispatch(
      showSearchLocationPopup({
        title: "ค้นหาสถานที่สอบ",
        description: locationTier,
      })
    );
  };
  const toggle = () => {
    props.initialize();
    props.reset();
    history.push("/setting/examSchedule", null);
  };

  return (
    <Container>
      <div className="contents">
        <h2 className="head">ตั้งค่าตารางสอบ</h2>
        <Card>
          <CardBody>
            {scheduleDetail && scheduleDetail.scheduleId ? (
              <h3>แก้ไขตารางสอบ</h3>
            ) : (
              <h3>เพิ่มตารางสอบ</h3>
            )}

            <div style={{ padding: "14px", margin: "14px" }}>
              <Card body outline>
                <CardBody>
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Row xs="1" sm="3" md="3">
                        <Col>
                          <Field
                            label="วันที่สอบ"
                            name="examDate"
                            component={DateField}
                          />
                        </Col>
                        <Col>
                          <Field
                            label="วันที่ปิดรับสมัคร"
                            name="applyCloseDate"
                            component={DateField}
                            maxdate={props.examDate}
                          />
                        </Col>
                        <Col>
                          <Field
                            label="เวลาสอบ"
                            name="roundId"
                            component={SelectField}
                            option={examRoundList.map((row) => {
                              return {
                                value: row.roundId,
                                label: row.timeStr,
                              };
                            })}
                            // requiredField={true}
                            isClearable={false}
                          />
                        </Col>
                      </Row>

                      <Row
                        xs="1"
                        sm="3"
                        md="3"
                        style={{ paddingTop: "20px", paddingBottom: "20px" }}
                      >
                        <Col>
                          <Field
                            label="วันที่ได้รับหนังสือ"
                            name="receiveDate"
                            component={DateField}
                            maxdate={props.examDate}
                          />
                        </Col>
                        <Col>
                          <Field
                            label="เวลาที่ได้รับหนังสือ"
                            name="receiveTime"
                            component={TimeField}
                            textboxSize={6}
                          />
                        </Col>
                        <Col>
                          <Field
                            label="จำนวนผู้สมัคร (คน)"
                            name="maxApplicant"
                            textboxSize={6}
                            defaultValue={0}
                            component={InputField}
                            // requiredField={true}
                          />
                        </Col>
                      </Row>
                    </MuiPickersUtilsProvider>
                  </div>
                </CardBody>
              </Card>
            </div>
          </CardBody>
          <CardBody>
            <div
              style={{
                display: "flex",
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <h3>ข้อมูลสถานที่สอบ</h3>
              <Button
                size="sm"
                outline
                color="secondary"
                style={{ marginLeft: "20px", display: "inline" }}
                onClick={() => onClickChangeLocation("main")}
              >
                <i class="fas fa-search" type="button"></i>{" "}
                ค้นหาข้อมูลสถานที่สอบ
              </Button>
            </div>

            <div style={{ padding: "14px", margin: "14px" }}>
              <Card body outline>
                <CardBody>
                  <Row>
                    <Col xs="12">
                      {!isShowMainLocation ? (
                        <h6 className="head">
                          ไม่พบข้อมูลสถานที่สอบ กรุณา "ค้นหาข้อมูลสถานที่สอบ"
                        </h6>
                      ) : (
                        <div>
                          <Table borderless>
                            <tbody>
                              <tr>
                                <td>รหัสสถานที่ตั้งสอบ</td>
                                <td>
                                  <Col sm={4}>
                                    <Input
                                      readOnly={true}
                                      value={get(
                                        mainLocation,
                                        "locationId",
                                        ""
                                      )}
                                    />
                                  </Col>
                                </td>
                                <td>สถานที่สอบ</td>
                                <td>
                                  <Input
                                    readOnly={true}
                                    value={get(
                                      mainLocation,
                                      "organizerName",
                                      get(mainLocation, "orgName", "")
                                    )}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>สถามสอบ</td>
                                <td>
                                  <Input
                                    readOnly={true}
                                    value={get(
                                      mainLocation,
                                      "provinceName",
                                      ""
                                    )}
                                  />
                                </td>
                                <td>ประเภทสถานที่ตั้ง</td>
                                <td>
                                  <Input
                                    readOnly={true}
                                    value={get(
                                      mainLocation,
                                      "locationTypeName",
                                      ""
                                    )}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td>สถานที่ตั้งสอบ</td>
                                <td>
                                  <Input
                                    readOnly={true}
                                    value={get(
                                      mainLocation,
                                      "locationDetail",
                                      ""
                                    )}
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          </CardBody>
          <CardBody style={{ paddingTop: "0px", paddingBottom: "14px" }}>
            <Row style={{ textAlign: "center" }}>
              <Col
                xs={{ size: 4, offset: 2 }}
                sm="12"
                md={{ size: 2, offset: 4 }}
              >
                <label className="label" style={{ textAlign: "center" }}>
                  ผู้บันทึก
                </label>
                <Input
                  readOnly={true}
                  style={{
                    textAlign: "center",
                  }}
                  value={userModify}
                />
              </Col>
              <Col xs="4" sm="12" md={{ size: 2 }}>
                <label className="label">วันที่บันทึก</label>
                <Input
                  readOnly={true}
                  style={{
                    textAlign: "center",
                  }}
                  value={modifyDate}
                />
              </Col>
            </Row>
          </CardBody>
          <CardBody style={{ textAlign: "right" }}>
            <SubmitButton
              disabled={props.invalid || props.pristine || props.submitting}
              title="บันทึก"
              onClick={handleSubmit(onClickSave)}
            />{" "}
            <CancelButton title="ยกเลิก" onClick={toggle} />
          </CardBody>
        </Card>
      </div>
      <SearchLocationPopup onChange={getSearchValue} />
    </Container>
  );
};

EditSchedule = reduxForm({
  // a unique name for the form
  form: "EditSchedule",
  validate,
  shouldValidate: () => true,
  destroyOnUnmount: false,
  enableReinitialize: true,
})(EditSchedule);

const selector = formValueSelector("EditSchedule"); // <-- same as form name

EditSchedule = connect((state) => ({
  examDate: selector(state, "examDate"),
}))(EditSchedule);

export default EditSchedule;
