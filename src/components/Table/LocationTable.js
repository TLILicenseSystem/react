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
import { DataGrid } from "@material-ui/data-grid";
import { useStyles } from "./table.style";
import PropTypes from "prop-types";

export const LocationTable = ({
  provinceCode,
  examOrganizerCode,
  onClick,
  examLocationList,
  event,
}) => {
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
    { field: "locationId", headerName: "รหัสที่ตั้ง" },
    {
      field: "orgName",
      headerName: "สถานที่สอบ",
      minWidth: 200,
      align: "left",
      valueGetter: (params) =>
        `${getOrganizerData(params.getValue(params.id, "orgCode"))}`,
    },
    {
      field: "provinceName",
      headerName: "สนามสอบ",
      minWidth: 200,
      valueGetter: (params) =>
        `${getProvinceData(params.getValue(params.id, "provinceCode"))}`,
    },
    {
      field: "locationName",
      headerName: "ประเภท",
      minWidth: 150,
      align: "left",
      valueGetter: (params) =>
        `${getLocationTypeData(params.getValue(params.id, "locationType"))}`,
    },
    {
      field: "locationDetail",
      headerName: "สถานที่ตั้งสอบ",
      minWidth: 200,
      align: "left",
    },
    {
      field: get(event, "event", "") === "edit" ? "edit" : "select",
      headerName: get(event, "event", "") === "edit" ? "แก้ไข" : "เลือก",
      align: "left",
      minWidth: 125,
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
                locationDetail: {
                  locationId: get(cellValues.row, "locationId", ""),
                  organizerName: getOrganizerData(
                    get(cellValues.row, "orgCode", "")
                  ),
                  provinceName: getProvinceData(
                    get(cellValues.row, "provinceCode", "")
                  ),
                  locationTypeName: getLocationTypeData(
                    get(cellValues.row, "locationType", "")
                  ),
                  locationDetail: get(cellValues.row, "locationDetail", ""),
                },
              })
            }
          >
            {get(event, "event", "") === "edit" ? "แก้ไข" : "เลือก"}
          </Button>
        );
      },
    },
    get(event, "event", "") === "edit"
      ? {
          field: "delete",
          headerName: "ลบ",
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
                    event: "delete",
                    selected: cellValues.row,
                    locationDetail: {
                      locationId: get(cellValues.row, "locationId", ""),
                      organizerName: getOrganizerData(
                        get(cellValues.row, "orgCode", "")
                      ),
                      provinceName: getProvinceData(
                        get(cellValues.row, "provinceCode", "")
                      ),
                      locationTypeName: getLocationTypeData(
                        get(cellValues.row, "locationType", "")
                      ),
                      locationDetail: get(cellValues.row, "locationDetail", ""),
                    },
                  })
                }
              >
                ลบ
              </Button>
            );
          },
        }
      : "",
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={examLocationList.filter(
          (zone) =>
            (zone.provinceCode === provinceCode &&
              zone.orgCode === examOrganizerCode) ||
            (zone.provinceCode === provinceCode && examOrganizerCode === "") ||
            (zone.orgCode === examOrganizerCode && provinceCode === "") ||
            (examOrganizerCode === "" && provinceCode === "")
        )}
        columns={columns}
        pageSize={10}
        id="locationId"
        disableSelectionOnClick
        disableColumnMenu
        className={classes.root}
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
