import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles } from "./table.style";
import PropTypes from "prop-types";

export const Table = ({ id, data, columns }) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        autoHeight
        id={id}
        rows={data}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        disableColumnMenu
        className={classes.root}
      />
    </div>
  );
};
Table.defaultProps = {
  id: "data-table",
  data: [],
  columns: [],
};
Table.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
};
