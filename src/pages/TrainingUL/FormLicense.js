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
import { AddButton } from "../../components/shared";
import styles from "../../components/InputWithLabel/InputWithLabel.module.css";
import { searchBlacklist } from "../../api/apiBlacklist";
import { get } from "lodash";

const FormLicense = (props) => {
  const [blacklist, setBlacklist] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setBlacklist(blacklist);
  }, [blacklist]);
  const fetchData = async () => {
    const response = await searchBlacklist("C", "3610200165487");
    const data = get(response, "data", []);
    if (data.responseRecord.dataList.length > 0) {
      setBlacklist(true);
    } else setBlacklist(false);
  };

  return (
    <Container>
      <h3>การขอขึ้นทะเบียน UL</h3>
      <hr />
      <Row sm="4">
        <Col>
          <FormGroup>
            <label className={styles.label}>ประเภทการขอ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ คปภ. อนุมัติ</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <label className={styles.label}>วันที่ได้รับแบบฟอร์ม</label>
            <Input readOnly={true} type="text" name="radio1" />
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLicense;
