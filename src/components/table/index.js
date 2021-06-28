import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import api from "../../services/api"

const useStyles = makeStyles({
  root: {
    width: '100%',
    boxShadow: "5px 5px 12px #9E9E9E",
    border: '1px solid #58696d'
  },
  container: {
    maxHeight: 550,
  },
  acoes: {
    marginLeft: '6%',
    color: 'black'
  },
  error2: {
		color: '#f44336',
		textAlign: 'center'
	},
	sucesso: {
		color: '#08aa1e',
		textAlign: 'center'
	}
});

export default function StickyHeadTable(data) {

  const classes = useStyles();
  const [tableData, setData] = React.useState(null);
  const [linhas, setLinhas] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [error, setErro] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    setData(data.tableData)
    setLinhas(data.tableData.line)
  },[data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = async (id, path, errormsg, sucessomsg) => {
    setErro(false)
    setSucesso(false)
    try {
			const response = await api.delete(path+"/" + id);
			
      const line = linhas.filter( n => n[tableData.bind[0]] !== id)
      setSucesso(sucessomsg)
      setLinhas(line)
		} catch (err){
			console.log(err);
      setErro(errormsg)
		}
  };

  return (
    
      <div>
        { error && <p className={classes.error2}>{error}</p>}
				{ sucesso && <p className={classes.sucesso}>{sucesso}</p>}
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
            {linhas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(line => (
              <TableRow key={line[tableData.bind[0]]}>
              {tableData.bind.map(bind => {
                if(bind === 'acao')  {
                  return (
                    <TableCell key={bind} align={'left'} >
                    {tableData.acoes.map(acao => {
                      if(!acao.function){
                        return (
                          <Link key={line+bind+acao.title} className={classes.acoes} to={acao.path+"/"+line[tableData.bind[0]]} variant="body2">
                            <Button >
                              {acao.icon}
                            </Button>
                          </Link>
                        )
                      }
                      return (
                        <Button className={classes.acoes} key={line+bind+acao.title} onClick={()=>{handleDelete(line[tableData.bind[0]], acao.path, acao.errormsg, acao.sucessomsg)}}>
                            {acao.icon}
                        </Button>
                      )
                    })}
                    </TableCell>
                  )
                }
                return  <TableCell key={bind} align={'left'}>{line[bind]}</TableCell>
              
              })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={linhas.length}
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
