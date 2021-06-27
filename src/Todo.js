import { Button, Modal } from "@material-ui/core";
import List from "@material-ui/core/List";
import EditIcon from "@material-ui/icons/Edit";
import ListItem from "@material-ui/core/ListItem";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";
import "./Todo.css";

function Todo({ todo_item, todo_id }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: "50%",
      left: "50%",
      transform: `translate(-${50}%, -${50}%)`,
      dispaly: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  }));
  const classes = useStyles();

  const updateTodo = (e) => {
    e.preventDefault();

    db.collection("todos").doc(todo_id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <div className="todo">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Update the To do</h1>
          <form>
            <FormControl fullWidth="true" margin="normal">
              <InputLabel>Update To do</InputLabel>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </FormControl>
            <Button
              disabled={!input}
              type="submit"
              onClick={updateTodo}
              variant="contained"
              color="secondary"
            >
              Update
            </Button>
          </form>
        </div>
      </Modal>

      <div className="todo_description">
        <List>
          <ListItem button>
            <ListItemText primary={todo_item} secondary="Deadline" />
          </ListItem>
        </List>
      </div>
      <div className="todo_actions">
        <EditIcon variant="contained" onClick={() => setOpen(true)} />
        <DeleteIcon
          style={{ marginLeft: "10px" }}
          variant="contained"
          onClick={() => db.collection("todos").doc(todo_id).delete()}
        />
      </div>
    </div>
  );
}

export default Todo;
