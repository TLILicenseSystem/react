import React, { useState,useEffect } from "react";
import { Collapse, Card, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const header = {
  cursor: "pointer",
  marginBottom: "0px",
  display: "flex",
  justifyContent: "space-between",
};
const collapse = {
  // background: "#f7f7f7",
  padding: "14px",
  margin: "14px",
  alignContent: "flex-end",
  flexDirection: "row",
  alignItems: "flex-end",
};

export const FilterCollapse = ({ open,title, children }) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Card>
      <CardBody>
        <h3 onClick={toggle} style={header}>
          {title}  
          <FontAwesomeIcon
            icon={isOpen ? faAngleUp : faAngleDown}
            className="float-right"
          />
        </h3>
        <Collapse isOpen={isOpen} style={collapse}>
          {children}
        </Collapse>
      </CardBody>
    </Card>
  );
};

FilterCollapse.defaultProps = {
  title: "ตัวกรองข้อมูล",
  open:false,
  children: "",
  onClick: () => {},
};
FilterCollapse.propTypes = {
  title: PropTypes.string,
  open:PropTypes.bool,
  children: PropTypes.object,
  onClick: PropTypes.func,
};
