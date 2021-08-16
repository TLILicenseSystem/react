import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from '@material-ui/styles';

export const RoundTable = ({ rows, onClick }) => {
  
  const columns = [
    { field: "roundId", headerName: "รหัสรอบเวลาสอบ", width: 200 },
    { field: "timeStr", headerName: "รอบเวลาสอบ", width: 250 },
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
                action:"edit",
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
                action:"delete",
              })
            }
          >
            ลบ
          </Button>
        );
      },
    },
  ];

  
  const useStyles = makeStyles({
    root: {
      '& .super-app-theme--header': {
        backgroundColor: 'rgba(255, 7, 0, 0.55)',
      },
    },
  });
  const classes = useStyles();
  

   console.log("rows in roundTable=========>>>>>", rows);

  return (
    <div style={{ height: 300, width: '100%' }} className={classes.root}>
      <DataGrid 
        rows={rows}
        columns={columns}
        pageSize={10}
        id="roundId"
        disableSelectionOnClick
      />
      
    </div>
  );
};

RoundTable.defaultProps = {

  onClick: () => {},
};
RoundTable.propTypes = {
  onClick: PropTypes.func,
};
// export default RoundTable;
