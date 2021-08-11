import { useState, useEffect } from "react";
import { getExamLocation, getExamLocationAll } from "../api/apiGetExamLocation";
import {
  getProvinceCode,
  getProvinceCodeAll,
} from "../api/apiGetProvinceCode";
import { getOrganizerAll } from "../api/apiGetExamOrganizer";
import { getExamLocationZone, getExamType } from "../api/apiGetConfig";
import { get } from "lodash";

//ตั้งชื่อให้เป็น use ตามด้วย ... และภายในมีเรียกใช้ use... ซักอัน
const useFetchLocationList = (locationId) => {
  const [examLocationList, setExamLocationList] = useState([]);
  const [examProvinceList, setExamProvinceList] = useState([]);
  const [examZoneList, setExamZoneList] = useState([]);
  const [examOrganizerList, setExamOrganizerList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {

      let inputApi = "";
      if (locationId === "" || locationId === undefined){
        inputApi = "A";
      } else {
        inputApi = locationId;
      }
      const response = await getExamLocation(inputApi);
      console.log("useFetchLocationList ", get(response,"data",[]));
      setExamLocationList(get(response,"data",[]));

      const responseProvince = await getProvinceCodeAll();
      setExamProvinceList(get(responseProvince, "data", []));
      const responseExamZone = getExamLocationZone();
      setExamZoneList(responseExamZone);
      const responseOrganizer = await getOrganizerAll();
      setExamOrganizerList(get(responseOrganizer, "data", []));

    };

    fetchData();
    
  }, []);
  return {
    examLocationList,
    examProvinceList,
    examZoneList,
    examOrganizerList,
  };
};

export default useFetchLocationList;
