import React, { useState } from "react";
import moment from "moment-timezone";
import {
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Table,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import TablePaginationActions from "./TablePaginationActions";

export default function LinkTable() {
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
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

  function handleDelete(keyword: string) {
    fetch("/api/admin", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: keyword }),
    }).then(getObjects);
  }

  function handleUpdate(keyword: string, newKeyword: string, newUrl: string) {
    fetch("/api/admin/" + keyword, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: newKeyword, url: newUrl }),
    })
      .then(console.log)
      .then(getObjects);
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
        <input
          type="text"
          placeholder="Suchbegriff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" value="suchen" />
      </form>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Action</TableCell>
              <TableCell align="right">ShortLink</TableCell>
              <TableCell align="right">url</TableCell>
              <TableCell align="right">Created/Changed At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted_objects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((elem) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={elem.keyword}
                >
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      onClick={() => handleDelete(elem.keyword)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">{elem.keyword}</TableCell>
                  <TableCell align="right">{elem.url}</TableCell>
                  <TableCell align="right">
                    {moment
                      .tz(elem.timestamp, "Etc/UTC")
                      .tz("Europe/Berlin")
                      .format("HH:mm:ss")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </React.Fragment>
  );
}
