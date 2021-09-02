import React, { useState, useEffect } from "react";
import { get } from "lodash";
import { getExamLocation } from "../../api/apiGetExamLocation";
import { getProvinceCodeAll } from "../../api/apiGetProvinceCode";
import { getOrganizerAll } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone, getExamType } from "../../api/apiGetConfig";
import { getExamRoundAll } from "../../api/apiGetExamRound";
import { Button } from "reactstrap";
import { DataGrid } from "@material-ui/data-grid";

// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
// import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import moment from "moment";
import { useStyles , } from "./table.style";

export const ScheduleTable = ({ examScheduleList, onClick }) => {
  //จังหวะที่ subscribe isShow /state.spinner สามารถดึง state ได้ทั้งหมด
  //const { isShow } = useSelector((state) => state.spinner);
  const [examLocationList, setExamLocationList] = useState([]);
  const [examProvinceList, setExamProvinceList] = useState([]);
  const [examZoneList, setExamZoneList] = useState([]);
  const [examOrganizerList, setExamOrganizerList] = useState([]);
  const [examLocationTypeList, setExamLocationTypeList] = useState([]);
  const [examRoundList, setExamRoundList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const fetchData = async () => {
    const responseLocation = await getExamLocation("A");
    setExamLocationList(get(responseLocation, "data", []));
    const responseProvince = await getProvinceCodeAll();
    setExamProvinceList(get(responseProvince, "data", []));
    const responseExamZone = getExamLocationZone();
    setExamZoneList(responseExamZone);
    const responseOrganizer = await getOrganizerAll();
    setExamOrganizerList(get(responseOrganizer, "data", []));
    const responseLocationType = await getExamType();
    setExamLocationTypeList(responseLocationType);
    const responseRound = await getExamRoundAll();
    setExamRoundList(get(responseRound, "data", []));
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
  const getLocationDetail = (key, value) => {
    if (value === "") {
      return "";
    }
    const locationDetail = examLocationList.filter(
      (zone) => zone.locationId === value
    )[0];

    if (key === "provinceName") {
      return getProvinceData(get(locationDetail, "provinceCode", ""));
    } else if (key === "locationTypeName") {
      return getLocationTypeData(get(locationDetail, "locationType", ""));
    } else if (key === "locationDetail") {
      return get(locationDetail, "locationDetail", "");
    } else if (key === "organizerName") {
      return getOrganizerData(get(locationDetail, "orgCode", ""));
    } else {
      return "";
    }
  };
  const getExamRoundDetail = (roundId) => {
    if (roundId !== "" || roundId !== null) {
      const roundTime = get(
        examRoundList.filter((zone) => zone.roundId === roundId)[0],
        "timeStr",
        ""
      );
      return roundTime;
    } else {
      return "";
    }
  };

  const columns = [
    {
      field: "examDateFormat",
      headerName: "วันที่สอบ",
      minWidth: 110,
      valueGetter: (params) =>
        `${moment(params.getValue(params.id, "examDate")).format(
          "DD/MM/yyyy"
        )}`,
      hideSortIcons: "true",
      headerClassName: 'header',
      cellClassName:"cellDark",
    },
    {
      field: "roundTime",
      headerName: "เวลาสอบ",
      minWidth: 115,
      hideSortIcons: "true",
      valueGetter: (params) =>
        `${getExamRoundDetail(params.getValue(params.id, "roundId"))}`,
      headerClassName: 'header',
    },
    {
      field: "maxApplicant",
      headerName: "จำนวนผู้สมัครสอบ",
      align: "left",
      hideSortIcons: "true",
      headerClassName: 'header',
    },
    {
      field: "applyCloseDateFormat",
      headerName: "วันที่ปิดรับสมัคร",
      minWidth: 110,
      valueGetter: (params) =>
        `${moment(params.getValue(params.id, "applyCloseDate")).format(
          "DD/MM/yyyy"
        )}`,
      align: "left",
      hideSortIcons: "true",
      headerClassName: 'header',
    },
    {
      field: "provinceName",
      headerName: "สนามสอบ",
      width: 115,
      align: "left",
      valueGetter: (params) =>
        `${getLocationDetail(
          "provinceName",
          params.getValue(params.id, "locationId")
        )}`,
      hideSortIcons: "true",
      headerClassName: 'header',
    },
    {
      field: "locationTypeName",
      headerName: "ประเภท",
      minWidth: 50,
      align: "left",
      valueGetter: (params) =>
        `${getLocationDetail(
          "locationTypeName",
          params.getValue(params.id, "locationId")
        )}`,
      hideSortIcons: "true",
      headerClassName: 'header',
    },
    {
      field: "locationDetail",
      headerName: "สถานที่ตั้งสอบ",
      minWidth: 50,
      align: "left",
      valueGetter: (params) =>
        `${getLocationDetail(
          "locationDetail",
          params.getValue(params.id, "locationId")
        )}`,
      hideSortIcons: "true",
      headerClassName: 'header',
    },
    {
      field: "applyOpenDateFormat",
      headerName: "วันที่ได้รับหนังสือ",
      minWidth: 110,
      align: "left",
      valueGetter: (params) =>
        `${moment(params.getValue(params.id, "applyOpenDate")).format(
          "DD/MM/yyyy"
        )}`,
      hideSortIcons: "true",
      headerClassName: 'header',
    },
    {
      field: "receiveTime",
      headerName: "เวลาที่ได้รับหนังสือ",
      minWidth: 50,
      align: "left",
      hideSortIcons: "true",
      headerClassName: 'header',
    },
    {
      field: "edit",
      headerName: "แก้ไข",
      width: 70,
      align: "left",
      hideSortIcons: "true",
      headerClassName: 'header',
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
                event:"edit",
                selected: cellValues.row,
                locationDetail: {
                  locationId: get(cellValues.row, "locationId", ""),
                  organizerName: getLocationDetail(
                    "organizerName",
                    get(cellValues.row, "locationId", "")
                  ),
                  provinceName: getLocationDetail(
                    "provinceName",
                    get(cellValues.row, "locationId", "")
                  ),
                  locationTypeName: getLocationDetail(
                    "locationTypeName",
                    get(cellValues.row, "locationId", "")
                  ),
                  locationDetail: getLocationDetail(
                    "locationDetail",
                    get(cellValues.row, "locationId", "")
                  ),
                },
                alteredLocationDetail: {
                  locationId: get(cellValues.row, "alteredLocationId", ""),
                  organizerName: getLocationDetail(
                    "organizerName",
                    get(cellValues.row, "alteredLocationId", "")
                  ),
                  provinceName: getLocationDetail(
                    "provinceName",
                    get(cellValues.row, "alteredLocationId", "")
                  ),
                  locationTypeName: getLocationDetail(
                    "locationTypeName",
                    get(cellValues.row, "alteredLocationId", "")
                  ),
                  locationDetail: getLocationDetail(
                    "locationDetail",
                    get(cellValues.row, "alteredLocationId", "")
                  ),
                },
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
      width: 70,
      align: "left",
      hideSortIcons: "true",
      headerClassName: 'header',
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
                event:"delete",
                selected: cellValues.row,
                locationDetail: {
                  locationId: get(cellValues.row, "locationId", ""),
                  organizerName: getLocationDetail(
                    "organizerName",
                    get(cellValues.row, "locationId", "")
                  ),
                  provinceName: getLocationDetail(
                    "provinceName",
                    get(cellValues.row, "locationId", "")
                  ),
                  locationTypeName: getLocationDetail(
                    "locationTypeName",
                    get(cellValues.row, "locationId", "")
                  ),
                  locationDetail: getLocationDetail(
                    "locationDetail",
                    get(cellValues.row, "locationId", "")
                  ),
                },
                alteredLocationDetail: {
                  locationId: get(cellValues.row, "alteredLocationId", ""),
                  organizerName: getLocationDetail(
                    "organizerName",
                    get(cellValues.row, "alteredLocationId", "")
                  ),
                  provinceName: getLocationDetail(
                    "provinceName",
                    get(cellValues.row, "alteredLocationId", "")
                  ),
                  locationTypeName: getLocationDetail(
                    "locationTypeName",
                    get(cellValues.row, "alteredLocationId", "")
                  ),
                  locationDetail: getLocationDetail(
                    "locationDetail",
                    get(cellValues.row, "alteredLocationId", "")
                  ),
                },
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

  return (
    <div style={{ height: 300, width: "1000px" }} >
      <DataGrid
        //rowHeight={20}
        className={classes.root}
        rows={examScheduleList}
        columns={columns}
        pageSize={10}
        id="scheduleId"
        disableSelectionOnClick
        disableColumnMenu        
      />
    </div>
  );
};
ScheduleTable.defaultProps = {
  provinceCode: "",
  examOrganizerCode: "",
  roundId: "",
  examDate: "",
  onClick: () => {},
};
ScheduleTable.propTypes = {
  provinceCode: PropTypes.string,
  examOrganizerCode: PropTypes.string,
  roundId: PropTypes.string,
  examDate: PropTypes.string,
  onClick: PropTypes.func,
};
