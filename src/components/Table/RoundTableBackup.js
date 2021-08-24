import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import api from "../../api/api";
import apiSpring from "../../api/apiSpring";
import axios from "axios";
import { get } from "lodash";
import { Button } from "reactstrap";
import PropTypes from "prop-types";

export const RoundTable = ({onClick}) => {

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
 //----------------------------for SearchAll spring boot------------------------
 const fetchData = async () => {
    let formData = new FormData(); //formdata object
    formData.append("type", "A"); //append the values with key, value pair
    const config = { headers: { "content-type": "application/json" } };

    try {
      const { status, data } = await apiSpring.post(
        "/examround/search",
        formData,
        config
      );
      if (status === 200) {
        setResult(data); //เมื่อ setResult แล้ว ค่า result จะได้เป็นค่า arraylist ของ data สามารถนำค่า resultมาใช้ได้เลย เช่น result[0] คือ arrayตัวที่0
        console.log("result in fetchData spring >>>>>>>>>>>>>.. ", data);
      } else {
        alert("พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ! ", status);
        throw new Error();
      }
    } catch (err) {
      alert("พบข้อผิดพลาดในการค้นหาข้อมูลรอบเวลาสอบ! ", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    const columns = [
        { id: "roundId", label: "รหัสรอบเวลาสอบ", minWidth: 80 },
        { id: "timeStr", label: "รอบเวลาสอบ", minWidth: 100 },
      
        {
          id: "edit",
          label: "แก้ไข",
          minWidth: 50,
          align: "left",
        },
        {
            id: "delete",
            label: "ลบ",
            minWidth: 50,
            align: "left",
          }
      ];


return(
<div>
<TableContainer component="div">
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
            {result
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((detail, index) => {
                return (
                  <TableRow hover role="checkbox" key={index}>
                    <TableCell >
                      {get(detail, "roundId", "")}
                    </TableCell>
                    <TableCell>
                      {get(detail, "timeStr", "")}{" "}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() =>
                          onClick({
                            roundId: get(detail, "roundId", ""),
                            timeStr: get(detail, "timeStr", ""),
                            action: "edit"

                          })
                        }
                      >
                        แก้ไข
                      </Button>
                      </TableCell>


                      <TableCell>
                      <Button
                        size="sm"

                        onClick={() =>
                          onClick({
                            roundId: get(detail, "roundId", ""),
                            timeStr: get(detail, "timeStr", ""),
                            action: "delete"
                          })
                        }
                      >
                        ลบ
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
        count={result.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="จำนวนแถวต่อหน้า:"
      />
      </div>
) ;
};
RoundTable.defaultProps = {

    onClick: () => {},
  };
  RoundTable.propTypes = {

    onClick: PropTypes.func,
  };
// export default RoundTable;