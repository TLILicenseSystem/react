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
    field: "b",
    headerName: "ประเภท",
    minWidth: 160,
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "c",
    headerName: "ผลการขอใบอนุญาต",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "d",
    headerName: "เลขที่ใบอนุญาต",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },

  {
    field: "e",
    headerName: "วันที่ คปภ. อนุมัติ",
    width: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "f",
    headerName: "วันที่ได้รับแบบฟอร์ม",
    minWidth: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "x",
    headerName: "วันที่ออกบัตร",
    minWidth: 160,
    align: "left",
    hideSortIcons: "true",
    headerClassName: "header",
  },
  {
    field: "x",
    headerName: "วันที่หมดอายุ",
    minWidth: 160,
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
