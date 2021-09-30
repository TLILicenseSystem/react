import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Table, EditButton } from "../shared";
import { useSelector, useDispatch } from "react-redux";
import { hideSelectSalePopup } from "../../redux/actions";
import PropTypes from "prop-types";

export const SelectSalePopup = ({ onChange }) => {
  const dispatch = useDispatch();
  const { isShow, title, list } = useSelector((state) => state.selectSalePopup);
  const [saleList, setSaleList] = useState([]);

  useEffect(() => {
    setSaleList(list);
  }, [list]);

  const columns = [
    {
      field: "name",
      headerName: "ชื่อ-นามสกุล",
      minWidth: 200,
      hideSortIcons: "true",
      headerClassName: "header",
      cellClassName: "cellDark",
    },
    {
      field: "personID",
      headerName: "รหัสประจำตัว",
      minWidth: 120,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "citizenID",
      headerName: "เลขบัตรประชาชน",
      minWidth: 140,
      hideSortIcons: "true",
      headerClassName: "header",
    },
    {
      field: "v",
      headerName: "เลือก",
      align: "center",
      hideSortIcons: "true",
      headerClassName: "header",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <EditButton title="เลือก" onClick={() => onSelect(cellValues.row)} />
        );
      },
    },
  ];

  const toggle = () => dispatch(hideSelectSalePopup());
  const onSelect = (data) => {
    onChange(data);
    toggle();
  };

  return (
    <Modal isOpen={isShow} size="xl" toggle={toggle}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <Table
          id="sale-select"
          data={saleList}
          columns={columns}
          loading={false}
        />
      </ModalBody>
    </Modal>
  );
};
SelectSalePopup.defaultProps = {
  onChange: () => {},
};
SelectSalePopup.propTypes = {
  onChange: PropTypes.func,
};
