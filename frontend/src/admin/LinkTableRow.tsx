import moment from "moment-timezone";
import { TableCell, TableRow, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import UpdateDialog from "./UpdateDialog";

export default function LinkTableRow(props: {
  element: { keyword: string; url: string; timestamp: string };
  getObjects: () => void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  function handleDelete(keyword: string) {
    fetch("/api/admin", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: keyword }),
    }).then(props.getObjects);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell align="left">{props.element.keyword}</TableCell>
      <TableCell align="left">{props.element.url}</TableCell>
      <TableCell align="left">
        {moment
          .tz(props.element.timestamp, "Etc/UTC")
          .tz("Europe/Berlin")
          .format("DD:MM:YY")}
      </TableCell>
      <TableCell align="left">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => handleDelete(props.element.keyword)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <UpdateDialog
        open={open}
        setOpen={setOpen}
        getObjects={props.getObjects}
        keyword={props.element.keyword}
        url={props.element.url}
      />
    </TableRow>
  );
}
