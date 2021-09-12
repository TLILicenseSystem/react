import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import { Alert } from "react-bootstrap";
import {
  DropdownExamRegion,
  DropdownExamOrganizer,
  DropdownLocationType,
  SearchPopup,
  InputWithLabelRow,
  InputField,
  SelectField,
  CancelButton,
  SubmitButton,
} from "../shared";
import {
  addExamLocation,
  updateExamLocation,
  deleteExamLocation,
} from "../../api/apiAddExamLocation";
import Snackbar from "@material-ui/core/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { hideSearchPopup, hideEditLocationPopup } from "../../redux/actions";
import { getProvinceCodeAll } from "../../api/apiGetProvinceCode";
import { getExamType } from "../../api/apiGetConfig";
import { getOrganizerAll } from "../../api/apiGetExamOrganizer";

import { getOrganizer } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone } from "../../api/apiGetConfig";
import { get } from "lodash";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Field, reduxForm, reset, change, formValueSelector } from "redux-form";
import { connect } from "react-redux";

const validate = (values) => {
  const errors = {};

  if (!values.locationDetail) {
    errors.locationDetail = "กรุณาระบุข้อมูล";
  }
  if (values.locationDetail) {
    if (values.locationDetail.trim() === "")
      errors.locationDetail = "กรุณาระบุข้อมูล";
  }
  if (!values.provinceCode) {
    errors.provinceCode = "กรุณาเลือกข้อมูล";
  }
  if (!values.orgCode) {
    errors.orgCode = "กรุณาเลือกข้อมูล";
  }

  return errors;
};

export let EditLocationPopup = (props) => {
  const { isShow, title, description, action } = props.editLocationPopup;
  const { provinceCode, handleSubmit } = props;
  const dispatch = useDispatch();
  const [province, setProvince] = useState([]);
  const [organizer, setOrganizer] = useState([]);
  const [examType, setExamType] = useState([]);
  const [regionName, setRegionName] = useState([]);

  const examZoneResonse = getExamLocationZone();

  const fetchData = async () => {
    const responseExamType = await getExamType();
    setExamType(responseExamType);

    const response = await getProvinceCodeAll();
    setProvince(get(response, "data", []));

    const responseOrganizer = await getOrganizerAll();
    setOrganizer(get(responseOrganizer, "data", []));
  };

  useEffect(() => {
    props.reset();
    fetchData();
  }, []);

  useEffect(() => {
    const found = province.find(
      (element) => element.provinceCode === provinceCode
    );
    if (found) {
      let tmpRegionName = get(
        examZoneResonse.find((element) => element.regionCode === found.region),
        "regionName",
        ""
      );
      props.dispatch(change("EditLocationPopup", "regionName", tmpRegionName));
      setRegionName(tmpRegionName);
    } else {
      props.dispatch(change("EditLocationPopup", "regionName", ""));
      setRegionName("");
    }
  }, [provinceCode]);

  const onClickAddExamLocation = async (data) => {
    if (props.invalid) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      });
      return;
    }
    let examlocation = { createUserCode: "2901133", ...data };
    let response = await addExamLocation(examlocation);
    if (response !== "error") {
      Swal.fire("Added!", "อัพโหลดข้อมูลแล้ว", "success");
      toggle();
      action();
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขข้อมูลได้",
      });
    }
    toggle();
  };
  const onClickEditLocationData = async (data) => {
    if (props.invalid) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาระบุข้อมูลที่มี * ให้ครบถ้วน",
      });
      return;
    }
    let examlocation = { createUserCode: "2901133", ...data };

    let response = await updateExamLocation(examlocation);
    if (response !== "error") {
      Swal.fire("Updated!", "แก้ไขข้อมูลแล้ว", "success");
      toggle();
      action();
    } else {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขข้อมูลได้",
      });
    }
    toggle();
  };
  const toggle = () => {
    props.initialize();
    props.reset();
    dispatch(hideEditLocationPopup());
  };

  return (
    <div>
      <Modal isOpen={isShow} className="div" size="lg">
        <ModalBody>
          <h4 className="head">{title}</h4>
        </ModalBody>
        <ModalBody>
          <Row xs="1" style={{ paddingBottom: "20px" }}>
            <Col xs="6">
              <Field
                label="รหัสที่ตั้ง"
                name="locationId"
                component={InputField}
                textboxSize={6}
                disabled={true}
              />
            </Col>
            <Col xs="6"></Col>
          </Row>
          <Row xs="1" sm="2" style={{ paddingBottom: "20px" }}>
            <Field
              label="สถานที่สอบ"
              name="orgCode"
              component={SelectField}
              textboxSize={12}
              option={organizer.map((row) => {
                return {
                  value: row.orgCode,
                  label: `${row.orgCode} ${row.orgName}`,
                };
              })}
              requiredField={true}
              isClearable={true}
              disabled={description === "edit" ? true : false}
            />

            <Col xs="6">
              <Field
                label="โซน"
                name="regionName"
                component={InputField}
                textboxSize={12}
                disabled={true}
              />
            </Col>
          </Row>
          <Row xs="1" sm="2" style={{ paddingBottom: "20px" }}>
            <Col xs="6">
              <Field
                label="สนามสอบ"
                name="provinceCode"
                component={SelectField}
                textboxSize={12}
                option={province.map((row) => {
                  return {
                    value: row.provinceCode,
                    label: `${row.provinceCode} ${row.provinceName}`,
                  };
                })}
                requiredField={true}
                isClearable={true}
                disabled={description === "edit" ? true : false}
              />
            </Col>

            <Field
              label="ประเภท"
              name="locationType"
              component={SelectField}
              textboxSize={12}
              option={examType.map((row) => {
                return {
                  value: row.examTypeId,
                  label: row.examTypeName,
                };
              })}
              isClearable={true}
            />
          </Row>
          <Row xs="1" style={{ paddingBottom: "20px" }}>
            <Field
              label="สถานที่ตั้งสอบ"
              name="locationDetail"
              component={InputField}
              requiredField={true}
              textboxSize={12}
            />
          </Row>
        </ModalBody>
        <ModalFooter>
          <SubmitButton
            type="button"
            disabled={props.invalid || props.pristine || props.submitting}
            onClick={
              description === "edit"
                ? handleSubmit(onClickEditLocationData)
                : handleSubmit(onClickAddExamLocation)
            }
          />
          <CancelButton onClick={toggle} />
        </ModalFooter>
      </Modal>
    </div>
  );
};

EditLocationPopup.defaultProps = {
  handleSubmit: () => {},
};
EditLocationPopup.propTypes = {
  handleSubmit: PropTypes.func,
};

EditLocationPopup = reduxForm({
  // a unique name for the form
  form: "EditLocationPopup",
  validate,
  shouldValidate: () => true,
  destroyOnUnmount: false,
  enableReinitialize: true,
})(EditLocationPopup);

const selector = formValueSelector("EditLocationPopup"); // <-- same as form name

EditLocationPopup = connect((state) => ({
  initialValues: state.editLocationPopup.initialValues,
  editLocationPopup: state.editLocationPopup,
  provinceCode: selector(state, "provinceCode"),
}))(EditLocationPopup);
