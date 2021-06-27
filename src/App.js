import { useState, useEffect } from "react";
import "./App.css";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Todo from "./Todo.js";
import db from "./firebase.js";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const logged = useSelector((state) => state.isLogged);
  console.log(logged);

  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("todos").onSnapshot((snapshot) => console.log(snapshot.docs));
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, [input]);

  const add = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className="app">
      {!logged.isAuthenticated ? (
        <div className="login_page">
          <h1>Welcome to To do List 🚀 Please Log In to continue</h1>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              dispatch({
                type: "SIGN_IN",
              });
            }}
          >
            sign in
          </Button>
        </div>
      ) : (
        <div className="home_page">
          <div className="mob_header_page">
            <div className="mob_header_top">
              <h1>To Do List</h1>
              <Button
              size="small"
                variant="contained"
                color="secondary"
                onClick={() => {
                  dispatch({
                    type: "SIGN_OUT",
                  });
                }}
              >
                sign out
              </Button>
            </div>
            <form>
              <FormControl style={{ width: "500px" }}>
                <InputLabel>Add To do</InputLabel>
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
              </FormControl>
              <Button
                style={{ margin: "0 30px" }}
                disabled={logged.isAuthenticated && !input}
                type="submit"
                onClick={add}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </form>
          </div>
          <div className="header">
            <h1>To Do List</h1>
            <form>
              <FormControl style={{ width: "500px" }}>
                <InputLabel>Add To do</InputLabel>
                <Input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
              </FormControl>
              <Button
                style={{ margin: "0 30px" }}
                disabled={logged.isAuthenticated && !input}
                type="submit"
                onClick={add}
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </form>
            <div className="signOut_btn">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  dispatch({
                    type: "SIGN_OUT",
                  });
                }}
              >
                sign out
              </Button>
            </div>
          </div>
          <ul>
            {todos.map((todo) => (
              <div>
                <Todo todo_item={todo.todo} todo_id={todo.id}></Todo>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
