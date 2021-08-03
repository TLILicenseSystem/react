import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import {
  getExamLocation,
} from "../../api/apiGetExamLocation";
import {
  getProvinceCodeAll,
} from "../../api/apiGetProvinceCode";
import { getOrganizerAll } from "../../api/apiGetExamOrganizer";
import { getExamLocationZone, getExamType } from "../../api/apiGetConfig";
import { Table, Button } from "reactstrap";
import PropTypes from "prop-types";

export const LocationTable = ({ value, onClick }) => {
  //จังหวะที่ subscribe isShow /state.spinner สามารถดึง state ได้ทั้งหมด
  //const { isShow } = useSelector((state) => state.spinner);

  const [examLocationList, setExamLocationList] = useState([]);
  const [examProvinceList, setExamProvinceList] = useState([]);
  const [examZoneList, setExamZoneList] = useState([]);
  const [examOrganizerList, setExamOrganizerList] = useState([]);
  const [examLocationTypeList, setExamLocationTypeList] = useState([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [examOrganizerCode, setExamOrganizerCode] = useState("");
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
    console.log("LocationTable searchValue ", value);
    setProvinceCode(get(value, "provinceCode", ""));
    setExamOrganizerCode(get(value, "examOrganizerCode", ""));
  };

  useEffect(() => {
    console.log("LocationTable inital ");
    fetchData();
  }, []);

  const getProvinceData = (e) => {
    if (e !== "" || e !== null) {
      const provinceName = get(
        examProvinceList.filter((zone) => zone.provinceCode === e)[0],
        "provinceName",
        ""
      );
      console.log("getProvinceData " ,provinceName);
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

  return (
    <div style={{
      maxHeight: '700px',
      overflowY: 'auto'
    }}>
    <Table hover striped responsive bordered>
      {provinceCode}
      <thead>
        <tr>
          <th>รหัสที่ตั้ง</th>
          <th>สนามสอบ</th>
          <th>สถานที่สอบ</th>
          <th>ประเภท</th>
          <th>สถานที่ตั้งสอบ</th>
          <th>Action</th>
        </tr>
      </thead>
      
        <tbody>
          {examLocationList
            .filter(
              (zone) =>
                (zone.provinceCode === provinceCode &&
                  zone.orgCode === examOrganizerCode) ||
                provinceCode === ""
            )
            .map((detail, index) => {
              return (
                <tr key={index}>
                  <td>{get(detail, "locationId", "")}</td>
                  <td>
                    {get(detail, "provinceCode", "")}{" "}
                    {getProvinceData(get(detail, "provinceCode", ""))}
                  </td>
                  <td>
                    {get(detail, "orgCode", "")}{" "}
                    {getOrganizerData(get(detail, "orgCode", ""))}
                  </td>
                  <td>
                    {get(detail, "locationType", "")}{""}
                    {getLocationTypeData(get(detail, "locationType", ""))}
                  </td>
                  <td>{get(detail, "locationDetail", "")}</td>
                  <td>
                    <Button onClick={() => onClick(
                          {"locationId":get(detail, "locationId", ""),
                           "provinceCode":get(detail, "provinceCode", ""),
                           "provinceName":getProvinceData(get(detail, "provinceCode", "")),
                           "organizerCode":get(detail, "orgCode", ""),
                           "organizerName":getOrganizerData(get(detail, "orgCode", "")),
                           "locationTypeCode":get(detail, "locationType", ""),
                           "locationTypeName":getLocationTypeData(get(detail, "locationType", "")),
                           "locationDetail":get(detail, "locationDetail", ""),
                          }
                    )}>เลือก</Button>
                  </td>
                </tr>
              );
            })}
        
      
      </tbody>
    </Table>
    </div>
  );
};
LocationTable.defaultProps = {
  value: {},
  onClick: () => {},
};
LocationTable.propTypes = {
  value: PropTypes.object,
  onClick: PropTypes.func,
};
