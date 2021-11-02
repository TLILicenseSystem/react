import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

export const columns = [
  {
    field: "id",
    headerName: "ลำดับ",
    minWidth: 80,
    hideSortIcons: "true",
    headerClassName: "header",
    cellClassName: "cellDark",
  },
  {
    field: "offerName",
    headerName: "ประเภท",
    minWidth: 160,
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "offerResultName",
    headerName: "ผลการขอใบอนุญาต",
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
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "issueDate",
    headerName: "วันที่ออกบัตร",
    minWidth: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "expireDate",
    headerName: "วันที่หมดอายุ",
    minWidth: 160,
    align: "left",
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
    field: "id",
    headerName: "ลำดับ",
    minWidth: 80,
    hideSortIcons: "true",
    headerClassName: "header",
    cellClassName: "cellDark",
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
    field: "issueDate",
    headerName: "วันที่ออกบัตร",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },

  {
    field: "expireDate",
    headerName: "วันที่หมดอายุ",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "companyName",
    headerName: "สังกัดบริษัท",
    minWidth: 160,
    align: "left",
    // valueGetter: (params) =>
    // `${moment(params.getValue(params.id, "issueDate")).format(
    //   "DD/MM/yyyy"
    // )}`,
    hideSortIcons: "true",
    headerClassName: "header",
  },
];
