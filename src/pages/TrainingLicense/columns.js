import moment from "moment";

export const columns = [
  {
    field: "a",
    headerName: "ลำดับ",
    minWidth: 80,
    hideSortIcons: "true",
    headerClassName: "header",
    cellClassName: "cellDark",
  },
  {
    field: "offerTypeName",
    headerName: "ประเภท",
    minWidth: 160,
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "offerResultName",
    headerName: "ผลการขอใบอนญาต",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "licenseNo",
    headerName: "เลขที่ใบอนุญาต",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },

  {
    field: "offerDate",
    headerName: "วันที่ยื่น คปภ.",
    width: 160,
    align: "left",
    // valueGetter: (params) =>
    // `${moment(params.getValue(params.id, "issueDate")).format(
    //   "DD/MM/yyyy"
    // )}`,
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "issueDate",
    headerName: "วันที่ออกบัตร",
    minWidth: 160,
    align: "left",
    // valueGetter: (params) =>
    // `${moment(params.getValue(params.id, "issueDate")).format(
    //   "DD/MM/yyyy"
    // )}`,
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "expireDate",
    headerName: "วันที่หมดอายุ",
    minWidth: 160,
    align: "left",
    valueGetter: (params) =>
      `${moment(params.getValue(params.id, "expireDate")).format(
        "DD/MM/yyyy"
      )}`,
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "licenseTimes",
    headerName: "ครั้งที่ต่อ",
    minWidth: 100,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  // {
  //   field: "v",
  //   headerName: "เลือก",
  //   align: "center",
  //   hideSortIcons: "true",
  //   headerClassName: "header",
  //   width: 100,
  //   renderCell: (cellValues) => {
  //     return (
  //       <EditButton
  //         title="เลือก"
  //         onClick={() => onClickEditExamApplication(cellValues.row)}
  //       />
  //     );
  //   },
  // },
];

export const columns_company = [
  {
    field: "a",
    headerName: "ลำดับ",
    minWidth: 80,
    hideSortIcons: "true",
    headerClassName: "header",
    cellClassName: "cellDark",
  },
  {
    field: "b",
    headerName: "บริษัท",
    minWidth: 160,
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "c",
    headerName: "เลขที่ใบอนุญาต",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "d",
    headerName: "วันที่ออกบัตร",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },

  {
    field: "e",
    headerName: "วันที่หมดอายุ",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "f",
    headerName: "ประเภท",
    minWidth: 160,
    align: "left",
    // valueGetter: (params) =>
    // `${moment(params.getValue(params.id, "issueDate")).format(
    //   "DD/MM/yyyy"
    // )}`,
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "g",
    headerName: "วันที่",
    minWidth: 160,
    align: "left",
    valueGetter: (params) =>
      `${moment(params.getValue(params.id, "expireDate")).format(
        "DD/MM/yyyy"
      )}`,
    hideSortIcons: "true",
    headerClassName: "header",
  },
];
