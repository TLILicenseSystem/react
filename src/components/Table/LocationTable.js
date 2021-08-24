import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { getExamLocation } from "../../api/apiGetExamLocation";
import { getProvinceCodeAll } from "../../api/apiGetProvinceCode";
import { getOrganizerAll } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone, getExamType } from "../../api/apiGetConfig";
import { Button } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { DataGrid } from '@material-ui/data-grid';
import { useStyles, StyleTableCell, StyledTableRow, StyledTablePagination } from "./table.style";
import PropTypes from "prop-types";

export const LocationTable = ({ provinceCode, examOrganizerCode, onClick, examLocationList }) => {

  const classes = useStyles();
  const [examProvinceList, setExamProvinceList] = useState([]);
  const [examZoneList, setExamZoneList] = useState([]);
  const [examOrganizerList, setExamOrganizerList] = useState([]);
  const [examLocationTypeList, setExamLocationTypeList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const fetchData = async () => {
    // const responseLocation = await getExamLocation("A");
    // setExamLocationList(get(responseLocation, "data", []));
    const responseProvince = await getProvinceCodeAll();
    setExamProvinceList(get(responseProvince, "data", []));
    const responseExamZone = getExamLocationZone();
    setExamZoneList(responseExamZone);
    const responseOrganizer = await getOrganizerAll();
    setExamOrganizerList(get(responseOrganizer, "data", []));
    const responseLocationType = await getExamType();
    setExamLocationTypeList(responseLocationType);
  };

  useEffect(() => {
    console.log("LocationTable inital ");
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getProvinceData = (e) => {
    if (e !== "" || e !== null) {
      const provinceName = get(
        examProvinceList.filter((zone) => zone.provinceCode === e)[0],
        "provinceName",
        ""
      );
      return provinceName;
    } else {
      return "";
    }
  };
  const getRegionData = (e) => {
    if (e !== "" || e !== null) {
      const region = get(
        examProvinceList.filter((zone) => zone.provinceCode === e)[0],
        "region",
        ""
      );

      if (region !== "") {
        const regionName = get(
          examZoneList.filter((zone) => zone.regionCode === region)[0],
          "regionName",
          ""
        );
        return regionName;
      }
    }
    return "";
  };
  const getOrganizerData = (e) => {
    if (e !== "" || e !== null) {
      const organizerName = get(
        examOrganizerList.filter((zone) => zone.orgCode === e)[0],
        "orgName",
        ""
      );
      return organizerName;
    } else {
      return "";
    }
  };
  const getLocationTypeData = (e) => {
    if (e !== "" || e !== null) {
      const locationType = get(
        examLocationTypeList.filter((zone) => zone.examTypeId === e)[0],
        "examTypeName",
        ""
      );
      return locationType;
    } else {
      return "";
    }
  };

  const columns = [
    { id: "locationId", label: "รหัสที่ตั้ง", minWidth: 80, className:classes },
    {
      id: "orgCode",
      label: "สนามสอบ",
      minWidth: 150,
      align: "left",
    },
    { id: "provinceCode", label: "สถานที่สอบ", minWidth: 100 },
    {
      id: "locationType",
      label: "ประเภท",
      minWidth: 100,
      align: "left",
    },
    {
      id: "locationDetail",
      label: "สถานที่ตั้งสอบ",
      minWidth: 200,
      align: "left",
    },
    {
      id: "edit",
      label: "แก้ไข",
      minWidth: 50,
      align: "left",
    },
  ];

  return (
    <div
      style={{ marginLeft:"0px",  height: 480, width: "100%" }}
    >

      {/* <DataGrid
        rows={examLocationList
          .filter(
            (zone) =>
              (zone.provinceCode === provinceCode &&
                zone.orgCode === examOrganizerCode) ||
              (zone.provinceCode === provinceCode &&
                examOrganizerCode === "") ||
              (zone.orgCode === examOrganizerCode &&
                provinceCode === "") || (examOrganizerCode === "" && provinceCode === "")
          )
        }
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.locationId}
        //checkboxSelection
        disableSelectionOnClick
      /> */}
      <TableContainer component="div">
        <Table classname={classes.container}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyleTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  //sortDirection={{}}
                >
                  {column.label}
                </StyleTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {examLocationList
              .filter(
                (zone) =>
                  (zone.provinceCode === provinceCode &&
                    zone.orgCode === examOrganizerCode) ||
                  (zone.provinceCode === provinceCode &&
                    examOrganizerCode === "") ||
                  (zone.orgCode === examOrganizerCode &&
                    provinceCode === "") || (examOrganizerCode === "" && provinceCode === "")
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((detail, index) => {
                return (
                  <StyledTableRow hover role="checkbox" key={index}>
                    <StyleTableCell >
                      {get(detail, "locationId", "")}
                    </StyleTableCell>                    
                    <StyleTableCell>
                      {get(detail, "orgCode", "")}{" "}
                      {getOrganizerData(get(detail, "orgCode", ""))}
                    </StyleTableCell>
                    <StyleTableCell>
                      {get(detail, "provinceCode", "")}{" "}
                      {getProvinceData(get(detail, "provinceCode", ""))}
                    </StyleTableCell>
                    <StyleTableCell>
                      {get(detail, "locationType", "")}{" "}                      
                      {getLocationTypeData(get(detail, "locationType", ""))}
                    </StyleTableCell>
                    <StyleTableCell>
                      {get(detail, "locationDetail", "")}
                    </StyleTableCell>
                    <StyleTableCell>
                      <Button
                        size="sm"
                        onClick={() =>
                          onClick({
                            locationId: get(detail, "locationId", ""),
                            provinceCode: get(detail, "provinceCode", ""),
                            provinceName: getProvinceData(
                              get(detail, "provinceCode", "")
                            ),
                            organizerCode: get(detail, "orgCode", ""),
                            organizerName: getOrganizerData(
                              get(detail, "orgCode", "")
                            ),
                            locationTypeCode: get(detail, "locationType", ""),
                            locationTypeName: getLocationTypeData(
                              get(detail, "locationType", "")
                            ),
                            locationDetail: get(detail, "locationDetail", ""),
                          })
                        }
                      >
                        เลือก
                      </Button>
                    </StyleTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledTablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={examLocationList.filter(
          (zone) =>
            (zone.provinceCode === provinceCode &&
              zone.orgCode === examOrganizerCode) ||
            (zone.provinceCode === provinceCode &&
              examOrganizerCode === "") ||
            (zone.orgCode === examOrganizerCode &&
              provinceCode === "") || (examOrganizerCode === "" && provinceCode === "")
        ).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="จำนวนแถวต่อหน้า:"
      />
    </div>
  );
};
LocationTable.defaultProps = {
  provinceCode: "",
  examOrganizerCode: "",
  onClick: () => {},
  examLocationList: [],
};
LocationTable.propTypes = {
  provinceCode: PropTypes.string,
  examOrganizerCode: PropTypes.string,
  onClick: PropTypes.func,
  examLocationList: PropTypes.array,
};
