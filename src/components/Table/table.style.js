import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from "@material-ui/core/TablePagination";
import { createTheme, darken, lighten } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  
  root: {      
      "& div": {
        fontFamily: "Prompt-Regular",
        fontSize: 13,
      },
      '& .header': {

      },
      '& .MuiDataGrid-columnHeaderTitle': {
        fontSize: 15,
        whiteSpace: "normal",
        lineHeight: "20px",
        marginTop: 11,
        
      },
      '& .MuiDataGrid-columnsContainer': {
        backgroundColor: 'rgb(232, 232, 232)',        
      },      
      '& .MuiDataGrid-columnHeader': {
        margin: -5,
      },
      '& .MuiDataGrid-cell': {
        margin: -5,
        whiteSpace: "normal",
        paddingLeft: 20,
        '&:nth-of-type(1)': {
          margin: -5,          
          //backgroundColor: "rgb(0, 248, 248)",
        }
      },
      
      '& .Mui-odd': {
        backgroundColor: "rgb(248, 248, 248)",
        //margin: -5,
      },
      '& .Mui-even': {
        //margin: -5,
      },
      '& .MuiDataGrid-row': {
        //backgroundColor: "rgb(0, 0, 248)",
        margin: -5,
      },
    },
  },
);

export const StyleTableCell = withStyles((theme) => ({
  
  head: {
    backgroundColor: "rgb(232, 232, 232)",    
    fontFamily: "Prompt-Regular",
  },
  body: {
    fontSize: 14,
    fontFamily: "Prompt-Regular",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    fontFamily: "Prompt-Regular",
    '&:nth-of-type(odd)': {
      backgroundColor: "rgb(248, 248, 248)",
    },
  },
}))(TableRow);

export const StyledTablePagination = withStyles((theme) => ({
  head: {
    fontFamily: "Prompt-Regular",
  },
}))(TablePagination);


