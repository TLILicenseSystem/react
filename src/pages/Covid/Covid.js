import React, { useState, useEffect } from "react";
import { Container, Wrapper } from "../../components/shared";
import BoxCovid from "./BoxCovid";
import styles from "./Covid.module.css";
import api from "../../api/api";

const Covid = () => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    const { status, data } = await api.get("/api/open/today");

    if (status === 200) {
      setData(data);
    } else {
      alert("error");
    }
  };

  const {
    Confirmed = 0,
    Recovered = 0,
    Hospitalized = 0,
    Deaths = 0,
    NewConfirmed = 0,
    NewRecovered = 0,
    NewDeaths = 0,
    NewHospitalized = 0,
    UpdateDate = "",
  } = data;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Wrapper width="640px">
        <h1 className="text-center">รายงานสถานการณ์โควิด-19</h1>
        <h2 className="text-center">อัปเดตข้อมูลล่าสุด : {UpdateDate}</h2>
        <br />
        <div>
          <BoxCovid
            color="#e1298e"
            title="ติดเชื้อสะสม"
            total={Confirmed}
            increase={NewConfirmed}
          />
        </div>
        <div className={styles.covidContainer}>
          <BoxCovid
            color="#046034"
            title="หายแล้ว"
            total={Recovered}
            increase={NewRecovered}
          />
          <BoxCovid
            color="#179c9b"
            title="รักษาตัวอยู่ใน รพ."
            total={Hospitalized}
            increase={NewHospitalized}
          />
          <BoxCovid
            color="#666666"
            title="เสียชีวิต"
            total={Deaths}
            increase={NewDeaths}
          />
        </div>
      </Wrapper>
    </Container>
  );
};

export default Covid;
