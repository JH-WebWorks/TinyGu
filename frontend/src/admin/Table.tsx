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
  TextField,
  Button,
} from "@material-ui/core";
import TablePaginationActions from "./TablePaginationActions";
import LinkTableRow from "./LinkTableRow";

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

  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getObjects();
        }}
      >
        <TextField
          label="Suchbegriff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="filled"
        />
        <Button variant="contained" color="primary" type="submit">
          Suchen
        </Button>
        {/* <input type="submit" value="suchen" /> */}
      </form>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">ShortLink</TableCell>
              <TableCell align="right">url</TableCell>
              <TableCell align="right">Erstellt am</TableCell>
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
