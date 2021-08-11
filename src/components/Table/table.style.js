import { withStyles, makeStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from "@material-ui/core/TablePagination";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: 'rgba(255, 7, 0, 0.55)',
  },
  container: {
    maxHeight: 40,
  },
});

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


