import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { getExamLocation } from "../../api/apiGetExamLocation";
import { getProvinceCodeAll } from "../../api/apiGetProvinceCode";
import { getOrganizerAll } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone, getExamType } from "../../api/apiGetConfig";
import { getExamRoundAll } from "../../api/apiGetExamRound";
import { Button } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import moment from "moment";

export const ScheduleTable = ({
  examScheduleList,
  onClick,
}) => {
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
    console.log(
      "getLocationDetail ",
      examLocationList.filter((zone) => zone.locationId === value)[0]
    );
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
      return getOrganizerData(get(locationDetail, "organizerCode", ""));
    } else {
      return "";
    }
  };
  const getExamRoundDetail = (roundId) => {
    console.log("getExamRoundDetail " , roundId);
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
    { id: "examDate", label: "วันที่สอบ", minWidth: 50 },
    { id: "roundId", label: "เวลาสอบ", minWidth: 50 },
    {
      id: "maxApplicant",
      label: "จำนวนผู้สมัครสอบ",
      align: "left",
      minWidth: 50,
    },
    {
      id: "applyCloseDate",
      label: "วันที่ปิดรับสมัคร",
      minWidth: 50,
      align: "left",
    },
    {
      id: "examLocation.provinceName",
      label: "สนามสอบ",
      minWidth: 50,
      align: "left",
    },
    {
      id: "examLocation.locationType",
      label: "ประเภท",
      minWidth: 50,
      align: "left",
    },
    {
      id: "examLocation.locationDetail",
      label: "สถานที่ตั้งสอบ",
      minWidth: 50,
      align: "left",
    },
    {
      id: "applyOpenDate",
      label: "วันที่ได้รับหนังสือ",
      minWidth: 50,
      align: "left",
    },
    {
      id: "roundId",
      label: "เวลาที่ได้รับหนังสือ",
      minWidth: 50,
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
        maxHeight: "550px",
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
            {/* {provinceCode}{examOrganizerCode}{roundId}{moment(examDate).format("DD/MM/yyyy")} */}
            {examScheduleList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((detail, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell key={index}>
                      {moment(get(detail, "examDate", "")).format("DD/MM/yyyy")}
                    </TableCell>
                    <TableCell key={index}>
                      {getExamRoundDetail(get(detail, "roundId", ""))}
                    </TableCell>
                    <TableCell key={index}>
                      {get(detail, "maxApplicant", "")}{" "}
                    </TableCell>
                    <TableCell key={index}>
                      {moment(get(detail, "applyCloseDate", "")).format(
                        "DD/MM/yyyy"
                      )}
                    </TableCell>
                    <TableCell key={index}>
                      {getLocationDetail(
                        "provinceName",
                        get(detail, "locationId", "")
                      )}
                    </TableCell>
                    <TableCell key={index}>
                      {getLocationDetail(
                        "locationTypeName",
                        get(detail, "locationId", "")
                      )}
                    </TableCell>
                    <TableCell key={index}>
                      {getLocationDetail(
                        "locationDetail",
                        get(detail, "locationId", "")
                      )}
                    </TableCell>
                    <TableCell key={index}>
                      {get(detail, "receiveDate", "") === null
                        ? ""
                        : moment(get(detail, "receiveDate", null)).format(
                            "DD/MM/yyyy"
                          )}
                    </TableCell>
                    <TableCell key={index}>
                      {get(detail, "receiveTime", "")}
                    </TableCell>
                    <TableCell key={index}>
                      <Button
                        size="sm"
                        onClick={() =>
                          onClick({
                            scheduleId: get(detail, "scheduleId", ""),
                            examDate: moment(
                              get(detail, "examDate", "")
                            ).format("DD/MM/yyyy"),
                            applyCloseDate: moment(
                              get(detail, "applyCloseDate", "")
                            ).format("DD/MM/yyyy"),
                            roundId: get(detail, "roundId", ""),
                            receiveDate:
                              get(detail, "receiveDate", "") === null
                                ? ""
                                : moment(
                                    get(detail, "receiveDate", null)
                                  ).format("DD/MM/yyyy"),
                            receiveTime: (get(detail, "receiveTime", "") + "").trim(),
                            maxApplicant: get(detail, "maxApplicant", ""),
                            locationDetail: {
                              locationId: get(detail, "locationId", ""),
                              organizerName: getLocationDetail(
                                "organizerName",
                                get(detail, "locationId", "")
                              ),
                              provinceName: getLocationDetail(
                                "provinceName",
                                get(detail, "locationId", "")
                              ),
                              locationTypeName: getLocationDetail(
                                "locationTypeName",
                                get(detail, "locationId", "")
                              ),
                              locationDetail: getLocationDetail(
                                "locationDetail",
                                get(detail, "locationId", "")
                              ),
                            },
                            alteredLocationDetail: {
                              locationId: get(detail, "alteredLocationId", ""),
                              organizerName: getLocationDetail(
                                "organizerName",
                                get(detail, "locationId", "")
                              ),
                              provinceName: getLocationDetail(
                                "provinceName",
                                get(detail, "alteredLocationId", "")
                              ),
                              locationTypeName: getLocationDetail(
                                "locationTypeName",
                                get(detail, "alteredLocationId", "")
                              ),
                              locationDetail: getLocationDetail(
                                "locationDetail",
                                get(detail, "alteredLocationId", "")
                              ),
                            },
                          })
                        }
                      >
                        แก้ไข
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
        count={examScheduleList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
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
