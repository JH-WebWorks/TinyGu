import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog(props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getObjects: () => void;
  keyword: string;
  url: string;
}) {
  const [newKeyword, setNewKeyword] = useState<string>(props.keyword);
  const [newUrl, setNewUrl] = useState<string>(props.url);

  function handleClose() {
    props.setOpen(false);
  }

  function handleSubmit() {
    fetch("/api/admin/" + props.keyword, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: newKeyword, url: newUrl }),
    })
      .then(console.log)
      .then(props.getObjects);
  }

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Update</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Short Link"
          type="text"
          value={newKeyword}
          onChange={(event) => setNewKeyword(event.target.value)}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          label="url"
          type="text"
          fullWidth
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Abbruch
        </Button>
        <Button
          disabled={newKeyword === props.keyword && newUrl === props.url}
          onClick={handleSubmit}
          color="primary"
        >
          Speichern
        </Button>
      </DialogActions>
    </Dialog>
  );
}
