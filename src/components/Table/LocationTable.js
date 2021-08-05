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
import { useStyles } from "./table.style";
import PropTypes from "prop-types";

export const LocationTable = ({ provinceCode, examOrganizerCode, onClick }) => {
  //จังหวะที่ subscribe isShow /state.spinner สามารถดึง state ได้ทั้งหมด
  //const { isShow } = useSelector((state) => state.spinner);
  const classes = useStyles();
  const [examLocationList, setExamLocationList] = useState([]);
  const [examProvinceList, setExamProvinceList] = useState([]);
  const [examZoneList, setExamZoneList] = useState([]);
  const [examOrganizerList, setExamOrganizerList] = useState([]);
  const [examLocationTypeList, setExamLocationTypeList] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
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

  //examOrganizerList

  const columns = [
    { id: "locationId", label: "รหัสที่ตั้ง", minWidth: 80 },
    { id: "provinceCode", label: "สนามสอบ", minWidth: 100 },
    {
      id: "orgCode",
      label: "สถานที่สอบ",
      minWidth: 150,
      align: "left",
    },
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
      style={{
        maxHeight: "600px",
        overflowY: "auto",
        margin: "auto",
      }}
    >
      <TableContainer>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {examLocationList
              .filter(
                (zone) =>
                  (zone.provinceCode === provinceCode &&
                    zone.orgCode === examOrganizerCode) ||
                  provinceCode === ""
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((detail, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell key={index}>
                      {get(detail, "locationId", "")}
                    </TableCell>
                    <TableCell key={index}>
                      {get(detail, "provinceCode", "")}{" "}
                      {getProvinceData(get(detail, "provinceCode", ""))}
                    </TableCell>
                    <TableCell key={index}>
                      {get(detail, "orgCode", "")}{" "}
                      {getOrganizerData(get(detail, "orgCode", ""))}
                    </TableCell>
                    <TableCell key={index}>
                      {get(detail, "locationType", "")}
                      {""}
                      {getLocationTypeData(get(detail, "locationType", ""))}
                    </TableCell>
                    <TableCell key={index}>
                      {get(detail, "locationDetail", "")}
                    </TableCell>
                    <TableCell key={index}>
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
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={examLocationList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};
LocationTable.defaultProps = {
  provinceCode: "",
  examOrganizerCode: "",
  onClick: () => {},
};
LocationTable.propTypes = {
  provinceCode: PropTypes.string,
  examOrganizerCode: PropTypes.string,
  onClick: PropTypes.func,
};