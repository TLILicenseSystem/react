import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";
import { useStyles } from "./table.style";

export const EditLocationTable = ({ rows, onClick }) => {
  const columns = [
    { field: "orgCode", headerName: "รหัสสถานที่สอบ", width: 200 },
    { field: "orgName", headerName: "ชื่อสถานที่สอบ", width: 250 },
    {
      field: "edit",
      headerName: "แก้ไข",
      width: 150,
      align: "left",
      renderCell: (cellValues) => {
        return (
          <Button
            size="sm"
            variant="contained"
            color="primary"
            // onClick={(event) => {
            //   handleClick(event, cellValues);
            // }}

            onClick={(event) =>
              onClick({
                selected: cellValues.row,
                action: "edit",
              })
            }
          >
            แก้ไข
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "ลบ",
      width: 150,
      align: "left",
      renderCell: (cellValues) => {
        return (
          <Button
            size="sm"
            variant="contained"
            color="danger"
            // onClick={(event) => {
            //   handleClick(event, cellValues);
            // }}
            onClick={(event) =>
              onClick({
                selected: cellValues.row,
                action: "delete",
              })
            }
          >
            ลบ
          </Button>
        );
      },
    },
  ];

  const classes = useStyles();
  console.log("rows in roundTable=========>>>>>", rows);

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={10}
        id="orgCode"
        disableSelectionOnClick
        disableColumnMenu
      />
    </div>
  );
};

EditLocationTable.defaultProps = {
  onClick: () => {},
};
EditLocationTable.propTypes = {
  onClick: PropTypes.func,
};
// export default RoundTable;
