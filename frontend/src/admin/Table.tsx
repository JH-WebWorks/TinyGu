import React, { useState } from "react";
import {
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Table,
  TableFooter,
  InputBase,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TablePaginationActions from "./TablePaginationActions";
import LinkTableRow from "./LinkTableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 0 4px 0",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "10px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function LinkTable() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [objects, setObjects] = useState<
    Array<{ keyword: string; url: string; timestamp: string }>
  >([]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function getObjects() {
    fetch(
      "/api/admin?" +
        new URLSearchParams({
          search: search,
        }),
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(setObjects);
  }

  const sorted_objects = objects;
  const classes = useStyles();
  return (
    <React.Fragment>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Suchen"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
          onClick={(e) => {
            e.preventDefault();
            getObjects();
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Kurzlink</TableCell>
              <TableCell align="left">URL</TableCell>
              <TableCell align="left">Zuletzt bearbeitet</TableCell>
              <TableCell align="left">Aktionen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted_objects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((elem) => (
                <LinkTableRow
                  element={elem}
                  getObjects={getObjects}
                  key={elem.keyword}
                />
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 100, 500]}
                colSpan={3}
                count={objects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
