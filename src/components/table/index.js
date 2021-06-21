import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: "5px 5px 12px #9E9E9E",
    border: '1px solid #58696d'
  },
  container: {
    maxHeight: 550,
  },
});

export default function StickyHeadTable(data) {

  const classes = useStyles();
  const [tableData, setData] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    setData(data.tableData)
  },[data]);

  const handleChangePage = (event, newPage) => {
    console.log('daledale: ',event)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('salvesalve:',+event.target.value )
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    
      <div>
        
         {tableData &&
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableData.column.map((column) => (
                <TableCell
                  key={column}
                  align={'left'}
                  style={{ minWidth: 170 }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.line.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(line => (
              <TableRow key={line[tableData.bind[0]]}>
              {tableData.bind.map(bind => (
                <TableCell key={bind} align={'left'}>{line[bind]}</TableCell>
              ))}                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.line.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
   }
    </div>
  );
}
