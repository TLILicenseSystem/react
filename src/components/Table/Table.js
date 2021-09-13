import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useStyles } from "./table.style";
import PropTypes from "prop-types";

export const Table = ({ id, data, columns, loading }) => {
  const classes = useStyles();

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <DataGrid
        id={id}
        rows={loading ? [] : data}
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
  loading: false,
};
Table.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
};
