import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

export const columnsSIC = [
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
    field: "approveDate",
    headerName: "วันที่ ก.ล.ต. อนุมัติ",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "receiveDate",
    headerName: "วันที่ได้รับแบบฟอร์ม",
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
];

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
    field: "approveDate",
    headerName: "วันที่ คปภ. อนุมัติ",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "receiveDate",
    headerName: "วันที่ได้รับแบบฟอร์ม",
    minWidth: 160,
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
];
