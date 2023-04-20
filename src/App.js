import { useState } from "react";
import "./App.css";
import TodoList from "./Component/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from "uuid";
import { useCallback } from "react";
import { useEffect } from "react";

const TODO_APP_STORAGE_KEY = "work";
document.body.onload = () => {
  console.log(localStorage);
};

function App() {
  //Khởi tạo todo list
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem(TODO_APP_STORAGE_KEY))
  );
  const [textInput, setTextInput] = useState("");
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);
  // setInterval(() => {
  //   const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
  //   if (storagedTodoList) {
  //     setTodoList(JSON.parse(storagedTodoList));
  //   }
  // }, 10000);
  // setInterval(() => {
  //   localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  // }, 1000);
  const onTextInputChanged = useCallback((e) => {
    //set giá trị thẻ input khi ng dùng nhập
    setTextInput(e.target.value);
  }, []);

  const onAddButtonClick = useCallback(
    (e) => {
      //dùng useCallback để tránh tình huống ko mong muốn là mỗi lần bấm thì lại reset cả Textfield
      //thêm text input vào todo list
      //Thêm vào đầu danh sách
      setTodoList([
        {
          id: v4(),
          name: textInput,
          iscompleted: false,
        },
        ...todoList,
      ]);

      //THêm vào cuối danh sách
      /*
      setTodoList([
      {
        id:v4(),name: textInput, isCompleted: false},
      ...todoList ,
      ])

      */
      //nhập xong xoá text input đi
      setTextInput("");
      document.getElementById("erase-parent").style.display = "block";
    },
    [textInput, todoList]
  );
  const onCheckButtonClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, iscompleted: true } : todo
      )
    );
  });
  const onEraseButtonClick = () => {
    localStorage.clear();
    setTodoList([]);
    document.getElementById("erase-parent").style.display = "none";
  };
  return (
    <div className="App">
      <h3>Danh sách cần làm</h3>
      <Textfield
        className="add-todo"
        name="add-todo"
        placeholder="Thêm việc cần làm"
        elemAfterInput={
          //Thêm phần tử vào cuối thẻ input
          <Button
            className="add"
            isDisabled={!textInput}
            appearance="primary"
            onClick={onAddButtonClick}
          >
            Thêm
          </Button>
        }
        css={{
          padding: "2px 4px 2px",
        }}
        value={textInput}
        onChange={onTextInputChanged}
      ></Textfield>
      <TodoList
        todoList={todoList}
        onCheckButtonClick={onCheckButtonClick}
      ></TodoList>
      {!!todoList && (
        <div className="erase" id="erase-parent">
          <Button id="erase" className="erase" onClick={onEraseButtonClick}>
            Xoá
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
